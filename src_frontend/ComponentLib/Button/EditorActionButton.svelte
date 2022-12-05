<script>
    export let faIcon = false;
    export let fullWidth = false;
    export let backgroundColor = "#444242";
    export let color = "white";
    export let alt = null;

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
        background: #444242;
        color: var(--color);
        border: none;
        text-decoration: none;
        /*padding: 5px 15px;*/
        /*font-size: 15px;*/

        transition: background-color, color 0.1s ease;
        border-radius: 15px;
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
    i {
    }
</style>

<button
    on:click
    class:fullWidth={fullWidth} 
    class:iconButton={faIcon != false}
    alt={alt}
    style="--bg-color: {backgroundColor};
           --color: {color};">

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
