<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let min = 0;
    export let max = 100;
    export let value = 0;
    export let enabled = true;
    
    let svg;
    let indicator;
    let thumb;
    let track;
    let cVal = value;
    let touchActive = false;

    let inputCoordinates;

    function setValue(_value) {
        value = _value;
        let delta = cVal - _value;

        if (!touchActive && (Math.abs(delta) > 10)) {
            let animInterval = setInterval(() => {
                cVal = cVal + ((delta < 0) ? 1 : -1);
                setThumbAndTrack(cVal);
                if ( ((delta < 0) && (cVal >= value)) || ((delta > 0) && (cVal <= value)) ) {
                    clearInterval(animInterval);
                }
            }, 1);
        } else {
            setThumbAndTrack(value);
            cVal = value;
        }
    }

    function setThumbAndTrack(val_pos) {
        if (indicator && thumb) {
            let indicator_value = (((val_pos - min) * 207) / (max - min));
            indicator.style.strokeDasharray = `${indicator_value},207`;

            let p = indicator.getPointAtLength(indicator_value);
            thumb.setAttribute("transform", `translate(${p.x}, ${p.y})`);
        }
    }

    onMount(async() => {
        let lastVal = value;
        setValue(value);
        setInterval(() => {
            if (value != lastVal) {
                setValue(value);
                lastVal = value;
            }
        }, 500);
        window.indicator = indicator;

        inputCoordinates = svg.createSVGPoint();
        addEventListenersToElement(thumb);
        addEventListenersToElement(track);
        addEventListenersToElement(indicator);
    });

    function addEventListenersToElement(el) {
        el.addEventListener("touchstart", () => {
            touchActive = true;
        }, { capture: true, passive: false });
        el.addEventListener("touchend", () => {
            touchActive = false;
        }, { capture: true, passive: true });
        el.addEventListener("touchmove", updateValueFromTouchEvent, { capture: true, passive: false });

        el.addEventListener("mousedown", (ev) => {
            touchActive = true;
            updateValueFromMouseEvent(ev);
            svg.addEventListener("mousemove", updateValueFromMouseEvent);
        }, { capture: true, passive: false });
        el.addEventListener("mouseup", (ev) => {
            touchActive = false;
            svg.removeEventListener("mousemove", updateValueFromMouseEvent);
        }, { capture: true, passive: false });
    }

    function updateValueFromTouchEvent(ev) {
        inputCoordinates.x = ev.touches[0].clientX;
        inputCoordinates.y = ev.touches[0].clientY; 
        updateValueFromPoint(inputCoordinates);
        ev.preventDefault();
    }

    function updateValueFromMouseEvent(ev) {
        inputCoordinates.x = ev.clientX;
        inputCoordinates.y = ev.clientY;
        updateValueFromPoint(inputCoordinates);
        ev.preventDefault();
    }

    function updateValueFromPoint(point) {
        inputCoordinates = inputCoordinates.matrixTransform(svg.getScreenCTM().inverse());
        setValue(getValueAtLength(indicator, getPathLangthOfClosestPoint(indicator, inputCoordinates)));
        dispatch("change");
    }

    function getPathLangthOfClosestPoint(path, point) {
        let pathLength = path.getTotalLength();
        let shortestDistance = Number.MAX_VALUE;
        let shortestPathDistance;

        for (let i = 0; i <= pathLength; i += 4) {
            let p  = path.getPointAtLength(i),
                dx = p.x - point.x,
                dy = p.y - point.y,
                cDistance = dx * dx + dy * dy;

            if (cDistance < shortestDistance) {
                shortestDistance = cDistance;
                shortestPathDistance = i;
            }
        }

        return shortestPathDistance;
    }

    function getValueAtLength(path, length) {
        return Math.floor(((length * (max - min)) / path.getTotalLength()) + min);
    }
</script>

<style>
    svg {
        --primary-color: var(--yellow-500);
        --muted-color: var(--yellow-100);
        margin-top: -15px;
    }
    path {
        transition: stroke 0.2s ease;
    }
    circle {
        filter: drop-shadow(0 0 2px #d0d0d0);
        transition: stroke 0.2s ease;
    }
    circle:hover {
        stroke: #f9f9f9;
    }
    circle:active {
        fill: var(--yellow-600);
    }
    .disabled {
        --primary-color: var(--grey-200);
        --muted-color: var(--grey-50);
    }
</style>


<svg bind:this={svg} class:disabled={!enabled} viewbox="0 0 100 100">
    <path bind:this={track} fill="none" stroke-linecap="round" stroke-width="10" stroke="var(--muted-color)"
        d="M25 85
           a 40 40 0 1 1 50 0
           ">
    </path> 
    <path bind:this={indicator} fill="none" stroke-linecap="round" stroke-width="10" stroke="var(--primary-color)"
        stroke-dasharray="207,0"
        d="M25 85
           a 40 40 0 1 1 50 0">
    </path>
    <circle bind:this={thumb} cx="0" cy="0" r="8" stroke="white" stroke-width="3" fill="var(--primary-color)" />
    <text id="count" x="50" y="55" text-anchor="middle" dy="7" font-size="20">{value}%</text>
</svg>