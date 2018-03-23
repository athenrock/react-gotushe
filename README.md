搭建一个react的框架，用来学习巩固前段时间学到的东西，因为是学习，所以是尽量使用新版本的插件及脚手架

### 开启历程,搭建一个最简单的项目

1.创建项目,还是使用最笨的方式,创建文件夹然后`npm init`

2.创建一个app文件夹，添加main.js作为唯一入口 
main.js
```javascript
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(<p>hello world</p>
    ,document.getElementById('root'))
```

  创建一个build文件夹，添加一个index.html做为最终要呈现的文件(这个以后可以根据模版生成)

index.html文件内容
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>hello world</title>
</head>
<body>

<div id="root"></div>

<script src="bundle.js"></script>
</body>
</html>

```

3.开始安装我们需要的库，首先安装 react、 react-dom、 webpack我选择用webpack打包，所以直接就添加了
命令如下：

    npm install --save--dev react react-dom webpack

ok,package.json文件中对应生产 

```json
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "webpack": "^4.2.0"
```
表明现在react最新版本为16.2.x,webpack为4.2.x,在这个基础上我们来搭建

4.首先配置一下webpack,在文件根目录下面创建webpack.config.js文件

```javascript
const path = require('path');

module.exports = {
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  }
};

```

5. 在package.json文件里面的`scripts`添加启动项 

```json
"scripts": {
    "start": "webpack",             //这一行
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

6.尝试执行`npm start`,出错，提示需要安装`webpack-cli`

    The CLI moved into a separate package: webpack-cli.
    Please install 'webpack-cli' in addition to webpack itself to use the CLI.
    -> When using npm: npm install webpack-cli -D
    -> When using yarn: yarn add webpack-cli -D

安装完了后再次执行,出现loader错误

`You may need an appropriate loader to handle this file type.`

这个是因为识别不了js文件，在webpack.config.js中配置loader项,先安装babel-loader,

`npm install --sava--dev babel-loader babel-core babel-preset-env babel-preset-es2015 babel-preset-react`

```javascript
module:{
    rules:[
        {
           test: /\.js$/,
           exclude: /node_modules/,
           use: 'babel-loader'
       }
    ] 
 }
```

再在根目录下面创建一个叫`.babelrc`的文件，里面添加
```json
{
    "presets": [
        "react",
        "es2015"
    ]
}
```

安装完了后再次执行,在build文件夹下生成叫`bundle.js`的文件,这个文件被`index.html`引用，在浏览器中打开`index.html`，则呈现`hello world`
表示初步完成


### 进阶，搭建开发环境

上面咱们已经完成了最简单的项目搭建，但是也发现在开发过程中，不可能一直编译，然后生成文件。所以就需要开发环境下的热编译
现在的解决办法是使用`webpack-dev-server`,(注意如果是需要服务器渲染的项目，这个并不合适，需要使用`webpack-dev-middleware`来解决，这里不多说)
老规矩，先安装

`npm install webpack-dev-server --save-dev`

按完后要干嘛，或者说这个东西能做什么（当然是为开发环境下做事情）

在`package.json`中添加启动项

```json
"scripts": {
    "dev":"webpack-dev-server",     //添加的是这个
    "start": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
执行`npm run dev`,控制台会输出一下信息

```

i ｢wds｣: Project is running at http://localhost:8080/
i ｢wds｣: webpack output is served from /
‼ ｢wdm｣: Hash: e8e515e1dff451224918
Version: webpack 4.2.0
Time: 2199ms
Built at: 2018-3-22 18:12:37
    Asset     Size  Chunks             Chunk Names
bundle.js  237 KiB       0  [emitted]  main
Entrypoint main = bundle.js
   [1] ./node_modules/react/index.js 190 bytes {0} [built]
   [6] ./app/page/home/index.js 2.5 KiB {0} [built]
  [16] ./node_modules/react-dom/index.js 1.33 KiB {0} [built]
  [18] ./app/main.js 477 bytes {0} [built]
  [20] (webpack)/hot/emitter.js 77 bytes {0} [built]
  [22] (webpack)/hot sync nonrecursive ^\.\/log$ 170 bytes {0} [built]
  [26] ./node_modules/ansi-html/index.js 4.16 KiB {0} [built]
  [27] webpack/client/overlay.js 3.58 KiB {0} [built]
  [29] (webpack)-dev-server/client/socket.js 1.05 KiB {0} [built]
  [30] ./node_modules/loglevel/lib/loglevel.js 7.68 KiB {0} [built]
  [32] (webpack)-dev-server/node_modules/strip-ansi/index.js 161 bytes {0} [built]
  [35] ./node_modules/querystring-es3/index.js 127 bytes {0} [built]
  [39] ./node_modules/url/url.js 22.8 KiB {0} [built]
  [40] (webpack)-dev-server/client?http://localhost:8080 7.75 KiB {0} [built]
  [41] multi (webpack)-dev-server/client?http://localhost:8080 ./app/main.js 40 bytes {0} [built]
    + 27 hidden modules

```

我们访问 http://localhost:8080/  这个时候我们的目录结构会被以网站的形式展示出来，也就是说，我们建了一个虚拟站点。好了，我们想让地方访问我们的`index.html`
将命令稍微改一下`webpack-dev-server --inline --content-base ./build `,这样就运行起来了

如果我们想在webpack.config.js中进行配置，可以这么设置，添加一个`devServer`的模块

```javascript

    devServer:{
        contentBase: path.join(__dirname, "build"), //目标地址
        compress: true,                             //一切服务都启用gzip 压缩
        port: 9000                                  //换个端口
    }

```



