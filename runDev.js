let fs = require("fs");
let chokidar = require('chokidar');
let blessed = require('blessed');
let contrib = require('blessed-contrib');
let colors = require('colors');
let { spawn } = require("child_process");
Tail = require('tail').Tail;


/**
 * CONFIG
 */

webpackLaunchCommand = ["npm", "run", "dev:frontend"];
nodejsLaunchCommand  = ["node", "app.js", `"${__dirname}/tmp"`];
mkdocsLaunchCommand  = ["mkdocs", "build"];

nodejsFileWatcherPaths = [
    "app.js",
    "src/"
];
nodejsFileWatcherIgnore = [
    ".log"
];

mkdocsFileWatcherPaths = [
    "docs/",
    "mkdocs.yml"
];
mkdocsFileWatcherIgnore = [

];
/*
 * END OF CONFIG
 */

class watcher {

    constructor(include, ignore, out, label, callback) {
        this.include = include;
        this.ignore = ignore;
        this.out = out;
        this.label = label;
        this.callback = callback;

        this.fswatcher = this.setup(() => {
            this.ready()
        })
    }

    setup(callback) {
        return chokidar.watch(this.include).on("ready", () => {
            callback();
        })
    }

    ready() {
        this.out.log(colors.magenta(this.label) + ": Watching files...");
        this.fswatcher
            .on("add", this.eventHandler.bind(this))
            .on("change", this.eventHandler.bind(this))
            .on("unlink", this.eventHandler.bind(this))
            .on("addDir", this.eventHandler.bind(this))
            .on("unlinkDir", this.eventHandler.bind(this));
    }

    eventHandler(path) {
        for (let i=0; i < this.ignore.length; i++) {
            if (path.includes(this.ignore[i])) {
                this.out.log(colors.magenta(this.label) + ": " + colors.red("IGNORED") + ` ${path}`);
                return;
            }
        }

        this.out.log(colors.magenta(this.label) + `: ${path}`);
        this.callback();
    }

    exit() {
        this.fswatcher.close();
    }

}

// This is obv. not good OOP, but it is easy...
class runDevApp {

    constructor(webpackLaunchCommand,
                    nodejsLaunchCommand,
                    mkdocsLaunchCommand,
                    nodejsFileWatcherPaths,
                    nodejsFileWatcherIgnore,
                    mkdocsFileWatcherPaths,
                    mkdocsFileWatcherIgnore
                ) {
        this.processList = [];
        this.nodeRestarting = false;

        this.ensureUserdirectories();
        this.setupBlessed();

        this.webpackProcessPID = this.spawnNewProcess(webpackLaunchCommand, this.webpackLog);
        this.nodejsPID = this.spawnNewProcess(nodejsLaunchCommand, this.nodeLog);

        this.docsWatcher = new watcher(
            mkdocsFileWatcherPaths,
            mkdocsFileWatcherIgnore,
            this.fswatchLog, "DOCS",
            () => {
                this.spawnNewProcess(mkdocsLaunchCommand, this.mkdocsLog);
            }
        );

        this.nodeWatcher = new watcher(
            nodejsFileWatcherPaths,
            nodejsFileWatcherIgnore,
            this.fswatchLog, "NODE",
            () => {
                if (!this.nodeRestarting) {
                    this.nodeRestarting = true;

                    if (this.processList.hasOwnProperty(this.nodejsPID)) {
                        this.nodeLog.log("Restarting node...");
                        this.processList[this.nodejsPID][1].kill(1);
                        this.scriptLog.log(colors.magenta(this.nodejsPID) + ": " + colors.red("Kill sendt"));
                    } else {
                        this.nodeLog.log("Starting node...");
                    }

                    var exitWait = setInterval(() => {
                        if (!this.processList.hasOwnProperty(this.nodejsPID)) {
                            clearInterval(exitWait);
                            this.nodejsPID = this.spawnNewProcess(
                                nodejsLaunchCommand,
                                this.nodeLog
                            );
                            this.nodeRestarting = false;
                        }
                    }, 100);
                    this.scriptLog.log(colors.magenta(this.nodejsPID) + ": Waiting till exit");
            }
        });

    }

    ensureUserdirectories() {
        // Generate all the temporary userdata-folder nececatty for the main node app
        if (!fs.existsSync("./tmp")) {
            fs.mkdirSync("./tmp")
        }
        if (!fs.existsSync("./tmp/userdata")) {
            fs.mkdirSync("./tmp/userdata")
        }
        if (!fs.existsSync("./tmp")) {
            fs.mkdirSync("./tmp/userdata")
        }
    }

