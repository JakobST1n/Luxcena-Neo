<script>
    import { onMount } from "svelte";
    import { authorizedSocket, authorizedSocketNeeded } from "../../stores/socketStore";
    authorizedSocketNeeded.set(true);

    let pixels = [];
    let strip_buffer = [];

    let gridTemplateColumns = "1fr";
    let gridTemplateRows = "1fr";

    function updateMatrix(matrix) {
        if (matrix == null) { return; }
        pixels = [];
        let columnN = 0;
        for (let y = 0; y < matrix.length; y++) {
            if (matrix[y].length > columnN) {
                columnN = matrix[y].length;
            }
        }

        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                pixels.push(matrix[y][x]);
            }
            for (let x = 0; x < (columnN - matrix[y].length); x++) {
                pixels.push(-1);
            }
        }
        gridTemplateColumns = `repeat(${columnN}, 1fr)`;
        gridTemplateRows = `repeat(${matrix.length}, 1fr)`;
        pixels = pixels;
    }

    async function updateColors(colors) {
        for (let i = 0; i+2 < colors.length; i+=3) {
            try {
            document.querySelector("#sim-pixel-"+(i/3)).style.setProperty("--color", `rgb(${colors[i]}, ${colors[i+1]}, ${colors[i+2]})`);
            } catch(e) {}
        }
    }

    authorizedSocket.on("matrix", updateMatrix);
    authorizedSocket.on("strip_buffer", updateColors);

    onMount(() => {
        authorizedSocket.emit("matrix:get");
    });

</script>

<style>
    .matrix {
        display: grid;
        width: 100%;
        gap: 10px 10px;
    }
    .pixel {
        display: inline-block;
        width: 100%;
        height: 5px;
        background-color: var(--color);
        box-shadow: 0 0 10px var(--color);
    }
    p {
        margin: 0;
        margin-bottom: 5px;
        font-size: 10px;
        color: var(--grey-500);
    }
</style>

<p>(still quite buggy, especially for very fast changing pixels, if nothing is happening, try to restart the script)</p>
<div class="matrix" style="grid-template-columns: {gridTemplateColumns}; grid-template-rows: {gridTemplateRows};">
    {#each pixels as pixel}
        {#if pixel > -1}
        <div id="sim-pixel-{pixel}" style="--color:rgb(255, 255, 255)" class="pixel"></div>
        {:else}
        <div style="--color:none" class="pixel"></div>
        {/if}
    {/each}
</div>