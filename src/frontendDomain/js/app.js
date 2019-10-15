/**
 * Main entry point for luxcena-neo webpage.
 *
 * This file does the handling of setting up the DOM and importing the correct
 * page-spesific javascript.
 *
 * @author jakobst1n.
 * @since  04.06.2019
 */

// General javascript
let socket = io();
import {getCookie, setCookie, eraseCookie} from "../../frontendJsModules/cookies";
import luxNeo from "./lux-neo";

const pageName = document.getElementsByTagName("body")[0].id;
let cookieToken = getCookie("session_token");

if (cookieToken == null) {
    if (pageName == "login") {
        socket.emit("authenticate", "", "test", (token) => {
            setCookie("session_token", token.toString(), 120);
            console.log(token);
            window.location.href = "/";
        });
    } else {
        window.location.href = "/login";
    }
} else {
    socket.emit("authenticateToken", cookieToken, (res) => {
        console.log(res)
        if (res) {
            if (pageName == "login") { window.location.href = "/"; }
            console.log("Autorised");
            Authorised();
        } else {
            eraseCookie("session_token");
            window.location.href = "/login";
        }
    });
}

function Authorised() {
    if (document.body.classList.contains('mdc-typography')) {
        luxNeo();
    }

    // Page-specific JavaScript

    try {
        let pageSpesific = require("./page-spesific/" + pageName);
        pageSpesific.default();
    } catch (error) {
        console.log(
            "Something went wrong when loading the js for this page...\n" +
            "The pageName is \"" + pageName + "\".\n" +
            "If it was excpected to get js for this page, please check the filename, and recompile webpack."
        );
        console.log(error);
    }
}
