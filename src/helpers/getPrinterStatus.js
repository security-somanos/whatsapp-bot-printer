const { exec } = require('child_process');

const parsePrinter = (printerText) => {
    const printerData = {};
    const printer = printerText.split(',');

    if (printer.length < 4) return { isValid: false };

    printerData.status = printer[1];
    printerData.deviceId = printer[2];
    printerData.name = printer[3];

    return { isValid: true, printerData };
}
const stdoutHandler = (stdout) => {
    const printers = [];
    stdout
        .split(/(\r?\n)/)
        .map((line) => line.trim())
        .filter((line) => !!line)
        .forEach((line) => {
            const { isValid, printerData } = parsePrinter(line);

            if (!isValid) return;

            printers.push(printerData);
        });

    return printers;
}
/**
 * @param {string} deviceId - Device ID of printer
 * @returns {int} - Printer status code
 */
const getPrinterStatus = async (deviceId) => {
    return new Promise((resolve, reject) => {
        try {
            let sanitized = deviceId.replace("\"", "").replace("\\", "");
            exec(`cmd.exe /c wmic printer get detectederrorstate,deviceid,name /format:csv | find "${sanitized}"`, (err, stdout) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
            
                const printers = stdoutHandler(stdout);
                if (printers.length === 0) {
                    resolve({});
                }
                resolve(printers[0].status);
            })
        } catch (error) {
          throw error;
        }
    });
}

module.exports = getPrinterStatus;