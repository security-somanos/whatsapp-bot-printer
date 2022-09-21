const fs = require('fs');
const handlePrint = require('./handlePrint');
const { getOptions } = require('./../config/getOptions');
const path = require('path');
const sendMessage = require('../helpers/sendMessage');
const printTrackingLoop = require('./handlePrintTracking');

const handleMedia = async (media, message) => {
    const options = getOptions();
    if (media.mimetype !== "application/pdf") 
        return;

    let buff = new Buffer.from(media.data, 'base64');
    fs.writeFileSync(path.join(__dirname, `../../downloads/${media.filename}`), buff);
    message.reply("🖨️ Imprimiendo 🖨️")
    console.log("Printing: " + media.filename + " - " + message.author);
    try {
        await handlePrint(path.join(__dirname, `../../downloads/${media.filename}`));
        printTrackingLoop(options["printer"]).then((result) => { 
            if (result) {
                //Print was done... probably
            }
            else {
                message.reply("Impresión en pausa. Requiere activación manual.");
            }
        });
    }
    catch (e) {
        console.error(e);
        message.reply("❌ Error al imprimir ❌");
    }
    delete options["pages"];
    delete options["copies"];
    delete options["side"];
}

module.exports = handleMedia;

