/**
 * Code for setting up the common elements in the DOM in luxcena-neo.
 *
 * @author jakobst1n.
 * @since  04.06.2019
 */
import {MDCTopAppBar} from "@material/top-app-bar/index";
import {MDCRipple} from "@material/ripple/index";
import {MDCDrawer} from "@material/drawer/index";
import {getCookie} from "../../frontendJsModules/cookies";
import {toggleTheme, setMDCTheme} from "./theme";
import {MainDrawer} from "../components/drawer";

/** This function changes the behaviour of some key ui elements according to
 *  window size. The breakpoint is the same as mdc-leyout-grid's breakpoint.
 *
 * @param {object} event Just to contain the event if called after an event had occured.
 */
function onResize(event) {
    let ElemDrawer = document.querySelector(".mdc-drawer");

    var mq = window.matchMedia( "(max-width: 840px)" );
    if (mq.matches) {  // Windows smaller than max-width (840px)
        ElemDrawer.className = "mdc-drawer mdc-drawer--modal";

    } else {           // Windows larger than max-width (840px)
        ElemDrawer.className = "mdc-drawer";

    }
}

/** Default function with all the code to setup the shell of the website.
 */
export default function() {
    // Get name of current page
    const pageName = document.getElementsByTagName("body")[0].id;
    // If neo_ide, it has a different layout, and should not get these styles
    if (pageName == "neo_ide") { return; }

    // Set the window resize event to the function above
    window.onresize = onResize;

    // Create a new drawer element (To generate the MDC-List etc...)
    const drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));

    // Init drawer component
    let myDrawer = new MainDrawer();
    document.querySelector(".mdc-drawer__content").appendChild(myDrawer.DOMElement);
    myDrawer.setActive(document.body.id);

    // Create top-app-bar element, this is the pink thing at the top
    const topAppBar = MDCTopAppBar.attachTo(document.getElementById("app-bar"));
    // Set what element we are scrolling on
    topAppBar.setScrollTarget(document.getElementById("main-content"));
    // Set the "menu"-button to toggle our drawer
    topAppBar.listen("MDCTopAppBar:nav", () => {
        drawer.open = !drawer.open;
    });
    // Call the resize-event once, to update the ui to the current screen size
    onResize();

    // Change to dark theme if cookie is set
    if (getCookie("mdc-theme") == "dark") { setMDCTheme("dark"); }

    // @TODO REMOVE THIS AND MAKE A PROPER OPTION IN SETTINGS
    document.querySelectorAll(".mdc-top-app-bar__action-item")[0].addEventListener("click", toggleTheme);
}
