// General JavaScript
require ("./js/general")();

// Page-specific JavaScript
const pageName = document.getElementsByTagName("body")[0].id;
try {
    require("./js/" + pageName)();
} catch (error) {
    console.log(
        "Something went wrong when loading the js for this page...\n" +
        "The pageName is \"" + pageName + "\".\n" +
        "If it was excpected to get js for this page, please check the filename, and recompile webpack."
    );
}

// Require all styles
require("./app.scss");
// Require font awesome
require("fontawesome");
