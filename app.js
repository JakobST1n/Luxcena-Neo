let fse = require("fs-extra");
let events = require('events');

// Firstly we set up all globals, check that the usrData dir exists, if not, we run the setup
global.__appdir    = "/opt/luxcena-neo";
global.__configdir = "/etc/luxcena-neo";
global.__datadir   = "/var/luxcena-neo";
global.__logdir    = "/var/log/luxcena-neo";

if ((process.argv.length >= 3) && (process.argv[2] == "dev")) {
    global.__appdir    = __dirname;
    global.__configdir = __dirname + "/tmp/config";
    global.__datadir   = __dirname + "/tmp/userdata";
    global.__logdir    = __dirname + "/tmp/logs";
}
if (!fse.existsSync(global.__appdir)) {
    console.log(`CRITICAL UserDir not found '${userDir}'! Exiting...`);
    process.exit(1);
}

// global eventEmitter
global.__event = new events.EventEmitter();

// Secondly we setup the logger,
let logger = require("./src/Logger");
logger.info("Starting Luxcena-Neo...");

let neoModules = {};
neoModules.userData = require("./src/UserData")(neoModules);
neoModules.SSLCert = require("./src/SSLCert")(neoModules);
neoModules.selfUpdater = require("./src/SelfUpdater")(neoModules);
neoModules.neoRuntimeManager = require("./src/NeoRuntimeManager")(neoModules);

neoModules.neoRuntimeManager.mode.set(neoModules.userData.config.activeMode);

// All the domain-things are now setup, we are ready to run our main program...
let express = require("express");
let https = require("https");
let app = express();
let server = https.createServer({
        key: fse.readFileSync(__configdir + "/certs/privkey.pem"),
        cert: fse.readFileSync(__configdir + "/certs/cert.pem")
    },
    app
);
let io = require("socket.io")(server);
require("./src/SocketIO")(neoModules, io);
app.use("/", express.static(__appdir + "/public"));

server.listen(neoModules.userData.config.HTTP.port,  () => {
    let host = server.address().address;
    let port = server.address().port;
    logger.info(`Webserver now listening at *:${port}`);
});

/**
 * Get a local network address
 * 
 * @return {string} ip address
 */
function getNetworkAddress() {
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    const results = Object.create(null); // Or just '{}', an empty object
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }
    if (Object.keys(results).length > 1) {
        logger.info("Multiple network addresses found!!!")
    }
    return results[Object.keys(results)[0]][0]
}
function tryBroadcastSelf() {
    if (neoModules.userData.config.DiscoveryServer.broadcastSelf) {
        const data = JSON.stringify({
                address: `https://${getNetworkAddress()}:${neoModules.userData.config.HTTP.port}`,
                name: neoModules.userData.config.instanceName,
                widgetaddr: "/#/widget"
            })
        const options = {
            hostname: `${neoModules.userData.config.DiscoveryServer.address}`,
            port: 443,
            path: "/HEY",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-length": data.length
            }
        };
        let req = https.request(options, res => {
            if (res.statusCode != 200) {
                res.on("data", (d) => logger.warning(d.toString()));
            } else {
                res.on("data", (d) => logger.info(d.toString()));
                logger.info("Broadcasted self")
            }
        });
        req.on("error", (error) => logger.warning(error.toString()))
        req.write(data);
        req.end();
    }
}
// setInterval(tryBroadcastSelf, 30000);
// tryBroadcastSelf();

// setInterval(() => { logger.notice("I feel FANTASTIC, an I'm still alive. Uptime: " + process.uptime()); }, 600000);
