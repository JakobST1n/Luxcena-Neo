<script>
    import { authorizedSocket, authorizedSocketNeeded } from "../../stores/socketStore";
    authorizedSocketNeeded.set(true);

    let scrollBox;
    let htmlCode = "";

    function addData(data, classname) {
        // let styles = "white-space:pre-wrap;margin:0;";
        // let styles = "overflow-x:auto;";
        let styles = "";
        switch (classname) {
            case "exit":
                styles += "color: green";
                break;
            case"stderr":
                styles += "color: red";
                break;
        }
        htmlCode += `<span style="${styles}">${data}</span>`;
        if (scrollBox != null) {
            scrollBox.scrollTop = scrollBox.scrollHeight + 100;
        }
    }
    
    authorizedSocket.on("editor:proc:start", () => htmlCode = "");
    authorizedSocket.on("editor:proc:exit", (code) => addData(`\nMode exited with ${code}\n\n`, "exit"));
    authorizedSocket.on("editor:proc:stdout", (stdout) => addData(stdout, "stdout"));
    authorizedSocket.on("editor:proc:stderr", (stderr) => addData(stderr, "stderr"));
</script>

<style>
    div {
        height: 100%;
        width: 100%;
    }
    pre {
        height: 100%;
        width: calc(100vw - 30px);
        overflow: auto;
        padding: 15px;
        margin: 0;
        box-sizing: border-box;
    }
    @media (min-width: 800px) {
        pre {
            width: calc(100vw - 360px);
        }
    }
</style>

<div>
    <pre bind:this={scrollBox}>
        {@html htmlCode}
    </pre>
</div>
