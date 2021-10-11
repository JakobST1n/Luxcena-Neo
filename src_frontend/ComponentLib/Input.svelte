<script>
    export let fullWidth = true;
    export let type = "text";
    export let id;
    export let value
</script>

<style>

</style>

<div>
    <input type={type} id={id} bind:value={value} />
</div>