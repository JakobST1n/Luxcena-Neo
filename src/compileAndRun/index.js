let EventEmitter = require('events');
let fse = require("fs-extra");
let Process = require("./process");
let pythonSupportFiles = __dirname + "/pythonSupportFiles/";

class Python extends EventEmitter {

    constructor(profileFolder, usrDataFolder) {
        super();
        this.profileFolder = profileFolder;
        this.usrDataFolder = usrDataFolder;

        this.stdout = "";
        this.stderr = "";
    }

    status() {
        return {};
    }

    compile() {
        try {
            fse.removeSync(this.profileFolder + "/build");
            fse.copySync(pythonSupportFiles, this.profileFolder + "/build/");
            fse.copySync(this.profileFolder + "/script.py", this.profileFolder + "/build/script.py");
        } catch (err) {
            console.log(err);
        }
    }

    run() {
        // Setup paths and commands
        let entryPath = this.profileFolder + "/build/entry.py";

        // Spawn the new process
        this.pyProc = new Process("python", [
            "-u",               // This makes us able to get real-time output
            entryPath,          // This is where the entry-point is located
            this.usrDataFolder  // This is required for the python-script to now where our config-files are
        ]);
        this.pyProc.start();

        this.pyProc.proc.stdout.on("data", (_stdout) => {
            this.emit("stdout::data", "" + _stdout);
        });
        this.pyProc.proc.stdout.on("end", () => {
            this.emit("stdout::end");
        });
        this.pyProc.proc.stderr.on("data", (_stderr) => {
            this.emit("stderr::data", _stderr);
        });
        this.pyProc.proc.stderr.on("end", () => {
            this.emit("stderr:end");
        });
        this.pyProc.proc.on("close", (_code) => {
            this.emit("close", _code);
        });

    }

    compileAndRun() {
        this.compile();
        this.run();
    }

    stop() {
        this.pyProc.proc.kill("SIGINT");
    }

}

module.exports = {
    Python: Python,
    Process: Process
};
