import React from 'react';
import fs from 'fs';
import opentype from 'opentype.js';

/*
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

var a = font.load('Wingdings.ttf')
console.log(a.tables[1].contents())

*/

import SystemFonts from '../lib/findfonts';
import '../assets/css/font-grid.css';
const systemFonts = new SystemFonts();

/*
var style = (function() {
    // Create the <style> tag
    var style = document.createElement("style");

    // WebKit hack
    style.appendChild(document.createTextNode(""));

    // Add the <style> element to the page
    document.head.appendChild(style);

    console.log(style.sheet.cssRules); // length is 0, and no rules

    return style;
})();

style.sheet.insertRule(rule, 0);
*/

function addStylesheetRules (rules) {
  var styleEl = document.createElement('style'),
      styleSheet;

  // Append style element to head
  document.head.appendChild(styleEl);

  // Grab style sheet
  styleSheet = styleEl.sheet;

  for (var i = 0, rl = rules.length; i < rl; i++) {
    var j = 1, rule = rules[i], selector = rules[i][0], propStr = '';
    // If the second argument of a rule is an array of arrays, correct our variables.
    if (Object.prototype.toString.call(rule[1][0]) === '[object Array]') {
      rule = rule[1];
      j = 0;
    }

    for (var pl = rule.length; j < pl; j++) {
      var prop = rule[j];
      propStr += prop[0] + ':' + prop[1] + (prop[2] ? ' !important' : '') + ';\n';
    }

    // Insert CSS Rule
    styleSheet.insertRule(selector + '{' + propStr + '}', styleSheet.cssRules.length);
  }
}
/*
const FONT = fs.readFileSync("/Library/Fonts/Zapfino.ttf");

var base64data = new Buffer(FONT).toString('base64');

addStylesheetRules([
  ['@font-face',
    ['font-family', 'Bazar'],
    ['src', `url(data:font/ttf;base64,${base64data}) format('truetype')`]
  ],
  ['body', // Also accepts a second argument as an array of arrays instead
    ['color', 'red'],
    ['font-family', 'Bazar'],
    ['background-color', 'green', true] // 'true' for !important rules
  ]
]);
*/

export default function HomePage () {
  const fontList = systemFonts.getFontsSync();

  const fontFamilies = fontList.reduce(function (c, p) {
    let name = p.data.name;
    let family = name.preferredFamily || name.fontFamily;
    c[family] = c[family] || {};
    c[family] = p;
    return c;
  }, {});

  console.log(fontFamilies);

  var makeItems = function (items) {
    return Object.keys(fontFamilies).map(function(family, index) {
      /*
      var file = fs.readFileSync(fontFamilies[family][0].file);
      var base64data = new Buffer(file).toString('base64');
      addStylesheetRules([
        ['@font-face',
          ['font-family', family],
          ['src', `url(data:font/ttf;base64,${base64data}) format('truetype')`]
        ]
      ]);

      */

      //let font = opentype.loadSync(fontFamilies[family][0].file);

      //console.log(font.getPath('hello').toSVG());

      function getStyle(family) {
        return {
          fontFamily: family
        }
      }
      return (
        <li key={index} className="grid-item family">
          {/*<span>{family.data.name.fontFamily}</span>
          <span>{family.data.name.fontFamily.slice(0, 2)}</span>
          <span>3 variations</span>*/}
          <span className="name">{family}</span>
          <span className="preview" style={getStyle(family)}>{family.slice(0, 2)}</span>
          <span className="variations">{fontFamilies[family].length} Varations</span>
        </li>
      );
    });
  }

  return (
    <div className="windowx">
      <h1>Hello world</h1>

      <ul className="grid">
        {makeItems()}
      </ul>
    </div>
  );
}
