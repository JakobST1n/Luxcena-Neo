<script>
    import { onMount } from "svelte";

    import FloatingButton from "../../ComponentLib/Button/FloatingButton.svelte";
    import ConfirmActionDialog from "../Dialogs/ConfirmActionDialog.svelte";
    import { authorizedSocket } from "../../stores/socketStore.js";

    let isValid = false;
    let CN = "-";
    let validTime = "-";

    authorizedSocket.on("sslcert:info", (status) => {
        isValid = status.isValid;
        CN = status.CN;
        validTime = Math.round((status.certExpire-(new Date()).getTime())/86400000);
    });

    let newCertPromise;
    function generateNewCert() {
        newCertPromise = new Promise((resolve, reject) => {
            authorizedSocket.emit("sslcert:generate_new", () => {
                resolve();
            });
        });
    }

    onMount(async() => {
        authorizedSocket.emit("sslcert:info");
    });
</script>

<style>
    h1 { margin-bottom: 0; }
    p { margin: 0; }
    .small {
        font-weight: 100;
        font-style: italic;
        font-size: 12px;
        color: var(--grey-600);
    }
    .button {
        margin-top: 10px;
    }
</style>

<div>
    <h1>SSL Certificate</h1>
    <p>{isValid ? "VALID" : "INVALID"} <span class="small">(for {validTime} days)</span></p>
    <p><span class="small">CN</span> {CN}</p>

    <ConfirmActionDialog title="Are you sure?" text="Are you sure you want to generate new self signed SSL Certificate?" action={generateNewCert}>
        <svelte:fragment slot="trigger" let:open>
            <div class="button"><FloatingButton on:click={open} bind:loadingPromise={newCertPromise} fullWidth=true>Generate new cerificate</FloatingButton></div>
        </svelte:fragment>
    </ConfirmActionDialog>
    <!-- <div class="button"><Button fullWidth=true round=true>Show details</Button></div> -->
</div>
