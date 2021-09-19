let fse = require("fs-extra");

const level = {
    EMERG:   "EMERGENCY",
    ALERT:   "ALERT",
    CRIT:    "CRITICAL",
    ERROR:   "ERROR",
    WARNING: "WARNING",
    NOTICE:  "NOTICE",
    INFO:    "INFO",
    DEBUG:   "DEBUG",

    ACCESS:  ""
};


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


function log(object, logLevel=level.DEBUG, file="/lux-neo.log") {
    fse.ensureFileSync(__logdir + file);

    let formattedLogString = `[${getTimeStamp()}] ${logLevel} ${object}`;
    console.log(formattedLogString); // @TODO: This should probably be removed, used for dev currently
    

    fse.appendFile(
        __logdir + "/lux-neo.log",
        formattedLogString + '\n'
    ).catch(err => {
        console.log("EMERGENCY Could not write to log-file 'lux-neo.log'...");
        console.log("DEBUG FileWriteError: " + err)
    });

    if (__event != undefined) {
        __event.emit("logger", logLevel, object);
    }
}

module.exports = {
    level,
    log,
    emerg:   (object) => { log(object, level.EMERG);   },
    alert:   (object) => { log(object, level.ALERT);   },
    crit:    (object) => { log(object, level.CRIT);    },
    error:   (object) => { log(object, level.ERROR);   },
    warning: (object) => { log(object, level.WARNING); },
    notice:  (object) => { log(object, level.NOTICE);  },
    info:    (object) => { log(object, level.INFO);    },
    debug:   (object) => { log(object, level.DEBUG);   },
    access:  (object) => { log(object, level.ACCESS, file="/access.log"); }
};
