const { getClient } = require('./../config/getClient');

/**
 * Sends message ONLY to the chat specified in the config file.
 * @param {string} message message to be sent
 * @param {object} options (optional) Options to be passed for WhatsApp Web
 */
const sendMessage = (message, options) => {
    const chat = require('./../config/getChatId');
    getClient().sendMessage(chat.id, message, options)
}

module.exports = sendMessage;