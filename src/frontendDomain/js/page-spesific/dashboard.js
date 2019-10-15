export default function() {
    setupSocket()
    socket.emit("GetGeneralInfo");
};


function setupSocket() {

    socket.on("generalInfo", (info) => {
        let onOffStatus = document.getElementById("onOffStatus");
        let cScriptName = document.getElementById("currentScriptName");
        let systemUptime = document.getElementById("uptime");
        let scriptStatus = document.getElementById("scriptStat");
        let appHealth = document.getElementById("appHealth");

        if (info["scriptIsExited"]) {
            cScriptName.innerHTML = "-";
            scriptStatus.innerHTML = "Exited..."
        } else {
            cScriptName.innerHTML = info["currentScript"];
        }

        let totalSeconds = info["uptime"];
        let days = Math.floor(totalSeconds / 86400)
        totalSeconds %= 86400
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        systemUptime.innerHTML = days + "d " + hours + "h " + minutes + "m ";

    })

}
