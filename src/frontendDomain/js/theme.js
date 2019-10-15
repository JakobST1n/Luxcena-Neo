/**
 * Library for theming luxcena-neo.
 *
 * @author jakobst1n.
 * @since  04.06.2019
 */
import {setCookie} from "../../frontendJsModules/cookies";
import {setCSSCustomProp} from "../../frontendJsModules/dom";

/** Function for changing theme of the website.
 *
 * @param {string} color The color-scheme you want to set (e.g. "dark" or "light").
 */
export function setMDCTheme(color) {
    switch (color) {
    case "dark":
        setCSSCustomProp("--mdc-theme-primary", "#d81b60");
        setCSSCustomProp("--mdc-theme-secondary", "#03DAC6");
        setCSSCustomProp("--mdc-theme-background", "#121212");
        setCSSCustomProp("--mdc-theme-surface", "#121212");
        setCSSCustomProp("--mdc-theme-on-primary", "#000000");
        setCSSCustomProp("--mdc-theme-on-secondary", "#000000");
        setCSSCustomProp("--mdc-theme-on-surface", "#FFFFFF");
        setCSSCustomProp("--mdc-theme-primary-bg", "#FFFFFF");
        setCSSCustomProp("--mdc-theme-secondary-bg", "#FFFFFF");
        document.getElementsByTagName("body")[0].className = "mdc-typography mdc-theme--background dark";
        setCookie("mdc-theme", "dark", 99999);
        break;

    case "light":
        setCSSCustomProp("--mdc-theme-primary", "#d81b60");
        setCSSCustomProp("--mdc-theme-secondary", "#3949ab");
        setCSSCustomProp("--mdc-theme-background", "#ffffff");
        setCSSCustomProp("--mdc-theme-surface", "#ffffff");
        setCSSCustomProp("--mdc-theme-on-primary", "#000000");
        setCSSCustomProp("--mdc-theme-on-secondary", "#ffffff");
        setCSSCustomProp("--mdc-theme-on-surface", "#000000");
        setCSSCustomProp("--mdc-theme-primary-bg", "#FFFFFF");
        setCSSCustomProp("--mdc-theme-secondary-bg", "#FFFFFF");
        document.getElementsByTagName("body")[0].className = "mdc-typography mdc-theme--background";
        setCookie("mdc-theme", "light", 99999);
        break;
    }

}

/** Function for toggling between light and dark theme.
 */
export function toggleTheme() {
    let cThemeColor = document.getElementsByTagName("body")[0].className;
    if (cThemeColor.indexOf("dark") == -1) {
        setMDCTheme("dark");
    } else {
        setMDCTheme("light");
    }
}
