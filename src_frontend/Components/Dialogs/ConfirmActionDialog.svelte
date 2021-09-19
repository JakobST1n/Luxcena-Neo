<script>
    import { onMount } from "svelte";
	import dialogPolyfill from 'dialog-polyfill'
    import Button from "../../ComponentLib/Button/Button.svelte";
    
    export let title = "Are you sure?";
    export let text = "Are you sure you want to delete the galaxy?";
    export let defaultAction = false;
    export let action = () => console.log("No action specified");

    let modal;
    let activeTab = 0;
    let name;
    let sourceMode;

    function open() {
        modal.showModal()
    }
    function confirm() {
        modal.close();
        action();
    }
    function register(node) {
        dialogPolyfill.registerDialog(node);
    }
</script>

<style>
    dialog {
        padding: 15px;
        border: none;
        border-radius: 15px;
    }
    h2 {
        margin: 0;
    }
    .buttons {
        display: flex;
    }
    .buttons > * {
        flex-grow: 1;
    }
    .buttons > *:not(:last-child) {
        margin-right: 5px;
    }
    .buttons > *:not(:first-child) {
        margin-left: 5px;
    }
</style>

<slot name="trigger" {open}></slot>
<dialog bind:this={modal} use:register>
    <h2>{title}</h2>
    <p>{text}</p>
    <div class="buttons">
        <div><Button fullWidth=true on:click={confirm}  color={"var(--theme-primary)"} backgroundColor={"white"}>Yes</Button></div>
        <div><Button fullWidth=true on:click={() => modal.close() }>No</Button></div>
    </div>
</dialog>