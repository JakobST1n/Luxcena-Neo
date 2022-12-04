<script>
    import { onMount, onDestroy } from "svelte";
    import { authorizedSocket, authorizedSocketNeeded } from "../../stores/socketStore";
    authorizedSocketNeeded.set(true);

    export let enabled = true;

    let target_fps = 60;
    let svg;
    let pixels = [];
    let pixelBuffer = [];
    let pixelBufferCh = false;
    let pixelFlushInterval;

    export function toggleEnable() {
        enabled = !enabled;
        if (!enabled) {
            pixelBuffer = pixelBuffer.map(x => 0);
            flushPixelBuffer(true);
        }
    }

    function updateMatrix(matrix) {
        if (matrix == null) { return; }
        pixels = [];

        let columnN = 0;
        for (let y = 0; y < matrix.length; y++) {
            if (matrix[y].length > columnN) { columnN = matrix[y].length; }
            for (let x = 0; x < matrix[y].length; x++) {
                pixels.push({x: x, y: y, n: matrix[y][x] });
            }
        }
        if (svg != null) {
            svg.setAttribute("viewBox",  `0 0 ${columnN*2+2} ${matrix.length*2+2}`);
        }
        pixels = pixels;
    }

    async function updateColors(colors) {
        if (!enabled) { return ; }
        pixelBuffer = colors;
        pixelBufferCh = true;
    }

    async function flushPixelBuffer(force=false) {
        if (!force && (!pixelBufferCh || !enabled)) { return; }
        pixelBufferCh = false;
        window.requestAnimationFrame((ts) => {
            for (let i = 0; i+2 < pixelBuffer.length; i+=3) {
                let pixel;
                try {
                    pixel = document.querySelector("#sim-pixel-"+(i/3));
                    if (pixel == null) { continue; }
                    pixel.style.setProperty(
                        "fill",
                        `rgb(${pixelBuffer[i]}, ${pixelBuffer[i+1]}, ${pixelBuffer[i+2]})`
                    );
                } catch(e) {
                    console.log(e);
                }
            }
        });
    }

    onMount(() => {
        pixels = [];
        pixelBuffer = [];
        enabled = false;
        authorizedSocket.on("matrix", updateMatrix);
        authorizedSocket.on("strip_buffer", updateColors);
        authorizedSocket.emit("matrix:get");

        pixelFlushInterval = setInterval(flushPixelBuffer, 1000/target_fps);
    });

    onDestroy(() => {
        clearInterval(pixelFlushInterval);
    });
</script>

<style>
    p {
        margin: 0;
        margin-bottom: 5px;
        font-size: 10px;
        color: var(--grey-500);
    }
    .wrapper {
        width: 100%;
        height: 100%;
    }
</style>

<div class="wrapper">
    <svg viewBox="0 0 0 0" preserveAspectRatio="xMaxYMax" bind:this={svg}>
        {#each pixels as pixel}
            <rect id="sim-pixel-{pixel.n}" x="{pixel.x*2+1}" y="{pixel.y*2+1}" width="1" height="1" style="fill:rgb(0,0,0);filter:blur(0.2px);" />
        {/each}
    </svg>
</div>
