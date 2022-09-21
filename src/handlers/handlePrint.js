const getUnixOptions = require('./../helpers/getUnixOptions');
const printer = require("./../config/getPrinter");
const { getOptions } = require("./../config/getOptions");

/**
 * Prints a file.
 * @param {string} filepath Path to the file to print
 */
const handlePrint = async (filepath) => {
    const options = getOptions();
    if (printer === null) { 
        console.error("Error getting the printer object. Please check if you have installed the required modules.");
        return -1;
    }

    if (options["pages"]) {
        let parts = options["pages"].split(",");
        const PDFParser = require('pdf2json');
        const pdfParser = new PDFParser();
        let newParts = [];

        let count = await new Promise((resolve, reject) => { 
            pdfParser.on('pdfParser_dataReady', function(data) {
                let resolvedValue = data.Pages.length;
                console.log('Number of pages:', resolvedValue);
                resolve(resolvedValue);
            });
    
            pdfParser.loadPDF(filepath);
        });
        
        
        for (let i = 0; i < parts.length; i++) {
            if (parts[i].trim()[parts[i].trim().length - 1] === "-") {
                let newPart = parts[i].trim() + count;
                newParts.push(newPart);
            }
            else if (parts[i].trim()[0] === "-") {
                let newPart = count + parts[i].trim();
                newParts.push(newPart);
            }
            else {
                newParts.push(parts[i].trim());
            }
        }
        options["pages"] = newParts.join(",");
        console.log(options["pages"]);
    }

    if (process.platform === "win32") {
        printer.print(filepath, options);
    }
    else if (process.platform === "linux") {
        //get printer
        printer = options["printer"];
        printer.print(filepath, printer, getUnixOptions(options));
    }
}

module.exports = handlePrint;