(function(back) {
    var FILE = "barcode.settings.json";
    // Load settings
    var settings = Object.assign({
        stepCount: 123,
    }, require('Storage').readJSON(FILE, true) || {});

    function writeSettings() {
        require('Storage').writeJSON(FILE, settings);
    }

    // Show the menu
    var mainmenu = {
        "" : {
            "title" : "Barcode"
        },
        "< Back" : () => back(),
        "Steps" : { value: settings.stepCount },
        "Reset step counter" : () => {
            E.showPrompt("Do you want to reset the step counter?", {
                buttons: {"Yes": 1, "No": 2}
            }).then((v) => {
                switch (v) {
                    case 1:
                        writeSettings({ stepCount: 0})
                        break;
                    default:
                        E.showMenu(mainmenu);
                        return;
                }
            });
        }
    };
    E.showMenu(mainmenu);
})