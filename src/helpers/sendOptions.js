const fs = require('fs');
const path = require('path');

const { getOptions } = require('./../config/getOptions');
const sendMessage = require('./../helpers/sendMessage');

const sendOptions = () => {
    const options = getOptions();
    let message = "Entendido 👍🏼";
    const keys = Object.keys(options);
    keys.forEach(key => {
        switch(key) {
            case "printer":
                let printers = [];
                try {
                    const filename = '../config/printerTokens.json';
                    const data = fs.readFileSync(path.join(__dirname, filename), {encoding:'utf8', flag:'r'}).toString();
                    const json = JSON.parse(data);
                    json.forEach((printerData) => {
                        printers.push(printerData);
                    });
                }
                catch (err) {
                    message += "\nError leyendo impresoras.";
                    break;
                }

                const printer = printers.find((printer) =>  printer.optionsWin.printer === options.printer ) 
                if (printer) {
                    message += `\nImprimesora: ${printer.keywords[0]}.`;
                }
                else {
                    message += `\nImpresora: _desconocida_.`;
                }

                break;

            case "side":
                if (options["side"] === "duplexlong") {
                    message += "\nDoble faz (lado largo).";
                }
                else if (options["side"] === "duplexshort") {
                    message += "\nDoble faz (lado short).";
                }
                else if (options["side"] === "duplex") {
                    message += "\nDoble faz.";
                }
                break;
            
            case "pages":
                message += `\nPáginas ${options["pages"]}.`;
                break;

            case "subset":
                value = options["subset"] === "odd" 
                            ? "impares" 
                            : options["subset"] === "even" 
                                ? "pares" 
                                : "(inválido)";

                message += `\nHojas ${value}.`;

            case "scale":
                if (options["scale"] === "fit"){
                    message += "\nAjustar a tamaño de la hoja."
                }
                break;

            case "monochrome":
                if (options["monochrome"] === true) {
                    message += "\nBlanco y negro.";
                }
                else {
                    message += "\nA color.";
                }
                break;

            case "paperSize":
                message += `\nImprimiendo en tamaño ${options["paperSize"]}.`;
                break;

            case "copies":
                message += `\n${options["copies"]} copias.`;
                break;
                
        }
    })
    sendMessage(message);
}

module.exports = sendOptions;