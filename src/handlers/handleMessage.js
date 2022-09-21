const canPrint = require("./../helpers/canPrint");
const handleMedia = require('./handleMedia');
const handleConfig = require('./handleConfig');

/**
 * 
 * @param {Message} message WhatsApp Web message object
 */
const handleMessage = async (message) => {
    if (!canPrint(message)) {
        return;
    }

    console.log({ from: message.from, body: message.body })
    
    if (!message.hasMedia) {
        handleConfig(message.body);
        return;
    }

    const media = await message.downloadMedia();
    if (media === undefined) {
        console.error("media undefined", message);
        return;
    }
    handleMedia(media, message);
}

module.exports = handleMessage;