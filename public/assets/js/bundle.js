/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// General JavaScript
__webpack_require__ (1)();

// Page-specific JavaScript
const pageName = document.getElementsByTagName("body")[0].id;
try {
    __webpack_require__(3)("./" + pageName)();
} catch (error) {
    console.log(
        "Something went wrong when loading the js for this page...\n" +
        "The pageName is \"" + pageName + "\".\n" +
        "If it was excpected to get js for this page, please check the filename, and recompile webpack."
    );
}

// Require all styles
__webpack_require__(8);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

let sidenav = __webpack_require__(2);

module.exports = () => {
    const pageName = document.getElementsByTagName("body")[0].id;
    if (pageName == "neo_ide") { return; }

    document.getElementById("sidenav").innerHTML = sidenav;

    M.AutoInit();
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = `
<ul id="slide-out" class="sidenav sidenav-fixed">
    <li>
        <div class="user-view">
            <div class="background">
                <img src="./logo/150h/Icon.png">
            </div>
            <!--<a href="#!user"><img class="circle" src="https://picsum.photos/200/300/?random"></a>
            <a href="#!name"><span class="white-text name">John Doe</span></a>
            <a href="#!email"><span class="white-text email">Guest</span></a>-->
        </div>
    </li>
    <li><div class="divider"></div></li>
    <li><a class="waves-effect" href="/"><i class="material-icons">dashboard</i> Dashboard</a></li>
    <li><a class="waves-effect" href="/scripts"><i class="material-icons">cloud</i> Scripts</a></li>
    <li><a class="waves-effect" href="/logviewer"><i class="material-icons">timeline</i> LogViewer</a></li>
    <li><div class="divider"></div></li>
    <li><a class="subheader">Settings</a></li>
    <li><a class="waves-effect" href="strip_setup"><i class="material-icons">straighten</i> Strip setup</a></li>
    <li><a class="waves-effect" href="/settings"><i class="material-icons">settings</i> Settings</a></li>
</ul>
`;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./": 4,
	"./general": 1,
	"./general.js": 1,
	"./index": 4,
	"./index.js": 4,
	"./logviewer": 5,
	"./logviewer.js": 5,
	"./neo_ide": 6,
	"./neo_ide.js": 6,
	"./scripts": 7,
	"./scripts.js": 7
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 3;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

let socket = io();

module.exports = () => {
    M.AutoInit();
    setupSocket();

    setInterval(() => {
        socket.emit("GetGeneralInfo");
    }, 500);

    socket.emit("GetLog", {filter: "success error event", entryN: 10});
};

function setupSocket() {

    socket.on("lastLogEntries", (entries) => {
        let list = "";
        entries.forEach((entry) => {
            list += "<tr><td>" + prettifyType(entry.type) + "</td><td>" + entry.time + "</td><td>" + entry.details + "</td></tr>";
        });

        document.getElementById("log-table-body").innerHTML = list;
        M.AutoInit();
    });

    socket.on("newLogEntry", (entry) => {
        // Start with parsing the new entry, no reason to select the DOM-element and stuff, if we are filtering out the entry anyway.
        let type = entry.type;
        if ( (type.toUpperCase() !== "SUCCESS") && (type.toUpperCase() !== "ERROR") && (type.toUpperCase() !== "EVENT") && (type.toUpperCase() !== "INFO")) {
            return;
        }

        let logTable =  document.getElementById("log-table-body");

        let LTable = logTable.rows.length;
        logTable.deleteRow(LTable - 1); // Since length outputs a 1-based number

        let newEntry = logTable.insertRow(0);
        newEntry.insertCell(0).innerHTML = prettifyType(entry.type);
        newEntry.insertCell(1).innerHTML = entry.time;
        newEntry.insertCell(2).innerHTML = entry.details;
        M.AutoInit();
        newEntry.className = "newLogEntry";
    });

    socket.on("generalInfo", (info) => {
        if (info["scriptIsExited"]) {
            document.getElementById("currentScript").innerHTML = info["currentScript"] + " (exited)";
        } else {
            document.getElementById("currentScript").innerHTML = info["currentScript"];
        }
        document.getElementById("uptime").innerHTML = info["uptime"] + " seconds";
    });

}

function prettifyType(type) {
    let prettyTable = {
        "DEBUG": `<span class="tooltipped" data-position="top" data-tooltip="Debug-log">😸</span>`,
        "INFO": `<span class="tooltipped" data-position="top" data-tooltip="Just some information">ℹ️</span>`,
        "WARNING": `<span class="tooltipped" data-position="top" data-tooltip="A warning">⚠️</span>`,
        "EVENT": `<span class="tooltipped" data-position="top" data-tooltip="Event">⚡️</span>`,
        "SUCCESS": `<span class="tooltipped" data-position="top" data-tooltip="Something exited successfully">✅</span>`,
        "ERROR": `<span class="tooltipped" data-position="top" data-tooltip="Error">🔴</span>`,
        "PYTHON": `<span class="tooltipped" data-position="top" data-tooltip="Output from user-script">🐍</span>`
    };
    return prettyTable[type];
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

let socket = io();

module.exports = () => {
    M.AutoInit();

    socket.emit("GetLog", {filter: "success error event debug python info warning", entryN: 1000});
    socket.on("lastLogEntries", (entries) => {
        M.toast({html: "Loading log-files..."});
        console.log("Log-entries received: " + entries.length);
        let HTMLBasicTable = "";
        let HTMLAdvancedTable = "";
        let HTMLScriptTable = "";
        let HTMLRAWTable = "";

        entries.forEach((entry) => {
            let strHTML = "<tr><td>" + prettifyType(entry.type) + "</td><td>" + entry.time + "</td><td>" + entry.details + "</td></tr>";

            if (entry.type === "SUCCESS") { HTMLBasicTable += strHTML; }
            if (entry.type === "ERROR") { HTMLBasicTable += strHTML; }
            if (entry.type === "EVENT") { HTMLBasicTable += strHTML; }
            if (entry.type === "PYTHON") { HTMLScriptTable += strHTML; }
            if (entry.type !== "PYTHON") { HTMLAdvancedTable += strHTML; }

            //HTMLRAWTable += entry.join(" ");
        });

        document.getElementById("log-table-basic").innerHTML = HTMLBasicTable;
        document.getElementById("log-table-script").innerHTML = HTMLScriptTable;
        document.getElementById("log-table-advanced").innerHTML = HTMLAdvancedTable;
        //document.getElementById("log-table-raw").innerHTML = HTMLRAWTable;

    });

    socket.on("newLogEntry", (entry) => {
        if (entry.type === "SUCCESS") { appendEntryToTable("log-table-basic", entry); }
        if (entry.type === "ERROR") { appendEntryToTable("log-table-basic", entry); }
        if (entry.type === "EVENT") { appendEntryToTable("log-table-basic", entry); }
        if (entry.type === "PYTHON") { appendEntryToTable("log-table-script", entry); }
        if (entry.type !== "PYTHON") { appendEntryToTable("log-table-advanced", entry); }
    });

};

function appendEntryToTable(tableName, entry) {
    let newEntry = document.getElementById(tableName).insertRow(0);
    newEntry.insertCell(0).innerHTML = prettifyType(entry.type);
    newEntry.insertCell(1).innerHTML = entry.time;
    newEntry.insertCell(2).innerHTML = entry.details;
    M.AutoInit();
    newEntry.className = "newLogEntry";
}

function prettifyType(type) {
    let prettyTable = {
        "DEBUG": `<span class="tooltipped" data-position="top" data-tooltip="Debug-log">😸</span>`,
        "INFO": `<span class="tooltipped" data-position="top" data-tooltip="Just some information">ℹ️</span>`,
        "WARNING": `<span class="tooltipped" data-position="top" data-tooltip="A warning">⚠️</span>`,
        "EVENT": `<span class="tooltipped" data-position="top" data-tooltip="Event">⚡️</span>`,
        "SUCCESS": `<span class="tooltipped" data-position="top" data-tooltip="Something exited successfully">✅</span>`,
        "ERROR": `<span class="tooltipped" data-position="top" data-tooltip="Error">🔴</span>`,
        "PYTHON": `<span class="tooltipped" data-position="top" data-tooltip="Output from user-script">🐍</span>`
    };
    return prettyTable[type];
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = () => {


};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = () => {
    let socket = io();
    socket.emit("GetScripts", {});

    socket.on("updatedScriptList", (scriptList) => {
        let localScriptsHTML = "";
        let remoteScriptsHTML = "";

        for (let i = 0; i < scriptList.length; i++) {
            if (scriptList[i].loc !== "local") { continue; }
            let HTMLElem = "<li><div class=\"col s12 m4\"><div class=\"card blue darken-1\"><div class=\"card-content white-text\"><p class=\"card-title\">{{script_name}}</p><p>{{badges}}</p></div><div class=\"card-action white\">{{buttons}}</div></div></div></li>";
            if (scriptList[i].loc === "local") {
                HTMLElem = HTMLElem.replace("{{badges}}", "");
                HTMLElem = HTMLElem.replace("{{script_name}}", scriptList[i].name);
                HTMLElem = HTMLElem.replace("{{buttons}}",
                    "<a class=\"selectScript\" data-path=" + scriptList[i].path + "><i class=\"material-icons\">play_arrow</i></a>" +
                    "<a class=\"editScript\" data-path=" + scriptList[i].path + "><i class=\"material-icons\">edit</i></a>" +
                    "<a class=\"deleteScript\" data-path=" + scriptList[i].path + "><i class=\"material-icons\">delete_forever</i></a>"
                );
                localScriptsHTML += HTMLElem;
            } else if (scriptList[i].loc === "remote") {
                HTMLElem = HTMLElem.replace("{{badges}}", "<span class=\"badge yellow darken-1 white-text\">GitHub</span>");
                HTMLElem = HTMLElem.replace("{{script_name}}", scriptList[i].name);
                remoteScriptsHTML += HTMLElem;
            }
        }

        document.getElementById("local-scripts").innerHTML = localScriptsHTML;
        document.getElementById("remote-scripts").innerHTML = remoteScriptsHTML;

    });

    /*
        The delays here with settimeout, is set to a second deliberately, because, rather than making a whole checking-thing.
        We just wait a second, and assume, that if it worked, the change should show now. Else, check the logViewer.
    */
    function clickHandler(event) {
        let element = event.target.parentElement;

        if (element.className === "selectScript") {
            M.toast({html: "Now selecting script: " + element.dataset.path});
            socket.emit("SelectScript", {"scriptPath": element.dataset.path});

        } else if (element.className === "editScript") {
            window.location.href = (
                "http://" + window.location.hostname + ":" + window.location.port +
                "/neo_ide?scriptName=" + btoa(element.dataset.path)
            );

        } else if (element.className === "deleteScript") {
            if (confirm("Do you really want to delete this script?\n" + element.dataset.path + "\n\nYou can not undo this action, and the script will be lost forever...")) {
                M.toast({html: "Trying to create script. If no change after a second. Check the logViewer."});
                socket.emit("DeleteScript", {"scriptPath": element.dataset.path});
                setTimeout(() => {socket.emit("GetScripts", {})}, 1000);
            }

        } else if (element.id === "createEmptyScript") {
            var scriptName = prompt("Please enter the name of the new script:");
            if (scriptName != null || scriptName != "") {
                M.toast({html: "Trying to create script. If no change after a second. Check the logViewer."});
                socket.emit("CreateEmptyScript", {"scriptName": scriptName});
                setTimeout(() => {socket.emit("GetScripts", {})}, 1000);
            }

        }

    }

    addEventListener("click", clickHandler, false);

};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);