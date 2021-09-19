<script>
    import { location } from 'svelte-spa-router'	
    import { slide } from 'svelte/transition';

    export let open = true;

    location.subscribe((value) => {
        open = true;
    });

    function drawerInit(node) {
        node.addEventListener("click", () => {
            if (!open) { open = true; }
        });
    }
</script>

<style>
    .drawer {
        background-color: white;
        position: absolute;
        padding: var(--theme-padding);
        height: calc(100% - var(--theme-phone-header-height));
        width: 100%;
        box-sizing: border-box;
        bottom: 0;
        border-radius: 30px 30px 0 0;
        transition: height 1s ease;
    }
    .closed {
        height: 20%;
        overflow: hidden;
    }
</style>

<div class="drawer" class:closed={!open} use:drawerInit transition:slide>
    <slot></slot>
</div>