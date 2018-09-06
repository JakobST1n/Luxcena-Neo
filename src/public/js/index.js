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
