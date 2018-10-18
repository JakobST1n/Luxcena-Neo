let fse = require("fs-extra");
let express = require("express");
let http = require("http");
let app = express();
let server = http.createServer(app);
let io = require("socket.io").listen(server);

// Firstly we set up all globals, check that the usrData dir exists, if not, we run the setup
let srcDir = __dirname;
let installDir = "/home/pi/luxcena-neo-install/"
if (process.argv.length >= 3) { installDir = process.argv[2]; }
let dataDir = installDir + "/usrData/";
if (!fse.existsSync(dataDir)) { throw new Error("APPDIR not found! Exiting..."); }

// Secondly we setup the logger, and the global access to "runtimeData"; a jSON-file containing some runtimeData
global.runtimeData = new (require("./src/runtimeData"))(dataDir);  // This is a global registry that everyone can access data from, it is saved as JSON to file
global.log = (logString, logLevel) => {
    let broadcastEntry = (rawEntry) => { io.sockets.emit("newLogEntry", rawEntry); };

    fse.ensureFileSync(installDir + "/logs/logger.log");

    let CDate = new Date();
    let timeStr = CDate.getDay() + "." +
        CDate.getMonth() + "." +
        CDate.getFullYear() + " " +
        CDate.getHours().toString() + ":" +
        CDate.getMinutes().toString() + ":" +
        CDate.getSeconds().toString() + ":" +
        CDate.getMilliseconds().toString();

    try {
        let logFileText = `\n[${timeStr}] ${logLevel.toUpperCase()} ${logString}`;
        fse.appendFile(installDir + "/logs/logger.log", logFileText, (err) => {
           if (err) throw err;
        });
    } catch (e) {
        let logFileText = `\n[${timeStr}] ERROR ${logString}; Additionally, something went wrong with the logger.`;
        fse.appendFile(installDir + "/logs/logger.log", logFileText, (err) => {
            if (err) throw err;
        });
    }
    broadcastEntry({
       time: timeStr,
       type: logLevel.toUpperCase(),
       details: logString
    });
};

global.log("Starting Luxcena-Neo...", "event");

// Generate all user-folders
fse.ensureDirSync(dataDir + "/");
fse.ensureDirSync(dataDir + "/config/");
fse.ensureDirSync(dataDir + "/usrCode/");
fse.ensureDirSync(dataDir + "/remoteCode/");
// Generate config-files
if (!fse.existsSync(dataDir + "/config/versionChecker.json")) {
    fse.writeJsonSync(dataDir + "/config/versionChecker.json", {
      "branch": "dev",
      "checkInterval": 5
    })
}
if (!fse.existsSync(dataDir + "/config/strip.json")) {
    fse.writeJsonSync(dataDir + "/config/strip.json", {
        "segments": [9, 8, 8, 8, 8, 8, 4],
        "segmentConfiguration": "snake",
        "led_pin": 18,
        "led_freq_hz": 800000,
        "led_dma": 10,
        "led_invert": false,
        "led_channel": 0
    })
}


// All the domain-things are now setup, we are ready to run our main program...
let versionChecker = require("./src/versionChecker")(dataDir + "/config/versionChecker.json", srcDir + "/package.json");
let neoRuntime = require("./src/neoRuntime")(dataDir);

// Setup static assets
app.use(express.static("public/assets"));
// Gave up using webpack to compile monaco, therefore, loading the already-compiled code. Probably the slowest way possible, but so it goes.
app.use("/monaco-editor", express.static("node_modules/monaco-editor/"));
// Setup all our custom middleware
app.use(require("./src/domain/middleware") ({
    srcDir: __dirname
}));

