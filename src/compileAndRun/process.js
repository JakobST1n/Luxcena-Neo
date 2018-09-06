let spawn = require("child_process");

class Process {

    constructor(command, args = []) {
        this.command = command;
        this.args = args;
        this.stdout = "";
        this.stderr = "";
        this.fl = false;
    }

    start() {
        this.proc = spawn.spawn(this.command, this.args);

        this.proc.on('error', (err) => {
            console.log(err);
        });

        this.proc.stdout.on('data', (_stdout) => {
            this.stdout += _stdout;
        });

        this.proc.stdout.on('end', () => {
        });

        this.proc.stderr.on('data', (_stderr) => {
            this.stderr += _stderr;
        });

        this.proc.stderr.on('end', () => {
        });

        this.proc.on('close', (code) => {
        });

    }

}

module.exports = Process;