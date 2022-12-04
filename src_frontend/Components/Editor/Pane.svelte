<script>
    export let header;
    export let padding = true;
    export let scrollable = true;

    export let contentBackground = "--default-bg";
</script>

<style>
    .box {
        --default-bg: #444242;
        background-color: var(--default-bg, #444242);
        border-radius: 5px;
        height: 100%;
    }
    .header {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #333333; 
        display: flex;
        align-items: baseline;
    }
    .header h1 {
        margin: 0;
        margin-right: auto;
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
    }
    .content {
        background-color: var(--content-bg, #444242);
        height: calc(100% - 35px);
        width: 100%;
        box-sizing: border-box;
    }
    .padding { padding: 15px; } 
    .scrollable { overflow: auto; }
</style>

<div class="box" style="--content-bg: {contentBackground}">
    <div class="header">
        <h1>{header}</h1>
        <slot name="actions"></slot>
    </div>
    <div class="content" class:padding={padding} class:scrollable={scrollable}>
        <slot></slot>
    </div>
</div>
