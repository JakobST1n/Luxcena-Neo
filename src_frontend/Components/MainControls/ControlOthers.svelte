<script>
	import { openSocket } from "../../stores/socketStore";
    import Toggle from "../../ComponentLib/Toggle.svelte";

    export let variables = {};

    function setVar(ev) {
        if (ev.target.type == "checkbox") {
            openSocket.emit("var:set", ev.target.id, ev.target.checked);
        } else {
            openSocket.emit("var:set", ev.target.id, ev.target.value);
        }
    };
</script>

<style>
    .wrapper {
        width: 100%;
        box-sizing: border-box;
        border-radius: 15px;
        margin-top: 15px;
        padding: 15px;
        text-align: left;
    }
    label {
        width: 100%;
    }
    .var-group {
        display: flex;
        margin-top: 5px;
    }
    input {
        width: 100%;
    }
    button {
        width: 100%;
        padding: 10px;
        background-color: var(--grey-300);
        border: none;
        border-radius: 15px;
        margin-top: 5px;
    }
    button:hover { filter: brightness(0.9); }
    button:active { filter: brightness(0.85); }

</style>

<div class="wrapper drop-shadow">
    {#each Object.entries(variables) as [name, value]}
    <div class:var-group={["BOOL"].includes(value.type)}>
        {#if !["TRIGGER"].includes(value.type)}
        <label for={name}>{name}</label>
        {/if}

        {#if value.type == "INT"}
        <div class="var-group">
            <input type="range" id={name} min={value.min} max={value.max} bind:value={value.value} on:change={setVar}>
            {value.value}
        </div>
        {:else if value.type == "FLOAT"}
        <div class="var-group">
            <input type="range" id={name} min={value.min} max={value.max} step={value.step} bind:value={value.value} on:change={setVar}>
            {value.value}
        </div>
        {:else if value.type == "BOOL"}
        <Toggle id="{name}" bind:checked={value.value} on:change={setVar} />
        {:else if value.type == "TRIGGER"}
            <button type="button" id="{name}" value="true" on:click={setVar}>Trigger {name}</button>
        {:else}
            <input type="text" id={name} bind:value={value.value} on:blur={setVar} />
        {/if}
    </div>
    {/each}
</div>