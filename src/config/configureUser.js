const fs = require('fs');
const path = require('path');

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

const configureUser = (client) => {

    return new Promise((resolve, reject) => {
        console.log("Envíe el siguiente código al chat donde quiere que funcione el bot.");
        generatedCode = genRanHex(20);
        console.log(generatedCode);

        client.on('message_create', (message) => {
            if (message.body === generatedCode) {
                const chat = {
                    id: message.to
                }
                try {
                    fs.writeFileSync(path.join(__dirname, './chat.json'), JSON.stringify(chat));
                }
                catch (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(message.to);
            }
        });
    });
}

module.exports = configureUser;