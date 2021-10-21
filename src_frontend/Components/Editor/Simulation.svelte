<script>
    import { onMount } from "svelte";
    import { authorizedSocket, authorizedSocketNeeded } from "../../stores/socketStore";
    authorizedSocketNeeded.set(true);

    let svg;
    let pixels = [];

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
        for (let i = 0; i+2 < colors.length; i+=3) {
            try {
            document.querySelector("#sim-pixel-"+(i/3)).style.setProperty("fill", `rgb(${colors[i]}, ${colors[i+1]}, ${colors[i+2]})`);
            } catch(e) {}
        }
    }

    onMount(() => {
        authorizedSocket.on("matrix", updateMatrix);
        authorizedSocket.on("strip_buffer", updateColors);
        authorizedSocket.emit("matrix:get");
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
    <p>(still quite buggy, especially for very fast changing pixels, if nothing is happening, try to restart the script)</p>
    <svg viewBox="0 0 0 0" preserveAspectRatio="xMaxYMax" bind:this={svg}>
        {#each pixels as pixel}
            <rect id="sim-pixel-{pixel.n}" x="{pixel.x*2+1}" y="{pixel.y*2+1}" width="1" height="1" style="fill:rgb(0,0,0);filter:blur(0.2px);" />
        {/each}
    </svg>
</div>