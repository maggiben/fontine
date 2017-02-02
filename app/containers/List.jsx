import React from 'react'
import fs from 'fs';
import opentype from 'opentype.js';
import SystemFonts from '../lib/findfonts';
import '../assets/css/font-grid.css';

export default class List extends React.Component {

  constructor(...args) {
    super(...args);
    let systemFonts = new SystemFonts();
    this.fontList = systemFonts.getFontsSync();
  }

  makeItems () {
    let fontFamilies = this.fontList
    /*.filter(function (font) {
      return font.data.name.kind.match(/OpenType/i) || font.match(/TrueType/i)
    })*/
    .reduce(function (c, p) {
      let name = p.data.name;
      let family = name.preferredFamily || name.fontFamily;
      c[family] = c[family] || {};
      c[family] = p;
      return c;
    }, {});
    console.log(fontFamilies)
    return Object.keys(fontFamilies).map(function(family, index) {
      function getStyle(family) {
        return {
          fontFamily: family
        }
      }
      return (
        <li key={index} className="grid-item family">
          <span className="name">{family}</span>
          <span className="preview" style={getStyle(family)}>{family.slice(0, 2)}</span>
          <span className="variations">{fontFamilies[family].length} Varations</span>
        </li>
      );
    });
  }

  render() {
    return (<ul className="grid">{this.makeItems()}</ul>);
  }
}
