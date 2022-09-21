/**
 * Checks if a given message is for the printing bot.
 * @param {Message} message WhatsApp Message object
 * @returns {Boolean} - True if message is for the printing bot
 */
const canPrint = (message) => {
    const chat = require('../config/getChatId');
    
    //check if chat is valid
    if (!chat.id) {
        console.error("Chat ID is not set. Please set it in the config file.");
        return false;
    }
    //Message.from and Message.to behaves different if the message is from me.
    //If it is not from me and not from the chat, return false
    if (!message.fromMe && !~message.from.indexOf(chat.id)) {
        return false;
    }
    //If it is from me and not from the chat, return false
    else if (message.fromMe && !(message.to === chat.id)) {
        return false;
    }
    return true;
}

module.exports = canPrint;