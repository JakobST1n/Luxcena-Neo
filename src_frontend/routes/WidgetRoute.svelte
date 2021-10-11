<script>
    import { onMount } from "svelte";
	import { openSocket } from "../stores/socketStore";

    let instanceName = "-"
    let brightness = 0;
    let powerIsOn = false;

    openSocket.on("name", (name) => instanceName = name);
    openSocket.on("power", (power) => powerIsOn = power);
    openSocket.on("brightness", (value) => brightness = value);
    // openSocket.on("mode", (newMode) => activeMode = newMode);

    function setBrightness() {
        openSocket.emit("brightness:set", brightness);
    }
    function setPower() {
        openSocket.emit("power:set", powerIsOn);
    }

    onMount(async () => {
        openSocket.emit("name:get");
        openSocket.emit("power:get");
        openSocket.emit("brightness:get");
    });
</script>

<style>
    .wrapper {
        background-color: #3c3b3b;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 60px;
        grid-template-rows: 80% 1fr;
        grid-template-areas: 
            "name power"
            "brightness brightness"
        ;
        padding: 15px;
        box-sizing: border-box;
    }
    .name {
        color: white;
        grid-area: name; 
        font-weight: bold;
        align-self: center;
    }
    .power {
        grid-area: power;
        align-self: center;
    }
    .brightness { grid-area: brightness; }
    input[type=range] {
        width: 100%;
    }

    /* The switch - the box around the slider */
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 34px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: #2196F3;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
    /* .slider.round { border-radius: 34px; }
    .slider.round:before { border-radius: 50%; } */
</style>

<div class="wrapper">
    <div class="name">
        {instanceName}
    </div>
    <div class="power">
        <label class="switch">
            <input type="checkbox" bind:checked={powerIsOn} on:change={setPower}/>
            <span class="slider round"></span>
        </label>
    </div>
    <div class="brightness">
        <input type="range" min=0 max=255 bind:value={brightness} on:change={setBrightness}/>
    </div>
</div>