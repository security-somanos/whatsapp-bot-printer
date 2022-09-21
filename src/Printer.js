let { getClient, setClient } = require('./config/getClient');
const chat = require('./config/getChatId');
// Handlers 
const handleMessage = require('./handlers/handleMessage');
const commandImpresoras = require('./commands/comandImpresoras');
const commandChat = require('./commands/commandChat')
let started = false;

const start = async (client) => {
    started = true;
    if (!chat.id) {
        const configureUser = require('./config/configureUser');
        const id = await configureUser(client);
        delete require.cache[require.resolve('./config/getChatId')];
        chat.id = require('./config/getChatId').id;
        console.log(`Chat ID configured: ${id}`);
    }

    //Setting up WhatsApp Web client;
    setClient(client);
    client.on('message_create', handleMessage);
}

const stop = () => {
    getClient().removeListener('message_create', handleMessage);
    started = false;
}


module.exports = {
    name: "Printer",
    start,
    stop,
    getIsRunning: () => started,
    commands: {
        impresoras: commandImpresoras,
        chat: commandChat,
    }
}