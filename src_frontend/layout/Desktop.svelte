<script>
    import ControlComponents from "../Components/MainControls/ControlComponents.svelte";
    import MainMenu from "../Components/MainMenu.svelte";
    import NotifsWrapper from "../Components/Notifs/NotifsWrapper.svelte";
</script>

<style>
    .controls {
        background-color: white;
        position: fixed;
        width: 300px;
        padding: 15px;
        left: 50px;
        top: 50px;
        bottom: 50px;

        overflow: auto;
        border-radius: 15px;
        max-height: 500px;
    }

    @media (min-height: 600px) {
        .controls {
            height: 500px;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    .content {
        margin-left: 400px;
        height: 100%;
        overflow: auto;
        margin-top: 35px;
        margin-bottom: 15px;
        margin-right: 185px;
        padding: 15px;
    }
</style>

<NotifsWrapper />
<div>
    <MainMenu />
    <div class="controls drop-shadow"><ControlComponents /></div>
    <div class="content">
        <slot></slot>
    </div>
</div>