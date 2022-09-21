const prompt = require('prompt-sync')();
const { getClient } = require('../config/getClient');

const commandChat = async () => {
    const client = getClient();
    const response = prompt(`Desea cambiar el chat del bot de impresión? [si/no]: `).toLocaleLowerCase().trim();
    if (response === "si" || response === "s") {
        //delete chat.json and call configureuser
        const configureUser = require('../config/configureUser');
        const id = await configureUser(client);
        delete require.cache[require.resolve('../config/getChatId')];
        chat = {};
        chat.id = require('../config/getChatId').id;
        console.log(`Chat ID configured: ${id}`);
    }
    else {
        console.log("cancelado.");
    }

}

module.exports = commandChat;