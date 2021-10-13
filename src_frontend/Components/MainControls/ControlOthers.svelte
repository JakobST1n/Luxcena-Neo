<script>

    // This is a list of variables that we can change
    export let variables = [
        {id: 1, name: "Speed", type: "range", value: 20, min: 0, max: 100},
        {id: 2, name: "Tingle intensity", type: "range", value: 40, min: 0, max: 255},
        {id: 3, name: "Amount of tingle", type: "range", value: 90, min: 0, max: 100},
        {id: 4, name: "Variable of unknown type", type: "date", value: "January"}
    ];

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
    input {
        width: 100%;
    }
</style>

<div class="wrapper drop-shadow">
    {#each variables as variable}
        <label for={variable.id}>{variable.name}</label>
        {#if variable.type == "range"}
            <input type="range" id={variable.id} min={variable.min} max={variable.max} value={variable.value}>
        {:else}
            <input type="text" id={variable.id} value={variable.value} />
        {/if}
    {/each}
</div>