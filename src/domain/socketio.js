let logger = require(__basedir + "/src/logger");
var CryptoJS = require("crypto-js");

class AuthorisedClient {

    constructor(client) {
        this.client = client;
        this.clientAddress = client.handshake.headers.host;
        this.clientID = client.id;

        logger.access(`SOCKET Client (${this.clientID}) connected from '${this.clientAddress}'`);

        this.client.on("disconnect", () => {
            logger.access(`SOCKET Client (${this.clientID}) disconnected: '${this.clientAddress}'`);
        });
    }

    postAuthorize() {

        /* NeoRuntime
         */
        this.client.on("NeoRuntime/status", (fn) => {
            fn(true, this.neoRuntimeInstance.status());
        });
        this.client.on("NeoRuntime/Script/Create", (scriptPath, fn) => {
            this.neoRuntimeInstance.createEmptyScript(scriptPath, (resMsg, res) => {
                if (res) {
                    fn(true);
                } else {
                    fn(false, resMsg);
                }
            });
        });
        this.client.on("NeoRuntime/Script/Delete", (scriptPath, fn) => {
            // TODO: Extend neoRuntime function for deleting to return the reason on error
            let res = this.neoRuntimeInstance.deleteScript(scriptPath);
            if (res) {
                fn(true);
            } else {
                fn(false);
            }
        });
        this.client.on("NeoRuntime/Script/Select", (scriptPath, fn) => {
            this.neoRuntimeInstance.selectScript(scriptPath);
        });
        this.client.on("NeoRuntime/Scripts/get", (scriptPath, fn) => {
            fn(true, neoRuntime.listScripts());
        });

        /* NeoIDE
         * Most of this is really NeoRuntime things,
         * but to differentiate for the frontend,
         * we have it as a seperate path
         */
         this.client.on("NeoIDE/Script/get", (scriptPath, fn) => {
             let script = this.neoRuntimeInstance.getScript(scriptPath);
             if (script) {
                 fn(true, script);
             } else {
                 fn(false);
             }
         });
         this.client.on("NeoIDE/Script/run", (scriptPath, fn) => {
             this.neoRuntimeInstance.selectScript(scriptPath);
         });
         this.client.on("NeoIDE/Script/stop", (fn) => {
             let res = this.neoRuntimeInstance.stopScript();
             if (res.success) {
                 fn(true);
             } else {
                 fn(false, res.error);
             }
         });
         this.client.on("NeoIDE/Script/write", (script, fn) => {
             this.neoRuntimeInstance.saveScript(script, (res) => {
                 if (res.success) {
                     fn(true);
                 } else {
                     fn(false, res.error);
                 }
             });
         });
         this.client.on("NeoIDE/Script/Output/get", (scriptPath, fn) => {
             let res = this.neoRuntimeInstance.getScriptOutput(scriptPath);
             if (res.success) {
                 fn(true, res.output);
             } else {
                 fn(false, res.error);
             }
         });

     }

}

class SocketIO {

    constructor(neoRuntimeInstance, io) {
        this.neoRuntimeInstance = neoRuntimeInstance;
        this.authorisedClients = {};
        this.validTokens = {};

        io.on("connection", (client) => {

            client.on("authenticateToken", (token, fn) => {
                if (this.validTokens[client.handshake.headers.host] == token) {
                    logger.access("SOCKET Client authorised...");
                    this.authorisedClients[client.id] = new AuthorisedClient(client);
                    fn(true);
                } else {
                    fn(false);
                }
            });

            client.on("authenticate", (username, password, fn) => {
                if (password == "test") {
                    logger.access("SOCKET Client authenticated...");
                    let token = this.createToken(client);
                    logger.debug(`SOCKET token '${token}'`);
                    this.validTokens[client.handshake.headers.host] = token;
                    fn(token);
                } else {
                    fn(false);
                }

            });

        });
    }

    createToken(client) {
        let time = Date.now().toString();
        let host = client.handshake.headers.host;
        return (CryptoJS.SHA256(`${host}${time}`).toString());
    }

}


module.exports = (neoRuntimeInstance, io) => {
    return new SocketIO(neoRuntimeInstance, io);
};


// SocketIo
/*io.on("connection", (client) => {

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

});*/
