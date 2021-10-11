<script>
    import FloatingButton from "../../ComponentLib/Button/FloatingButton.svelte";
    import ConfirmActionDialog from "../Dialogs/ConfirmActionDialog.svelte";
    import { authorizedSocket } from "../../stores/socketStore.js";

    function restartSystem() {
        authorizedSocket.emit("restart:system");
    }
    function restartService() {
        authorizedSocket.emit("restart:service");
    }

</script>

<style>
    h1, p {
        margin-bottom: 10px;
    }
    .button { margin-bottom: 10px; }
</style>

<div>
    <h1>System restart</h1>
    <ConfirmActionDialog title="Are you sure?" text="Are you sure you want to restart the rPI?" action={restartSystem}>
        <svelte:fragment slot="trigger" let:open>
            <div class="button"><FloatingButton on:click={open} fullWidth=true>Restart system</FloatingButton></div>
        </svelte:fragment>
    </ConfirmActionDialog>
    <ConfirmActionDialog title="Are you sure?" text="Are you sure you want to restart the Luxcena NEO service?" action={restartService}>
        <svelte:fragment slot="trigger" let:open>
            <div class="button"><FloatingButton on:click={open} fullWidth=true>Restart service</FloatingButton></div>
        </svelte:fragment>
    </ConfirmActionDialog>
</div>