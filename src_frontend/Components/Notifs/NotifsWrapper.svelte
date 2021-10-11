<script>
    import { notifs } from "../../stores/notifs";
    import Notif from "./Notif.svelte";
    export let position = "bottom-center";
    $: transitionType = position === "bottom-center" ? "fade" : "fly";
</script>

<style>
.notifications {
    position: absolute;
    z-index: 999;
}
.bottom-center {
    bottom: 20px;
    left: 5vw;
    width: 90vw;
}
.top-right {
    top: 20px;
    right: 20px;
}
</style>

<div class="notifications {position}">
{#each $notifs as notification (notification.id)}
    <Notif
    nid={notification.id}
    text={notification.text}
    title={notification.title}
    type={notification.type}
    {transitionType} />
{/each}
</div>