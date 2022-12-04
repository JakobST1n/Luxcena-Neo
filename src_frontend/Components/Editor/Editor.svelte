<script context="module">
    let debuggerInitialised = false;
</script>
<script>
    import { onMount, onDestroy } from "svelte";
    import { get } from "svelte/store";
	import { pop } from "svelte-spa-router";
    import { EditorState, basicSetup } from "@codemirror/basic-setup"
    import { EditorView, keymap } from "@codemirror/view"
    import { indentWithTab } from "@codemirror/commands"
    import { indentUnit } from '@codemirror/language'
    import { python } from "@codemirror/lang-python"
    import { HighlightStyle, tags as t } from "@codemirror/highlight"
    import { notif } from "../../stores/notifs";
    import EditorActionButton from "../../ComponentLib/Button/EditorActionButton.svelte";
    import TopBar from "./TopBar.svelte";
    import Pane from "./Pane.svelte";
    import Controls from "./Controls.svelte";
    import Output from "./Output.svelte";
    import Simulation from "./Simulation.svelte";
    
    import { authorizedSocket, authorizedSocketNeeded, openSocketConnected } from "../../stores/socketStore";
    authorizedSocketNeeded.set(true);

	export let modeId;

    let codeEditorView;
    let codeEditorEl;
    let codeEditorHasChanges = false;
    let procIsRunning = false;
    let failCount = 0;
    let reconnecting = false;

    function initDebugger() {
        if (debuggerInitialised) { return; }
        debuggerInitialised = true;
        console.log("emitting editor:open");
        authorizedSocket.emit("editor:open", `user/${modeId}`, (res) => {
            handleError(res);
        });
    }

    function notifErr(err) {
        if (err.hasOwnProperty("detail")) {
            notif({title: err.reason, type: "danger"});
        } else {
            notif({title: err.reason, text: err.detail, type: "danger"});
        }
    }

    function handleError(err) {
        if (err.success) { return; }
        failCount++;
        if (failCount < 10) {
            if (err.reason == "debugger not open") {
                if (!reconnecting) {
                    reconnecting = true;
                    console.log("emitting editor:open");
                    authorizedSocket.emit("editor:open", `user/${modeId}`, (res) => {
                        reconnecting = false;
                        handleError(res);
                    });
                }
            } else {
                notifErr(err);
            }
        } else {
            notifErr(err);
        }
    }

    authorizedSocket.on("editor:code", (modeId, code) => {
        console.log("received editor:code");
        const chalky = "#e5c07b",
              coral = "#e06c75",
              cyan = "#56b6c2",
              invalid = "#ffffff",
              ivory = "#abb2bf",
              stone = "#7d8799", 
              malibu = "#61afef",
              sage = "#98c379",
              whiskey = "#d19a66",
              violet = "#c678dd",
              darkBackground = "#21252b",
              highlightBackground = "#2c313a",
              background = "#282c34",
              selection = "#3E4451",
              cursor = "#528bff"

        codeEditorView = new EditorView({
            state: EditorState.create({
                extensions: [
                    basicSetup,
                    keymap.of([indentWithTab]),
                    python(),
                    indentUnit.of("    "),
                    EditorView.updateListener.of(update => {
                        if (update.docChanged) {
                            codeEditorHasChanges = true;
                        }
                    }),
                    EditorView.theme({
                        "&": {
                            color: ivory,
                        },

                        ".cm-content": {
                            caretColor: cursor
                        },

                        "&.cm-focused .cm-cursor": {borderLeftColor: cursor},
                        "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {backgroundColor: selection},

                        ".cm-panels": {backgroundColor: darkBackground, color: ivory},
                        ".cm-panels.cm-panels-top": {borderBottom: "2px solid black"},
                        ".cm-panels.cm-panels-bottom": {borderTop: "2px solid black"},

                        ".cm-searchMatch": {
                            backgroundColor: "#72a1ff59",
                            outline: "1px solid #457dff"
                        },
                        ".cm-searchMatch.cm-searchMatch-selected": {
                            backgroundColor: "#6199ff2f"
                        },

                        ".cm-activeLine": {backgroundColor: highlightBackground},
                        ".cm-selectionMatch": {backgroundColor: "#aafe661a"},

                        ".cm-matchingBracket, .cm-nonmatchingBracket": {
                            backgroundColor: "#bad0f847",
                            outline: "1px solid #515a6b"
                        },

                        ".cm-gutters": {
                            backgroundColor: "transparent",
                            color: stone,
                            border: "none"
                        },

                        ".cm-activeLineGutter": {
                            backgroundColor: highlightBackground
                        },

                        ".cm-foldPlaceholder": {
                            backgroundColor: "transparent",
                            border: "none",
                            color: "#ddd"
                        },

                        ".cm-tooltip": {
                            border: "1px solid #181a1f",
                            backgroundColor: darkBackground
                        },
                        ".cm-tooltip-autocomplete": {
                            "& > ul > li[aria-selected]": {
                                backgroundColor: highlightBackground,
                                color: ivory
                            }
                        }
                    }, {dark:true}),
                    HighlightStyle.define([
                        {tag: t.keyword,
                         color: violet},
                        {tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
                         color: coral},
                        {tag: [t.function(t.variableName), t.labelName],
                         color: malibu},
                        {tag: [t.color, t.constant(t.name), t.standard(t.name)],
                         color: whiskey},
                        {tag: [t.definition(t.name), t.separator],
                         color: ivory},
                        {tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
                         color: chalky},
                        {tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
                         color: cyan},
                        {tag: [t.meta, t.comment],
                         color: stone},
                        {tag: t.strong,
                         fontWeight: "bold"},
                        {tag: t.emphasis,
                         fontStyle: "italic"},
                        {tag: t.strikethrough,
                         textDecoration: "line-through"},
                        {tag: t.link,
                         color: stone,
                         textDecoration: "underline"},
                        {tag: t.heading,
                         fontWeight: "bold",
                         color: coral},
                        {tag: [t.atom, t.bool, t.special(t.variableName)],
                         color: whiskey },
                        {tag: [t.processingInstruction, t.string, t.inserted],
                         color: sage},
                        {tag: t.invalid,
                         color: invalid},
                    ]),
                ],
                doc: code
            }),
            parent: codeEditorEl
        })
    });
    authorizedSocket.on("editor:proc:start", () => {
        console.log("received editor:proc:start");
        procIsRunning = true
    });
    authorizedSocket.on("editor:proc:exit", (code) => {
        console.log("received editor:proc:exit");
        procIsRunning = false;
    });

    function startProc() {
        saveCode((res) => {
            handleError(res);
            console.log("emitting editor:startmode");
            authorizedSocket.emit("editor:startmode", (res) => {
                handleError(res);
            });
        });
    }

    function stopProc() {
        console.log("emitting editor:stopmode");
        authorizedSocket.emit("editor:stopmode", (res) => {
            handleError(res);
        });
    }

    function restartProc () {
        saveCode((res) => {
            handleError(res);
            console.log("emitting editor:restartmode");
            authorizedSocket.emit("editor:restartmode", (res) => {
                handleError(res);
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

    function saveCode(fn) {
        if (codeEditorView == null) { return; }
        console.log("emitting editor:save");
        authorizedSocket.emit("editor:save", `user/${modeId}`, codeEditorView.state.doc.toString(), res => {
            handleError(res);
            if (fn != null) { fn(res) }
        });
        codeEditorHasChanges = false;
    }

    function closeDebugger() {
        saveCode((res) => {
            handleError(res);
            console.log("emitting editor:close");
            authorizedSocket.emit("editor:close", res => {
                handleError(res);
                debuggerInitialised = false;
            });
        });
    }

    onMount(() => {
        codeEditorHasChanges = false;
        procIsRunning = false;
        failCount = 0;
        reconnecting = false;
        initDebugger();
    });

    onDestroy(() => {
        if (get(openSocketConnected)) {
            closeDebugger();
        } else {
            debuggerInitialised = false;
        }
    })
    
    document.addEventListener("keydown", function(e) {
        if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.keyCode == 83) {
            e.preventDefault();
            saveCode();
        }
    }, false);

    setInterval(() => {
        if (codeEditorHasChanges) {
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
        hasChange={codeEditorHasChanges}
        on:closedebugger={pop}
        on:start={startProc}
        on:stop={stopProc}
        on:restart={restartProc}
        bind:procIsRunning={procIsRunning} />
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
