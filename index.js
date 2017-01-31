var fontManager = require('font-manager');

// synchronous API
var fonts = fontManager.getAvailableFontsSync();


console.log(JSON.stringify(fonts,0,2))


const SystemFonts = require('system-font-families').default;
const systemFonts = new SystemFonts();
const fontList = systemFonts.getFontsSync();
console.log(JSON.stringify(fontList,0,2))
systemFonts.getFonts().then(
  (res) => {
    // res is an array of font family strings
    // do something with the response
    console.log(JSON.stringify(res,0,2))
  }
);
