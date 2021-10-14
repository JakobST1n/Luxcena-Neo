let fs = require("fs-extra");
let url = require("url");
let request = require('request');
const spawn = require('child_process').spawn;
let logger = require(__appdir + "/src/Logger");

let neoModules;

class VersionChecker {

    constructor() {
        this.CPackageJson = JSON.parse(fs.readFileSync(__appdir + "/package.json"));
        this.version = this.CPackageJson["version"];
        this.repoLink = this.CPackageJson["repository"]["url"];

        this.checkFrequency = neoModules.userData.config.SelfUpdater.checkVersionInterval * 86400000;  // Takes in days.
        this.repoBranch = neoModules.userData.config.SelfUpdater.branch;

        this.remotePackageJSON = "https://raw.githubusercontent.com/JakobST1n/Luxcena-Neo/" + this.repoBranch + "/package.json";

        this.newVersion = false;
        this.newestVersion = this.version;
        this.checkVersion(this.remotePackageJSON);

        this.updateChecker = setInterval(() => {
            let newVersion = this.checkVersion(this.remotePackageJSON);
        }, this.checkFrequency);

    }

    checkVersion() {
        request.get(this.remotePackageJSON, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let remotePackageJSON = JSON.parse(body);
                this.newestVersion = remotePackageJSON["version"];
                if (this.newestVersion != this.version) {
                    logger.notice("A new version is available on \"" + this.repoBranch + "\" (v" + this.version + ")");
                    this.newVersion = true;
                } else {
                    logger.info(`Running newest version (${newestVersion})`);
                    this.newVersion = false;
                }
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

    doUpdate() {
        spawn("luxcena-neo-cli.sh", ["update", ">>", "/tmp/luxcena-neo-update.log"], {
            cwd: process.cwd(),
            detached : true,
            stdio: "inherit"
        });
    }

}
 
module.exports = (_neoModules) => {
    neoModules = _neoModules;
    return new VersionChecker();
};
