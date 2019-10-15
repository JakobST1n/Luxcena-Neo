/**
 * Functions for working with cookies.
 *
 * This library contains three methods (setCookie, getCookie and eraseCookie),
 * import them to work with cookies.
 *
 * @author jakobst1n.
 * @since  04.06.2019
 */

/** This function simply sets a cookie.
 *
 * @param {string} name  The name of the cookie.
 * @param {string} value The new value of the cookie,
 * @param {float}  days  How long the cookie should live.
 */
export function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

/** This founction returns the value of a cookie.
 *
 * @oaram {string} name The name of the cookie to get the value of.
 *
 * @return {string} The value of the cookie
 */
export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==" ") c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

/** Deletes a cookie by name.
 *
 * @param {string} name The name of the cookie to delete.
 */
export function eraseCookie(name) {
    document.cookie = name+"=; Max-Age=-99999999;";
}
