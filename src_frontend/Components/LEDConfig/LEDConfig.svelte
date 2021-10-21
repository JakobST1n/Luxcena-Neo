<script>
    import Segment from "./Segment.svelte";
    import MatrixSegment from "./MatrixSegment.svelte";
    import { onMount } from "svelte";

    import { authorizedSocket, authorizedSocketNeeded } from "../../stores/socketStore.js";
    authorizedSocketNeeded.set(true);

    let segments = [];

    function addSegment() {
        console.log(segments);
        segments.push(null);
        segments = segments; // This is needed because svelte is weird :)
        saveConfig(); 
    }
    function removeSegment() {
        segments.pop();
        segments = segments; // This is needed because svelte is weird :)
        saveConfig(); 
    }
    function segmentChange(ev) {
        saveConfig(); 
    }

    let matrix = [[[null, false]]];

    function addRow() {
        matrix.push([[null, false]]);
        matrix = matrix; // This is needed because svelte is weird :) 
        saveConfig(); 
    }
    function removeRow() {
        matrix.pop();
        matrix = matrix; // This is needed because svelte is weird :) 
        saveConfig(); 
    }
    function addCell(ev) {
        matrix[ev.target.dataset.id].push([null, false]);
        matrix = matrix; // This is needed because svelte is weird :)  
        saveConfig();
    }
    function removeCell(ev) {
        matrix[ev.target.dataset.id].pop();
        matrix = matrix; // This is needed because svelte is weird :)
        saveConfig(); 
    }

    let led_channel;
    let led_dma;
    let led_freq_hz;
    let led_invert;
    let led_pin;

    authorizedSocket.on("led_config", (data) => {
        segments = data.segments;
        matrix = data.matrix;
        led_channel = data.led_channel.toString();
        led_dma = data.led_dma.toString();
        led_freq_hz = data.led_freq_hz.toString();
        led_invert = data.led_invert;
        led_pin = data.led_pin.toString();
    });

    onMount(async () => {
        authorizedSocket.emit("led_config:get");
    });

    function saveConfig() {
        authorizedSocket.emit("led_config:set", {
            segments: segments,
            matrix: matrix,
            led_channel: parseInt(led_channel, 10),
            led_dma: parseInt(led_dma, 10),
            led_freq_hz: parseInt(led_freq_hz, 10),
            led_invert: led_invert,
            led_pin: parseInt(led_pin, 10)
        });
    }
</script>

<style>
    .wrapper {
        padding-bottom: 15px;
    }
    h1 {
        margin-bottom: 0;
        font-weight: 100;
    }

    .row {
        width: 100%;
        overflow-x: auto;
        white-space: nowrap;
    }

    .segment {
        display: inline-block;
        margin-bottom: 5px;
    }
    .segment:not(:first-child) {
        margin-left: 5px;
    }

    button {
        background-color: var(--grey-200);
        border: none;
        border-radius: 50px;
        padding: 10px;
    }
    button:hover { background-color: var(--grey-300); }
    button:active { background-color: var(--grey-400); }
    button > * { pointer-events: none; }

    select {
        width: 100%;
    }

</style>

<div class="wrapper">
    <h1>Segments</h1>
    <p>Here you are defining the "segments" of your light-display. Use this to split the strip in stairs, blocks or any other configuration. Normally you would define a segment, for each cut you have made in the strip. But you could do other things to get fancy results. Each segment will be represented in the "matrix", by the number just below the number. Each segment should have it's own box below.</p>

    <div class="row">
        {#each segments as segment, i}
            <div class="segment">
                <Segment on:change={segmentChange} on:blur={segmentChange} bind:ledCount={segment} id={i} />
            </div>
        {/each}
        <button on:click={addSegment}><i class="fas fa-plus"></i></button>
        <button on:click={removeSegment}><i class="fas fa-minus"></i></button>
    </div>

    <h1>Matrix</h1>
    <p>Here you are defining your matrix. A matrix is really nothing more than a 2-dimentional array, or a list of lists. This is not a mathematical array, meaning each "row" can have different lengths. Use this to stitch your segments together. Each "box" should contain the number of the segment it is representing. By pressing the double-arrows on the box, you can "invert" a segment. This means counting from the other end. Use this if you have the segments in a snake-layout.</p>

    <div class="row">
        {#each matrix as row, i}
            <div class="">
                {#each row as cell}
                    <div class="segment">
                        <MatrixSegment on:change={saveConfig} bind:segmentId={cell[0]} bind:inverted={cell[1]} />
                    </div>
                {/each}
                <button on:click={addCell} data-id={i}><i class="fas fa-plus"></i></button>
                <button on:click={removeCell} data-id={i}><i class="fas fa-minus"></i></button>
            </div>
        {/each}
        <button on:click={addRow}><i class="fas fa-plus"></i></button>
        <button on:click={removeRow}><i class="fas fa-minus"></i></button>
    </div>

    <h1>Advanced</h1>
    <div class="">
        <label for="gpioPin">GPIO pin</label>
        <select id="gpioPin" bind:value={led_pin} on:change={saveConfig} >
            <option value="10">10 (SPI)</option>
            <option value="12">12 (PWM)</option>
            <option value="18">18 (PWM) (Luxcena neo hat)</option>
            <option value="21">21 (PCM)</option>
            <option value="31">31 (PCM)</option>
            <option value="38">39 (SPI)</option>
            <option value="40">40 (PWM)</option>
            <option value="52">52 (PWM)</option>
        </select>

        <label for="dmaChannel">DMA channel</label>
        <select id="dmaChannel" bind:value={led_dma} on:change={saveConfig} >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10 (Recommended)</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
        </select>

        <label for="frequency">Frequency</label>
        <select id="frequency" bind:value={led_freq_hz} on:change={saveConfig} >
            <option value="800000">80k</option>
            <option value="100000">10k</option>
        </select>

        <label for="ledChannel">LED Channel</label>
        <select id="ledChannel" bind:value={led_channel} on:change={saveConfig} >
            <option value="0">0</option>
            <option value="1">1</option>
        </select>

        <input type="checkbox" id="invertSignal" bind:checked={led_invert} on:change={saveConfig} />
        <label for="invertSignal">Invert signal</label>

    </div>
</div>