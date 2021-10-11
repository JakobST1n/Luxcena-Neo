<script>
    import { onMount } from "svelte";
	import dialogPolyfill from 'dialog-polyfill'
    import Button from "../../ComponentLib/Button/Button.svelte";
    import { authorizedSocket } from "../../stores/socketStore.js";
    import { notif } from "../../stores/notifs";

    export let username = null;

    let modal;
    let password = "";
    let newUser = username == null;

    function open() {
        modal.showModal()
    }
    function register(node) {
        dialogPolyfill.registerDialog(node);
    }

    function updateUser() {
        authorizedSocket.emit("user:newpassword", username, password, (res) => {
            if (!res.success) { notif({title: res.reason}); }
            modal.close();
        });
    }

    function createUser() {
        authorizedSocket.emit("user:create", username, password, (res) => {
            if (!res.success) { notif({title: res.reason}); }
            modal.close();
        });
    }
</script>

<style>
    dialog {
        padding: 0;
        border: none;
        border-radius: 15px;
    }
    h2 {
        margin: 0;
    }
    .content {
        padding: 15px;
        box-sizing: border-box;
    }
    input {
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
    <div class="content">
        <h2>
            {#if newUser}
            Create user
            {:else}
            Edit user
            {/if}
        </h2>
        <label for="username">Username</label>
        <input  type="text" id="username" placeholder="username" bind:value={username} disabled="{!newUser}" />
        <label for="password">password</label>
        <input  type="password" id="password" bind:value={password} />
    </div>
    <div class="buttons">
        <div><Button fullWidth=true on:click={() => modal.close() } color={"var(--theme-primary)"} backgroundColor={"white"}>Cancel</Button></div>
        {#if newUser}
        <div><Button fullWidth=true on:click={createUser}>Create</Button></div>
        {:else}
        <div><Button fullWidth=true on:click={updateUser}>Update</Button></div>
        {/if}
    </div>

</dialog>