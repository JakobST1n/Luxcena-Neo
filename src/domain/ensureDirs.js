let logger = require(__basedir + "/src/logger");
let fse = require("fs-extra");

module.exports = () => {
    // Generate all user-folders
    logger.info("Ensuring all folder in UserDir exists...");

    fse.ensureDirSync(__datadir + "/");
    fse.ensureDirSync(__datadir + "/config/");
    fse.ensureDirSync(__datadir + "/config/certs");
    fse.ensureDirSync(__datadir + "/usrCode/");
    fse.ensureDirSync(__datadir + "/remoteCode/");

    // Generate config-files
    if (!fse.existsSync(__datadir + "/config/versionChecker.json")) {
        logger.notice("'versionChecker.json' not found, creating with default settings.");
        fse.writeFileSync(__datadir + "/config/versionChecker.json", JSON.stringify({
          "branch": "dev",
          "checkInterval": 5
        }, null, 4));
    }
    if (!fse.existsSync(__datadir + "/config/https.json")) {
        logger.notice("'https.json' not found, creating with default settings");
        fse.writeFileSync(__datadir + "/config/https.json", JSON.stringify({
          "port": 8080,
          "CN": "localhost",
          "certMade": false,
          "certDate": 0,
          "certExpire": 0,
          "certCN": ""
        }, null, 4));
    }
    if (!fse.existsSync(__datadir + "/config/strip.json")) {
        logger.notice("'strip.json' not found, creating empty file");
        fse.writeFileSync(__datadir + "/config/strip.json", JSON.stringify({
            "segments": [],
            "matrix": [],
            "segmentConfiguration": "snake",
            "led_pin": 18,
            "led_freq_hz": 800000,
            "led_dma": 10,
            "led_invert": false,
            "led_channel": 0
        }, null, 4));
    }
}
