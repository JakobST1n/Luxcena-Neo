let logger = require(__basedir + "/src/logger");
let express = require("express");

function StaticPaths() {
    return function(req, res, next) {
        switch (req.path) {

            case "/":
                logger.access(`GET '/' requested from '${req.ip}'`);
                res.sendFile(__basedir + "public/index.html");
                return;

            case "/manifest.json":
                logger.access(`GET '/manifest.json' requested from '${req.ip}'`);
                res.sendFile(__basedir + "public/manifest.json");
                return;

            case "/scripts":
                logger.access(`GET '/scripts' requested from '${req.ip}'`);
                res.sendFile(__basedir + "public/scripts.html");
                return;

            case "/strip_setup":
                logger.access(`GET '/strip_setup' requested from '${req.ip}'`);
                res.sendFile(__basedir + "public/strip_setup.html");
                return;

            case "/neo_ide":
                logger.access(`GET '/neo_ide' requested from '${req.ip}'`);
                res.sendFile(__basedir + "public/neo_ide.html");
                return;

            case "/logviewer":
                logger.access(`GET '/logviewer' requested from '${req.ip}'`);
                res.sendFile(__basedir + "public/logviewer.html");
                return;

            case "/settings":
                logger.access(`GET '/settings' requested from '${req.ip}'`);
                res.sendFile(__basedir + "public/settings.html");
                return;

            case "/login":
                logger.access(`GET '/login' requested from '${req.ip}'`);
                res.sendFile(__basedir + "public/login.html");
                return;

        }

        next()
    }
}

module.exports = function(app) {

    // Setup static assets
    app.use("/assets", express.static(__basedir + "public/assets"));
    // Serve docs
    app.use("/docs", express.static(__basedir + "public/docs"));
    // Gave up using webpack to compile monaco, therefore, loading the already-compiled code. Probably the slowest way possible, but so it goes.
    app.use("/monaco-editor", express.static(__basedir + "node_modules/monaco-editor/"));
    // Setup all our custom middleware
    app.use(StaticPaths());

}
