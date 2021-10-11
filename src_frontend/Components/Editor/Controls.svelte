<script>
    import { onMount } from "svelte";
    import PrettyVar from "../../ComponentLib/PrettyVar.svelte";
	import { openSocket } from "../../stores/socketStore";

    let brightnessValue = 0;
    let power_on = false;
    let variables = {};

    function setBrightness() {
        if (!power_on) { openSocket.emit("power:set", true); }
        openSocket.emit("brightness:set", brightnessValue); 
    }
    function setPower() { openSocket.emit("power:set", power_on); }
    function setVar(ev) {
        openSocket.emit("var:set", ev.target.id, ev.target.value);
    }

    openSocket.on("power", (power) => power_on = power);
    openSocket.on("brightness", (value) => brightnessValue = value);
    openSocket.on("vars", (vars) => variables = vars);
    openSocket.on("var", (name, value) => {
        name = name.replace("variable/", "");
        if (value.value == null) {
            delete variables[name];
        } else {
            variables[name] = value;
        }
        variables = variables;
    });

    onMount(() => {
        openSocket.emit("power:get");
        openSocket.emit("brightness:get");
        openSocket.emit("vars:get")
    });
</script>

<style>
    label {
        width: 100%;
        font-size: 12px;
        color: var(--grey-500);
    }
    .var-group {
        display: flex;
    }
    input[type=range] {
        width: 100%;
    }
    input[type=text] {
        margin-top: 5px;
        display: block;
        width: 100%;
        background-color: #737373;
        padding: 5px;
        color: white;
        border: none;
        box-sizing: border-box;
        border-radius: 5px;
    }
</style>

<div>
    <div class="var-group">
        <label for="power">Power</label>
        <input type="checkbox" id="power" bind:checked={power_on} on:change={setPower} />
    </div>
    <div>
        <label for="brightness">Brightness</label>
        <div class="var-group">
            <input id="brightness" type="range" min=0 max=255 bind:value={brightnessValue} on:change={setBrightness} />
            {brightnessValue}
        </div>
    </div>

    {#each Object.entries(variables) as [name, value]}
    <div>
        <label for="{name}"><PrettyVar varText={name} /></label>
        <input type="text" id="{name}" bind:value={value.value} on:blur={setVar} />
    </div>
    {/each}
</div>