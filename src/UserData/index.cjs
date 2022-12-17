/**
 * This module is the entry of UserData. This will ensure the user-dirs and all config-files.
 * Also, it will 
 *
 * @author jakobst1n.
 * @since  19.12.2019
 */

let logger = require("../Logger/index.cjs");
let fse = require("fs-extra");
let ini = require('ini');

let neoModules;

/**
 * This method will ensure that all required fields are in config.ini
 */
function ensureMainConfig() {
    var config = ini.decode(fse.readFileSync(__configdir + "/config.ini", 'utf-8'))

    if (config.instanceName == null) { config.instanceName = "neoStrip"; }
    if (config.activeMode == null) { config.activeMode = "builtin/static"; }

    if (config.HTTP == null) { config.HTTP = {}; }
    if (config.HTTP.port == null) { config.HTTP.port = 443; }

    if (config.SelfUpdater == null) { config.SelfUpdater = {}; }
    if (config.SelfUpdater.checkVersionInterval == null) { config.SelfUpdater.checkVersionInterval = 1; }
    if (config.SelfUpdater.automaticUpdate == null) { config.SelfUpdater.automaticUpdate = false; }

    if (config.SSLCert == null) { config.SSLCert = {}; }
    if (config.SSLCert.CN == null) { config.SSLCert.CN = "localhost"; }
    if (config.SSLCert.certMade == null) { config.SSLCert.certMade = false; }
    if (config.SSLCert.certDate == null) { config.SSLCert.certDate = 0; }
    if (config.SSLCert.certExpire == null) { config.SSLCert.certExpire = 0; }
    if (config.SSLCert.certCN == null) { config.SSLCert.certCN = ""; }

    if (config.DiscoveryServer == null) { config.DiscoveryServer = {}; }
    if (config.DiscoveryServer.address == null) { config.DiscoveryServer.address = "https://erj46s.deta.dev"; }
    if (config.DiscoveryServer.broadcastSelf == null) { config.DiscoveryServer.broadcastSelf = false; }

    if (config.neoRuntimeIPC == null) { config.neoRuntimeIPC = {}; }
    if (config.neoRuntimeIPC.socketFile == null) { config.neoRuntimeIPC.socketFile = "/tmp/neo_runtime.sock"; }

    fse.writeFileSync(__configdir + "/config.ini", ini.encode(config))
}

/**
 * This method will ensure that all required fields are in config.ini
 */
function ensureStripConfig() {
    var config = ini.decode(fse.readFileSync(__configdir + "/strip.ini", 'utf-8'))

    if (config.DEFAULT == null) { config.DEFAULT = {}; }
    if (config.DEFAULT.led_pin == null) { config.DEFAULT.led_pin = 18; }
    if (config.DEFAULT.led_freq_hz == null) { config.DEFAULT.led_freq_hz = 80000; }
    if (config.DEFAULT.led_dma == null) { config.DEFAULT.led_dma = 10; }
    if (config.DEFAULT.led_invert == null) { config.DEFAULT.led_invert = false; }
    if (config.DEFAULT.led_channel == null) { config.DEFAULT.led_channel = 0 }
    if (config.DEFAULT.segments == null) { config.DEFAULT.segments = "50 50"; }
    if (config.DEFAULT.matrix == null) { config.DEFAULT.matrix = "[[[0,false]],[[1,false]]]"; }

    fse.writeFileSync(__configdir + "/strip.ini", ini.encode(config))
}

/**
 * This method will make sure all files and folders needed for the app exists,
 * it will also make sure all files contain all needed data.
 */
