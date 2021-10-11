<script>
    import NotifsWrapper from "../Components/Notifs/NotifsWrapper.svelte";
    import MainMenu from "../Components/MainMenu.svelte";
    import Drawer from "./Drawer.svelte";

    let drawerOpen;

    function toggleDrawer() {
        drawerOpen = !drawerOpen;
    }
</script>

<style>
    main {
        background-color: #3c3b3b;
        height: 100%;
        width: 100%;
    }
    .header {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: var(--theme-phone-header-height);
        color: white;
    }
    .header > * {
        margin: auto;
    }
    .header > div:first-child, .header > div:last-child {
        margin-left: 15px;
        margin-right: 15px;
    }
</style>

<NotifsWrapper />
<main>
    <div class="header">
        <div><!--<i class="fas fa-chevron-left"></i>--></div>
        <div>Luxcena NEO</div>
        <div on:click={toggleDrawer}><i class="fas fa-bars"></i></div>
    </div>
    <MainMenu />

    <Drawer bind:open={drawerOpen}>
        <slot></slot>
    </Drawer>
</main>