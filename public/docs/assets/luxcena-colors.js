function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==" ") c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function theme() {
    let mdcTheme = getCookie("mdc-theme");
    if (mdcTheme != null) {
        if (mdcTheme == "dark") {
            document.body.className = "dark";
        }
    }
}

theme();
