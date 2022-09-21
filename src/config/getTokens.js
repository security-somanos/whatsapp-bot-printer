const fs = require('fs');
const path = require('path');

const filename = './printerTokens.json';

//declare isvalidata function
const isValidData = (data) => {
    if (data.keywords && data.optionsWin && data.optionsLinux) {
        return true;
    }
    return false;
}


const getTokens = () => {
    let tokens = [
        {  
            keywords: ["partitura"],
            optionsWin: {
                scale: "fit",
                paperSize: "A4",
                monochrome: true,
            },
            optionsLinux: {
                scale: "fit",
                paperSize: "A4",
                monochrome: true,
            }
        },
        {  
            keywords: ["documento"],
            optionsWin: {
                scale: "fit",
                paperSize: "A4",
                monochrome: true,
            },
            optionsLinux: {
                scale: "fit",
                paperSize: "A4",
                monochrome: true,
            }
        },
        {  
            keywords: ["ajustar"],
            optionsWin: {
                scale: "fit",
            },
            optionsLinux: {
                scale: "fit",
            }
        },
        {  
            keywords: ["inversa"],
            optionsWin: {
                pages: "-1",
            },
            optionsLinux: {
                pages: "-1",
            }
        },
        {  
            keywords: ["impar"],
            optionsWin: {
                subset: "odd",
            },
            optionsLinux: {
                subset: "odd",
            }
        },
        {  
            keywords: ["par"],
            optionsWin: {
                subset: "even",
            },
            optionsLinux: {
                subset: "even",
            }
        },
        {  
            keywords: ["A4", "a4"],
            optionsWin: {
                paperSize: "A4",
            },
            optionsLinux: {
                paperSize: "A4",
            }
        },
        {  
            keywords: ["A3", "a3"],
            optionsWin: {
                paperSize: "A3",
            },
            optionsLinux: {
                paperSize: "A3",
            }
        },
        {  
            keywords: ["A2", "a2"],
            optionsWin: {
                paperSize: "A2",
            },
            optionsLinux: {
                paperSize: "A2",
            }
        },
        {  
            keywords: ["A5", "a5"],
            optionsWin: {
                paperSize: "A5",
            },
            optionsLinux: {
                paperSize: "A5",
            }
        },
        {  
            keywords: ["A6", "a6"],
            optionsWin: {
                paperSize: "A6",
            },
            optionsLinux: {
                paperSize: "A6",
            }
        },
        {  
            keywords: ["Carta", "carta"],
            optionsWin: {
                paperSize: "letter",
            },
            optionsLinux: {
                paperSize: "letter",
            }
        },
        {  
            keywords: ["Legal", "legal"],
            optionsWin: {
                paperSize: "legal",
            },
            optionsLinux: {
                paperSize: "legal",
            }
        },
        {  
            keywords: ["Tabloide", "tabloide"],
            optionsWin: {
                paperSize: "tabloid",
            },
            optionsLinux: {
                paperSize: "tabloid",
            }
        },
        {  
            keywords: ["color"],
            optionsWin: {
                monochrome: false,
            },
            optionsLinux: {
                monochrome: false,
            }
        },
        {  
            keywords: ["blanco", "negro"],
            optionsWin: {
                monochrome: true,
            },
            optionsLinux: {
                monochrome: true,
            }
        },
        {  
            keywords: ["monocromatico"],
            optionsWin: {
                monochrome: true,
            },
            optionsLinux: {
                monochrome: true,
            }
        },
        {  
            keywords: ["mono"],
            optionsWin: {
                monochrome: true,
            },
            optionsLinux: {
                monochrome: true,
            }
        },
        {  
            keywords: ["doble", "faz"],
            optionsWin: {
                side: "duplex",
            },
            optionsLinux: {
                side: "duplex",
            }
        },
        {  
            keywords: ["doble", "faz", "largo"],
            optionsWin: {
                side: "duplexlong",
            },
            optionsLinux: {
                side: "duplexlong",
            }
        },
        {  
            keywords: ["doble", "faz", "corto"],
            optionsWin: {
                side: "duplexshort",
            },
            optionsLinux: {
                side: "duplexshort",
            }
        },
    ];

    try {
        const data = fs.readFileSync(path.join(__dirname, filename), {encoding:'utf8', flag:'r'}).toString();
        const json = JSON.parse(data);
        json.forEach((printerData) => {
            if (isValidData(printerData)) {
                tokens.push(printerData);
            }
            else {
                console.log(`Invalid data in ${filename}: ${JSON.stringify(printerData)}`);
            }
        })
    }
    catch (err) {
        console.log('Debe ejecutar el comando "impresoras" para configurar el bot.');
    }
    return tokens;
}

const exportedTokens = getTokens();

module.exports = exportedTokens;
