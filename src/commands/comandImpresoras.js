const fs = require('fs');
const path = require('path');

const printer = require('../config/getPrinter');
const prompt = require('prompt-sync')();

const commandImpresoras = async () => {
    let selectedPrinters = [];
    const availablePrinters = await printer.getPrinters();
    availablePrinters.forEach((printer) => {
        const response = prompt(`Quiere incluir ${printer.name} [si/no]: `).toLocaleLowerCase().trim();
        if (response === "si" || response === "s") {
            const keyword = prompt(`Ingrese una palabra clave para ${printer.name}: `);
            selectedPrinters.push({  
                keywords: [keyword],
                optionsWin: {
                    printer: printer.deviceId,
                },
                optionsLinux: {
                }
            });
        }
    });
    console.log(selectedPrinters);

    const filename = path.join(__dirname, '../config/printerTokens.json');
    const data = JSON.stringify(selectedPrinters);
    fs.writeFileSync(filename, data);

    delete require.cache[require.resolve('../config/getTokens')];

}

module.exports = commandImpresoras;