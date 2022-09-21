/**
 * Converts windows options to unix options.
 * @param {Object} winOptions Object containing printing options for Windows
 * @returns {Object} containing printing options for Unix
 */
const getUnixOptions = (winOptions) => {
    let unixOptions = [];
    const keys = Object.keys(winOptions);
    keys.forEach(key => {
        switch(key) {

            case "side":
                if (winOptions["side"] === "duplexlong") {
                    unixOptions.push("-o sides=two-sided-long-edge");
                }
                else if (winOptions["side"] === "duplexshort") {
                    unixOptions.push("-o sides=two-sided-short-edge");
                }
                else if (winOptions["side"] === "duplex") {
                    unixOptions.push("-o sides=two-sided-long-edge");
                }
                else {
                    unixOptions.push("-o sides=one-sided");
                }
                break;
            
            case "pages":
                unixOptions.push("-P " + winOptions["pages"]);
                break;

            case "scale":
                if (winOptions["scale"] === "fit"){
                    unixOptions.push("-o fit-to-page");
                }
                break;

            case "monochrome":
                //TODO
                if (winOptions["monochrome"] === true) {
                    //unixOptions.push("");
                }
                else {
                    //message += "\nA color.";
                }
                break;

            case "paperSize":
                unixOptions.push(`-o media=${winOptions["paperSize"]}`);
                break;

            case "copies":
                unixOptions.push("-n " + winOptions["copies"]);
                break;
                
        }
    })
    return unixOptions;
};

module.exports = getUnixOptions;