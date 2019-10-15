let fse = require("fs-extra");

Object.defineProperty(String.prototype, "lPad", {
    value: function lPad(len, chr="0") {
        str = this;
        var i = -1;
        if (!chr && chr !== 0) chr = ' ';
        len = len - this.length;
        while (++i < len) {
          str = chr + str;
        }
        return str;
    },
    writeable: true,
    configurable: true
});

function getTimeStamp() {
    let CDate = new Date();
    let day = CDate.getDate().toString().lPad(2);
    let month = (CDate.getMonth() + 1).toString().lPad(2);  // +1 because js starts to count at 0
    let year = CDate.getFullYear();
    let hour = CDate.getHours().toString().lPad(2);
    let min = CDate.getMinutes().toString().lPad(2);
    let sec = CDate.getSeconds().toString().lPad(2);
    let ms = Math.round(CDate.getMilliseconds() / 10).toString().lPad(2);  // divide by 10 to make the last digit decimal, then round.

    return `${day}.${month}.${year}-${hour}:${min}:${sec}.${ms}`;
}

function log(logString, logLevel) {
    fse.ensureFileSync(__logdir + "/lux-neo.log");

    let formattedLogString = `[${getTimeStamp()}] ${logLevel} ${logString}`;
    console.log(formattedLogString)

    fse.appendFile(
        __logdir + "/lux-neo.log",
        "\n" + formattedLogString
    ).catch(err => {
        console.log("EMERGENCY Could not write to log-file 'lux-neo.log'...");
        console.log("DEBUG FileWriteError: " + err)
    });

    //let broadcastEntry = (rawEntry) => { io.sockets.emit("newLogEntry", rawEntry); };
    /*broadcastEntry({
       time: timeStr,
       type: logLevel.toUpperCase(),
       details: logString
   });*/
}

function access(logString) {
    fse.ensureFileSync(__logdir + "/access.log");

    let formattedLogString = `[${getTimeStamp()}] ${logString}`;
    console.log(formattedLogString)

    fse.appendFile(
        __logdir + "/access.log",
        "\n" + formattedLogString
    ).catch(err => {
        console.log("EMERGENCY Could not write to log-file 'access.log'...");
        console.log("DEBUG FileWriteError: " + err)
    });

}

function emerg(object) {
    log(object, "EMERGENCY");
}

function alert(object) {
    log(object, "ALERT");
}

function crit(object) {
    log(object, "CRITICAL");
}

function error(object) {
    log(object, "ERROR");
}

function warning(object) {
    log(object, "WARN");
}

function notice(object) {
    log(object, "NOTICE");
}

function info(object) {
    log(object, "INFO");
}

function debug(object) {
    log(object, "DEBUG");
}

module.exports = {
    log,
    emerg,
    alert,
    crit,
    error,
    warning,
    notice,
    info,
    debug,
    access
};
