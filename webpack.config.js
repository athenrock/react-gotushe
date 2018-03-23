const path = require('path');

module.exports = {
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module:{
    rules:[
        {
           test: /\.js$/,
           exclude: /node_modules/,
           use: 'babel-loader'
       },
        {
            test: /\.css$/,
            use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
            ]
        },
       {
        test: /\.less$/,
        exclude: /node_modules/,
        use:[
            {
                loader:"style-loader"
            },
            {
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }  
        ]
        }
    ] 
 },
 devServer:{
    contentBase: path.join(__dirname, "build"), 
    compress: true,
    port: 9000
}
};