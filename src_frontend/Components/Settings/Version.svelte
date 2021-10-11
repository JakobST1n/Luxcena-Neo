<script>
    import { onMount } from 'svelte';
    import FloatingButton from "../../ComponentLib/Button/FloatingButton.svelte";
    import PrettyVar from "../../ComponentLib/PrettyVar.svelte";
    import { authorizedSocket } from "../../stores/socketStore.js";

    let version = "-";
    let branch = "-";
    let newVer = "-";
    
    authorizedSocket.on("version:branch", _branch => branch = _branch);
    authorizedSocket.on("version:current_number", _version => version = _version);
    authorizedSocket.on("version:newest_number", _version => newVer = _version);

    let checkVersionPromise;
    function checkForUpdate() {
        checkVersionPromise = new Promise((resolve, reject) => {
            authorizedSocket.emit("version:check_for_update", () => {
                resolve();
            });
        });
    }

    let updateVersionPromise;
    function doUpdate() {
        authorizedSocket.emit("system:update_version");
    }
    
    onMount(async() => {
        authorizedSocket.emit("version:branch");
        authorizedSocket.emit("version:current_number");
        authorizedSocket.emit("version:newest_number");
    });
</script>

<style>
    h1, p { margin: 0; }
    .label {
        font-weight: 100;
        font-style: italic;
        color: var(--grey-600);
    }
    .button-row {
        /* display: flex; */
        margin-top: 20px;
        width: 100%;
        /* justify-content: center; */
        /* align-items: center; */
    }
    .update-available {
        color: var(--green-300);
    }
</style>

<div>
    <h1>Version</h1>
    <p><span class="label">Current version</span> <PrettyVar varText={version}/></p>
    <p><span class="label">Current branch</span> <PrettyVar bind:varText={branch}/></p>
    {#if newVer != version}
    <p><span class="update-available">Version <PrettyVar bind:varText={newVer} /> available.</span></p>
    <FloatingButton on:click={doUpdate} bind:loadingPromise={updateVersionPromise} fullWidth=true>Update luxcena-neo</FloatingButton>
    {/if}
    <div class="button-row">
        <FloatingButton on:click={checkForUpdate} bind:loadingPromise={checkVersionPromise} fullWidth=true>Check for updates</FloatingButton>
    </div>
</div>