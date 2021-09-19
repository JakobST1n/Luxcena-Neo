<script>
	import { push } from "svelte-spa-router";
    import ConfirmActionDialog from "../Dialogs/ConfirmActionDialog.svelte";
    import { authorizedSocket } from "../../stores/socketStore.js";
    import { notif } from "../../stores/notifs";
    export let id;

    function deleteMode() {
        authorizedSocket.emit("mode:delete", `user/${id}`, (res) => {
            if (!res.success) {
                notif({title: "Error", text: "Could not delete mode...", type: "danger"})
                console.log(res);
            }
        });
    }
</script>

<style>
    .wrapper {
        width: 100%;
        padding: var(--theme-padding);
        box-sizing: border-box;
        border-radius: 15px;

        display: flex;
        align-items: center;
    }
    .right {
        margin-left: auto;
    }
    button {
        border: none;
        background-color: white;
        background-color: transparent;
        border: none;
        padding: 10px;
        border-radius: 15px;
    }
    button:hover {
        background-color: var(--grey-300);
    }
    button:active {
        background-color: var(--grey-400);
    }
</style>

<div class="wrapper drop-shadow">
    {id}
    <div class="right">
        <ConfirmActionDialog title="Are you sure?" text="Are you sure you want to delete {id}" action={deleteMode}>
            <svelte:fragment slot="trigger" let:open>
                <button on:click={open}><i class="fas fa-trash"></i></button>
            </svelte:fragment>
        </ConfirmActionDialog>
        <button on:click={() => {push(`/editor/${id}`)}}><i class="fas fa-edit"></i></button>
    </div>
</div>