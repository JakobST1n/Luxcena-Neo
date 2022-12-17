import { existsSync, readFileSync } from 'fs';
import { ensureDirSync, copy } from 'fs-extra';
import { rm, stat } from 'fs/promises';
import url from 'node:url';
import { spawn } from 'child_process';
import { EventEmitter } from 'events';
import logger from '../Logger/index.cjs'
import fetch from 'node-fetch';

let neoModules;

/**
 * Get the latest release from GitHub
 */
async function getLatestRelease() {
    let res = await fetch("https://api.github.com/repos/jakobst1n/luxcena-neo/releases/latest");

    if (res.status !== 200) {
        console.log(res.status);
        this.remoteVersionNumber = "Unknown";
        this.newVersion = false;
        throw Error(`Could not get latest release (${res.status})...`);
    }

    return await res.json()
}


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
    ensureDirSync(path);
    let fn = `${path}/${prefix}`;
    let i = 0;
    let cFn = fn;
    while (true) {
        if (existsSync(cFn)) {
            i++;
            cFn = `${fn}.${i}`;
            continue;
        }
        ensureDirSync(cFn);
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

        this.updating = true;
        this.event.emit("start");
    
        neoModules.neoRuntimeManager.stopMode();

        try {
            // Get info about the latest release 
            this.latestRelease = await getLatestRelease();

            // Download update
            this.setStep("Downloading update (1/7)");
            this.setCommand("Create updatedir");
            this.updatedir = createUniqueDir("/tmp", "luxcena-neo.update");
            this.setCommand("Download package");
            await this.downloadUpdate(this.updatedir);

            // Create backup
            this.setStep("Creating backup (2/7)");
            await this.createBackup();
   
            // Install dependencies
            this.setStep("Installing dependencies (3/7)");
            await this.installDependencies();
            
            // Install package
            this.setStep("Installing package (4/7)");
            await this.installPackage(this.updatedir);

            // Install update
            this.setStep("Installing update (5/7)");
            await this.installPackageFiles(this.updatedir);

            // Cleanup
            this.setStep("Cleaning up (6/7)");
            await this.cleanup();
    
            // Restart self, systemd service restart policy will start us up again.
            this.setStep("Stopping luxcena neo service in the hope that systemd will restart it. (7/7)");
            this.setCommand("EXIT");
            this.updating = false;
            this.event.emit("end");
            setTimeout(() => {
                process.exit(0);
            }, 1000);
    
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
                    this.setCommand(`Copy ${this.backupdir} into ${__appdir}`);
                    await copy(this.backupdir, __appdir);
                    await this.run("chown", ['-R', `${s.uid}:${s.gid}`, __appdir]);
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
     * This creates a temporary directory, and creates a backup of the current installation.
     */
    async createBackup() {
        this.setCommand("Create backupdir");
        this.backupdir = createUniqueDir("/var/luxcena-neo/backups", "backup");
        this.setCommand(`Copy ${__appdir} into ${this.backupdir}`);
        await copy(__appdir, this.backupdir);
        let s = await stat(__appdir);
        await this.run("chown", ['-R', `${s.uid}:${s.gid}`, this.backupdir]);
        this.backupcomplete = true;
    }

    /**
     * Determine the currently used remote and branch, and download the newest commit
     * into the temporary folder
     */
    async downloadUpdate(tmpdir) {
        await this.run(`curl`, ["-s", "-L", "-o", `${tmpdir}/${this.latestRelease["assets"][0]["name"]}`, this.latestRelease["assets"][0]["browser_download_url"]]);
    }

    async installDependencies() {
        // So, the server is running as root, that means we can just do this.
        // we shouldn't, but, anyway.
        let arch = (await this.run(`uname`, ["-m"])).out.replace("\n","");
        if (arch == "armv6l") {
            await this.run("wget", ["https://unofficial-builds.nodejs.org/download/release/v14.10.0/node-v14.10.0-linux-armv6l.tar.gz"]);
            await this.run("tar", ["-xzf", "node-v14.10.0-linux-armv6l.tar.gz"]);
            await this.run("cp", ["-r", "node-v14.10.0-linux-armv6l/*", "/usr/local"]);
            await this.run("rm", ["-r", "node-v14.10.0-linux-armv6l"]);
            await this.run("rm", ["node-v14.10.0-linux-armv6l.tar.gz"]);
        } else {
            await this.run("sh", ["-c", "wget -qO- https://deb.nodesource.com/setup_14.x | bash -"]);
        }

        await this.run("apt", ["-qy", "install", "nodejs", "python3-pip"]);
        await this.run("pip3", ["install", "virtualenv"]);
    }

    /**
     * Install the downloaded package file
     */
    async installPackage(tmpdir) {
        await this.run("sh", ["-c", `export NODE_ENV=production; npm --prefix "${tmpdir}/luxcena-neo/" install "${tmpdir}/${this.latestRelease["assets"][0]["name"]}"`]);
    }

    /**
     * Replace the current installation with the newly extracted files
     */
    async installPackageFiles(tmpdir) {
        this.setCommand(`Stat current installation`);
        let s = await stat(__appdir);
        await this.run("chown", ['-R', `${s.uid}:${s.gid}`, tmpdir]);

        this.setCommand(`Delete current installation`);
        await rm(`${__appdir}`, {recursive: true});
        
        this.setCommand(`Copy ${tmpdir} into ${__appdir}`);
        await copy(`${tmpdir}/luxcena-neo/node_modules/luxcena-neo/`, __appdir);
        await this.run("chown", ['-R', `${s.uid}:${s.gid}`, __appdir]);
    }

    async cleanup() {
        if (this.updatedir != null) {
            this.setCommand(`Removing temporary update files ${this.updatedir}`);
            await rm(this.updatedir, {recursive: true});
        }
        if (this.backupdir != null) {
            this.setCommand(`Removing ${this.backupdir}, thinking everything went fine :)`);
            await rm(this.backupdir, {recursive: true});
        }
    }

}

class SelfUpdater {

    constructor() {
        this.repoUrl;
        this.localPackageJson;
        this.localVersionNumber;
        this.remoteVersionNumber;
        this.newVersion = false;

        this.checkVersion(this.remotePackageJSON);
        this.updateChecker = setInterval(() => {
            this.checkVersion();
        }, neoModules.userData.config.SelfUpdater.checkVersionInterval * 86400000);

        this.updater = new Updater();
    }

    async getCurrentVersionNumber() {
        this.localPackageJson = JSON.parse(readFileSync(__appdir + "/package.json"));
        this.localVersionNumber = this.localPackageJson["version"];
        return this.localVersionNumber;
    }

    async getLatestVersionNumber() {
        this.remoteVersionNumber = (await getLatestRelease())["tag_name"];
        return this.remoteVersionNumber;
    }

    async checkVersion() {
        let current_version;
        let latest_version;
        try {
            current_version = await this.getCurrentVersionNumber();
            latest_version = await this.getLatestVersionNumber();
        } catch (err) {
            logger.notice("Could not find latest version! Please check you internet connection.");
            return;
        }

        if (current_version != latest_version) {
            logger.notice(`A new version is available on (v${latest_version})`);
            this.newVersion = true;

        } else {
            logger.info(`Running newest version (${current_version})`);
            this.newVersion = false;
        }
    }

}
 
export default function(_neoModules) {
    neoModules = _neoModules;
    return new SelfUpdater();
};