function init() {
    // Generate all user-folders
    logger.info("Ensuring all folder in UserDir exists...");

    fse.ensureDirSync(__datadir + "/");
    fse.ensureDirSync(__configdir);
    fse.ensureDirSync(__configdir + "/certs");
    fse.ensureDirSync(__datadir + "/userCode/");
    fse.ensureDirSync(__datadir + "/remoteCode/");

    // Generate config-files
    if (!fse.existsSync(__configdir + "/config.ini")) {
        fse.closeSync(fse.openSync(__configdir + "/config.ini", 'w'));
    }
    ensureMainConfig();
    
    if (!fse.existsSync(__configdir + "/strip.ini")) {
        fse.closeSync(fse.openSync(__configdir + "/strip.ini", 'w'));
    }
    ensureStripConfig();

    if (!fse.existsSync(__configdir + "/users.ini")) {
        fse.writeFileSync(__configdir + "/users.ini", ini.encode({
            "neo": {
                "password": "5adbc90fb4716fff62d9cf634837e22f29b011803ba29cee51f921b920fa941651737bd15d00dc72e4cbeee5e64e06ec99cc50ea917285a029797a98740cce0f",
                "salt": "59b6de1040f3ae3c63de984ca5d61ef46f41dc6ecead3a9d5dab69f0bb3636aa49017e179b74dbcdb407f62bc139a7d55aa78fe2bbdd5327609ea124b2fa03b1"
            }
        }))
    }
};

/**
 * Recursive function which adds setters and getters to all properties
 * in a nested object. This will make us able to save config values
 * directly without doing anything other that `prop = value`.
 * 
 * @param {object} config - The full config object.
 * @param {string} configFile - The path of the configfile.
 * 
 * @return {object} The config object with setters for values.
 */
 function withSetters(config, configFile) {
    let outConfig = {};
    function iter(inNode, outNode) {
        for (const key of Object.keys(inNode)) {
            if (typeof(inNode[key]) === "object") {
                outNode[key] = {};
                iter(inNode[key], outNode[key]);
            } else {
                outNode[`_${key}`] = inNode[key];
                Object.defineProperty(outNode, key, {
                    get: function() { return this[`_${key}`]; },
                    set: function(value) {
                        this[`_${key}`] = value;
                        saveConfig(configFile, outConfig);
                    },
                    enumerable: true
                });
            }
        }
    }
    iter(config, outConfig);
    return outConfig
}

/**
 * Returns a object with only the actual values and not setters, this is the 
 * inverse of withSetters.
 * 
 * @param {object} config - The full config object.
 * 
 * @return {object} The config object without setters.
 */
function withoutSetters(config) {
    let out = {};
    function iter(inNode, outNode) {
        for (const key of Object.keys(inNode).filter(k => (k.substr(0, 1) != "_"))) {
            if (typeof(inNode[key]) === "object") {
                outNode[key] = {};
                iter(inNode[key], outNode[key], out);
            } else {
                outNode[key] = inNode[`_${key}`];
            }
        }
    }
    iter(config, out);
    return out;
}

/**
 * Save config object, this will run stripSetters on the object it saves.
 * 
 * @param {string} file - filename to save the config object to.
 * @param {object} object - the config object to save.
 */
function saveConfig(file, object, removeSetters=true) {
    if (removeSetters) {
        object = withoutSetters(object);
    }
    fse.writeFileSync(file, ini.encode(object));
}

/**
 * Reads a ini file and add setters to all properties
 * 
 * @param {string} file - filename of file to read.
 * 
 * @return {object} The config in the file.
 */
function getFullConfig(file, addSetters=true) {
    let fullConfig =  ini.decode(fse.readFileSync(file, "utf-8"));
    if (addSetters) {
        fullConfig = withSetters(fullConfig, file);
    }
    return fullConfig;
}

/**
 * Save a user the user config file, this will append if a new user, and
 * overwrite if it is a existsing user.
 * 
 * @param {string} username - The username, case-insensitive.
 * @param {string} salt - Salt used for password-checking.
 * @param {string} password - Hashed password.
 * 
 * @return {object} Standardform return object
 */
 function saveUser(username, salt, password) {
    let config = ini.decode(fse.readFileSync(__configdir + "/users.ini", 'utf-8'))
    config[username] = {}
    config[username].salt = salt
    config[username].password = password
    fse.writeFileSync(__configdir + "/users.ini", ini.encode(config))
    return {success: true}
}

/**
 * Get a user, this will return null if no user is found.
 * 
 * @return {object} with username, salt and hash properties.
 */
