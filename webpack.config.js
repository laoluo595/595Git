//倒入路径模块
var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
//导入这个玩意vue-loader才能用。15.*出来的问题！！！
var VueLoaderPlugin = require('vue-loader/lib/plugin');
//提供给webpack的配置对象
module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'), //输出路径
        filename: 'bundle.js' //输出文件名
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), //配置模板路径
            filename: 'index.html' //生成的文件名称
        }),
        // make sure to include the plugin for the magic
        //15.*版本出的问题！！！需要配置这个，我也不知道是啥
        new VueLoaderPlugin()
    ],
    module: { //第三方loader模块
        rules: [ //规则
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, // 处理 CSS 文件的 loader
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }, // 处理 less 文件的 loader
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }, // 处理 scss 文件的 loader
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]'
            }, // 处理 图片路径的 loader
            // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            }, // 处理 字体文件的 loader 
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, // 配置 Babel 来转换高级的ES语法
            {
                test: /\.vue$/,
                use: 'vue-loader'
            } // 处理 .vue 文件的 loader
        ]
    }
}