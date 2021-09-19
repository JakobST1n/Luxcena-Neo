<script>
    import Editor from "../Components/Editor/Editor.svelte";
    import NotifsWrapper from "../Components/Notifs/NotifsWrapper.svelte";
	export let params;
    let modeId = params.wild;
</script>

<NotifsWrapper position="top-right" />
<Editor modeId={modeId} />