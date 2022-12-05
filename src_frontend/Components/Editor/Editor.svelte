<script>
    import { onMount, onDestroy } from "svelte";
	import { pop } from "svelte-spa-router";
    import EditorActionButton from "../../ComponentLib/Button/EditorActionButton.svelte";
    import TopBar from "./TopBar.svelte";
    import Pane from "./Pane.svelte";
    import Controls from "./Controls.svelte";
    import Output from "./Output.svelte";
    import Simulation from "./Simulation.svelte";
    
    import { authorizedSocket, authorizedSocketNeeded, openSocketConnected } from "../../stores/socketStore";
    authorizedSocketNeeded.set(true);
    import { attachCodeEditorView, initDebugger, closeDebugger, procIsRunning, codeEditorHasChanges, saveCode, notifErr } from "../../stores/IDEStore";

	export let modeId;

    let codeEditorEl;

    //let failCount = 0;
    //function handleError(err) {
    //    if (err.success) { return; }
    //    failCount++;
    //    if (failCount < 10) {
    //        if (err.reason == "debugger not open") {
    //            if (!reconnecting) {
    //                reconnecting = true;
    //                console.log("emitting editor:open");
    //                authorizedSocket.emit("editor:open", `user/${modeId}`, (res) => {
    //                    reconnecting = false;
    //                    handleError(res);
    //                });
    //            }
    //        } else {
    //            notifErr(err);
    //        }
    //    } else {
    //        notifErr(err);
    //    }
    //}

    function startProc() {
        saveCode((res) => {
            if (!res.success) { notifErr(res); };
            console.debug("emitting editor:startmode");
            authorizedSocket.emit("editor:startmode", (res) => {
                if (!res.success) { notifErr(res); };
            });
        });
    }

    function stopProc() {
        console.debug("emitting editor:stopmode");
        authorizedSocket.emit("editor:stopmode", (res) => {
            if (!res.success) { notifErr(res); };
        });
    }

    function restartProc () {
        saveCode((res) => {
            if (!res.success) { notifErr(res); };
            console.debug("emitting editor:restartmode");
            authorizedSocket.emit("editor:restartmode", (res) => {
                if (!res.success) { notifErr(res); };
            }); 
        });
    }

    let simulationEnabled;
    let simulationToggleFn;
    let simulationBackgrounds = ["--default-bg", "black", "white"];
    let simlulationBackgroundI = 0;
    function toggleSimulationPower() { simulationToggleFn(); }
    function nextSimulationBackground() {
        simlulationBackgroundI++;
        if (simlulationBackgroundI >= simulationBackgrounds.length) {
            simlulationBackgroundI = 0;
        }
    }

    onMount(() => {
        initDebugger(modeId);
        attachCodeEditorView(codeEditorEl);
    });

    onDestroy(() => {
        closeDebugger();
    })
    
    document.addEventListener("keydown", function(e) {
        if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.keyCode == 83) {
            e.preventDefault();
            saveCode();
        }
    }, false);

    setInterval(() => {
        if ($codeEditorHasChanges) {
            saveCode();
        }
    }, 5000);
</script>

<style>
    main {
        display: grid;
        box-sizing: border-box;
        padding: 15px;
        column-gap: 15px;
        row-gap: 15px;
        grid-template-columns: 300px 1fr;
        grid-template-rows: 50% 1fr 33%;
        grid-template-areas:
            "simulation editor"
            "controls editor"
            "controls output";
        width: 100%;
        height: calc(100% - 35px);
        background-color: #333333;
        color: white;
    }
    .simulation { grid-area: simulation; }
    .controls { grid-area: controls; }
    .editor { grid-area: editor; }
    .output { grid-area: output; }

    .editor {
        overflow: auto;
    }

    @media (max-width: 800px) {
        main {
            grid-template-columns: auto;
            grid-template-areas:
                "editor"
                "editor"
                "output";  
        }
        .controls, .simulation {
            display: none;
        }
    }
</style>

<TopBar modeId={modeId} 
        hasChange={$codeEditorHasChanges}
        on:closedebugger={pop}
        on:start={startProc}
        on:stop={stopProc}
        on:restart={restartProc}
        bind:procIsRunning={$procIsRunning} />
<main>
    <div class="simulation">
        <Pane header="simulation" contentBackground={simulationBackgrounds[simlulationBackgroundI]}>
            <svelte:fragment slot="actions">
                <EditorActionButton faIcon="fas fa-tint"
                        on:click={nextSimulationBackground}
                        alt="Toggle simulation"></EditorActionButton>
                <EditorActionButton faIcon="fas fa-power-off"
                        on:click={toggleSimulationPower}
                        color={simulationEnabled ? "green" : "red"}
                        alt="Toggle simulation"></EditorActionButton>
            </svelte:fragment>
            <Simulation bind:toggleEnable={simulationToggleFn} bind:enabled={simulationEnabled} />
        </Pane>
    </div>

    <div class="controls">
        <Pane header="Controls">
            <Controls />
        </Pane>
    </div>

    <div class="editor" bind:this={codeEditorEl}></div>

    <div class="output">
        <Pane header="output" padding={false} scrollable={false}>
            <Output />
        </Pane>
    </div>
</main>
