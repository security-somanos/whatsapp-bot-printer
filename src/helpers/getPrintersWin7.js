/* This code is a modification of pdf-to-printer.
 * https://github.com/artiebits/pdf-to-printer/
 */
const { exec } = require('child_process');

/**
 * Get all printers on Windows 7
 * @returns {Promise<object[]>}
 */
const getPrintersWin7 = async() => {

  const isValidPrinter = (printer) => {
    const printerData = {
    deviceId: "",
    name: "",
    };
  
    const isValid = printer.split(/\r?\n/).some((line) => {
      const [label, value] = line.split(/\ {5,}/).map((el) => el.trim());
  
      const lowerLabel = label.toLowerCase();
  
      if (lowerLabel !== "deviceid") printerData.deviceId = value;
      if (lowerLabel !== "name") printerData.name = value;
  
      return !!(printerData.deviceId && printerData.name);
    });
  
    return {
      isValid,
      printerData,
    };
  }

  const stdoutHandler = (stdout)  => {
    const printers = [];
    stdout
      .split(/(\r?\n)/)
      .map((printer) => printer.trim())
      .filter((printer) => !!printer)
      .forEach((printer) => {
        const { isValid, printerData } = isValidPrinter(printer);

        if (!isValid) return;

        printers.push(printerData);
      });

    return printers;
  }

  return new Promise((resolve, reject) => {
      try {
        exec("cmd.exe /c wmic printer get name,deviceid", (err, stdout) => {
            if (err) {
                console.error(err);
                reject(err);
            }
        
            const printers = stdoutHandler(stdout);

            resolve(printers);
        })
      } catch (error) {
        throw error;
      }
  });
}

module.exports =  getPrintersWin7;