<script>
    import { fade } from 'svelte/transition';
    export let id;
    export let ledCount;
</script>

<style>
    div {
        display: flex;
        flex-direction: column;
    }
    input {
        display: inline-block;
        padding: 10px 10px 10px 10px;
        width: 38px;
        text-align: right;
        background-color: var(--grey-300);
        border: none;
        border-radius: 5px 5px 0 0;
        margin: 0;
    }
    input:focus {
        outline: none;
        background-color: var(--grey-400);
    }
    span {
        background-color: var(--grey-500);
        font-size: 12px;
        padding: 2px;
        border-radius: 0 0 5px 5px;
        text-align: center;
    }
</style>

<div transition:fade|local>
    <input on:change on:blur type="number" data-id={id} step=1 bind:value={ledCount} />
    <span>{id}</span>
</div>