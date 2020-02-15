const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-nested'),
    require('postcss-simple-vars'),
    require('autoprefixer')
]

class RunAfterCompile{
    apply(compiler){
        compiler.hooks.done.tap('Copy images', function(){
            fse.copySync('./app/assets/images', './docs/assets/images')
        })
    }
}

let cssConfig = {   // since we cant use this on browser ordinarily so we use this
    test: /\.css$/i,    // regular expression, anything ends with .css
    use: ['css-loader', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}] // use 'css-loader' npm install css-loader style-loader --save-dev
}

let pages = fse.readdirSync('./app').filter(function(file){
    return file.endsWith('.html')
}).map(function(page){
    return new HtmlWebpackPlugin({
        filename: page,
        template: `./app/${page}`
    })
});

let config = {
    entry: './app/assets/scripts/App.js',
    plugins: pages,
    module:{
        rules: [
            cssConfig
        ]
    },

}

if(currentTask == 'dev'){
    cssConfig.use.unshift('style-loader');
    config.output = {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    }
    config.devServer = {
        before:function(app, server){
            server._watch('./app/**/*.html') // i dont know what it does. haha needs readings
        },
        contentBase:path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host: '0.0.0.0',
    },
    config.mode = 'development'
}

if(currentTask == "build"){

    config.module.rules.push({
        test: /\.js$/,
        exclude: /(node-modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    })

    cssConfig.use.unshift(MiniCssExtractPlugin.loader);
    postCSSPlugins.push(require('cssnano')); // 50 50 opinion, cause its not readable. Delete it if you want the css to be readable
    config.output = {
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'docs')
    },
    config.mode = 'production';
    config.optimization = {
        splitChunks: {chunks: 'all'}
    }
    config.plugins.push(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
        new RunAfterCompile()  
    );
    
}





module.exports = config;