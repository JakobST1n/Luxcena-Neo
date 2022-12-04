<script>
    import { onMount, onDestroy, afterUpdate } from "svelte";
    import { authorizedSocket, authorizedSocketNeeded } from "../../stores/socketStore";
    authorizedSocketNeeded.set(true);

    let scrollBox;
    let htmlCode = "";
    let buffer = [];
    let flushBufferInterval;
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
        lagAmount = buffer.length;
    };

    afterUpdate(() => {
	    scrollBox.scrollTo(0, scrollBox.scrollHeight);
    });
    
    authorizedSocket.on("editor:proc:start", () => htmlCode = "");
    authorizedSocket.on("editor:proc:exit", (code) => addData(`\nMode exited with ${code}\n\n`, "exit"));
    authorizedSocket.on("editor:proc:stdout", (stdout) => addData(stdout, "stdout"));
    authorizedSocket.on("editor:proc:stderr", (stderr) => addData(stderr, "stderr"));

    onMount(() => {
        htmlCode = "";
        buffer = [];
        flushBufferInterval = setInterval(flushBufferPart, 50);
    });

    onDestroy(() => {
        clearInterval(flushBufferInterval);
    });
</script>

<style>
    div {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        display: grid;
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
    {#if lagAmount > 3}
        <span class="lag-alert">
            Output cannot keep up, and is {lagAmount} chunks behind realtime.
        </span>
    {/if}
    <pre bind:this={scrollBox}>
        {@html htmlCode}
    </pre>
</div>
