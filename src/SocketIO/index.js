/**
 * This module contains code for handling socketIO clients.
 *
 * There are two classes, one is a SocketIO controller module.
 * The other one is a authorizedclient.
 *
 * @author jakobst1n.
 * @since  19.12.2019
 */

let logger = require(__appdir + "/src/Logger");
var exec = require('child_process').exec;
var CryptoJS = require("crypto-js");
let fs = require("fs");
const { performance } = require("perf_hooks");

let neoModules;

const sanitizePath = (path) => path.match(/(user|remote|builtin\/[a-zA-Z0-9-_\/]{1,200})(\.[a-zA-Z0-9]{1,10})?/)[0];

/**
 * Create the open socketio namespace and setup all listeners.
 * 
 * @param {io} socketio
 */
function createOpenSocketNamespace(io) {
    const openNamespace = io.of("/open")
    
    openNamespace.on("connection", (socket) => {
        logger.access(`SOCKET:open Client (${socket.id}@${socket.handshake.headers.host}) connected.`);

        socket.on("name:get", () => {
            socket.emit("name", neoModules.userData.config.instanceName);
        });
        socket.on("mode:set", (modeId) => {
            neoModules.neoRuntimeManager.mode.set(modeId);
        });
        socket.on("mode:get", () => {
            socket.emit("mode", neoModules.neoRuntimeManager.mode.current());
        });
        socket.on("modelist:get", () => {
            socket.emit("modelist", neoModules.neoRuntimeManager.modes())
        });
        socket.on("brightness:set", (brightness) => {
            neoModules.neoRuntimeManager.mode.globvars.set("brightness", brightness);
        });
        socket.on("brightness:get", () => {
            socket.emit("brightness", neoModules.neoRuntimeManager.mode.globvars.get().brightness);
        });
        socket.on("power:set", (power) => {
            neoModules.neoRuntimeManager.mode.globvars.set("power_on", power);
        });
        socket.on("power:get", () => {
            socket.emit("power", neoModules.neoRuntimeManager.mode.globvars.get().power_on);
        });
        socket.on("var:set", (name, value) => {
            neoModules.neoRuntimeManager.mode.variables.set(name, value.toString());
        });
        socket.on("vars:get", () => {
            socket.emit("vars", neoModules.neoRuntimeManager.mode.variables.get());
        });
        socket.on("modeinfo:get", () => {
            socket.emit("modeinfo", {
                mode: neoModules.neoRuntimeManager.mode.current(),
                brightness: neoModules.neoRuntimeManager.mode.globvars.get().brightness,
                power: neoModules.neoRuntimeManager.mode.globvars.get().power_on,
                vars: neoModules.neoRuntimeManager.mode.variables.get()
            });
        });
        socket.on("authenticate:user", (username, password, callback) => {
            let user = neoModules.userData.user.get(username);
            if (user == null) {
                callback({success: false, reason: "Invalid username/password"})
                logger.access(`SOCKET:open Client (${socket.id}@${socket.handshake.headers.host}) tried to log in as '${username}', wrong username and/or password.`);
                return;
            }

            let providedHash = hashPassword(password, user.salt);
            if (providedHash.hash == user.password) {
                let token = createToken(socket);
                while (session_tokens.hasOwnProperty(token)) {
                    token = createToken(socket);
                }
                
                session_tokens[token] = {
                    expire: (~~Date.now())+(2678400),
                    host: socket.handshake.headers.host,
                    user: {username: user.username}
                };
                
                callback({success: true, user: {username: username}, token: token})
                logger.access(`SOCKET:open Client (${socket.id}@${socket.handshake.headers.host}) authenticated as user '${username}'`);    
                return;
            }

            callback({success: false, reason: "Invalid username/password"})
            logger.access(`SOCKET:open Client (${socket.id}@${socket.handshake.headers.host}) tried to log in as '${username}', wrong username and/or password.`);
        });

        socket.on("disconnect", () => {
            logger.access(`SOCKET:open Client (${socket.id}@${socket.handshake.headers.host}) disconnected.`);
        });

        if (neoModules.selfUpdater.updater.updating) {
            socket.emit("updater", "start");
        }
    });

    neoModules.neoRuntimeManager.event.on("change", (name, value) => {
        if (name == "modelist") {
            openNamespace.emit("modelist", neoModules.neoRuntimeManager.modes());
        } else if (["mode", "power_on", "brightness"].includes(name)) {
            if (name == "power_on") { name = "power"; }
            openNamespace.emit(name, value);
        } else {
            openNamespace.emit("var", name, value);
        }
    });
    neoModules.selfUpdater.updater.event.on("start", () => {
        openNamespace.emit("updater", "start");
    });
    neoModules.selfUpdater.updater.event.on("end", () => {
        openNamespace.emit("updater", "end");
    });
}

/**
 * @type {object} This is the collection of valid session tokens.
 */
let session_tokens = {};

/**
 * Middleware that will stop the request if the client does not have a valid
 * session token.
 * 
 * @param {object} socket - The socket instance of the connected client
 * @param {function} next - The callback to continue the middleware chain
 */
