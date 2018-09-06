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