(function(back) {
    var FILE = "barcode.settings.json";
    // Load settings
    var settings = Object.assign({
        lastBoot: 0,
        bangleStepCount: 0,
        intervalResetDays: 1,
        resetIntervalStepCount: 0,
        currentBangleStepCount: 0,
        resetAccumulatedBangleStepCount: 0,
        totalStepCount: 0,
        intervalStepCountLimit: 10000,
        intervalStepGoal: 10000,
    }, require('Storage').readJSON(FILE, true) || {});
    if(settings.lastBoot === undefined) settings.lastBoot = 0;
    if(settings.bangleStepCount === undefined) settings.bangleStepCount = 0;
    if(settings.intervalResetDays === undefined) settings.intervalResetDays = 1;

    if(settings.resetIntervalStepCount === undefined) settings.resetIntervalStepCount = 0;

    if(settings.currentBangleStepCount === undefined) settings.currentBangleStepCount = 0;
    if(settings.resetAccumulatedBangleStepCount === undefined) settings.accumulatedResetStepCount = 0;

    if(settings.totalStepCount === undefined) settings.totalStepCount = 0;

    const lastRebootDiffInMs = new Date() - new Date(settings.lastBoot);
    const lastRebootInDays = Math.round(lastRebootDiffInMs / (1000 * 60 * 60 * 24));
    const now = new Date().getTime();

    function writeSettings() {
        require('Storage').writeJSON(FILE, settings);
    }

    // Show the menu
    E.showMenu({
        "" : { "title" : "Barcode dashboard" },
        "< Back" : () => back(),

        'Step goal': {
            value: settings.intervalStepGoal,
            step: 1000,
            onchange: val => {
                settings.intervalStepGoal = settings.intervalStepCountLimit = val;
                writeSettings();
            }
        },

        // Current Bangle.getStepCount()
        'BSC now': {
            value: 0 | Bangle.getStepCount(),
        },

        // Total stepcount since app launched first time
        'BSC total': {
            value: 0 | settings.totalStepCount,
        },

        // Total stepcount since app launched first time
        'RISC': {
            value: 0 | settings.resetIntervalStepCount,
        },
    });
})