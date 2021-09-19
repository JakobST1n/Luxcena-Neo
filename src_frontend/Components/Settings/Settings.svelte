<script>
    import { fade } from 'svelte/transition';
    import InstanceName from './InstanceName.svelte';
    import Version from "./Version.svelte";
    import SSLCert from "./SSLCert.svelte";
    import System from "./System.svelte";
    import Users from "./Users.svelte";

    import { authorizedSocketNeeded } from "../../stores/socketStore.js";
	authorizedSocketNeeded.set(true);
</script>

<style>
    div {
        padding-bottom: var(--theme-padding);
    }
</style>

<div>
    <InstanceName />
    <Version />
    <SSLCert />
    <Users />
    <System />
</div>