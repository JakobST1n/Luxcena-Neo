/**
 * General helper functions for manipulating the DOM.
 *
 * This file contains some general helper functions for manipulating the DOM.
 *
 * @file   This files defines multiple functions.
 * @author jakobst1n.
 * @since  04.06.2019
 */

/** Helper function for adding an eventlistner to all elements with a certain class.
 *
 * @param {string}   className The class to listen for.
 * @param {string}   event     What event to listen for (e.g. "click").
 * @param {function} callback  The callback function for when an event is fired on an elemnt.
 */
export function addEventListenerToClassName(className, event, callback) {
    let elements = document.querySelectorAll(className);

    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(event, callback);
    }
}

/** Shorthand for setting a CSS custom property.
 *
 * @param {string} propertyName The name of the property to set (e.g. "color").
 * @param {string} value        The value to set the property to (e.g. "#ffffff").
 */
export function setCSSCustomProp(propertyName, value) {
    document.documentElement.style.setProperty(propertyName, value);
}
