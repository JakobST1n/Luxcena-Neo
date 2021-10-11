<script>
    import { onMount } from "svelte";
    import { authorizedSocket, authorizedSocketNeeded, user } from "../../stores/socketStore.js";
    authorizedSocketNeeded.set(true);
    import CreateEditUser from "./CreateEditUser.svelte";
    import ConfirmActionDialog from "../Dialogs/ConfirmActionDialog.svelte";
    import FloatingButton from "../../ComponentLib/Button/FloatingButton.svelte";


    let usersList = [];

    function deleteUser(username) {
        authorizedSocket.emit("user:delete", username, (res) => {
            if (!res.success) { notif({title: res.reason}); }
        });
    };

    authorizedSocket.on("users", (users) => {
        usersList = users;
    });

    onMount(() => {
        authorizedSocket.emit("users:get");
    });
</script>

<style>
    h1 {
        margin: 0;
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    li {
        width: 100%;
        display: flex;
        padding: 10px 10px;
        border-radius: 5px;
        align-items:center;
        box-sizing: border-box;
    }
    li:hover {
        background-color: var(--grey-100);
    }
    li:not(:last-child) {
        border-bottom: 0.5px solid var(--grey-400);
    }
    .align-right { margin-left: auto; }
    button {
        background-color: transparent;
        border: none;
        padding: 10px;
        border-radius: 50%;
    }
    button:hover {
        background-color: var(--grey-300);
    }
    button:active {
        background-color: var(--grey-400);
    }
</style>

<div>
    <h1>Users</h1>
    <ul>
    {#each usersList as _user}
        <li>
            {_user}
            <div class="align-right">
                {#if $user?.username != _user}
                <ConfirmActionDialog title="Are you sure?" text="Are you sure you want to delete {_user}" action={() => {deleteUser(_user)}}>
                    <svelte:fragment slot="trigger" let:open>
                        <button on:click={open}><i class="fas fa-trash"></i></button>
                    </svelte:fragment>
                </ConfirmActionDialog>
                {/if}
                <CreateEditUser username={_user}>
                    <svelte:fragment slot="trigger" let:open>
                        <button on:click={open}><i class="fas fa-edit"></i></button>
                    </svelte:fragment>
                </CreateEditUser>
            </div>
        </li>
    {/each}
    </ul>
    <CreateEditUser>
        <svelte:fragment slot="trigger" let:open>
            <div class="button"><FloatingButton on:click={open} fullWidth=true>Create new user</FloatingButton></div>
        </svelte:fragment>
    </CreateEditUser>
</div>