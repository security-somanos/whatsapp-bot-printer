const sendMessage = require('../helpers/sendMessage');
const printer = require('../config/getPrinter');
const getPrinterStatus = require('../helpers/getPrinterStatus');

let hasSeenTwo = false;

const printTrackingLoop = async (deviceId) => {
    const printerId = deviceId || (await printer.getDefaultPrinter()).deviceId;
    const startTime = new Date().getTime();
    //const printerId = deviceId ;

    for (;;) {
        if (new Date().getTime() - startTime > 600000 /*10 minutes*/) {
            console.log("Tracking loop timed out.");
            return true;
        }
        const status = await getPrinterStatus(printerId)
        if (status === '0') {
            if (hasSeenTwo) {
                return true;
            }
        }
        if (status === '2' || status === '1') {
            hasSeenTwo = true;
        }
        else if (status === '4') {
            sendMessage("No hay papel en la impresora.");
            return false;
        }
        else if (status === '8') {
            sendMessage("La impresora se atascó.");
            return false;
        }
        else if (status === '9') {
            sendMessage("La impresora está offline");
            return false;
        }
    }
}

module.exports = printTrackingLoop