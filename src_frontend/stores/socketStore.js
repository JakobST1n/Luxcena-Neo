import { writable, derived, get } from "svelte/store";
import { replace } from "svelte-spa-router";
import { io } from 'socket.io-client';
import {location, querystring} from 'svelte-spa-router'

export const openSocket = io("/open");
export let openSocketConnected = writable(false);
export let openSocketReconnecting = writable(false);

openSocket.on("connect", () => {
    openSocketConnected.set(true);
});
openSocket.on("disconnect", () => {
    openSocketConnected.set(false);
});
openSocket.io.on("reconnect_attempt", () => {
    openSocketReconnecting.set(true);
});
openSocket.io.on("reconnect", () => {
    openSocketReconnecting.set(false);
});
openSocket.on("updater", (state) => {
    if (state == "start") {
        replace("/updating");
    }
});

let storedSessionToken = localStorage.getItem("sessionToken");

export const authorizedSocket = io("/authed", {auth: {token: (storedSessionToken == null) ? "" : storedSessionToken}});
export let authorizedSocketConnected = writable(false);
export let authorizedSocketReconnecting = writable(false);
export let authorizedSocketConnectError = writable(false);
export const user = writable({});

authorizedSocket.on("connect_error", (err) => {
    authorizedSocketConnectError.set(true);
    authorizedSocketReconnecting.set(false);
    if ((err.message == "not authorized") &&
        get(authorizedSocketNeeded) &&
        (get(location) != "/login")) {
        replace(`/login?ref=${get(location)}&${get(querystring)}`);
        authorizedSocketConnected.set(false);
    }
});
authorizedSocket.on("connect", () => {
    authorizedSocketConnected.set(true);
    authorizedSocketConnectError.set(false);
    if (get(location) == "/login") {
        let searchParams = new URLSearchParams(get(querystring))
        if (searchParams.has("ref")) {
            let path = searchParams.get("ref");
            searchParams.delete("ref");
            let params = "";
            if (searchParams.values().length > 0) {
                params = "?" + searchParams.toString();
            }
            replace(`${path}${params}`);
        } else {
            replace(`/`);
        }
    }
});
authorizedSocket.on("disconnect", () => {
    authorizedSocketConnected.set(false);
});
authorizedSocket.io.on("reconnect_attempt", () => {
    authorizedSocketReconnecting.set(true);
});
authorizedSocket.io.on("reconnect", () => {
    authorizedSocketReconnecting.set(false);
});
authorizedSocket.on("user", (userObj) => {
    user.set(userObj);
});

export const isAuthenticating = writable(storedSessionToken != undefined);
export const sessionToken = writable(storedSessionToken);
function connectAuthorizedSocket() {
    authorizedSocket.auth.token = get(sessionToken);
    authorizedSocket.disconnect().connect();
}
sessionToken.subscribe((token) => localStorage.setItem("sessionToken", token));
sessionToken.subscribe(() => connectAuthorizedSocket());

export const authorizedSocketNeeded = writable(false);
authorizedSocketNeeded.subscribe((value) => {
    if (value) { connectAuthorizedSocket(); }
});

export function authenticate(username, password, callback) {
    openSocket.emit("authenticate:user", username, password, (res) => {
        if (res.success) {
            sessionToken.set(res.token);
        } else if (res.reason != "Invalid username/password") {
            console.log(res);
        }
        callback(res.success);
    });
}

export const connected = writable(false);
export const reconnecting = writable(false);
function connectedStateChange() {
    // console.log(`${get(openSocketConnected)} ${get(authorizedSocketConnectError)} ${get(authorizedSocketReconnecting)}`);
    connected.set(get(openSocketConnected) 
                  && (get(authorizedSocketConnectError) 
                      || get(authorizedSocketConnected)));
    reconnecting.set(get(openSocketReconnecting) 
                     && (get(authorizedSocketConnectError) 
                         || get(authorizedSocketReconnecting)));
}
openSocketConnected.subscribe(connectedStateChange);
openSocketReconnecting.subscribe(connectedStateChange);
authorizedSocketConnected.subscribe(connectedStateChange);
authorizedSocketReconnecting.subscribe(connectedStateChange);
authorizedSocketConnectError.subscribe(connectedStateChange);
