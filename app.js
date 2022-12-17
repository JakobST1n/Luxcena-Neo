import { existsSync, readFileSync } from 'fs';
import events from 'node:events';
import path from 'path';
import {fileURLToPath} from 'url';

// Firstly we set up all globals, check that the usrData dir exists, if not, we run the setup
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
global.__appdir    = __dirname;
global.__configdir = "/etc/luxcena-neo";
global.__datadir   = "/var/luxcena-neo";
global.__logdir    = "/var/log/luxcena-neo";

if ((process.argv.length >= 3) && (process.argv[2] == "dev")) {
    global.__appdir    = __dirname;
    global.__configdir = __dirname + "/tmp/config";
    global.__datadir   = __dirname + "/tmp/userdata";
    global.__logdir    = __dirname + "/tmp/logs";
}
if (!existsSync(global.__appdir)) {
    console.log(`CRITICAL AppDir not found '${global.__appdir}'! Exiting...`);
    process.exit(1);
}

// global eventEmitter
global.__event = new events.EventEmitter();

// Secondly we setup the logger,
import logger from './src/Logger/index.cjs'
logger.info("Starting Luxcena-Neo...");

let neoModules = {};
import UserData from './src/UserData/index.cjs';
neoModules.userData = UserData(neoModules);
import SSLCert from './src/SSLCert/index.cjs';
neoModules.SSLCert = SSLCert(neoModules);
import SelfUpdater from './src/SelfUpdater/index.js';
neoModules.selfUpdater = SelfUpdater(neoModules);
import NeoRuntimeManager from './src/NeoRuntimeManager/index.cjs';
neoModules.neoRuntimeManager = NeoRuntimeManager(neoModules);

neoModules.neoRuntimeManager.mode.set(neoModules.userData.config.activeMode);

// All the domain-things are now setup, we are ready to run our main program...
import express from 'express';
import https from 'https';
let app = express();
let server = https.createServer({
        key: readFileSync(__configdir + "/certs/privkey.pem"),
        cert: readFileSync(__configdir + "/certs/cert.pem")
    },
    app
);
import {Server} from 'socket.io';
let io = new Server(server);
import SocketIO from './src/SocketIO/index.cjs'
SocketIO(neoModules, io);
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
import http from 'http';
function tryBroadcastSelf() {
    if (neoModules.userData.config.DiscoveryServer.broadcastSelf) {
        let address = neoModules.userData.config.DiscoveryServer.address;
        let port = 443;
        if (address.includes(":")) {
            address = address.split(":");
            port = parseInt(address[1]);
            address = address[0];
        }
        const data = JSON.stringify({
                address: `https://${getNetworkAddress()}:${neoModules.userData.config.HTTP.port}`,
                name: neoModules.userData.config.instanceName,
                widgetaddr: "/#/widget"
            })
        const options = {
            hostname: address,
            port: port,
            path: "/HEY",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-length": data.length
            }
        };
        let req = http.request(options, res => {
            if (res.statusCode != 200) {
                res.on("data", (d) => logger.warning(d.toString()));
            } else {
                // res.on("data", (d) => logger.info(d.toString()));
            }
        });
        req.on("error", (error) => logger.warning(error.toString()))
        req.write(data);
        req.end();
    }
}
setInterval(tryBroadcastSelf, 30000);
tryBroadcastSelf();

// setInterval(() => { logger.notice("I feel FANTASTIC, an I'm still alive. Uptime: " + process.uptime()); }, 600000);
