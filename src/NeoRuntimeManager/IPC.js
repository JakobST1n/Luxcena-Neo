/**
 * This module is used to communicate with a python NeoRuntime instance.
 *
 * @author jakobst1n.
 * @since  3.10.2021
 */

const net = require("net");
let logger = require(__basedir + "/src/logger");

/** @type {int} How long wait between each reconnection attempt */
const RECONNECT_INTERVAL = 1000;
/** @type {Object} ENUM-ish for command that can be sent to neoruntime */
const COMMAND = Object.freeze({SET_GLOB          : 0,
                               SET_VAR           : 1,
                               SET_SEND_STRIP_BUF: 2});
/** @type {Object} ENUM-ish for globvars */
const GLOBVAR = Object.freeze({POWER_ON  : 0,
                               BRIGHTNESS: 1});
/** @type {Object} ENUM-ish for what type of data neoruntime sends */
const DATATYPE = Object.freeze({STATES   : 1,
                                STRIP_BUF: 2});

/**
 * class that will keep a active connection to a socket if possible, and
 * automatically reconnect. It will emit events when data is received,
 * and it will send commands to the process. */
class IPC {

    constructor(_socketFile, _eventEmitter) {
        this.socketFile = _socketFile;
        this.eventEmitter = _eventEmitter;

        this.client;
        this.connected = false;
        this.reconnectInterval = false;

        this.globvars = {};
        this.variables = {};

        this.reconnect();
    }

    /**
     * If we are not already attempting to reconnect, this will start a
     * interval that tries to reconnect. */
    reconnect() {
        if (this.reconnectInterval === false) {
            this.reconnectInterval = setInterval(this.tryOpenSocketConnection.bind(this), RECONNECT_INTERVAL);
        }
    }

    /**
     * This will attempt to connect to the socket, and then setup all listeners
     * if it succedes. */
    tryOpenSocketConnection() {
        // logger.info("Attempting to start IPC");

        this.client = net.createConnection(this.socketFile)
        .on('connect', () => {
            clearInterval(this.reconnectInterval);
            this.reconnectInterval = false;
            // logger.info("IPC Connected.");
        })
        .on("ready", () => {
            this.connected = true;
        })
        .on('data', (data) => {
            switch (data[0]) {
                case DATATYPE.STATES:
                    let json_data;
                    try {
                        json_data = JSON.parse(data.toString("ascii", 1));
                    } catch (e) {
                        logger.warning("Could not parse json data from neoruntime");
                        return;
                    }

                    if (json_data.hasOwnProperty("globvars")) {
                        forEachDiff(json_data["globvars"], this.globvars, (key, newVal) => {
                            this.eventEmitter.emit("change", key, newVal);
                        });
                        this.globvars = json_data["globvars"];
                    }
                    if (json_data.hasOwnProperty("variables")) {
                        forEachDiff(json_data["variables"], this.variables, (key, newVal) => {
                            this.eventEmitter.emit("change", `variable/${key}`, newVal);
                        });
                        this.variables = json_data["variables"];
                    }
                    break;
    
                default:
                    logger.info(data);
            }
    
        })
        .on("timeout", () => {
            logger.info("IPC Timeout");
        })
        .on("close", (hadError) => {
            // logger.info("IPC Close, hadError: ", hadError);
            this.connected = false;
            this.reconnect();
        })
        .on("end", () => {
            // logger.info("IPC End");
            this.connected = false;
        })
        .on('error', (data) => {
            // logger.info('IPC Server not active.');
            this.connected = false;
            this.reconnect();
        })
        ;
    }

    /**
     * Will send a command to the socket if we have a active connection,
     * if not it will just drop the command. there is no queue implemented
     * for such events. */
    sendCommand(commandType, name, value) {
        if (this.connected) {
            let buf = Buffer.allocUnsafe(128);  // It's fine, we know what we are doing
            // let buf = Buffer.alloc(128);
    
            switch (commandType) {
                case (COMMAND.SET_GLOB):
                    buf[1] = name;
                    buf[2] = value;
                    break;
                case (COMMAND.SET_VAR):
                    if (name.length > 32) { return {success: false, reason: "name too long", detail: "max size of name is 32 bytes"}; }
                    if (name.length > 93) { return {success: false, reason: "value too long", detail: "max size of value is 93 bytes"}; }
                    buf[1] = name.length;
                    buf[2] = value.length;
                    buf.write(name,  3,             name.length,  "ascii");
                    buf.write(value, 3+name.length, value.length, "ascii");
                    break;
                case (COMMAND.SET_SEND_STRIP_BUF):
                    buf[1] = (name) ? 1 : 0;
                default:
                    logger.info(`IPC UNKNOWN COMMANDTYPE ${commandType}`)
                    return;
            }

            buf[0] = commandType;
            this.client.write(buf);
            return {success: true}
        }
        return {success: false, reason: "socket not connected", detail: "This usually means the python script is not running"};
    }

}

const isObject = v => v && typeof v === 'object';

/**
 * Will call callback on all the differences between the dicts
 */
function forEachDiff(dict1, dict2, callback) {
    for (const key of new Set([...Object.keys(dict1), ...Object.keys(dict2)])) {
        if (isObject(dict1[key]) && isObject(dict2[key])) {
            if (dict1[key].value !== dict2[key].value) {
                callback(key, dict1[key]);
            }
        } else if (dict1[key] !== dict2[key]) {
            if (isObject(dict2[key]) && (dict1[key] == null)) {
                dict2[key].value = null;
                callback(key, dict2[key])
            } else {
                callback(key, dict1[key]);
            }
        }
    }
}

module.exports = {IPC, COMMAND, GLOBVAR};