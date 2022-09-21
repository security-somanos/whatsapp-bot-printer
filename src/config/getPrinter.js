const os = require('os');

let printer;

if (process.platform == "win32") {
    try {
        printer = require("pdf-to-printer");
        // pdf-to-printer is based on powershell, which is only available on Windows 10.
        if (+(os.release().split(".")[0]) < 10) {
            const getPrintersWin7 = require('../helpers/getPrintersWin7');
            printer.getPrinters = getPrintersWin7;
        }
    }
    catch {
        console.error("You must install pdf-to-priner (npm install pdf-to-printer)");
        printer = null;
    }
}
else if (process.platform == "linux") {
    try {
        printer = require("unix-print");
    }
    catch {
        console.error("You must install unix-print (npm install unix-print)")
        printer = null;
    }
}

module.exports = printer;


