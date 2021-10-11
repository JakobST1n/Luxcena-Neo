<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let segmentId;
    export let inverted;

    function toggleInvert() {
        inverted = !inverted;
        dispatch("change");
    }

    function forwardOnChange() {
        dispatch("change")
    }
</script>

<style>
    div {
        display: flex;
    }
    input {
        padding: 10px 0 10px 10px;
        width: 38px;
        text-align: center;
        background-color: var(--grey-300);
        border: none;
        border-radius: 5px 0 0 5px;
        margin-right: -5px;
        transition: background-color 0.5s ease;
    }
    input:focus {
        outline: none;
        background-color: var(--grey-400);
    }
    button {
        background-color: var(--grey-300);
        border: none;
        border-radius: 0 10px 10px 0;
        padding: 10 5px;
        margin-left: 0;
    }
    .inverted input, .inverted button{
        background-color: var(--amber-500);
    }
    button:hover {
        background-color: var(--grey-400);
    }
    button:active {
        background-color: var(--grey-500);
    }
</style>

<div class:inverted={inverted}>
    <input on:change={forwardOnChange} on:blur={forwardOnChange} type="number" step=1 bind:value={segmentId} />
    <button on:click={toggleInvert}><i class="fas fa-exchange-alt"></i></button>
</div>