<script>
    import { onMount } from "svelte";
    import { fade } from 'svelte/transition';
    import RoundRange from "../../ComponentLib/RoundRange.svelte";
    import FloatingButton from "../../ComponentLib/Button/FloatingButton.svelte";
    import FloatingSelect from "../../ComponentLib/FloatingSelect.svelte";
    import PrettyVar from "../../ComponentLib/PrettyVar.svelte";
    import ControlColors from "./ControlColors.svelte";
    import ControlOthers from "./ControlOthers.svelte";

	import { openSocket } from "../../stores/socketStore";

    let name = "-";
    let brightness = 0;
    let powerIsOn = false;

    let modeSelect;
    let allModes = {};
    let activeMode = "";
    
    let colorVariables = {};

    function togglePower() {
        powerIsOn = !powerIsOn;
        openSocket.emit("power:set", powerIsOn);
    }
    function setBrightness() {
        if (!powerIsOn) {
            togglePower();
        }
        openSocket.emit("brightness:set", Math.floor((brightness * 255) / 100));
    }
    function setColor(ev) {
        openSocket.emit("var:set", ev.detail.name, ev.detail.value);
    }
    function setMode(el) {
        openSocket.emit("mode:set", el.target.value, (res) => {
            console.log(res);
        })
    }
    function onVarChange(name, value) {
        if (!name.includes("variable/")) {
            console.log(`Change on unknown globvar "${name}".`);
            return;
        }
        name = name.replace("variable/", "");

        switch (value.type) {
            case "COLOR":
                if (value.value == null) {
                    delete colorVariables[name];
                } else {
                    colorVariables[name] = value.value;
                }
                    colorVariables = colorVariables;
                break;
        }
    }
    openSocket.on("modelist", (modelist) => {
        allModes = [];
        for (let i = 0; i < modelist.length; i++) {
            let modePath = modelist[i].split("/", 1)[0];
            if (!allModes.hasOwnProperty(modePath)) { allModes[modePath] = []; }
            allModes[modePath].push([modelist[i], modelist[i].replace(modePath + "/", "")])
        }
        allModes = allModes;
    })
    openSocket.on("name", (_name) => name = _name);
    openSocket.on("mode", (newMode) => activeMode = newMode);
    openSocket.on("power", (power) => powerIsOn = power);
    openSocket.on("brightness", (value) => brightness = Math.floor((value * 100) / 255));
    openSocket.on("var", onVarChange);
    openSocket.on("vars", (vars) => {
        for (const [name, value] of Object.entries(vars)) {
            onVarChange(`variable/${name}`, value);
        }
    });

    onMount(async () => {
        openSocket.emit("name:get");
        openSocket.emit("modelist:get");
        openSocket.emit("mode:get");
        openSocket.emit("power:get");
        openSocket.emit("brightness:get");
        openSocket.emit("vars:get");
    });

</script>

<style>
    .wrapper {
        box-sizing: border-box;
        padding-bottom: 17px;
        text-align: center;
    }
    h1 {
        color: var(--grey-600);
        margin: 0;
        font-size: 20px;
        font-weight: 100;;
    }
    .row {
        margin-bottom: 25px;
        margin-left: 10%;
        margin-right: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .mode_button {
        margin-left: 10%;
        flex-grow: 1;
    }
</style>

<div class="wrapper">
    <h1>{name}</h1>
    <RoundRange bind:enabled={powerIsOn} on:change={setBrightness} bind:value={brightness} />

    <div class="row">
        <FloatingButton label="POWER" on:click={togglePower} bind:active={powerIsOn} activeBackgroundColor="var(--yellow-500)" activeColor="black" faIcon="fa fa-power-off" />
        <div class="mode_button">
            <FloatingSelect label="MODE" faIcon="fas fa-sliders-h" on:change={setMode} bind:this={modeSelect} bind:value={activeMode} >
                {#each Object.entries(allModes) as [modePath, modes]}
                    <optgroup label={modePath}>
                    {#each modes as mode}
                        <option value={mode[0]}><PrettyVar varText={mode[1]} /></option>
                    {/each}
                    </optgroup>
                {/each}
            </FloatingSelect>
        </div>
    </div>

    {#if Object.keys(colorVariables).length > 0}
        <ControlColors on:change={setColor} bind:colorVariables={colorVariables} />
    {/if}
    <!-- <ControlOthers /> -->
</div>