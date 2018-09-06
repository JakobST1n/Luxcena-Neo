module.exports = function(options) {
    return function(req, res, next) {
        let dirPublic = options.srcDir + "/public/";

        if (global.runtimeData.get("updaterRunning") === true) {
            res.sendFile(dirPublic + "/update/index.html");
            return;
        }

        switch (req.path) {

            case "/":
                res.sendFile(dirPublic + "index.html");
                return;

            case "/scripts":
                res.sendFile(dirPublic + "scripts.html");
                return;

            case "/strip_setup":
                res.sendFile(dirPublic + "strip_setup.html");
                return;

            case "/neo_ide":
                res.sendFile(dirPublic + "neo_ide.html");
                return;

            case "/logviewer":
                res.sendFile(dirPublic + "logviewer.html");
                return;

            case "/settings":
                res.sendFile(dirPublic + "settings.html");
                return;

        }

        next()
    }
}
