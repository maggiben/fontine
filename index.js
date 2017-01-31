var fontManager = require('font-manager');

// synchronous API
var fonts = fontManager.getAvailableFontsSync();


//console.log(JSON.stringify(fonts,0,2))
const SystemFonts = require('./app/lib/findfonts');
const systemFonts = new SystemFonts();
const fontList = systemFonts.getFontsSync();
//console.log(fontList)
var font = require('./app/lib/font');
/*
let fontList = font.listFonts();
console.log(fontList)
*/

var a = font.load('Wingdings.ttf')
console.log(a.tables[1].contents())
