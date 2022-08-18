(function(back) {
    var FILE = "barcode.settings.json";
    // Load settings
    var settings = Object.assign({
        lastBoot: 0,
        bangleStepCount: 0,
        intervalResetDays: 1,
        intervalStepCount: 0,
        resetIntervalStepCount: 0,
        accumulatedBangleStepCount: 0,
        resetAccumulatedBangleStepCount: 0,
        totalStepCount: 0,
    }, require('Storage').readJSON(FILE, true) || {});
    if(settings.lastBoot === undefined) settings.lastBoot = 0;
    if(settings.bangleStepCount === undefined) settings.bangleStepCount = 0;
    if(settings.intervalResetDays === undefined) settings.intervalResetDays = 1;

    if(settings.intervalStepCount === undefined) settings.intervalStepCount = 0;
    if(settings.resetIntervalStepCount === undefined) settings.intervalResetStepCount = 0;

    if(settings.accumulatedBangleStepCount === undefined) settings.accumulatedStepCount = 0;
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

        'Uptime (days)': {
            value: lastRebootInDays,
        },
        'Reset uptime': () => {
            settings.lastBoot = now;
            writeSettings();
        },

        // Days before step reset (interval)
        'Reset interval (days)': {
            value: 1,  // 1 | converts undefined to 1
            onchange: v => {
                settings.intervalResetDays = v;
                writeSettings();
            }
        },

        // Accumulated Bangle.getStepCount()
        'Accumulated Bangle step count (since reset)': {
            value: 0 | settings.accumulatedBangleStepCount - settings.resetAccumulatedBangleStepCount,
        },
        'Reset accumulated Bangle step count': () => {
            settings.resetAccumulatedBangleStepCount = settings.accumulatedBangleStepCount;
            writeSettings();
        },

        // Accumulated Bangle.getStepCount()
        'Bangle step count': {
            value: 0 | settings.bangleStepCount,
        },

        // Total stepcount since app launched first time
        'Step count (since 1st launch)': {
            value: 0 | settings.totalStepCount,
        },
    });
})