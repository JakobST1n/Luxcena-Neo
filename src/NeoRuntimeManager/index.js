/**
 * This module is used to execute and communicate with a python NeoRuntime instance.
 *
 * @author jakobst1n.
 * @since  19.12.2019
 */

const fs = require("fs");
const fsPromises = fs.promises;
const RuntimeProcess = require("./RuntimeProcess");
const IPC = require("./IPC");
let logger = require(__basedir + "/src/logger");
const EventEmitter = require('events');

/** @type {object} this should be a pointer to a object referencing all neoModules (see app.js) */
let neoModules;

/** @type {string} Currently active mode */
let modeId = null;
/** @type {int} Last exit code of a mode */
let modeExitCode = 0;
/** @type {RuntimeProcess} This is the current RuntimeProcess instance */
let runtimeProcess = null;
/** @type {IPC} The IPC instance, used to communicate with the script */
let ipc = null;
/** @type {EventEmitter} This is used to emit events when things change */
const eventEmitter = new EventEmitter();
/** @type {boolean} If this is true, we will not do things the usual way */
let modeDebuggerActive = false;
/** @type {string} Should be the modeId the debugger is attached to */
let modeDebuggerId = null;

eventEmitter.on("proc:exit", (code) => modeExitCode = code);

/**
 * Check if a path id actually a mode (if it is a folder with a script.py file)
 * 
 * @param {string} path - Path to check.
 * 
 * @return {boolean} wether the path points to a valid mode.
 */
function isMode(path) {
    if (!fs.existsSync(path)) { return false; }
    let folderStat = fs.statSync(path);
    if (!folderStat.isDirectory()) { return false; }
    if (!fs.existsSync(path + "/script.py")) { return false; }
    return true;
}

/**
 * Get all ids of modes that can be set.
 * 
 * @returns {array} All modeids
 */
function listModes() {
    let modeDirs = [
        ["builtin/", fs.readdirSync(__basedir + "/NeoRuntime/builtin")],
        ["remote/", fs.readdirSync(__datadir + "/remoteCode")],
        ["user/", fs.readdirSync(__datadir + "/userCode")]
    ]
    let validModes = [];
    for (modeDir of modeDirs) {
        for (modeName of modeDir[1]) {
            let modeId = `${modeDir[0]}${modeName}`;
            if (isMode(getModePath(modeId))) {
                validModes.push(modeId);
            }
        }
    }
    return validModes;
}

/**
 * Change mode, stop the old one and start the new one.
 * 
 * @param {string} _modeId - Id of the mode to change to.
 * 
 * @return {object} A standardform return object.
 */
function setMode(_modeId) {
    if (modeDebuggerActive && (_modeId != modeDebuggerId)) {
        return {success: false, reason: "debugger active", detail: "Cannot change mode when debugger is active."}
    }
    if (!isMode(getModePath(_modeId))) {
        console.log(`Invalid mode "${_modeId}".`);
        return {success: false, reason: "unknown modeId"};
    }
    logger.info(`Changing mode to "${_modeId}".`);

    stopMode();
    
    modeId = _modeId;
    neoModules.userData.config.activeMode = modeId;
    eventEmitter.emit("change", "mode", modeId);

    runtimeProcess = new RuntimeProcess(getModePath(_modeId), eventEmitter);
    startMode();

    return {success: true}
};

/**
 * Get current mode
 * 
 * @return {string} current modeId
 */
function currentMode() {
    return modeId;
}

/**
 * Will attempt to stop current mode
 * 
 * @return {object} A standardform return object.
 */
function stopMode(restart=false) {
    if (modeRunning()) {
        runtimeProcess.stop(restart);
    }
    return {success: true}
};

/**
 * Will attempt to start current mode
 * 
 * @return {object} A standardform return object.
 */
function startMode() {
    if (runtimeProcess === null) { return {success: false, reason: "no runtimeprocess", detail: "Runtimeprocess not set, did you mean to call setMode?"}; }
    runtimeProcess.start();
    return {success: true}
};

/**
 * Will attempt to restart current mode
 * 
 * @return {object} A standardform return object.
 */
function restartMode() {
    return stopMode(true);
};

/**
 * Checks if mode is running currently
 * 
 * @return {boolean} if mode is running
 */
function modeRunning() {
    if (runtimeProcess === null) { return false; }
    return runtimeProcess.isRunning;
};

/**
 * Get the full system path to a mode
 * 
 * @param {string} modeId
 * 
 * @return {string} Full path of mode
 */
