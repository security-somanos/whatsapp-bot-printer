let { getOptions, setOptions } = require('./../config/getOptions');

/**
 * Erases options from the options object.
 */
const eraseOptions = () => {
    setOptions({});
}

const customDebounce = (fn, ms) => {
    let lastExecution;
    return function() {
        clearTimeout(lastExecution);
        lastExecution = setTimeout(fn, ms);

    }
}
const eraseOptionsDebounced = customDebounce(eraseOptions, 600000);

module.exports = {
    eraseOptions,
    eraseOptionsDebounced,
}