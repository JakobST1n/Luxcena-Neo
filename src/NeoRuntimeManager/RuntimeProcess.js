let fs = require("fs-extra");
let spawn = require("child_process");

class RuntimeProcess {

    constructor(_modePath, _onVarChange, _eventEmitter) {
        this.modePath = _modePath;
        this.logfile = `${this.modePath}/mode.log`;
        
        this.stdout = "";
        this.stderr = "";

        this.fl = false;
        this.proc = null;

        this.isRunning = false;
        this.exitCode = null;

        this.variables = {};
        this.globvars  = {};
        this.onVarChange = _onVarChange;
        this.eventEmitter = _eventEmitter;
    }

    start() {
        if (this.isRunning) {
            console.log("PROCESS ALREADY RUNNING");
            return;
        }
        this.isRunning = true;
        this.proc = spawn.spawn(
            "python3", 
            [
                "-u", // This makes us able to get real-time output
                `${__basedir}/NeoRuntime/Runtime/neo_runtime.py`,
                `--strip-config="${__datadir}/config/strip.ini"`,
                `--mode-path="${this.modePath}"`,
                `--mode-entry=script`
            ]
        );

        this.proc.on('error', (err) => {
            console.log(err);
        });

        fs.ensureFileSync(this.logfile);
        this.eventEmitter.emit("proc:start");

        this.proc.stdout.on('data', (_stdout) => {
            let stdout_str = _stdout.toString();
            
            let regex = /{ ":::data:": { (.*) } }/gi;
            let data = stdout_str.match(regex);
            stdout_str = stdout_str.replace(regex, () => "");

            if ((data != null) && (data.length > 0)) {
                try {
                    this.processVarData(data)
                } catch {}
            }

            if (stdout_str.replace("\n", "").replace(" ", "") == "") {
                // In this case, we want to ignore the data.
            } else {
                // stdout_str = stdout_str.replace(/\n$/, "")
                fs.appendFile(this.logfile, "\n====stdout====\n" + stdout_str);
                this.eventEmitter.emit("proc:stdout", stdout_str);
            }
        });

        this.proc.stdout.on('end', () => {
            fs.appendFile(this.logfile, "\n");
        });

        this.proc.stderr.on('data', (_stderr) => {
            // let stderr_str =  _stderr.toString().replace(/\n$/, "")
            let stderr_str =  _stderr.toString()
            fs.appendFile(this.logfile, "\n====stderr====\n" + stderr_str);
            this.eventEmitter.emit("proc:stderr", stderr_str);
        });

        this.proc.stderr.on('end', () => {
            fs.appendFile(this.logfile, "\n");
        });

        this.proc.on('close', (code) => {
            if (code) {
                fs.appendFile(this.logfile, "\n====close====\nScript exited with code " +  code.toString());
            }
            this.eventEmitter.emit("proc:exit", 0);
            this.isRunning = false;
            this.exitCode = code;
        });

    }

    stop(restart=false) {
        try {
            if (restart) {
                this.proc.once("close", () => {
                    setTimeout(() =>  this.start(), 500);
                });
            }
            this.proc.kill("SIGINT");
        } catch (err) {
            console.log(err);
        }
    }

    processVarData(data) {
        data = JSON.parse(data)[":::data:"];
        if (data.hasOwnProperty("globvars")) {
            forEachDiff(data["globvars"], this.globvars, (key, newVal) => {
                this.onVarChange("globvars", key, newVal);
            });
            this.globvars = data["globvars"];
        }
        if (data.hasOwnProperty("variables")) {
            forEachDiff(data["variables"], this.variables, (key, newVal) => {
                this.onVarChange("variables", key, newVal); 
            });
            this.variables = data["variables"];
        }
    }

}

const isObject = v => v && typeof v === 'object';

/**
 * Will call callback on all the differences between the dicts
 */
function forEachDiff(dict1, dict2, callback) {
    for (const key of new Set([...Object.keys(dict1), ...Object.keys(dict2)])) {
        if (isObject(dict1[key]) && isObject(dict2[key])) {
            if (dict1[key].value !== dict2[key].value) {
                callback(key, dict1[key]);
            }
        } else if (dict1[key] !== dict2[key]) {
            if (isObject(dict2[key]) && (dict1[key] == null)) {
                dict2[key].value = null;
                callback(key, dict2[key])
            } else {
                callback(key, dict1[key]);
            }
        }
    }
}

module.exports = RuntimeProcess;
