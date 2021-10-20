let fs = require("fs-extra");
const fsPromises = fs.promises;
let url = require("url");
let request = require('request');
const spawn = require('child_process').spawn;
const EventEmitter = require('events')
let logger = require(__appdir + "/src/Logger");

let neoModules;

/**
 * This just tests if the current appdir is the "default" location
 */
function isInstalledInDefaultLocation() {
    return (__appdir == "/opt/luxcena-neo");
}

/**
 * Function that will create a new empty folder at the path, with the prefix
 * it will add a number at the end if something already exists,
 */
function createUniqueDir(path, prefix) {
    fs.ensureDirSync(path);
    let fn = `${path}/${prefix}`;
    let i = 0;
    let cFn = fn;
    while (true) {
        if (fs.existsSync(cFn)) {
            i++;
            cFn = `${fn}.${i}`;
            continue;
        }
        fs.ensureDirSync(cFn);
        return cFn;
    }
}

class Updater {

    constructor() {
        this.updating = false;
        this.step = null;
        this.command = null;
        this.event = new EventEmitter();
        
        this.updatelog = [];
    }

    setStep(cStep) {
        this.step = cStep;
        this.event.emit("step", cStep);
        this.updatelog.push(`- ${cStep}`);
        logger.info(`Updater: ${cStep}`);
    }

    setCommand(cCommand) {
        this.command = cCommand;
        this.event.emit("command", cCommand);
        this.updatelog.push(`> ${cCommand}`);
        logger.info(`Updater: (${cCommand})`);
    }

    async forceUpdate() {
        this.updatelog = [];
        this.step = null;
        this.command = null;
        if (!isInstalledInDefaultLocation()) {
            return {success: false, reason: "not installed in default location", detail: __appdir};
        }
        this.updating = true;
        this.event.emit("start");
    
        neoModules.neoRuntimeManager.stopMode();
        let updatedir = null;
        let backupdir = null;
        try {
            // Download update
            this.setStep("Downloading update");
            this.setCommand("Create updatedir");
            updatedir = createUniqueDir("/tmp", "luxcena-neo.update");
            await this.downloadUpdate(updatedir);
    
            // Create backup
            this.setStep("Creating backup");
            this.setCommand("Create backupdir");
            backupdir = createUniqueDir("/var/luxcena-neo/backups", "backup");
            this.setCommand(`Copy ${__appdir} into ${backupdir}`);
            await fs.copySync(__appdir, backupdir);
    
            // Install update
            this.setStep("Installing update");
            this.setCommand(`Copy ${updatedir} into /opt/luxcena-neo`);
            await fs.copySync(updatedir, __appdir);
    
            // Install dependencies
            this.setStep("Installing dependencies");
            await this.installDependencies();
    
            // Create python virtualenv
            this.setStep("Making virtualenv");
            await this.makeVirtualenv();
    
            // Build source code
            this.setStep("Building source");
            this.build();
    
            // Restart self, systemd service restart policy will start us up again.
            this.setStep("Stopping luxcena neo service in the hope that systemd will restart it.");
            this.command("process.exit(0)");
            process.exit(0);
    
        } catch (e) {
            logger.crit(`Updater failed miserably...`);
            logger.crit(e);

            let logText;
            if (e.hasOwnProperty("code") && e.hasOwnProperty("out") && e.hasOwnProperty("err")) {
                logText = "Command failed with code " + e.code + "STDOUT: " + e.out + " STDERR: " + e.err;
            } else {
                logText = e.toString();
            }
            this.updatelog.push(logText);

            // Restore here

            this.event.emit("error", this.updatelog);
            neoModules.neoRuntimeManager.startMode();
        }
        this.updating = false;
        this.event.emit("end");
    }

    /**
     * Spawn a new command, return a promise.
     */
    run(cmd, opts) {
        this.setCommand(`${cmd} ` + opts.join(" "));
        return new Promise(function(resolve, reject) {
            let child = spawn(cmd, opts);
    
            let stdout = "";
            let stderr = "";
    
            child.on('exit', (code, sig) => {
                if (code == 0) {
                    resolve({
                        code: code,
                        out: stdout,
                        err: stderr
                    });
                } else {
                    reject({
                        code: code,
                        out: stdout,
                        err: stderr
                    });
                }
            });
            child.stdout.on('data', data => {
                stdout += data.toString();
            });
            child.stderr.on('data', data => {
                stderr += data.toString();
            });
        });
    }

