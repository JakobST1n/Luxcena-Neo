<script>
    import { onMount } from "svelte";
	import dialogPolyfill from 'dialog-polyfill'
    import Button from "../../ComponentLib/Button/Button.svelte";
    import PrettyVar from "../../ComponentLib/PrettyVar.svelte";
    import { openSocket, authorizedSocket } from "../../stores/socketStore.js";
    import { notif } from "../../stores/notifs";

    let modal;
    let activeTab = 0;
    let name;
    let sourceMode;

    function open() {
        modal.showModal()
    }
    function register(node) {
        dialogPolyfill.registerDialog(node);
    }
    function createMode() {
        let template = "template/base";
        if (activeTab == 1) {
            template = sourceMode;
        }
        authorizedSocket.emit("mode:create", name, template, (res) => {
            if (!res.success) {
                notif({title: "Error", text: "Could not create mode...", type: "danger"})
            };

            modal.close();
        });
    }

    let builtinModes = [];
    let userModes = [];
    // let remoteModes = [];
    openSocket.on("modelist", (modes) => {
        builtinModes = [];
        userModes = [];
        for (let i = 0; i < modes.length; i++) {
            if (modes[i].substr(0, 8) === "builtin/") {
                builtinModes.push([modes[i], modes[i].replace("builtin/", "")]);
            }
            if (modes[i].substr(0, 5) === "user/") {
                userModes.push([modes[i], modes[i].replace("user/", "")]);
            }
            // if (modes[i].substr(0, 6) === "remote") {
            //     remotes.push(modes[i].replace("", ""));
            // }
        }
    });
    onMount(async() => {
        openSocket.emit("modelist:get");
    })
</script>

<style>
    dialog {
        padding: 0;
        border: none;
        border-radius: 15px;
    }
    .tabs {
        display: flex;
        width: 100%;
    }
    .tabs i {
        position: relative;
        flex-grow: 1;
        text-align: center;
        font-size: 20px;
        padding: 15px;
    }
    .tabs i:hover {
        color: var(--theme-primary);
    }
    .tabs i.active {
        color: var(--theme-primary);
    }
    .tabs > *:not(:last-child):after {
        content: "";
        position: absolute;
        width: 1px;
        height: 43%;
        border-left: 0.1px solid var(--grey-400);
        left: 100%;
    }
    .divider-h {
        margin-left: 15px;
        margin-right: 15px;
        border-top: 0.01px solid var(--grey-400);
    }
    .content {
        padding: 15px;
        box-sizing: border-box;
    }
    input, select {
        display: block;
        width: 100%;
        box-sizing: border-box;
    }
    .buttons {
        padding: 0 15px 15px 15px;
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

    <div class="tabs">
        <i class:active={activeTab == 0} on:click={() => { activeTab = 0; }} class="far fa-file"></i>
        <i class:active={activeTab == 1} on:click={() => { activeTab = 1; }} class="far fa-clone"></i> 
    </div>
 
    <div class="divider-h"></div>
    <div class="content">
        {#if [0, 1].includes(activeTab)}
        <div>
            <label for="fname">Mode name</label>
            <input  type="text" id="fname" placeholder="My_Awesome_New_Mode" bind:value={name} />
            {#if activeTab == 1}
            <label for="sourcemode">Source</label>
            <select bind:value={sourceMode}>
                <optgroup label="builtin">
                    {#each builtinModes as mode}
                    <option value={mode[0]}><PrettyVar varText={mode[1]} /></option>
                    {/each}
                </optgroup>
                <optgroup label="user">
                    {#each userModes as mode}
                    <option value={mode[0]}><PrettyVar varText={mode[1]} /></option>
                    {/each}
                </optgroup>
            </select>
            {/if}
        </div>
        {/if}
    </div>
    <div class="buttons">
        <div><Button fullWidth=true on:click={() => modal.close() } color={"var(--theme-primary)"} backgroundColor={"white"}>Cancel</Button></div>
        <div><Button fullWidth=true on:click={createMode}>Create</Button></div>
    </div>

</dialog>