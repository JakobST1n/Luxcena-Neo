<script>
    import { link } from 'svelte-spa-router';
    import active from 'svelte-spa-router/active';
    import { fade } from 'svelte/transition';

    let menuItems = {
        0: {type: "item", name: "Home", href: "/"},
        // 1: {type: "item", name: "Schedules", href: "/schedules"},
        2: {type: "seperator"},
        3: {type: "item", name: "Mode editor", href: "/modes"},
        4: {type: "item", name: "LED configuration", href: "/led_config"},
        // 5: {type: "item", name: "Logs", href: "/logs"},
        6: {type: "seperator"},
        7: {type: "item", name: "Settings", href: "/settings"},
        8: {type: "seperator"},
        9: {type: "abslink", name: "Docs", href: "/docs"}
    };
</script>

<style>
    .menu {
        position: absolute;
        height: calc(100% - var(--theme-phone-header-height));
        top: var(--theme-phone-header-height);
        overflow-y: auto;
        padding: var(--theme-padding);
        font-size: 20px;
        width: 100%;
        box-sizing: border-box;
    }
    .menu a {
        display: block;
        text-decoration: none;
        margin-bottom: 10px;
        color: var(--grey-300);
    }
    .menu a:hover {
        color: var(--grey-400);
    }
    .menu a:active {
        color: var(--grey-600);
    }
    .menu hr {
        border: 0.1px solid var(--grey-700);
    }
    @media (min-width: 900px) {
        .menu {
            position: fixed;
            background-color: #f7f7f7;
            top: 0;
            right: 0;
            font-size: 12px;
            width: 180px;
            height: 100%;
            padding-top: 65px;
        }
        .menu a {
            color: var(--grey-600);
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .menu hr {
            display: none;
            border-color: var(--grey-100);
        }
    }
</style>

<div class="menu">
    {#each Object.entries(menuItems) as [id, menuItem]}
        {#if menuItem.type == "item"}
            <a use:link use:active href={menuItem.href}>{menuItem.name}</a>
        {:else if menuItem.type == "abslink"}
            <a href={menuItem.href}>{menuItem.name}</a>
        {:else if menuItem.type == "seperator"}
            <hr />
        {/if}
    {/each}
</div>