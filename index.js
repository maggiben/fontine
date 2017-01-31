var fontManager = require('font-manager');

// synchronous API 
var fonts = fontManager.getAvailableFontsSync();


console.log(JSON.stringify(fonts,0,2))
