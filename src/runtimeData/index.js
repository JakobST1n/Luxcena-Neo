let fse = require("fs-extra");

class RuntimeData {

    constructor (DirUserData) {
        this.lockFile = DirUserData + "/config/runtime.json";
        this.runtimeVars = {};

        this.readFile();
        this.saveFile();
    };

    saveFile() {
        fse.outputJsonSync(this.lockFile, this.runtimeVars);
    }

    readFile() {
        try {
            this.runtimeVars = fse.readJsonSync(this.lockFile);
        } catch (err) {
            this.runtimeVars = {};
        }
    }

    set (name, value) {
        this.runtimeVars[name] = value;
        this.saveFile();
    };

    get (name) {
        this.readFile();
        if (typeof (this.runtimeVars[name]) != undefined) {
            return this.runtimeVars[name];
        } else {
            return false;
        }
    }

    unset (name) {
        delete this.runtimeVars[name];
    }

}

module.exports = RuntimeData;