    setupBlessed() {
        this.screen = blessed.screen();
        this.grid = new contrib.grid({rows: 12, cols: 12, screen: this.screen});

        this.logDefaultOptions = {
            fg: "green",
            selectedFg: "green",
            height: '100%',
            scrollable: true,
            alwaysScroll: true,
            scrollbar: {
                ch: ' ',
                inverse: true
            },
            mouse: true,
        };

        this.fswatchLog = this.grid.set(0, 2, 4, 3, blessed.log,
            Object.assign({}, this.logDefaultOptions, {
                label: 'Watcher',
        }));
        this.scriptLog = this.grid.set(2, 0, 6, 2, blessed.log,
            Object.assign({}, this.logDefaultOptions, {
                label: 'Actions',
        }));
        this.nodeLog = this.grid.set(6, 5, 6, 7, blessed.log,
            Object.assign({}, this.logDefaultOptions, {
            label: 'Node',
        }));
        this.mkdocsLog = this.grid.set(4, 2, 8, 3, blessed.log,
            Object.assign({}, this.logDefaultOptions, {
                label: 'MkDocs',
        }));
        this.webpackLog = this.grid.set(0, 5, 6, 7, blessed.log,
            Object.assign({}, this.logDefaultOptions, {
                label: 'Webpack',
                border: {type: "line", fg: "yellow"}
        }));
        this.activeProcessesTable = this.grid.set(8, 0, 4, 2, contrib.table, {
            keys: true,
            fg: 'green',
            selectedFg: 'black',
            selectedBg: 'green',
            interactive: true,
            label: 'Active Processes',
            width: '100%',
            height: '100%',
            border: {type: "line", fg: "cyan"},
            columnSpacing: 2, //in chars
            columnWidth: [6, 20] /*in chars*/
        });
        this.processCount = this.grid.set(0, 0, 2, 2, contrib.lcd, {
            segmentWidth: 0.1,
            segmentInterval: 0.06,
            strokeWidth: 0.2,
            elements: 3,
            display: 0,
            elementSpacing: 4,
            elementPadding: 0,
            color: "green",
            label: "Process count"
        });

        this.activeProcessesTable.focus();

        this.screen.key(['escape', 'q', 'C-c', "s"], function(ch, key) {
            this.exit();
        }.bind(this));
    }

    updateTableOfProcesses() {
        let newTableData = [];
        let that = this;

        Object.keys(this.processList).forEach(function(key, index) {
            newTableData.push( [key, that.processList[key][0]] );
        }, this.processList);

        this.activeProcessesTable.setData({
            headers:[" PID", " Command"],
            data: newTableData
        });

        let processN = Object.keys(this.processList).length;
        if (processN > 2) {
            this.processCount.setOptions({color: "yellow"});
        } else if (processN < 1) {
            this.processCount.setOptions({color: "green"});
        } else {
            this.processCount.setOptions({color: "blue"});
        }
        this.processCount.setDisplay(processN);

        this.screen.render()
    }

    logProcessOutput(data, out) {
        let lines = data.toString().split(/\r?\n/);
        for (let i=0; i < lines.length; i++) {
            out.log(lines[i].replace("\n", ""));
        }
    }

    spawnNewProcess(args, out) {
        // Spawn the new process with "unbuffer"
        const proc = spawn("unbuffer", args, {
            shell: true,
            cwd: __dirname
        });

        proc.stdout.on("data", (data) => {
            this.logProcessOutput(data, out)
        });
        proc.stderr.on("data", (data) => {
            this.logProcessOutput(data, out)
        });
        proc.on("error", () => {
            out.log(colors.red("Failed to start node..."));
        });
        proc.on("exit", (code) => {
            out.log(colors.yellow("Childprocess unresponsive..."));
        });
        proc.on("close", (code) => {

            if (code != undefined) {
                out.log(colors.red("Process exited with code ") + colors.yellow(code.toString()));
                this.scriptLog.log(colors.magenta(proc.pid) + ":" + colors.red(" Exited with ") + colors.yellow(code));
            } else {
                out.log(colors.red("Process exited without code"));
                this.scriptLog.log(colors.magenta(proc.pid) + ":" + colors.red(" Exited no code"));
            }

            delete this.processList[proc.pid.toString()];
            this.updateTableOfProcesses()
        });

        this.processList[proc.pid.toString()] = [args.join(" "), proc];
        this.scriptLog.log(colors.magenta(proc.pid) + `: New process`);
        process.stdout.write("\x07");

        this.updateTableOfProcesses();
        return proc.pid;
    }

    exit() {
        // Stage one : Stop watchers
        this.docsWatcher.exit();
        this.nodeWatcher.exit();

        // Stage two : Send kill signal to all child-processes
        Object.keys(this.processList).forEach((key, index) => {
            this.scriptLog.log(colors.magenta(key) + ":" + colors.red(" KILL SENDT"));
            this.processList[key][1].kill(1);
        }, this.processList);

        // Stage three : wait a second before starting to check if all
        //               process' are dead.
        setTimeout(() => {
            var exitWait = setInterval(() => {
                this.screen.render();  // Render each time to make sure updates are displayed
                if (this.processList.length > 0) {
                    clearInterval(exitWait),
                    this.scriptLog.log("");
                    this.scriptLog.log("Process' dead");
                    this.scriptLog.log("Exiting...");
                    this.processCount.setOptions({color: "green"});
                    this.processCount.setDisplay("EXIT");
                    this.screen.render();
                    setTimeout(() => {
                        process.exit(0)
                    }, 3000);
                }
            }, 100);
        }, 1000);
    }

}


let app = new runDevApp(
    webpackLaunchCommand,
    nodejsLaunchCommand,
    mkdocsLaunchCommand,
    nodejsFileWatcherPaths,
    nodejsFileWatcherIgnore,
    mkdocsFileWatcherPaths,
    mkdocsFileWatcherIgnore
);
