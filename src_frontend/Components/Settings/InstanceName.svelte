<script>
    import { onMount } from "svelte";
    import { openSocket, authorizedSocket } from "../../stores/socketStore.js";

    let name = "-";

    openSocket.on("name", (_name) => name = _name);

    function saveName() {
        authorizedSocket.emit("name:set", name, (res) => {});
    }

    onMount(async() => {
        openSocket.emit("name:get");
    });
</script>

<style>
    div {
        margin-bottom: 15px;
    }
    h1 { margin-bottom: 0; }
    input {
        background-color: var(--grey-200);
        border-radius: 15px;
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        border: none;
    }
</style>

<div>
    <h1>Name</h1>
    <input type="text" bind:value={name} on:change={saveName} />
</div>
