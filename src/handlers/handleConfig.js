const { eraseOptionsDebounced, eraseOptions } = require('./../helpers/eraseOptions');
const { getOptions } = require('./../config/getOptions');
const tokens = require('./../config/getTokens');
const getUnixOptions = require('./../helpers/getUnixOptions');
const sendOptions = require('./../helpers/sendOptions');
const sendMessage = require('./../helpers/sendMessage');

/**
 * Handles any request for configuration settings
 * @param {string} messageBody Body of the message with the requested configuration.
 */
const handleConfig = (messageBody) => {
    let options = getOptions();
    let userInput = messageBody.split(" ");
    let shouldSendMessage = false;

    if (userInput[0] === "borrar") {
        eraseOptions();
        options = getOptions();
        shouldSendMessage = true;
    }

    if (userInput[0].toLowerCase() === "paginas" || userInput[0].toLowerCase() === "páginas") {
        // Seguridad nula.
        if (process.platform === "win32" || process.platform === "linux") {
            options["pages"] = userInput[1];
        }
        shouldSendMessage = true;
    }
    else if (userInput[1] === "copias") {
        if (isNaN(+userInput[0])) {
            sendMessage("No entendí el número de copias.");
        }
        else if (+userInput[0] >= 100 && false) { //DISABLED LIMIT
            sendMessage("¿No te parece un poco mucho?");
        }
        else if (+userInput[0] <= 0) {
            sendMessage("¿No te parece muy poco?")
        }
        else {
            options["copies"] = +userInput[0];
            shouldSendMessage = true;
        }
    }
    
    for (const token of tokens) {
        if (token.keywords.every(keyword => userInput.find(userKeyword => userKeyword.toLowerCase() === keyword.toLowerCase()))) {
            Object.assign(options, token.optionsWin);
            console.log("options changed!");
            console.log(options);
            eraseOptionsDebounced();
            console.log({optionsLinux: getUnixOptions(options)})
            shouldSendMessage = true;
        }
    }
    if (shouldSendMessage) sendOptions();
}


module.exports = handleConfig;