function getModePath(modeId) {
    let path = modeId.split("/");
    let location = path.splice(0, 1).toString();
    if (location === "user") { path = __datadir + "/userCode/" + path.join("/"); }
    if (location === "remote") { path = __datadir + "/remoteCode/" + path.join("/"); }
    if (location === "builtin") { path = __basedir + "/NeoRuntime/builtin/" + path.join("/"); }
    return path;
}

/**
 * This should be called by RuntimeProcess when a variable changes in the mode
 *
 * @param {string} location - This is globvars/variables
 * @param {string} name - Name of the variable
 * @param {any} newValue - The new value of the variable
 */
function onVariableChange(location, name, newValue) {
    if (location == "variables") {
        eventEmitter.emit("change", `variable/${name}`, newValue)
    } else if (location == "globvars") {
        eventEmitter.emit("change", `${name}`, newValue)
    }
}

/**
 * Function that returns all globvars (brightness, power_on) as the values they
 * had last time we heard from the python script.
 * 
 * @return {object}
 */
function getGlobvars() {
    if (!modeRunning()) { return {}; }
    return ipc.globvars;
}

/**
 * Sets value of a globvar power_on/brightness.
 * 
 * @param {string} name - Name of the variable power_on/brightness
 * @param {any} value - The value the variable should be set to
 * 
 * @return {object} Standardform return object
 */
function setGlobvar(name, value) {
    if (!modeRunning()) { return; }
    
    switch(name) {
        case "power_on":
            return ipc.sendCommand(IPC.COMMAND.SET_GLOB, IPC.GLOBVAR.POWER_ON, (value) ? 1 : 0);
        case "brightness":
            return ipc.sendCommand(IPC.COMMAND.SET_GLOB, IPC.GLOBVAR.BRIGHTNESS, value);
        default:
            return {success: false, reason: "unknown globvar", detail: name};
    }
}

/**
 * Get all variables declared in mode
 * 
 * @return {object}
 */
function getVariables() {
    if (!modeRunning()) { return {}; }
    return ipc.variables;
}

/**
 * Sets value of a variable
 * 
 * @param {string} name - Name of the variable
 * @param {any} value - The value the variable should be set to
 * 
 * @return {object} Standardform return object
 */
function setVariable(name, value) {
    if (!modeRunning()) { return; }
    return ipc.sendCommand(IPC.COMMAND.SET_VAR, name, value);
}

/**
 * Start debugger for a mode
 * 
 * @param {string} modeId - The mode to debug
 * 
 * @return {object} Standardform return object
 */
function startDebugger(debuggerModeId) {
    if (debuggerModeId.substr(0, 5) !== "user/") { return {success: false, reason: "not user mode"}; }
    if (!isMode(getModePath(debuggerModeId))) { return {success: false, reason: "unknown modeId"}; }
    if (modeDebuggerActive) { return {success: false, reason: "debugger already active"}; }
    logger.info(`Starting debugger for ${debuggerModeId}`);
    modeDebuggerActive = true;
    modeDebuggerId = debuggerModeId;
    if (debuggerModeId != modeId) {
        setMode(debuggerModeId);
    } else {
        restartMode();
    }
    return {success: true, code: fs.readFileSync(getModePath(debuggerModeId) + "/script.py").toString()}
}

/**
 * Save mode
 */
function saveModeCode(_modeId, code) {
    if (!modeDebuggerActive) { return {success: false, reason: "debugger not active"}; };
    if (_modeId != modeDebuggerId) { return {success: false, reason: "modeid not the same as debuggermodeid"}; };
    fs.writeFileSync(getModePath(`${modeDebuggerId}/script.py`), code);
    return {success: true};
}

/**
 * Stop the active debugger
 * 
 * @return {object} Standardform return object
 */
function stopDebugger() {
    if (!modeDebuggerActive) { return {success: true, detail: "No debugger active"} }
    logger.info(`Stopping debugger`);
    modeDebuggerActive = false;
    return {success: true}
}

module.exports = (_neoModules) => {
    neoModules = _neoModules;
    ipc = new IPC.IPC(neoModules.userData.config.neoRuntimeIPC.socketFile, eventEmitter);
    return {
        event: eventEmitter,
        modes: listModes,
        mode: {
            current: currentMode,
            set: (modeId) => setMode(modeId),
            status: {
                modeRunning: modeRunning(),
                modeExitCode: modeExitCode
            },
            globvars: {
                get: getGlobvars,
                set: setGlobvar
            },
            variables: {
                get: getVariables,
                set: setVariable
            }
        },
        getModePath,
        isMode,
        modeRunning,
        startDebugger, stopDebugger, saveModeCode,
        startMode, stopMode, restartMode
    }
};