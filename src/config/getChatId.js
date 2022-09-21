const fs = require('fs');
const path = require('path');

const filename = './chat.json';

const getChatId = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, filename), {encoding:'utf8', flag:'r'}).toString();
        const chat = JSON.parse(data);
        if (!chat.id) {
            return  {}
        }
        return chat;
    }
    catch (err) {
        return {};
    }
}

module.exports = getChatId();