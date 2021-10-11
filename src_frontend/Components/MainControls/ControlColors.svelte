<script>
    import { writable } from 'svelte/store';
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';

    import PrettyVar from "../../ComponentLib/PrettyVar.svelte";
    import iro from '@jaames/iro';
    
    const dispatch = createEventDispatcher();

    let wrapperWidth = writable(0);

    // This is a list of color variables that we can change
    export let colorVariables = {
        "Main": "#1bcf3f",
        "Second": "#fafafa",
        "tert": "#fafafa"
    };
    // These are some helper functions for the object
    const getColorOfVar = function(name) { return colorVariables[name]; }
    const setColorOfVar = function(name, color) { colorVariables[name] = color; }
    // This is the identifier of the variable that currently is selected for changing
    let currentVariable = Object.keys(colorVariables)[0];

    let colorPicker;
    function picker(node) {
        colorPicker = new iro.ColorPicker(node, {
            color: getColorOfVar(currentVariable),
            width: $wrapperWidth
        });
        colorPicker.on('color:change', function(color) {
            setColorOfVar(currentVariable, color.hexString);
            dispatch("change", {name: currentVariable, value: color.hexString});
        });

        wrapperWidth.subscribe((width) => {
            colorPicker.resize(width - 30);
        });
        
        return {
			destroy() {}
		};
    }

    function changeColorVar(ev) {
        currentVariable = ev.target.dataset.id;
        colorPicker.color.hexString = getColorOfVar(currentVariable);
    }

</script>

<style>
    .wrapper {
        width: 100%;
        box-sizing: border-box;
        border-radius: 15px;
    }
    
    .color-picker {
        padding: 15px;
    }

    .color-options {
        margin-top: 15px;
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    .color-options > * {
        margin: auto;
        width: 100%;
        text-align: center;
        padding: 15px;
        box-sizing: border-box;
        border-top: 2px solid;
    }
    .color-options > *:first-child {
        border-bottom-left-radius: 15px;
    }
    .color-options > *:last-child {
        border-bottom-right-radius: 15px;
    }
    .color-options .selected {
        background-color: #eaeaea;
    }
    .color-options > *:hover {
        background-color: #dcdcdc;
    }
    .color-options > *:active {
        background-color: #d4d4d4;
    }
</style>

<div transition:fade|local class="wrapper drop-shadow" bind:clientWidth={$wrapperWidth} >
    <div class="color-picker" use:picker></div>
    <div class="color-options">
        {#each Object.keys(colorVariables) as colorVar}
            <span style="border-top-color: {getColorOfVar(colorVar)}" 
                  data-id={colorVar}
                  on:click={changeColorVar}
                  class:selected={colorVar == currentVariable}>
                <PrettyVar varText={colorVar} />
            </span>
        {/each}
    </div>
</div>