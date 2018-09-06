let fs = require("fs-extra");
let path = require("path");
let compileRun = require("../compileAndRun");

let listDirsInDir = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory());

class neoRuntime {

    constructor(dirUsrData) {
        this._proc = undefined;
        this._cScript = "None";
        this._cScriptHasExited = false;
        this._dirUsrData = dirUsrData;
    }

    status() {
        return {
            "currentScript": this._cScript,
            "scriptIsExited": this._cScriptHasExited,
            "uptime": process.uptime()
        };
    }

    listScripts() {
        let localScripts = listDirsInDir(this._dirUsrData + "/usrCode/");
        let remoteScripts = listDirsInDir(this._dirUsrData + "/remoteCode/");
        let scriptList = [];

        for (let i = 0; i < localScripts.length; i++) {
            if (fs.existsSync(this._dirUsrData + "/usrCode/" + localScripts[i] + "/script.py")) {
                scriptList.push({
                    "name": localScripts[i],
                    "loc": "local",
                    "path": "local/" + localScripts[i],
                    "lang": "python"
                });
            }
        }

        for (let i = 0; i < remoteScripts.length; i++) {
            if (fs.existsSync(this._dirUsrData + "/remoteCode/" + remoteScripts[i] + "/script.py")) {
                scriptList.push({
                    "name": remoteScripts[i],
                    "loc": "remote",
                    "path": "remote/" + remoteScripts[i],
                    "lang": "python"
                });
            }
        }

        return scriptList;
    }

    selectScript(path) {
        global.log(`Selecting script \"${path}\"`, "event");

        try {
            this._proc.stop();
        } catch (err) {
            global.log("Could not kill process: " + err, "error");
        }

        this._cScript = path;
        path = path.split("/");
        let location = path.splice(0, 1).toString();
        if (location === "local") { path = this._dirUsrData + "/usrCode/" + path.join("/"); }
        if (location === "remote") { path = this._dirUsrData + "/remoteCode/" + path.join("/"); }
        //if (location === "base") { path = this._dirUsrData + "/src/compileAndRun/scripts/" + path.join("/"); } // TODO make this do something

        if (!fs.existsSync(path + "/script.py")) {
            global.log(`No script file found when selecting script with real path \"${path}\"`, "ERROR");
            return;
        }

        fs.removeSync(path + "/build/logs/log");

        this._cScriptHasExited = false;
        this._proc = new compileRun.Python(path, this._dirUsrData);
        this._proc.compileAndRun();

        fs.ensureFileSync(path + "/build/logs/log");
        this._proc.on("stdout::data", (_stdout) => {
            fs.appendFile(path + "/build/logs/log", "\n====stdout====\n" + _stdout.toString().replace(/\n$/, ""));
        });
        this._proc.on("stderr::data", (_stderr) => {
            fs.appendFile(path + "/build/logs/log", "\n====stderr====\n" + _stderr.toString().replace(/\n$/, ""));
        });
        this._proc.on("stderr::end", () => {
            fs.appendFile(path + "/build/logs/log", "\n");
        });
        this._proc.on("stdout::end", () => {
            fs.appendFile(path + "/build/logs/log", "\n");
        });
        this._proc.on("close", (_code) => {
            fs.appendFile(path + "/build/logs/log","\n====close====\nScript exited with code " +  _code.toString());
            this._cScriptHasExited = true;
        });

    }

    stopScript() {
        try {
            this._proc.stop();
            return {
                success: true
            }
        } catch (err) {
            return {
                success: false,
                error: {reason: err}
            };
        }
    }

    deleteScript(path) {
        global.log(`Deleting script \"${path}\"`, "DEBUG");

        let sPath = path.split("/");
        let location = sPath.splice(0, 1).toString();
        if (location === "remote") {
            global.log(`Cannot delete remote script ${path}`, "DEBUG");
            return;
        }
        let absPath = this._dirUsrData + "/usrCode/" + sPath.join("/");

        if (this._cScriptPath == path) {
            try {
                this._proc.stop();
            } catch (err) {
                global.log("Could not kill process: " + err, "error");
            }
        }

        fs.removeSync(absPath);

    }

    createEmptyScript(name) {
        global.log(`Creating script with name \"${name}/"`, "DEBUG");

        let scriptFolderPath = this._dirUsrData + "/usrCode/" + name;
        if (fs.existsSync(scriptFolderPath)) {
            global.log(`A Script with the name \"${name}\" already exists`, "ERROR");
            return;
        }

        fs.ensureDirSync(scriptFolderPath);
        fs.writeFile(scriptFolderPath + "/script.py",
            "import LuxcenaNeo as neo  # Can be imported as LuxcenaNeo as well. but anything else and it will fail...\n\nclass Main(neo.NeoBehaviour):\n\n    def onStart(self):\n        print (\"Script started\")\n\n    def eachSecond(self):\n        print (\"A second has passed\")",
            (err) => {
                if (err) {
                    global.log("Could not create script.py for profile \"" + name + "\"", "ERROR");
                } else {
                    global.log("Script \"" + name + "\" created.", "SUCCESS");
                }
            }
        );

    }

    getScript(scriptPath) {
        let sPath = scriptPath.split("/");
        let location = sPath.splice(0, 1).toString();
        if (location === "remote") {
            global.log(`Cannot edit remote script ${path}`, "DEBUG");
            return;
        }
        let absPath = this._dirUsrData + "/usrCode/" + sPath.join("/");

        if (!fs.existsSync(absPath + "/script.py")) {
            return false;
        }

        return {
            name : sPath[sPath.length - 1],
            files : {
                main : fs.readFileSync(absPath + "/script.py", "utf8")
            }
        };
    }

    saveScript(script, callback) {
        if (!fs.existsSync(this._dirUsrData + "/usrCode/" + script.name )) {
            callback({success: false, error: {reason: "Script file not found"}});
        }
        fs.writeFile(this._dirUsrData + "/usrCode/" + script.name + "/script.py", script.files.main, (err) => {
            if (err) {
                callback({success: false, error: {reason: err}});
            } else {
                callback({success: true});
            }
        });
    }

    getScriptOutput(scriptPath) {
        if (scriptPath != this._cScript) {
            return {
                success: false,
                error: {reason: "This is not the current running script"}
            }
        }

        let path = scriptPath.split("/");
        let location = path.splice(0, 1).toString();
        if (location === "local") { path = this._dirUsrData + "/usrCode/" + path.join("/"); }
        if (location === "remote") { path = this._dirUsrData + "/remoteCode/" + path.join("/"); }

        if (!fs.existsSync(path + "/build/logs/log")){
            return {
                success: false,
                error: {reason: "No log file found"}
            }
        }

        try {
            let output = fs.readFileSync(path + "/build/logs/log", "utf8");
            return {
                success: true,
                output: output
            }
        } catch (err) {
            return {
                success: false,
                error: {reason: err}
            };
        }
    }
}

module.exports = (dirUsrData) => {
    return new neoRuntime(dirUsrData);
};
