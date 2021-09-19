<script>
    import FloatingButton from "./Button/FloatingButton.svelte";
    export let value;

    export let faIcon = false;
    export let backgroundColor = "white";
    export let color = "black";
    export let activeBackgroundColor = "gray";
    export let activeColor = "white";
    export let active = false;
    export let label = null;
</script>

<style>
    select {
        text-decoration: none;   
        -webkit-appearance: none;
           -moz-appearance: none;
                appearance: none; 
        background-color: transparent;
        border: none;
        margin: auto;
        text-align: center;
    }
    select:focus {
        outline: none;
    }
    .active {
        background-color: var(--active-bg-color);
        color: var(--active-color); 
    }
</style>
<FloatingButton fullWidth=true
                {faIcon}
                {label}
                {backgroundColor}
                {color}
                {activeBackgroundColor}
                {activeColor}
                {active} >
    <select on:change
            bind:value={value}>
            <slot></slot>
    </select> 
</FloatingButton>