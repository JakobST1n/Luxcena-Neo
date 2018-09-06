let sidenav = require("../components/sidenav");

module.exports = () => {
    const pageName = document.getElementsByTagName("body")[0].id;
    if (pageName == "neo_ide") { return; }

    document.getElementById("sidenav").innerHTML = sidenav;

    M.AutoInit();
};