function authorize_middleware(socket, next) {
    const token = socket.handshake.auth.token;

    if (session_tokens.hasOwnProperty(token) &&
        // session_tokens[token].host === socket.handshake.headers.host &&
        session_tokens[token].expire > (~~(Date.now()))) {
            socket.data.user = session_tokens[token].user;
            next();
    } else {
        const err = new Error("not authorized");
        err.data = { content: "invalid session token" };
        next(err);
    }
}

/**
 * Create the open socketio namespace and setup all listeners. 
 * A valid session token is required to connect to this namespace.
 * 
 * @param {io} socetio 
 */
function createAuthorizedNamespace(io) {
    const authorizedNamespace = io.of("/authed");
    authorizedNamespace.use(authorize_middleware);
    authorizedNamespace.on("connection", (socket) => {
        logger.access(`SOCKET:authed Client (${socket.id}@${socket.handshake.headers.host}) connected.`);
        let debuggerOpen = false;
        
        socket.emit("user", socket.data.user);

        /* InstanceName */
        socket.on("name:set", (name, fn) => {
            neoModules.userData.config.instanceName = name;
            fn({success: true});
            io.emit("name", neoModules.userData.config.instanceName);
        });

        /* UserData */
        socket.on("mode:create", (name, template, fn) => {
            fn(neoModules.userData.mode.create(name, template));
        });
        socket.on("mode:delete", (modeid, fn) => {
            fn(neoModules.userData.mode.delete(modeid));
        });

        /* LED Config */
        socket.on("led_config:get", () => {
            socket.emit("led_config", neoModules.userData.strip.get());
        });
        socket.on("led_config:set", (config) => {
            neoModules.userData.strip.set(config);
        });

        /* SelfUpdater */
        socket.on("version:current_number", () => {
            socket.emit("version:current_number", neoModules.selfUpdater.localVersionNumber);
        });
        socket.on("version:branch", (fn) => {
            socket.emit("version:branch", neoModules.selfUpdater.branch);
        });
        socket.on("version:newest_number", (fn) => {
            socket.emit("version:newest_number", neoModules.selfUpdater.remoteVersionNumber);
        });
        socket.on("version:check_for_update", (fn) => {
            neoModules.selfUpdater.checkVersion().then(() => {
                socket.emit("version:newest_number", neoModules.selfUpdater.remoteVersionNumber);
                fn({success: true});
            });
        });
        socket.on("system:update_version", () => {
            neoModules.selfUpdater.updater.forceUpdate();
        });

        /* SSLCert */
        socket.on("sslcert:info", (fn) => {
            socket.emit("sslcert:info", {...neoModules.SSLCert.getConfig(), "isValid": neoModules.SSLCert.checkValidity()});
        });
        socket.on("sslcert:generate_new", (fn) => {
            neoModules.SSLCert.generateCert();
            fn({success: true});
        });

        /* System actions */
        socket.on("restart:system", () => {
            exec('shutdown -r now', function(error, stdout, stderr){ callback(stdout); });
        });
        socket.on("restart:service", () => {
            let p = exec('systemctl restart luxcena-neo');
            p.unref();
        });

        /* Users */
        socket.on("users:get", () => {
            socket.emit("users", neoModules.userData.users())
        });
        socket.on("user:delete", (username, fn) => {
            if (username == socket.data.user.username) { fn({success: false, reason: "cannot delete logged in account"}); return; }
            fn(neoModules.userData.user.delete(username));
            socket.emit("users", neoModules.userData.users())
        });
        socket.on("user:changeusername", (oldusername, newusername, fn) => {
            if (oldusername == socket.data.user.username) { fn({success: false, reason: "cannot change username of logged in account"}); return; }
            let user = neoModules.userData.user.get(oldUserName);
            if (user == null) { fn({success: false, reason: "unknown username", detail: oldusername}); return; }
            user.username = newusername;
            let res = neoModules.userData.user.save(user);
            if (!res.success) { fn(res); return; }
            res = neoModules.userData.user.delete(oldusername)
            if (!res.success) { fn(res); return; }
            fn({success: true});
            socket.emit("users", neoModules.userData.users())
        });
        socket.on("user:newpassword", (username, newPassword, fn) => {
            let user = neoModules.userData.user.get(username);
            if (user == null) { fn({success: false, reason: "unknown username", detail: username}); return; }
            let newHash = hashPassword(newPassword);
            fn(neoModules.userData.user.save(username, newHash.salt, newHash.hash));
            socket.emit("users", neoModules.userData.users())
        });
        socket.on("user:create", (username, newPassword, fn) => {
            let user = neoModules.userData.user.get(username);
            if (user != null) { fn({success: false, reason: "user already exists", detail: username}); return; }
            if (username.length < 1) { fn({success: false, reason: "no username provided"}); return; }
            let newHash = hashPassword(newPassword);
            fn(neoModules.userData.user.save(username, newHash.salt, newHash.hash));
            socket.emit("users", neoModules.userData.users())
        });

        /* Editor/debugger */
        let onProcStart = () => socket.emit("editor:proc:start");
        let onProcStop = (code) => socket.emit("editor:proc:exit", code);
        let onProcStdout = (stdout) => socket.volatile.emit("editor:proc:stdout", stdout);
        let onProcStderr = (stderr) => socket.volatile.emit("editor:proc:stderr", stderr);
        let closeDebugger = () => {
            debuggerOpen = false;
            neoModules.neoRuntimeManager.event.removeListener("proc:start", onProcStart);
            neoModules.neoRuntimeManager.event.removeListener("proc:stop", onProcStop);
            neoModules.neoRuntimeManager.event.removeListener("proc:stdout", onProcStdout);
            neoModules.neoRuntimeManager.event.removeListener("proc:stderr", onProcStderr); 
            return neoModules.neoRuntimeManager.stopDebugger();
        };
        socket.on("editor:open", (modeId, fn) => {
            neoModules.neoRuntimeManager.event.on("proc:start", onProcStart);
            neoModules.neoRuntimeManager.event.on("proc:exit", onProcStop);
            neoModules.neoRuntimeManager.event.on("proc:stdout", onProcStdout);
            neoModules.neoRuntimeManager.event.on("proc:stderr", onProcStderr);
            let res = neoModules.neoRuntimeManager.startDebugger(modeId);
            if (!res.success) { fn(res); return; }
            logger.info(`Starting debugger for ${modeId}.`)
            debuggerOpen = true;
            fn({success: true})
            socket.emit("editor:code", modeId, res.code);

            if (neoModules.neoRuntimeManager.modeRunning()) {
                socket.emit("editor:proc:start");
            }
        });
        socket.on("editor:save", (modeId, code, fn) => {
            if (!debuggerOpen) { fn({success: false, reason: "debugger not open"}); return;  };
            fn(neoModules.neoRuntimeManager.saveModeCode(modeId, code));
        });
        socket.on("editor:startmode", (fn) => {
            if (neoModules.neoRuntimeManager.modeRunning()) {
                fn({success: true});
                socket.emit("editor:proc:start");
            } else {
                fn(neoModules.neoRuntimeManager.startMode());
            }
        });
        socket.on("editor:stopmode", (fn) => {
            fn(neoModules.neoRuntimeManager.stopMode());
        });
        socket.on("editor:restartmode", (fn) => {
            fn(neoModules.neoRuntimeManager.restartMode());
        });
        socket.on("editor:close", (fn) => {
            fn(closeDebugger());
            logger.info("Stopped debugger");
        });

        /* Matrix and strip buffer */
        socket.on("matrix:get", () => {
            socket.emit("matrix", neoModules.neoRuntimeManager.matrix);
        });

        socket.on("disconnect", () => {
            logger.access(`SOCKET:authed Client (${socket.id}@${socket.handshake.headers.host}) disconnected.`);
            if (debuggerOpen) {
                closeDebugger();
                logger.info("Stopped debugger because client disconnected")
            }
        });
    });

    neoModules.neoRuntimeManager.event.on("matrix", (matrix) => {
        authorizedNamespace.emit("matrix", matrix);
    });
    let lastStripBufferEmit = performance.now();
    neoModules.neoRuntimeManager.event.on("strip_buffer", (strip_buffer) => {
        if ((performance.now() - lastStripBufferEmit) > 50) {
            authorizedNamespace.volatile.emit("strip_buffer", strip_buffer);
            lastStripBufferEmit = performance.now();
        }  // We just drop packets 
    });
    neoModules.selfUpdater.updater.event.on("step", (step) => {
        authorizedNamespace.emit("updater:step", step);
    });
    neoModules.selfUpdater.updater.event.on("command", (command) => {
        authorizedNamespace.emit("updater:command", command);
    });
    neoModules.selfUpdater.updater.event.on("error", (updateLog) => {
        authorizedNamespace.emit("updater:error", updateLog);
    });
}

