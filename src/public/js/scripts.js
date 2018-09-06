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
