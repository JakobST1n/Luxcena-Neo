<script>
    export let varText;
    let prettyVarText;

    function prettify(text) {
        try {
            prettyVarText = text.replace("_", " ");
            prettyVarText = prettyVarText.charAt(0).toUpperCase() + prettyVarText.slice(1);
        } catch {
            prettyVarText = varText;
        }
    }
    $: prettify(varText);
</script>

{prettyVarText}
