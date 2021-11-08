<script>
	import Router from 'svelte-spa-router';
	import { wrap } from 'svelte-spa-router/wrap';
	import MainRoute from "./routes/MainRoute.svelte";
	import EditorRoute from "./routes/EditorRoute.svelte";
	import Updating from "./routes/Updating.svelte";
	import LoginRoute from "./routes/LoginRoute.svelte";
	import WidgetRoute from "./routes/WidgetRoute.svelte";
	import UnknownRoute from "./routes/UnknownRoute.svelte";

	import { connected, reconnecting, openSocket } from "./stores/socketStore.js";

	let main_router_routes = new Map();
	main_router_routes.set(/^\/(schedules|modes|led_config|logs|settings|)(?:\/.*)?$/, wrap({
		component: MainRoute
	}));
	main_router_routes.set("/editor/*", wrap({
		component: EditorRoute
	}));
	main_router_routes.set("/updating", wrap({
		component: Updating
	}));
	main_router_routes.set("/login", wrap({
		component: LoginRoute
	}));
	main_router_routes.set("/widget", wrap({
		component: WidgetRoute
	}));
	main_router_routes.set("*", wrap({
		component: UnknownRoute
	}));

	let updateInProgess = false;
	openSocket.on("updater", (state) => {
		if (state == "start") { updateInProgess = true; }
	});
</script>

<style>
	.no-connection {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 15px;
		background-color: #3c3b3b;
		text-align: center;
		color: white;
	}
	.lds-ellipsis {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ellipsis div {
		position: absolute;
		top: 33px;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background: #fff;
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}
	.lds-ellipsis div:nth-child(1) {
		left: 8px;
		animation: lds-ellipsis1 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(2) {
		left: 8px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(3) {
		left: 32px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(4) {
		left: 56px;
		animation: lds-ellipsis3 0.6s infinite;
	}
	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(24px, 0);
		}
	}

</style>

{#if $updateInProgess || $connected}
<Router routes={main_router_routes} />
{:else if $reconnecting}
<div class="no-connection">
	<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
	<div>Lost connection to server, attempting to reconnect...</div>
</div>
{:else}
<div class="no-connection">
	<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
	<div>No server connection, attempting to connect...</div>
</div>
{/if}