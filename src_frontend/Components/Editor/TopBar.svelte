<script>
    import { onMount } from "svelte";
    import { createEventDispatcher } from 'svelte';
	import { pop } from "svelte-spa-router";
    import PrettyVar from "../../ComponentLib/PrettyVar.svelte";

    const dispatch = createEventDispatcher();

    export let modeId;
    export let hasChange = false;
    export let procIsRunning = false;
</script>

<style>
    .topbar {
        display: flex;
        background-color: #444242;
        height: 35px;
        box-sizing: border-box;
        padding: 10px;
        font-size: 12px;
        color: white;
    }
    .topbar .title { margin: auto; }
    .savestatus {
        font-size: 10px;
        color: var(--grey-400);
    }
    button {
        background: #444242;
        border: none;
        color: white;
    }
    button i {
        margin-right: 5px;
    }
    button:hover {
        filter: brightness(0.95);
    }
    button:active {
        filter: brightness(0.90);
    }
</style>

<div class="topbar">
    <div><button on:click={() => dispatch("closedebugger")}><i class="fas fa-chevron-left"></i></button></div>
    <div class="title">
        <span class="filename"><PrettyVar varText={modeId} /></span>
        <span class="savestatus">
            {#if hasChange}
            (not saved)
            {/if}
        </span>
    </div>
    <div>
        {#if procIsRunning}
        <button on:click={() => dispatch("restart")}><i class="fas fa-sync-alt"></i>Restart</button>
        <button on:click={() => dispatch("stop")}><i class="fas fa-stop"></i>Stop</button>
        {:else}
        <button on:click={() => dispatch("start")}><i class="fas fa-play"></i>Start</button>
        {/if}
    </div>
</div>