    /**
     * Determine the currently used remote and branch, and download the newest commit
     * into the temporary folder
     */
    async downloadUpdate(tmpdir) {
        let url = (await this.run(`git`, ["-C", __appdir, "remote", "get-url", "origin"])).out.replace("\n","");
        let branch = (await this.run(`git`, ["-C", __appdir, "rev-parse", "--abbrev-ref", "HEAD"])).out.replace("\n","");
        await this.run(`git`, ["clone", "-b", branch, url, tmpdir]);
    }

    async installDependencies() {
        // So, the server is running as root, that means we can just do this.
        // we shouldn't, but, anyway.
        await this.run("sh", ["-c", "wget -qO- https://deb.nodesource.com/setup_14.x | bash -"]);
        await this.run("apt", ["-qy", "install", "nodejs", "python3-pip"]);
        await this.run("pip3", ["install", "virtualenv"]);
        await this.run("sh", ["-c", `export NODE_ENV=development; npm --prefix \"${__appdir}\" install \"${__appdir}\"`]);
    }

    async makeVirtualenv() {
        this.setCommand("Deleting old virtualenv");
        if (fs.existsSync(`${__appdir}/NeoRuntime/Runtime/venv`)) {
            fs.unlinkSync(`${__appdir}/NeoRuntime/Runtime/venv`);
        }

        await this.run("virtualenv", ["-p", "/usr/bin/python3", `${__appdir}/NeoRuntime/Runtime/venv`]);
        await this.run("sh", ["-c", `source ${__appdir}/NeoRuntime/Runtime/venv/bin/activate && pip install rpi_ws281x`]);
    }

    async build() {
        await this.run("sh", ["-c", `npm --prefix \"${__appdir}\" run build:frontend`]);
        await this.run("sh", ["-c", `npm --prefix \"${__appdir}\" run build:fontawesome`]);
        await this.run("sh", ["-c", `npm --prefix \"${__appdir}\" run build:dialog-polyfill`]);
    }

    async installSystemdService() {
        this.setCommand("Deleting old systemd service");
        fs.unlinkSync("/etc/systemd/system/luxcena-neo.service");
        this.setCommand("Installing new systemd service");
        fs.copySync("/opt/luxcena-neo/bin/luxcena-neo.service", "/etc/systemd/system/luxcena-neo.service");
        await this.run("systemctl", ["daemon-reload"]);
        await this.run("systemctl", ["enable", "luxcena-neo"]);
    }   

}

class VersionChecker {

    constructor() {
        this.CPackageJson = JSON.parse(fs.readFileSync(__appdir + "/package.json"));
        this.version = this.CPackageJson["version"];
        this.repoLink = this.CPackageJson["repository"]["url"];

        this.checkFrequency = neoModules.userData.config.SelfUpdater.checkVersionInterval * 86400000;  // Takes in days.
        this.repoBranch = neoModules.userData.config.SelfUpdater.branch;

        this.remotePackageJSON = "https://raw.githubusercontent.com" + url.parse(this.repoLink).pathname + "/" + this.repoBranch + "/package.json";

        this.newVersion = false;
        this.newestVersion = this.checkVersion(this.remotePackageJSON);

        this.updateChecker = setInterval(() => {
            let newVersion = this.checkVersion(this.remotePackageJSON);
        }, this.checkFrequency);

        this.updater = new Updater();
    }

    checkVersion() {
        request.get(this.remotePackageJSON, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let remotePackageJSON = JSON.parse(body);
                let newestVersion = remotePackageJSON["version"];
                if (newestVersion != this.version) {
                    logger.notice("A new version is available on \"" + this.repoBranch + "\" (v" + this.version + ")");
                    this.newVersion = true;
                } else {
                    logger.info(`Running newest version (${newestVersion})`);
                    this.newVersion = false;
                }
                this.newestVersion = newestVersion;
            } else {
                logger.notice("Could not find latest version! Please check you internet connection.");
            }
        });
    }

    VersionIsNewerThan(check, current) {
        let checkParts = check.split(".");
        let currentParts = current.split(".");
        let lCheckParts = checkParts.length;
        let lCurrentParts = currentParts.length;

        for (let i = 0; i < lCheckParts; i++) {
            if (i >= lCurrentParts) { return true; }
            if (Number (checkParts[i]) > Number (currentParts[i])) { return true; }
            if (Number (checkParts[i]) < Number (currentParts[i])) { return false; }
        }
        return false;
    }

}
 
module.exports = (_neoModules) => {
    neoModules = _neoModules;
    return new VersionChecker();
};