<script>
    import { onMount, onDestroy, afterUpdate } from "svelte";
    import { authorizedSocket, authorizedSocketNeeded } from "../../stores/socketStore";
    authorizedSocketNeeded.set(true);

    let scrollBox;
    let htmlCode = "";
    let buffer = [];
    let flushBufferInterval;
    let flushBufferIntervalSpeed = 50;
    let lagAmount = 0;

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
        buffer.push(`<span style="${styles}">${data}</span>`);
    }

    function flushBufferPart() {
        if (buffer.length > 0) {
            htmlCode += buffer.shift();
        }
        lagAmount = (buffer.length * flushBufferIntervalSpeed) / 1000;
    };

    afterUpdate(() => {
	    scrollBox.scrollTo(0, scrollBox.scrollHeight);
    });
    
    function onEditorProcStart() { htmlCode = ""; }
    function onEditorProcExit(code) { addData(`\nMode exited with ${code}\n\n`, "exit"); }
    function onEditorProcStdout(stdout) { addData(stdout, "stdout"); }
    function onEditorProcStderr(stderr) { addData(stderr, "stderr"); }

    onMount(() => {
        htmlCode = "";
        buffer = [];
        flushBufferInterval = setInterval(flushBufferPart, flushBufferIntervalSpeed);
        authorizedSocket.on("editor:proc:start", onEditorProcStart);
        authorizedSocket.on("editor:proc:exit", onEditorProcExit);
        authorizedSocket.on("editor:proc:stdout", onEditorProcStdout);
        authorizedSocket.on("editor:proc:stderr", onEditorProcStderr);
    });

    onDestroy(() => {
        clearInterval(flushBufferInterval);
        authorizedSocket.off("editor:proc:start", onEditorProcStart);
        authorizedSocket.off("editor:proc:exit", onEditorProcExit);
        authorizedSocket.off("editor:proc:stdout", onEditorProcStdout);
        authorizedSocket.off("editor:proc:stderr", onEditorProcStderr);
    });
</script>

<style>
    div {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    pre {
        height: 100%;
        width: calc(100vw - 30px);
        overflow: auto;
        padding: 15px;
        margin: 0;
        box-sizing: border-box;
    }
    .lag-alert {
        display: block;
        box-sizing: border-box;
        padding: 5px;
        width: calc(100vw - 30px);
        font-size: 12px;
        background-color: var(--red-700);
        height: fit-content;
    }
    @media (min-width: 800px) {
        pre, .lag-alert {
            width: calc(100vw - 345px);
        }
    }
</style>

<div>
    {#if lagAmount > 1.5}
        <span class="lag-alert">
            Output cannot keep up, and is around {lagAmount.toFixed(1)}s behind realtime.
        </span>
    {/if}
    <pre bind:this={scrollBox}>
        {@html htmlCode}
    </pre>
</div>