// SocketIo
io.on("connection", (client) => {

    client.on("UpdaterStatus", () => {
        client.emit("updaterStatus", global.runtimeData.get("udpaterMessage"));
    });

    client.on("GetScripts", () => {
        client.emit("updatedScriptList", neoRuntime.listScripts());
        client.emit("callback", {
            success: true,
            error: {},
            request: "GetScripts",
            scriptList: neoRuntime.listScripts()
        });
    });

    client.on("SelectScript", (arguments) => {
        neoRuntime.selectScript(arguments["scriptPath"]);
        client.emit("callback", {
            success: true,
            error: {},
            request: "SelectScript"
        });
    });

    client.on("DeleteScript", (arguments) => {
        neoRuntime.deleteScript(arguments["scriptPath"]);
        client.emit("callback", {
            success: true,
            error: {},
            request: "DeleteScript"
        });
    });

    client.on("CreateEmptyScript", (arguments) => {
        neoRuntime.createEmptyScript(arguments["scriptName"]);
        client.emit("callback", {
            success: true,
            error: {},
            request: "CreateEmptyScript"
        });
    });

    client.on("NeoIde_GetScript", (arguments) => {
        let script = neoRuntime.getScript(arguments["scriptPath"]);
        if (!script) {
            client.emit("callback", {
                success: false,
                error: {},
                request: "NeoIde_GetScript"
            });
        } else {
            client.emit("callback", {
                success: true,
                error: {},
                request: "NeoIde_GetScript",
                data: {
                    script: script
                }
            });
        }
    });

    client.on("NeoIde_RunScript", (arguments) => {
        neoRuntime.selectScript(arguments["scriptPath"]);
    });

    client.on("NeoIde_StopScript", (arguments) => {
        let res = neoRuntime.stopScript();
        if (!res.success) {
            client.emit("callback", {
                success: false,
                error: res.error,
                request: "NeoIde_StopScript"
            })
        } else {
            client.emit("callback", {
                success: true,
                error: {},
                request: "NeoIde_StopScript"
            });
        }
    });

    client.on("NeoIde_GetScriptOutput", (arguments) => {
        let res = neoRuntime.getScriptOutput(arguments["scriptPath"]);
        if (res.success) {
            client.emit("callback", {
                success: true,
                request: "NeoIde_GetScriptOutput",
                output: res.output
            })
        } else {
            client.emit("callback", {
                success: false,
                request: "NeoIde_GetScriptOutput",
                error: res.error
            })
        }
    });

    client.on("NeoIde_SaveScript", (arguments) => {
        neoRuntime.saveScript(arguments.script, (res) => {
            if (res.success) {
                client.emit("callback", {
                    success : true,
                    error: {},
                    request: "NeoIde_SaveScript"
                });
            } else {
                client.emit("callback", {
                    success : false,
                    error: res.error,
                    request: "NeoIde_SaveScript"
                });
            }
        });
    });

    client.on("GetLog", (arguments) => {
        let filter = null;
        let reqEntryN = 10;
        if (arguments.filter !== undefined) { filter = arguments.filter.split(' ').map(x => x.toUpperCase()); }
        if (arguments.entryN !== undefined) { reqEntryN = arguments.entryN; }


        fse.readFile(installDir + "/logs/logger.log", 'utf8', function (err, rawLog) {
            if (err) { return global.log(err, "error"); }

            let logEntries = rawLog.split('\n').filter(n => n);
            let collectedEntryN = 0;
            let collectedEntries = [];
            for (let i = logEntries.length - 1; i >= 0; i--) {
                let entry = logEntries[i];
                if (entry === "") { continue; }

                let index1 = entry.indexOf("]");
                let time = entry.substring(1, index1 - 1);
                let index2 = entry.indexOf(" ", index1 + 2);
                let type = entry.substring(index1 + 2, index2);
                let details = entry.substring(index2);

                if ( (filter == null) || filter.includes(type) ) {
                    collectedEntries.push({
                        time : time,
                        type : type.toUpperCase(),
                        details : details
                    });

                    if ((collectedEntryN++) >= reqEntryN-1) { break; }
                }

            }

            client.emit("lastLogEntries", collectedEntries);
        });

    });

    client.on("GetGeneralInfo", () => {
        client.emit("generalInfo", neoRuntime.status());
    })

});

server.listen(8080,  () => {
    let host = server.address().address;
    let port = server.address().port;
    global.log(`Webserver now listening at *:${port}`, "success");
});

//setInterval(() => { global.log("I feel FANTASTIC, an I'm still alive. Uptime: " + neoRuntime.uptime(), "debug"); }, 5000);
