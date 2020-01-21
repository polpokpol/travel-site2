const path = require('path');

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-nested'),
    require('postcss-simple-vars'),
    require('autoprefixer')
]

module.exports = {
    entry: './app/assets/scripts/App.js',
    output:{
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    },
    devServer:{
        before:function(app, server){
            server._watch('./app/**/*.html') // i dont know what it does. haha needs readings
        },
        contentBase:path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host: '0.0.0.0',
    },
    mode: 'development',
    // watch: true,
    module:{
        rules: [
            {   // since we cant use this on browser ordinarily so we use this
                test: /\.css$/i,    // regular expression, anything ends with .css
                use: ['style-loader','css-loader', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}] // use 'css-loader' npm install css-loader style-loader --save-dev
            }
        ]
    }
}