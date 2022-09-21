let _client;

const getClient = () => {
    return _client;
}

const setClient = (client) => {
    _client = client;
}

module.exports = {
    getClient,
    setClient,
};