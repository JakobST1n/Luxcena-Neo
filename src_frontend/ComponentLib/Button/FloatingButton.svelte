<script>
    export let faIcon = false;
    export let fullWidth = false;
    export let backgroundColor = "white";
    export let color = "black";
    export let activeBackgroundColor = "gray";
    export let activeColor = "white";
    export let active = false;
    export let label = null;

    export let loadingPromise = null;
    $: listen(loadingPromise);
    function listen(promise) {
        if (promise != null) {
            loading = true;
            promise.then(res => {
                loading = false;
                success = true;
            }).catch(err => {
                loading = false;
                success = false;
            });
        } else {
            loading = false;
        }
    }
    let loading;
    let success;
</script>

<style>
    button {
        background-color: var(--bg-color);
        color: var(--color);
        border: none;
        text-decoration: none;
        padding: 15px;
        font-size: 15px;

        transition: background-color, color 0.1s ease;
        border-radius: 50px;
    }
    button:hover {
        filter: brightness(0.95);
    }
    button:active {
        filter: brightness(0.90);
    }
    .fullWidth {
        width: 100%;
    }
    .iconButton {
        display: flex;
    }
    .iconButton .text {
        margin: auto;
    }
    .active {
        background-color: var(--active-bg-color);
        color: var(--active-color); 
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .label {
        margin-top: 10px;
        color: var(--grey-700);
        font-size: 13px;
    }
</style>

<div class="wrapper">
    <button
        on:click
        class:fullWidth={fullWidth} 
        class:iconButton={faIcon != false}
        class:active={active}
        style="--bg-color: {backgroundColor};
            --color: {color};
            --active-bg-color: {activeBackgroundColor};
            --active-color: {activeColor};"
        class="drop-shadow"
        >

        {#if faIcon}
            <div class="icon">
                <i class={faIcon}></i>
            </div>
        {/if}

        {#if loading}
        <i class="fas fa-spinner fa-pulse"></i>
        {:else}
        <div class="text">
            <slot></slot>
        </div>
        {/if}
    </button>
    {#if label != null}
    <span class="label">{label}</span>
    {/if}
</div>