import { writable, derived, get } from "svelte/store";
import { notif } from "./notifs";
import { authorizedSocket, authorizedSocketNeeded, openSocketConnected } from "./socketStore";
authorizedSocketNeeded.set(true)

import { EditorState, basicSetup } from "@codemirror/basic-setup"
import { EditorView, keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"
import { indentUnit } from '@codemirror/language'
import { python } from "@codemirror/lang-python"
import { HighlightStyle, tags as t } from "@codemirror/highlight"

export let socketListenersAdded = writable(false);
export let debuggerInitialised = writable(false);
export let procIsRunning = writable(false);
export let state = writable(null);
export let codeEditorViewEl = writable(null);
export let codeEditorView = writable(null);
export let codeEditorHasChanges = writable(false);

export function attachCodeEditorView(node) {
    codeEditorViewEl.set(node);
    let _codeEditorView = get(codeEditorView);
    if (_codeEditorView == null) {
        console.warn("Attempted to attach codeEditorView, but it is not initialized");
        return;
    }
    node.appendChild(_codeEditorView.dom);
    console.debug(`Attached code editor to`, node);
}

export function initDebugger(modeId) {
    if (get(debuggerInitialised)) { return; }
    debuggerInitialised.set(true);
    console.debug("emitting editor:open");
    authorizedSocket.emit("editor:open", `user/${modeId}`, (res) => {
        if (!res.success) { notifErr(res); };
    });
}

export function closeDebugger() {
    saveCode((res) => {
        if (!res.success) { notifErr(res); };
        console.debug("emitting editor:close");
        authorizedSocket.emit("editor:close", res => {
            if (!res.success) { notifErr(res); };
            debuggerInitialised.set(false);

            get(codeEditorView).destroy();
            codeEditorView.set(null);
        });
    });
}

export function saveCode(fn) {
    if (get(codeEditorView) == null) { return; }
    console.debug("emitting editor:save");
    authorizedSocket.emit("editor:save", get(state).mode, get(codeEditorView).state.doc.toString(), res => {
        if (!res.success) {
            console.error("save:code callback", res);
            notifErr(res); 
        };
        if (fn != null) { fn(res) }
    });
    codeEditorHasChanges.set(false);
}

export function notifErr(err) {
    console.error(err);
    if (err.hasOwnProperty("detail")) {
        notif({title: err.reason, type: "danger"});
    } else {
        notif({title: err.reason, text: err.detail, type: "danger"});
    }
}

function addSocketListeners() {
    if (get(socketListenersAdded)) { return; }
    socketListenersAdded.set(true);
    authorizedSocket.on("editor:debugger:state", onEditorDebuggerState);
    authorizedSocket.on("editor:code", createCodeEditor);
    console.debug("Listeners attemted added");
}

function removeSocketListeners() {
    if (!get(socketListenersAdded)) { return; }
    socketListenersAdded.set(false);
    authorizedSocket.off("editor:debugger:state", onEditorDebuggerState);
    authorizedSocket.off("editor:code", createCodeEditor);
    console.debug("Listeners attempted removed");
}

function onEditorDebuggerState(_state) {
    state.set(_state);
    procIsRunning.set(_state.running);
}

function createCodeEditor(modeId, code) {
    console.debug(`received editor:code for mode ${modeId}`);
    if (get(codeEditorView) != null) {
        get(codeEditorView).destroy();
        codeEditorView.set(null);
    }
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

    let _codeEditorView = new EditorView({
        state: EditorState.create({
            extensions: [
                basicSetup,
                keymap.of([indentWithTab]),
                python(),
                indentUnit.of("    "),
                EditorView.updateListener.of(update => {
                    if (update.docChanged) {
                        codeEditorHasChanges.set(true);
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
        })
    });
    codeEditorView.set(_codeEditorView);
    if (get(codeEditorViewEl) != null) {
        attachCodeEditorView(get(codeEditorViewEl));
    }
}

addSocketListeners();
