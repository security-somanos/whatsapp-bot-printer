// This code was a module of a bigger project.
const { Client, LocalAuth } = require('whatsapp-web.js');
const {setClient} = require('./src/config/getClient');
const qrcode = require('qrcode-terminal');
const commandImpresoras = require('./src/commands/comandImpresoras');
const commandChat = require('./src/commands/commandChat');
const printer = require('./src/Printer');


const handleReady = () => {
    console.log('Client is ready!');

    setClient(client);

    commands.push({
        name: "impresoras",
        handler: commandImpresoras,
    });
    commands.push({
        name: "chat",
        handler: commandChat,
    });

    process.stdin.addListener('data', (d) => {
        let idx = commands.findIndex((command) => command.name.toLocaleLowerCase() === d.toString().trim().toLocaleLowerCase());
        if (idx !== -1) {
            commands[idx].handler(client);
        }    
    });

    printer.start(client);
};

let commands = [];


//Setup client and listeners
const client = new Client({
    authStrategy: new LocalAuth(),
});

client.once('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.once('ready', handleReady);

client.initialize();




