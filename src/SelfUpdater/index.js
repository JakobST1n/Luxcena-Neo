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

/**
 * Spawn a command, and return a promise which resolves/rejects when that
 * command ends.
 */
function promiseSpawn(cmd, args) {
    return new Promise(function(resolve, reject) {
        let child = spawn(cmd, args);

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

class Updater {

    constructor() {
        this.updating = false;
        this.step = null;
        this.command = null;
        this.event = new EventEmitter();

        this.updatedir = null;
        this.backupdir = null;
        this.backupcomplete = false;
        
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
        this.updatedir = null;
        this.backupdir = null;
        this.backupcomplete = false;

        if (!isInstalledInDefaultLocation()) {
            return {success: false, reason: "not installed in default location", detail: __appdir};
        }
        this.updating = true;
        this.event.emit("start");
    
        neoModules.neoRuntimeManager.stopMode();

        try {
            // Download update
            this.setStep("Downloading update (1/8)");
            this.setCommand("Create updatedir");
            this.updatedir = createUniqueDir("/tmp", "luxcena-neo.update");
            await this.downloadUpdate(this.updatedir);
    
            // Create backup
            this.setStep("Creating backup (2/8)");
            this.setCommand("Create backupdir");
            this.backupdir = createUniqueDir("/var/luxcena-neo/backups", "backup");
            this.setCommand(`Copy ${__appdir} into ${this.backupdir}`);
            await fs.copy(__appdir, this.backupdir);
            this.backupcomplete = true;
    
            // Install update
            this.setStep("Installing update (3/8)");
            this.setCommand(`Copy ${this.updatedir} into /opt/luxcena-neo`);
            await fs.copy(this.updatedir, __appdir);
    
            // Install dependencies
            this.setStep("Installing dependencies (4/8)");
            await this.installDependencies();
    
            // Create python virtualenv
            this.setStep("Making virtualenv (5/8)");
            await this.makeVirtualenv();
    
            // Build source code
            this.setStep("Building source (6/8)");
            await this.build();

            // Cleanup
            this.setStep("Cleaning up (7/8)");
            await this.cleanup();
    
            // Restart self, systemd service restart policy will start us up again.
            this.setStep("Stopping luxcena neo service in the hope that systemd will restart it. (8/8)");
            this.setCommand("EXIT");
            this.updating = false;
            this.event.emit("end");
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

            try {
                if (this.backupcomplete && (this.backupdir != null)) {
                    this.setStep("Restoring backup");
                    this.setCommand(`Copy ${this.backupdir} into /opt/luxcena-neo`);
                    await fs.copy(this.backupdir, __appdir);
                }
                this.setStep("Cleaning up");
                await this.cleanup();
            } catch (e) {
                this.updatelog.push(e.toString());
                console.log(e);
            }

            this.event.emit("error", this.updatelog);
            neoModules.neoRuntimeManager.startMode();
        }
    }

    /**
     * Spawn a new command, return a promise.
     */
    async run(cmd, opts) {
        this.setCommand(`${cmd} ` + opts.join(" "));
        return await promiseSpawn(cmd, opts);
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
            await fs.remove(`${__appdir}/NeoRuntime/Runtime/venv`);
        }

        await this.run("virtualenv", ["-p", "/usr/bin/python3", `${__appdir}/NeoRuntime/Runtime/venv`]);
        await this.run("sh", ["-c", `. ${__appdir}/NeoRuntime/Runtime/venv/bin/activate && pip install rpi_ws281x`]);
    }

    async build() {
        await this.run("sh", ["-c", `npm --prefix \"${__appdir}\" run build:frontend`]);
        await this.run("sh", ["-c", `npm --prefix \"${__appdir}\" run build:fontawesome`]);
        await this.run("sh", ["-c", `npm --prefix \"${__appdir}\" run build:dialog-polyfill`]);
    }

    async installSystemdService() {
        this.setCommand("Deleting old systemd service");
        await fs.remove("/etc/systemd/system/luxcena-neo.service");
        this.setCommand("Installing new systemd service");
        await fs.copy("/opt/luxcena-neo/bin/luxcena-neo.service", "/etc/systemd/system/luxcena-neo.service");
        await this.run("systemctl", ["daemon-reload"]);
        await this.run("systemctl", ["enable", "luxcena-neo"]);
    }

    async cleanup() {
        if (this.updatedir != null) {
            this.setCommand(`Removing temporary update files ${this.updatedir}`);
            await fs.remove(this.updatedir);
        }
        if (this.backupdir != null) {
            this.setCommand(`Removing ${this.backupdir}, thinking everything went fine :)`);
            await fs.remove(this.backupdir);
        }
    }

}

class SelfUpdater {

    constructor() {
        this.branch;
        this.repoUrl;
        this.localPackageJson;
        this.remotePackageJSON
        this.localVersionNumber;
        this.remoteVersionNumber;
        this.newVersion = false;

        this.checkVersion(this.remotePackageJSON);
        this.updateChecker = setInterval(() => {
            this.checkVersion();
        }, neoModules.userData.config.SelfUpdater.checkVersionInterval * 86400000);

        this.updater = new Updater();
    }

    async checkVersion() {
        this.localPackageJson = JSON.parse(fs.readFileSync(__appdir + "/package.json"));
        this.localVersionNumber = this.localPackageJson["version"];
        this.branch = (await promiseSpawn(`git`, ["-C", __appdir, "rev-parse", "--abbrev-ref", "HEAD"])).out.replace("\n","");
        request.get(
            "https://raw.githubusercontent.com/JakobST1n/Luxcena-Neo/" + this.branch + "/package.json",
            (error, response, body) => {
                if (!error && (response.statusCode === 200)) {
                    this.remotePackageJSON = JSON.parse(body);
                    this.remoteVersionNumber = this.remotePackageJSON["version"];
                    if (this.localVersionNumber != this.remoteVersionNumber) {
                        logger.notice("A new version is available on \"" + this.branch + "\" (v" + this.remoteVersionNumber + ")");
                        this.newVersion = true;

                    } else {
                        logger.info(`Running newest version (${this.localVersionNumber})`);
                        this.newVersion = false;
                    }
                } else {
                    logger.notice("Could not find latest version! Please check you internet connection.");
                    this.remotePackageJSON = null;
                    this.remoteVersionNumber = "Unknown";
                    this.newVersion = false;
                }
            }
        );
    }

}
 
module.exports = (_neoModules) => {
    neoModules = _neoModules;
    return new SelfUpdater();
};