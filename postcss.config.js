const path = require('path');

module.exports = {
    plugins: [
        require('postcss-import')({
            path: [path.resolve(__dirname, './src/components/web-common/src/app/common/css')]
        }),
        require('postcss-url')(),
        require('postcss-cssnext')({
            browsers: [
                'ie >= 10',
                'Safari >= 7',
                'ff >= 28',
                'Chrome >= 34'
            ]
        }),
        require('postcss-reporter')()
    ]
};
