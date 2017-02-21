/*
import fs from 'fs';
import path from 'path';
import fontInfo from 'fontInfo';
*/

const fs = require('fs');
const path = require('path');
const fontInfo = require('fontinfo');
const opentype = require('opentype.js');

const getPlatform = () => (process.platform === 'darwin') ? 'osx' : (/win/.test(process.platform) ? 'windows' : 'linux');

const recGetFile = (target) => {
    let stats;
    try {
        stats = fs.statSync(target);
    } catch(e) {
        // console.error(e);
        return [];
    }
    if(stats.isDirectory()) {
        let files;
        try {
            files = fs.readdirSync(target);
        } catch(e) {
            console.error(e);
        }
        return files
            .reduce((arr, f) => {
                return arr.concat(recGetFile(path.join(target, f)));
            }, []);
    } else {
        const ext = path.extname(target).toLowerCase();
        if(ext === '.ttf' || ext === '.otf') {
            return [ target ];
        } else {
            return [];
        }
    }
};

const getFontFiles = () => {
    let directories;
    const platform = getPlatform();
    if(platform === 'osx') {
        const home = process.env.HOME;
        directories = [
            path.join(home, 'Library', 'Fonts'),
            path.join('/', 'Library', 'Fonts')
        ];
    } else if(platform === 'windows') {
        const winDir = process.env.windir || process.env.WINDIR;
        directories = [
            path.join(winDir, 'Fonts')
        ];
    } else {    // some flavor of Linux, most likely
        const home = process.env.HOME;
        directories = [
            path.join(home, '.fonts'),
            path.join(home, '.local', 'share', 'fonts'),
            path.join('/', 'usr', 'share', 'fonts'),
            path.join('/', 'usr', 'local', 'share', 'fonts')
        ];
    }
    return directories
        .reduce((arr, d) => {
            return arr.concat(recGetFile(d));
        }, []);
};

const SystemFonts = function() {

    var fontFiles = getFontFiles();

    console.log('fontFiles: ', fontFiles.length)

    this.getFonts = () => {
        let promiseList = [];
        fontFiles
            .forEach((file) => {
                promiseList.push(new Promise((resolve) => {
                    console.log(file)
                    ttfInfo.get(file, (err, fontMeta) => {
                        if(!fontMeta) {
                            resolve('');
                        } else {
                            resolve(fontMeta.tables.name['1']);
                        }
                    });
                }));
            });
        return new Promise((resolve, reject) => {
            Promise.all(promiseList).then(
                (res) => {

                    const names = res
                        .filter((data) => data ? true : false)
                        .reduce((obj, name) => {
                            obj[name] = 1;
                            return obj;
                        }, {});

                    resolve(Object.keys(names).sort((a, b) => a.localeCompare(b)));
                },
                (err) => reject(err)
            );
        });
    };

    this.getFontInfo = (callback) => {
        fontFiles = ['/Library/Fonts/AppleGothic.ttf', '/Library/Fonts/AppleMyungjo.ttf'];

        opentype.load('/Library/Fonts/AppleGothic.ttf', function(err, font) {
            if (err) {
                alert('Could not load font: ' + err);
            } else {
                // Use your font here.
                console.log(font);
            }
        });
    }

    this.getFontsSync = () => {
        //fontFiles = ['/Library/Fonts/AppleGothic.ttf', '/Library/Fonts/AppleMyungjo.ttf'];
        return fontFiles
            .filter(file => {
              return file.match(/ttf/i);
            })
            .reduce((arr, file) => {
                let data;
                try {
                    data = fontInfo(file);
                } catch(error) {
                    console.log('error:', error, file)
                    return arr;
                }
                return arr.concat({file, data});
            }, [])
            .map((fontMeta, index) => {
                //console.log(JSON.stringify(fontMeta,0,2))
                return fontMeta;
            })
            .sort((a,b) => a.file.localeCompare(b.file))
    };

};

//export default SystemFonts;
module.exports = SystemFonts;