/**
 * Protect 
 */
function limitEmits(fn) {
    let lastEmit = performance.now();
    
    return {
    }
}

/**
 * Creates an access-token from the clients host-name and the current EPOCH.
 *
 * @param   {client}
 *
 * @return {string} - The access-token.
 */
 function createToken(client) {
    let time = Date.now().toString();
    let host = client.handshake.headers.host;
    return (CryptoJS.SHA256(`${host}${time}`).toString());
}

/**
 * Create a new salt and hash from a password.
 * 
 * @param {string} password - The password to hash.
 * @param {string} salt - If set, this salt will be used, else a new salt is generated.
 * 
 * @return {object} A object containing a password and a salt property.
 */
function hashPassword(password, salt = null) {
    if (salt == null) {
        salt = CryptoJS.lib.WordArray.random(128 / 2);
    } else {
        salt = CryptoJS.enc.Hex.parse(salt);
    }
    let hash = CryptoJS.PBKDF2(password, salt, {
        keySize: 512 / 32,
        iterations: 1000,
        hasher: CryptoJS.algo.SHA512
    });
    return {hash: hash.toString(), salt: salt.toString()}
}

module.exports = (_neoModules, io) => {
    neoModules = _neoModules;
    return {
        openNamespace: createOpenSocketNamespace(io),
        authorizedNamespace: createAuthorizedNamespace(io)
    }
};
 