function getUser(username) {
    let config = ini.decode(fse.readFileSync(__configdir + "/users.ini", 'utf-8'))
    if (Object.prototype.hasOwnProperty.call(config, username)) {
        return {...config[username], username: username}
    }
    return null;
}

/**
 * Get all users
 * 
 * @return {array} usernames
 */
function getUsers() {
    let config = ini.decode(fse.readFileSync(__configdir + "/users.ini", "utf-8"));
    let users = [];
    for (const username of Object.keys(config)) {
        users.push(username);
    }
    return users;
}

/**
 * Delete a user
 * 
 * @return {object} Standardform success object.
 */
function deleteUser(username) {
    let config = ini.decode(fse.readFileSync(__configdir + "/users.ini", 'utf-8'))
    if (config.length <= 1) { return {success: false, reason: "cannot delete only user"}; }
    if (!Object.prototype.hasOwnProperty.call(config, username)) { return {success: false, reason: "user not found", detail: username}; }
    delete config[username];
    fse.writeFileSync(__configdir + "/users.ini", ini.encode(config));
    return {success: true}
}

/**
 * Create a new mode in the user directory.
 * 
 * @param {string} name - The name of the file to use, a trailing number will
 *                        be added if there are any conflicts.
 * @param {string} template - Id of the template, builtin/static, template/base etc...
 * 
 * @return {object} a standard convention result object.
 */
function createNewUserMode(name, template) {
    source_script = null;
    if ((template === "template/base") || (template === "") || (template == null)) {
        source_script = __appdir + "/NeoRuntime/special/template_base/";
    } else {
        source_script = neoModules.neoRuntimeManager.getModePath(template);
    }
    if (!neoModules.neoRuntimeManager.isMode(source_script)) {
        return {success: false, reason: "Source script not found"};
    }

    let newModeName = neoModules.neoRuntimeManager.getModePath(`user/${name}`);
    let counter = 0;
    while (neoModules.neoRuntimeManager.isMode(newModeName)) {
        counter += 1;
        newModeName = neoModules.neoRuntimeManager.getModePath(`user/${name}_${counter}`);
    }

    fse.ensureDirSync(newModeName);
    fse.copySync(`${source_script}/script.py`, `${newModeName}/script.py`)
    neoModules.neoRuntimeManager.event.emit("change", "modelist");
    return {success: true};
}

/**
 * Delete a user created mode
 * 
 * @param {string} modeid - modeid to delete
 * 
 * @return {object} a standard convention result object.
 */
function deleteUserMode(modeid) {
    if (modeid.substr(0, 5) !== "user/") {
        return {success: false, reason: "Not user mode"}
    }
    let modePath = neoModules.neoRuntimeManager.getModePath(modeid);
    if (!neoModules.neoRuntimeManager.isMode(modePath)) {
        return {success: false, reason: "Mode does not found"}
    }
    if (modeid === neoModules.neoRuntimeManager.mode.current()) {
        return {success: false, reason: "Cannot delete currently active mode"}
    }
    fse.removeSync(modePath);
    neoModules.neoRuntimeManager.event.emit("change", "modelist");
    return {success: true}
}

module.exports = (_neoModules) => {
    neoModules = _neoModules;
    init();
    return {
        users: getUsers,
        user: {
            save: saveUser,
            get: getUser,
            delete: deleteUser
        },
        strip: {
            get: () => {
                let c = getFullConfig(`${__configdir}/strip.ini`, addSetters=false); 
                c.DEFAULT.matrix = JSON.parse(c.DEFAULT.matrix);
                c.DEFAULT.segments = c.DEFAULT.segments.split(" ");
                return c.DEFAULT;
            },
            set: (c) => {
                c.segments = c.segments.join(" ");
                c.matrix = JSON.stringify(c.matrix);
                return saveConfig(`${__configdir}/strip.ini`, {DEFAULT: c}, removeSetters=false);
            },
        },
        config: getFullConfig(`${__configdir}/config.ini`),
        mode: {
            create: createNewUserMode,
            delete: deleteUserMode
        }
    }
};
