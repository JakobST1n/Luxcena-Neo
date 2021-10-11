<script>
    export let header;
    export let padding = true;
    export let scrollable = true;
</script>

<style>
    .box {
        background-color: #444242;
        border-radius: 5px;
        height: 100%;
    }
    .header {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #333333; 
    }
    .header h1 {
        margin: 0;
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
    }
    .content {
        height: calc(100% - 35px);
        width: 100%;
        box-sizing: border-box;
    }
    .padding { padding: 15px; } 
    .scrollable { overflow: auto; }
</style>

<div class="box">
    <div class="header">
        <h1>{header}</h1>
    </div>
    <div class="content" class:padding={padding} class:scrollable={scrollable}>
        <slot></slot>
    </div>
</div>