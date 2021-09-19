<script>
	import ControlComponents from "../Components/MainControls/ControlComponents.svelte";
	import ModeList from "../Components/ModeList/ModeList.svelte";
	import LEDConfig from "../Components/LEDConfig/LEDConfig.svelte";
	import Settings from "../Components/Settings/Settings.svelte";
	import NotImplemented from '../Components/NotImplemented.svelte';

	import Phone from "../layout/Phone.svelte";
	import Desktop from "../layout/Desktop.svelte";

	export let params;
	$: updateComponent(params);

	let activeLayout = Phone;
	let activeComponent = ControlComponents;

	const mql = window.matchMedia('(max-width: 900px)');
	try {
		mql.addEventListener('change', () => { updateLayout(); });
	} catch {
		mql.addListener(() => { updateLayout(); });
	}

	function updateLayout() {
		const mobileView = mql.matches;
		if (mobileView) {
			activeLayout = Phone;
		} else {
			activeLayout = Desktop;
		}
	}
	function updateComponent(params) {
		switch (params[0]) {
			case "/":
				if (mql.matches) {
					activeComponent = ControlComponents
				} else {
					activeComponent = ModeList;
				}
				break;
			case "/led_config":
				activeComponent = LEDConfig;
				break;
			case "/modes":
				activeComponent = ModeList;
				break;
			case "/settings":
				activeComponent = Settings;
				break;
			default:
				activeComponent = NotImplemented;
				break;
		}
	}
	
	updateLayout();
</script>

<svelte:component this={activeLayout}>
	<svelte:component this={activeComponent}/>
</svelte:component>
