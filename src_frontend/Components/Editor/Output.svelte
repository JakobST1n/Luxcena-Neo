<script>
    import { onMount, onDestroy } from "svelte";
    import { authorizedSocket, authorizedSocketNeeded } from "../../stores/socketStore";
    authorizedSocketNeeded.set(true);

    let scrollBox;
    let htmlCode = "";
    let buffer = "";
    let flushBufferInterval;

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
        buffer += `<span style="${styles}">${data}</span>`;
        if (scrollBox != null) {
            scrollBox.scrollTop = scrollBox.scrollHeight + 100;
        }
    }

    function flushBuffer() {
        htmlCode += buffer;
        buffer = "";
    };
    
    authorizedSocket.on("editor:proc:start", () => htmlCode = "");
    authorizedSocket.on("editor:proc:exit", (code) => addData(`\nMode exited with ${code}\n\n`, "exit"));
    authorizedSocket.on("editor:proc:stdout", (stdout) => addData(stdout, "stdout"));
    authorizedSocket.on("editor:proc:stderr", (stderr) => addData(stderr, "stderr"));

    onMount(() => {
        htmlCode = "";
        buffer = "";
        flushBuffer = setInterval(flushBuffer, 400);
    });

    onDestroy(() => {
        clearInterval(flushBufferInterval);
    });
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
