let fse = require("fs-extra");

// Firstly we set up all globals, check that the usrData dir exists, if not, we run the setup
let userDir = "/home/lux-neo/"
if (process.argv.length >= 3) { userDir = process.argv[2]; }
if (!fse.existsSync(userDir + "/userdata/")) {
    console.log(`CRITICAL UserDir not found '${userDir}'! Exiting...`);
    process.exit(1);
}

// Global path variables
global.__basedir = __dirname + "/";
global.__datadir = userDir + "/userdata/";
global.__logdir = userDir + "/logs/";

// Secondly we setup the logger,
let logger = require("./src/logger");
logger.info("Starting Luxcena-Neo...");

// Ensure our user-dirs
require("./src/domain/ensureDirs")();

let versionChecker = require("./src/versionChecker")();
let neoRuntime = require("./src/neoRuntime")();

// All the domain-things are now setup, we are ready to run our main program...
let certMon = require("./src/certMon")();
let express = require("express");
let https = require("https");
let app = express();
let server = https.createServer({
        key: fse.readFileSync(__datadir + "/config/certs/privkey.pem"),
        cert: fse.readFileSync(__datadir + "/config/certs/cert.pem")
    },
    app
);
let io = require("socket.io").listen(server);
require("./src/domain/socketio")(neoRuntime, io);
require("./src/domain/middleware")(app);

let port = JSON.parse(fse.readFileSync(__datadir + "/config/https.json"))["port"];
server.listen(port,  () => {
    let host = server.address().address;
    let port = server.address().port;
    logger.info(`Webserver now listening at *:${port}`);
});

//setInterval(() => { global.log("I feel FANTASTIC, an I'm still alive. Uptime: " + neoRuntime.uptime(), "debug"); }, 5000);
