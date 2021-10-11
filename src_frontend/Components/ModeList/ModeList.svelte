<script>
    import { onMount } from "svelte";
    import { fade } from 'svelte/transition';
    import FloatingButton from "../../ComponentLib/Button/FloatingButton.svelte";
    import Mode from "./Mode.svelte";
    import NewModeDialog from "./NewModeDialog.svelte";
    
    import { openSocket, authorizedSocket, authorizedSocketNeeded } from "../../stores/socketStore.js";
	authorizedSocketNeeded.set(true);

    let userModes = [];
    let remotes = [];

    openSocket.on("modelist", (modes) => {
        userModes = [];
        remotes = [];
        for (let i = 0; i < modes.length; i++) {
            if (modes[i].substr(0, 4) === "user") {
                userModes.push(modes[i].replace("user/", ""));
            }
            if (modes[i].substr(0, 6) === "remote") {
                remotes.push(modes[i].replace("remote/", ""));
            }
        }
    });
    onMount(async() => {
        openSocket.emit("modelist:get");
    });
</script>

<style>
    .wrapper {
        padding-bottom: var(--theme-padding);
    }
    .modes > * {
        margin-bottom: 10px;
    }
    .button_menu {
        margin-top: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<div class="wrapper">
    <h1>Modes</h1>
    <div class="modes">
        {#each userModes as mode}
            <div>
                <Mode id={mode} />
            </div>
        {/each}
    </div>

    <div class="button_menu">
        <NewModeDialog>
            <svelte:fragment slot="trigger" let:open>
                <FloatingButton on:click={open} faIcon="fas fa-plus" label="NEW" />  
            </svelte:fragment>
        </NewModeDialog>
    </div>
</div>