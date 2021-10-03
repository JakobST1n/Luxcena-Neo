let fs = require("fs-extra");
let spawn = require("child_process");

class RuntimeProcess {

    constructor(_modePath, _eventEmitter) {
        this.modePath = _modePath;
        this.logfile = `${this.modePath}/mode.log`;
        this.errfile = `${this.modePath}/mode.error`;

        this.stdout = "";
        this.stderr = "";

        this.fl = false;
        this.proc = null;

        this.isRunning = false;
        this.exitCode = null;

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
                `${__appdir}/NeoRuntime/Runtime/neo_runtime.py`,
                `--strip-config="${__configdir}/strip.ini"`,
                `--mode-path="${this.modePath}"`,
                `--mode-entry=script`
            ]
        );

        this.proc.on('error', (err) => {
            console.log(err);
        });

        fs.ensureFileSync(this.logfile);
        fs.ensureFileSync(this.errfile);
        this.eventEmitter.emit("proc:start");

        this.proc.stdout.on('data', (_stdout) => {
            let stdout_str = _stdout.toString();
            fs.appendFile(this.logfile, `[${timestamp()}]: ` + stdout_str);
            this.eventEmitter.emit("proc:stdout", stdout_str);
        });

        this.proc.stdout.on('end', () => {
            fs.appendFile(this.logfile, "\n");
        });

        this.proc.stderr.on('data', (_stderr) => {
            let stderr_str =  _stderr.toString();
            fs.appendFile(this.errfile, `[${timestamp()}]: ` + stderr_str);
            this.eventEmitter.emit("proc:stderr", stderr_str);
        });

        this.proc.stderr.on('end', () => {
            fs.appendFile(this.logfile, "\n");
        });

        this.proc.on('close', (code) => {
            if (code) {
                fs.appendFile(this.logfile, `[${timestamp()}]: ` + "Script exited with code " +  code.toString());
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
}

/**
 * Creates and returns a timestamp that can be used in logfiles.
 *
 * @return {string} timestamp
 */
function timestamp() {
    return (new Date()).toISOString();
}

module.exports = RuntimeProcess;
