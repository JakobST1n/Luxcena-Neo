let fs = require("fs-extra");
let url = require("url");
let request = require('request');
let exec = require("child_process").exec;

class VersionChecker {

    constructor() {
        this.config = JSON.parse(fs.readFileSync(__datadir + "config/versionChecker.json"));
        this.CPackageJson = JSON.parse(fs.readFileSync(__basedir + "package.json"));

        this.version = this.CPackageJson["version"];
        this.repoVersion = this.version;
        this.checkFrequency = this.config["checkInterval"] * 100 * 10 * 60 * 60; // takes in hours
        this.repoLink = this.CPackageJson["repository"]["url"];
        this.repoBranch = this.config["branch"];

        this.checkVersion(this); // Because we have to send the reference in our interval, we have to to it here as well
        this.updateChecker = setInterval(this.checkVersion, this.checkFrequency, this);  // We have to send a reference to this class
    }

    checkVersion(parent) {
        if (typeof(parent) == "undefined") { parent = this; }
        let path = url.parse(parent.repoLink);
        let link = "https://raw.githubusercontent.com" + path.pathname + '/' + parent.repoBranch + "/package.json";

        request.get(link, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let remotePackageJSON = JSON.parse(body);
                this.repoVersion = remotePackageJSON["version"];
                if (parent.VersionIsNewerThan(this.repoVersion, parent.version)) {
                    global.log("A new version is available on \"" + parent.repoBranch + "\" (v" + this.repoVersion + ")", "INFO");
                }
            } else {
                global.log("Could not find latest version! Please check you internet connection.", "ERROR");
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
 
module.exports = () => { return new VersionChecker(); };
