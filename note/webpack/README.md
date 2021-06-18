---
sidebarDepth: 2
sidebar: auto
---

# Webpack

## 一、起步

### 1、基本安装

首先我们创建一个目录，初始化 npm，然后 [在本地安装 webpack](https://webpack.docschina.org/guides/installation#local-installation)，接着安装 [`webpack-cli`](https://github.com/webpack/webpack-cli)（此工具用于在命令行中运行 webpack）：

```
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

现在，我们将创建以下目录结构、文件和内容：

**project**

```diff
  webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```

**src/index.js**

```js
function component() {
  const element = document.createElement('div');

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

**index.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>起步</title>
    <script src="https://unpkg.com/lodash@4.17.20"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

我们还需要调整 `package.json` 文件，以便确保我们安装包是 `private(私有的)`，并且移除 `main` 入口。这可以防止意外发布你的代码。

**package.json**

```diff
 {
   "name": "webpack-demo",
   "version": "1.0.0",
   "description": "",
-  "main": "index.js",
+  "private": true,
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
   },
   "keywords": [],
   "author": "",
   "license": "ISC",
   "devDependencies": {
     "webpack": "^5.4.0",
     "webpack-cli": "^4.2.0"
   }
 }
```

**启动项目**

```
npx http-server
```

在此示例中，`<script>` 标签之间存在隐式依赖关系。在 `index.js` 文件执行之前，还需要在页面中先引入 `lodash`。这是因为 `index.js` 并未显式声明它需要 `lodash`，只是假定推测已经存在一个全局变量 `_`。

使用这种方式去管理 JavaScript 项目会有一些问题：

- 无法直接体现，脚本的执行依赖于外部库。
- 如果依赖不存在，或者引入顺序错误，应用程序将无法正常运行。
- 如果依赖被引入但是并没有使用，浏览器将被迫下载无用代码。

让我们使用 webpack 来管理这些脚本。



### 2、创建一个bundle

首先，我们稍微调整下目录结构，创建分发代码(`./dist`)文件夹用于存放分发代码，源代码(`./src`)文件夹仍存放源代码。

**project**

```diff
  webpack-demo
  |- package.json
+ |- /dist
+   |- index.html
- |- index.html
  |- /src
    |- index.js
```

要在 `index.js` 中打包 `lodash` 依赖，我们需要在本地安装 library：

```
npm install --save lodash
```

**src/index.js**

```diff
+import _ from 'lodash';
+
 function component() {
   const element = document.createElement('div');
 
-  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
+  // lodash，现在通过一个 script 引入
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
 
   return element;
 }
 
 document.body.appendChild(component());
```

**dist/index.html**

```diff
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8" />
     <title>起步</title>
-    <script src="https://unpkg.com/lodash@4.17.20"></script>
   </head>
   <body>
-    <script src="./src/index.js"></script>
+    <script src="main.js"></script>
   </body>
 </html>
```

**开始打包**

```
$ npx webpack
```



### 3、模块

[ES2015](https://babeljs.io/learn-es2015/) 中的 [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 和 [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) 语句已经被标准化。虽然大多数浏览器还无法支持它们，但是 webpack 却能够提供开箱即用般的支持。

事实上，webpack 在幕后会将代码“**转译**”，以便旧版本浏览器可以执行。如果你检查 `dist/main.js`，你可以看到 webpack 具体如何实现，这是独创精巧的设计！除了 `import` 和 `export`，webpack 还能够很好地支持多种其他模块语法，更多信息请查看 [模块 API](https://webpack.docschina.org/api/module-methods)。

注意，webpack 不会更改代码中除 `import` 和 `export` 语句以外的部分。如果你在使用其它 [ES2015 特性](http://es6-features.org/)，请确保你在 webpack [loader 系统](https://webpack.docschina.org/concepts/loaders/) 中使用了 [Babel](https://babel.docschina.org/) 

**请查看编译后的代码。**



### 4、使用一个配置文件

**project**

```diff
  webpack-demo
  |- package.json
+ |- webpack.config.js
  |- /dist
    |- index.html
  |- /src
    |- index.js
```

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

现在，让我们通过新的配置文件再次执行构建：



### 5、npm scripts

**package.json**

```diff
 {
   "name": "webpack-demo",
   "version": "1.0.0",
   "description": "",
   "private": true,
   "scripts": {
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "test": "echo \"Error: no test specified\" && exit 1",
+    "build": "webpack"
   },
   "keywords": [],
   "author": "",
   "license": "ISC",
   "devDependencies": {
     "webpack": "^5.4.0",
     "webpack-cli": "^4.2.0"
   },
   "dependencies": {
     "lodash": "^4.17.20"
   }
 }
```

现在运行以下命令：

```
$ npm run build
```



## 二、管理资源

### 1、设置

在开始之前，让我们对项目做一个小的修改：

**dist/index.html**

```diff
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8" />
-    <title>起步</title>
+    <title>管理资源</title>
   </head>
   <body>
-    <script src="main.js"></script>
+    <script src="bundle.js"></script>
   </body>
 </html>
```

**webpack.config.js**

```diff
 const path = require('path');
 
 module.exports = {
   entry: './src/index.js',
   output: {
-    filename: 'main.js',
+    filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```



### 2、加载 CSS 

为了在 JavaScript 模块中 `import` 一个 CSS 文件，你需要安装 [style-loader](https://webpack.docschina.org/loaders/style-loader) 和 [css-loader](https://webpack.docschina.org/loaders/css-loader)，并在 [`module` 配置](https://webpack.docschina.org/configuration/module) 中添加这些 loader：

```bash
npm install --save-dev style-loader css-loader
```

**webpack.config.js**

```diff
 const path = require('path');
 
 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
+  module: {
+    rules: [
+      {
+        test: /\.css$/i,
+        use: ['style-loader', 'css-loader'],
+      },
+    ],
+  },
 };
```

我们尝试一下，通过在项目中添加一个新的 `style.css` 文件，并将其 import 到我们的 `index.js` 中：

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- style.css
    |- index.js
  |- /node_modules
```

**src/style.css**

```css
.hello {
  color: red;
}
```

**src/index.js**

```diff
 import _ from 'lodash';
+import './style.css';
 
 function component() {
   const element = document.createElement('div');
 
   // Lodash, now imported by this script
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+  element.classList.add('hello');
 
   return element;
 }
 
 document.body.appendChild(component());
```

现在运行 build 命令：

```
$ npm run build
```



### 3、加载 images 图像 

假如，现在我们正在下载 CSS，但是像 background 和 icon 这样的图像，要如何处理呢？在 webpack 5 中，可以使用内置的 [Asset Modules](https://webpack.docschina.org/guides/asset-modules/)，我们可以轻松地将这些内容混入我们的系统中：

**webpack.config.js**

```diff
 const path = require('path');
 
 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
     rules: [
       {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
+      {
+        test: /\.(png|svg|jpg|jpeg|gif)$/i,
+        type: 'asset/resource',
+      },
     ],
   },
 };
```

我们向项目添加一个图像，然后看它是如何工作的，你可以使用任何你喜欢的图像：

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

**src/index.js**

```diff
 import _ from 'lodash';
 import './style.css';
+import Icon from './icon.png';
 
 function component() {
   const element = document.createElement('div');
 
   // Lodash, now imported by this script
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
   element.classList.add('hello');
 
+  // 将图像添加到我们已经存在的 div 中。
+  const myIcon = new Image();
+  myIcon.src = Icon;
+
+  element.appendChild(myIcon);
+
   return element;
 }
 
 document.body.appendChild(component());
```

**src/style.css**

```diff
 .hello {
   color: red;
+  background: url('./icon.png');
 }
```

重新构建并再次打开 `index.html` 文件：

```
$ npm run build
```



### 4、加载 fonts 字体

那么，像字体这样的其他资源如何处理呢？使用 Asset Modules 可以接收并加载任何文件，然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，也包括字体。让我们更新 `webpack.config.js` 来处理字体文件：

**webpack.config.js**

```diff
 const path = require('path');
 
 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
     rules: [
       {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
       {
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         type: 'asset/resource',
       },
+      {
+        test: /\.(woff|woff2|eot|ttf|otf)$/i,
+        type: 'asset/resource',
+      },
     ],
   },
 };
```

在项目中添加一些字体文件：

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- my-font.woff
+   |- my-font.woff2
    |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

配置好 loader 并将字体文件放在合适的位置后，你可以通过一个 `@font-face` 声明将其混合。本地的 `url(...)` 指令会被 webpack 获取处理，就像它处理图片一样：

**src/style.css**

```diff
+@font-face {
+  font-family: 'MyFont';
+  src: url('./my-font.woff2') format('woff2'),
+    url('./my-font.woff') format('woff');
+  font-weight: 600;
+  font-style: normal;
+}
+
 .hello {
   color: red;
+  font-family: 'MyFont';
   background: url('./icon.png');
 }
```

现在，让我们重新构建，然后看下 webpack 是否处理了我们的字体：

```
$ npm run build
```



### 5、加载数据

此外，可以加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的，也就是说 `import Data from './data.json'` 默认将正常运行。要导入 CSV、TSV 和 XML，你可以使用 [csv-loader](https://github.com/theplatapi/csv-loader) 和 [xml-loader](https://github.com/gisikw/xml-loader)。让我们处理加载这三类文件：

```
npm install --save-dev csv-loader xml-loader
```

**webpack.config.js**

```diff
 const path = require('path');
 
 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
     rules: [
       {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
       {
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         type: 'asset/resource',
       },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/i,
         type: 'asset/resource',
       },
+      {
+        test: /\.(csv|tsv)$/i,
+        use: ['csv-loader'],
+      },
+      {
+        test: /\.xml$/i,
+        use: ['xml-loader'],
+      },
     ],
   },
 };
```

在项目中添加一些数据文件：

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- data.xml
+   |- data.csv
    |- my-font.woff
    |- my-font.woff2
    |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

**src/data.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Mary</to>
  <from>John</from>
  <heading>Reminder</heading>
  <body>Call Cindy on Tuesday</body>
</note>
```

**src/data.csv**

```csv
to,from,heading,body
Mary,John,Reminder,Call Cindy on Tuesday
Zoe,Bill,Reminder,Buy orange juice
Autumn,Lindsey,Letter,I miss you
```

现在，你可以 `import` 这四种类型的数据(JSON, CSV, TSV, XML)中的任何一种，所导入的 `Data` 变量，将包含可直接使用的已解析 JSON：

**src/index.js**

```diff
 import _ from 'lodash';
 import './style.css';
 import Icon from './icon.png';
+import Data from './data.xml';
+import Notes from './data.csv';
 
 function component() {
   const element = document.createElement('div');
 
   // Lodash, now imported by this script
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
   element.classList.add('hello');
 
   // Add the image to our existing div.
   const myIcon = new Image();
   myIcon.src = Icon;
 
   element.appendChild(myIcon);
 
+  console.log(Data);
+  console.log(Notes);
+
   return element;
 }
 
 document.body.appendChild(component());
```

重新执行 `npm run build` 命令，然后打开 `dist/index.html`。查看开发者工具中的控制台，你应该能够看到导入的数据会被打印出来！



#### (1) 自定义 JSON 模块 parser 

通过使用 [自定义 parser](https://webpack.docschina.org/configuration/module/#ruleparserparse) 替代特定的 webpack loader，可以将任何 `toml`、`yaml` 或 `json5` 文件作为 JSON 模块导入。

假设你在 `src` 文件夹下有一个 `data.toml`、一个 `data.yaml` 以及一个 `data.json5` 文件：

**src/data.toml**

```toml
title = "TOML Example"

[owner]
name = "Tom Preston-Werner"
organization = "GitHub"
bio = "GitHub Cofounder & CEO\nLikes tater tots and beer."
dob = 1979-05-27T07:32:00Z
```

**src/data.yaml**

```yaml
title: YAML Example
owner:
  name: Tom Preston-Werner
  organization: GitHub
  bio: |-
    GitHub Cofounder & CEO
    Likes tater tots and beer.
  dob: 1979-05-27T07:32:00.000Z
```

**src/data.json5**

```json5
{
  // comment
  title: "JSON5 Example",
  owner: {
    name: "Tom Preston-Werner",
    organization: "GitHub",
    bio: "GitHub Cofounder & CEO\n\
Likes tater tots and beer.",
    dob: "1979-05-27T07:32:00.000Z"
  }
}
```

首先安装 `toml`，`yamljs` 和 `json5` 的 packages：

```bash
npm install toml yamljs json5 --save-dev
```

并在你的 webpack 中配置它们：

**webpack.config.js**

```diff
 const path = require('path');
+const toml = require('toml');
+const yaml = require('yamljs');
+const json5 = require('json5');
 
 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
     rules: [
       {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
       {
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         type: 'asset/resource',
       },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/i,
         type: 'asset/resource',
       },
       {
         test: /\.(csv|tsv)$/i,
         use: ['csv-loader'],
       },
       {
         test: /\.xml$/i,
         use: ['xml-loader'],
       },
+      {
+        test: /\.toml$/i,
+        type: 'json',
+        parser: {
+          parse: toml.parse,
+        },
+      },
+      {
+        test: /\.yaml$/i,
+        type: 'json',
+        parser: {
+          parse: yaml.parse,
+        },
+      },
+      {
+        test: /\.json5$/i,
+        type: 'json',
+        parser: {
+          parse: json5.parse,
+        },
+      },
     ],
   },
 };
```

**src/index.js**

```diff
 import _ from 'lodash';
 import './style.css';
 import Icon from './icon.png';
 import Data from './data.xml';
 import Notes from './data.csv';
+import toml from './data.toml';
+import yaml from './data.yaml';
+import json from './data.json5';
+
+console.log(toml.title); // output `TOML Example`
+console.log(toml.owner.name); // output `Tom Preston-Werner`
+
+console.log(yaml.title); // output `YAML Example`
+console.log(yaml.owner.name); // output `Tom Preston-Werner`
+
+console.log(json.title); // output `JSON5 Example`
+console.log(json.owner.name); // output `Tom Preston-Werner`
 
 function component() {
   const element = document.createElement('div');
 
   // Lodash, now imported by this script
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
   element.classList.add('hello');
 
   // Add the image to our existing div.
   const myIcon = new Image();
   myIcon.src = Icon;
 
   element.appendChild(myIcon);
 
   console.log(Data);
   console.log(Notes);
 
   return element;
 }
 
 document.body.appendChild(component());
```

再次运行 `npm run build` 命令并在浏览器中打开 `dist/index.html`，可以在控制台上看到打印结果。



### 6、全局资源 

上述所有内容中最出色之处在于，以这种方式加载资源，你可以以更直观的方式将模块和资源组合在一起。无需依赖于含有全部资源的 `/assets` 目录，而是将资源与代码组合在一起使用。例如，类似这样的结构会非常有用：

```diff
- |- /assets
+ |– /components
+ |  |– /my-component
+ |  |  |– index.jsx
+ |  |  |– index.css
+ |  |  |– icon.svg
+ |  |  |– img.png
```

这种配置方式会使你的代码更具备可移植性，因为现有的集中放置的方式会让所有资源紧密耦合起来。假如你想在另一个项目中使用 `/my-component`，只需将其复制或移动到 `/components` 目录下。只要你已经安装过全部_外部依赖_，并且_已经在配置中定义过相同的 loader_，那么项目应该能够良好运行。

但是，假如你只能被局限在旧有开发方式，或者你有一些在多个组件（视图、模板、模块等）之间共享的资源。你仍然可以将这些资源存储在一个基本目录(base directory)中，甚至配合使用 [alias](https://webpack.docschina.org/configuration/resolve/#resolvealias) 来使它们更方便 `import 导入`。



#三、管理输出

到目前为止，我们都是在 `index.html` 文件中手动引入所有资源，然而随着应用程序增长，并且一旦开始 [在文件名中使用 hash](https://webpack.docschina.org/guides/caching) 并输出 [多个 bundle](https://webpack.docschina.org/guides/code-splitting)，如果继续手动管理 `index.html` 文件，就会变得困难起来。然而，通过一些插件可以使这个过程更容易管控。

### 1、预先准备 

首先，调整一下我们的项目：

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- index.js
+   |- print.js
  |- /node_modules
```

我们在 `src/print.js` 文件中添加一些逻辑：

**src/print.js**

```js
export default function printMe() {
  console.log('I get called from print.js!');
}
```

并且在 `src/index.js` 文件中使用这个函数：

**src/index.js**

```diff
 import _ from 'lodash';
+import printMe from './print.js';
 
 function component() {
   const element = document.createElement('div');
+  const btn = document.createElement('button');
 
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
 
+  btn.innerHTML = 'Click me and check the console!';
+  btn.onclick = printMe;
+
+  element.appendChild(btn);
+
   return element;
 }
 
 document.body.appendChild(component());
```

还要更新 `dist/index.html` 文件，来为 webpack 分离入口做好准备：

**dist/index.html**

```diff
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8" />
-    <title>管理资源</title>
+    <title>管理输出</title>
+    <script src="./print.bundle.js"></script>
   </head>
   <body>
-    <script src="bundle.js"></script>
+    <script src="./index.bundle.js"></script>
   </body>
 </html>
```

现在调整配置。我们将在 entry 添加 `src/print.js` 作为新的入口起点（`print`），然后修改 output，以便根据入口起点定义的名称，动态地产生 bundle 名称：

**webpack.config.js**

```diff
 const path = require('path');
 
 module.exports = {
-  entry: './src/index.js',
+  entry: {
+    index: './src/index.js',
+    print: './src/print.js',
+  },
   output: {
-    filename: 'bundle.js',
+    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```

**执行 `npm run build`**

我们可以看到，webpack 生成 `print.bundle.js` 和 `index.bundle.js` 文件，这也和我们在 `index.html` 文件中指定的文件名称相对应。如果你在浏览器中打开 `index.html`，就可以看到在点击按钮时会发生什么。

但是，如果我们更改了我们的一个入口起点的名称，甚至添加了一个新的入口，会发生什么？会在构建时重新命名生成的 bundle，但是我们的 `index.html` 文件仍然引用旧的名称。让我们用 [`HtmlWebpackPlugin`](https://webpack.docschina.org/plugins/html-webpack-plugin) 来解决这个问题。



### 2、设置 HtmlWebpackPlugin

首先安装插件，并且调整 `webpack.config.js` 文件：

```bash
npm install --save-dev html-webpack-plugin
```

**webpack.config.js**

```diff
 const path = require('path');
+const HtmlWebpackPlugin = require('html-webpack-plugin');
 
 module.exports = {
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
+  plugins: [
+    new HtmlWebpackPlugin({
+      title: '管理输出',
+    }),
+  ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```

在我们构建之前，你应该了解，虽然在 `dist/` 文件夹我们已经有了 `index.html` 这个文件，然而 `HtmlWebpackPlugin` 还是会默认生成它自己的 `index.html` 文件。也就是说，它会用新生成的 `index.html` 文件，替换我们的原有文件。

如果在代码编辑器中打开 `index.html`，你会看到 `HtmlWebpackPlugin` 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中。



### 3、清理 `/dist` 文件夹

你可能已经注意到，由于遗留了之前的指南和代码示例，我们的 `/dist` 文件夹显得相当杂乱。webpack 将生成文件并放置在 `/dist` 文件夹中，但是它不会追踪哪些文件是实际在项目中用到的。

通常比较推荐的做法是，在每次构建前清理 `/dist` 文件夹，这样只会生成用到的文件。让我们实现这个需求。

[`clean-webpack-plugin`](https://www.npmjs.com/package/clean-webpack-plugin) 是一个流行的清理插件，安装和配置它。

```bash
npm install --save-dev clean-webpack-plugin
```

**webpack.config.js**

```diff
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
+const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
 module.exports = {
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
   plugins: [
+    new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
       title: 'Output Management',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```

现在，执行 `npm run build`，检查 `/dist` 文件夹。如果一切顺利，现在只会看到构建后生成的文件，而没有旧文件！



### 4、manifest 

你可能会很感兴趣，webpack 和 webpack 插件似乎“知道”应该生成哪些文件。答案是，webpack 通过 manifest，可以追踪所有模块到输出 bundle 之间的映射。如果你想要知道如何以其他方式来控制 webpack [`输出`](https://webpack.docschina.org/configuration/output)，了解 manifest 是个好的开始。

通过 [`WebpackManifestPlugin`](https://github.com/shellscape/webpack-manifest-plugin) 插件，可以将 manifest 数据提取为一个容易使用的 json 文件。

首先安装 webpack-manifest-plugin：

```
npm install webpack-manifest-plugin --save-dev
```

**webpack.config.js**

```diff
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
+const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '管理输出',
    }),
+   new WebpackManifestPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
```

现在，执行 `npm run build`，会发现 `dist/manifest.json`文件，文件内容如下：

```json
{
  "index.js": "autoindex.bundle.js",
  "print.js": "autoprint.bundle.js",
  "index.html": "autoindex.html"
}
```



## 四、开发环境

如果你一直跟随之前的指南，应该对一些 webpack 基础知识有着很扎实的理解。在我们继续之前，先来看看如何设置一个开发环境，使我们的开发体验变得更轻松一些。

在开始前，我们先将 [`mode` 设置为 `'development'`](https://webpack.docschina.org/configuration/mode/#mode-development)，并将 `title` 设置为 `'Development'`。

**webpack.config.js**

```diff
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
 module.exports = {
+  mode: 'development',
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
   plugins: [
     new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
-      title: 'Output Management',
+      title: 'Development',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```



### 1、使用 source-map

当 webpack 打包源代码时，可能会很难追踪到 error(错误) 和 warning(警告) 在源代码中的原始位置。例如，如果将三个源文件（`a.js`, `b.js` 和 `c.js`）打包到一个 bundle（`bundle.js`）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会直接指向到 `bundle.js`。你可能需要准确地知道错误来自于哪个源文件，所以这种提示这通常不会提供太多帮助。

为了更容易地追踪 error 和 warning，JavaScript 提供了 [source maps](http://blog.teamtreehouse.com/introduction-source-maps) 功能，可以将编译后的代码映射回原始源代码。如果一个错误来自于 `b.js`，source map 就会明确的告诉你。

#### (1) devtool 配置说明表

| devtool                                    | performance                              | production | quality        | comment                                                      |
| :----------------------------------------- | :--------------------------------------- | :--------- | :------------- | :----------------------------------------------------------- |
| (none)                                     | **build**: fastest  **rebuild**: fastest | yes        | bundle         | Recommended choice for production builds with maximum performance. |
| **`eval`**                                 | **build**: fast  **rebuild**: fastest    | no         | generated      | Recommended choice for development builds with maximum performance. |
| `eval-cheap-source-map`                    | **build**: ok  **rebuild**: fast         | no         | transformed    | Tradeoff choice for development builds.                      |
| `eval-cheap-module-source-map`             | **build**: slow  **rebuild**: fast       | no         | original lines | Tradeoff choice for development builds.                      |
| **`eval-source-map`**                      | **build**: slowest  **rebuild**: ok      | no         | original       | Recommended choice for development builds with high quality SourceMaps. |
| `cheap-source-map`                         | **build**: ok  **rebuild**: slow         | no         | transformed    |                                                              |
| `cheap-module-source-map`                  | **build**: slow  **rebuild**: slow       | no         | original lines |                                                              |
| **`source-map`**                           | **build**: slowest  **rebuild**: slowest | yes        | original       | Recommended choice for production builds with high quality SourceMaps. |
| `inline-cheap-source-map`                  | **build**: ok  **rebuild**: slow         | no         | transformed    |                                                              |
| `inline-cheap-module-source-map`           | **build**: slow  **rebuild**: slow       | no         | original lines |                                                              |
| `inline-source-map`                        | **build**: slowest  **rebuild**: slowest | no         | original       | Possible choice when publishing a single file                |
| `eval-nosources-cheap-source-map`          | **build**: ok  **rebuild**: fast         | no         | transformed    | source code not included                                     |
| `eval-nosources-cheap-module-source-map`   | **build**: slow  **rebuild**: fast       | no         | original lines | source code not included                                     |
| `eval-nosources-source-map`                | **build**: slowest  **rebuild**: ok      | no         | original       | source code not included                                     |
| `inline-nosources-cheap-source-map`        | **build**: ok  **rebuild**: slow         | no         | transformed    | source code not included                                     |
| `inline-nosources-cheap-module-source-map` | **build**: slow  **rebuild**: slow       | no         | original lines | source code not included                                     |
| `inline-nosources-source-map`              | **build**: slowest  **rebuild**: slowest | no         | original       | source code not included                                     |
| `nosources-cheap-source-map`               | **build**: ok  **rebuild**: slow         | no         | transformed    | source code not included                                     |
| `nosources-cheap-module-source-map`        | **build**: slow  **rebuild**: slow       | no         | original lines | source code not included                                     |
| `nosources-source-map`                     | **build**: slowest  **rebuild**: slowest | yes        | original       | source code not included                                     |
| `hidden-nosources-cheap-source-map`        | **build**: ok  **rebuild**: slow         | no         | transformed    | no reference, source code not included                       |
| `hidden-nosources-cheap-module-source-map` | **build**: slow  **rebuild**: slow       | no         | original lines | no reference, source code not included                       |
| `hidden-nosources-source-map`              | **build**: slowest  **rebuild**: slowest | yes        | original       | no reference, source code not included                       |
| `hidden-cheap-source-map`                  | **build**: ok  **rebuild**: slow         | no         | transformed    | no reference                                                 |
| `hidden-cheap-module-source-map`           | **build**: slow  **rebuild**: slow       | no         | original lines | no reference                                                 |
| `hidden-source-map`                        | **build**: slowest  **rebuild**: slowest | yes        | original       | no reference. Possible choice when using SourceMap only for error reporting purposes. |

- **开发环境推荐配置**

  以下选项非常适合开发环境：

  `eval` - 每个模块都使用 `eval()` 执行，并且都有 `//@ sourceURL`。此选项会非常快地构建。主要缺点是，由于会映射到转换后的代码，而不是映射到原始代码（没有从 loader 中获取 source map），所以不能正确的显示行数。

  `eval-source-map` - 每个模块使用 `eval()` 执行，并且 source map 转换为 DataUrl 后添加到 `eval()` 中。初始化 source map 时比较慢，但是会在重新构建时提供比较快的速度，并且生成实际的文件。行数能够正确映射，因为会映射到原始代码中。它会生成用于开发环境的最佳品质的 source map。

  `eval-cheap-source-map` - 类似 `eval-source-map`，每个模块使用 `eval()` 执行。这是 "cheap(低开销)" 的 source map，因为它没有生成列映射(column mapping)，只是映射行数。它会忽略源自 loader 的 source map，并且仅显示转译后的代码，就像 `eval` devtool。

  `eval-cheap-module-source-map` - 类似 `eval-cheap-source-map`，并且，在这种情况下，源自 loader 的 source map 会得到更好的处理结果。然而，loader source map 会被简化为每行一个映射(mapping)。

  

- **生产环境推荐配置**

  这些选项通常用于生产环境中：

  `(none)`（省略 `devtool` 选项） - 不生成 source map。这是一个不错的选择。

  `source-map` - 整个 source map 作为一个单独的文件生成。它为 bundle 添加了一个引用注释，以便开发工具知道在哪里可以找到它。

  `hidden-source-map` - 与 `source-map` 相同，但不会为 bundle 添加引用注释。如果你只想 source map 映射那些源自错误报告的错误堆栈跟踪信息，但不想为浏览器开发工具暴露你的 source map，这个选项会很有用。

  `nosources-source-map` - 创建的 source map 不包含 `sourcesContent(源代码内容)`。它可以用来映射客户端上的堆栈跟踪，而无须暴露所有的源代码。你可以将 source map 文件部署到 web 服务器。



###(2) 配置示例

webpack 仓库中包含一个 [显示所有 `devtool` 变体效果的示例](https://github.com/webpack/webpack/tree/master/examples/source-map)。这些例子或许会有助于你理解这些差异之处。

**example.coffee**

```
## Taken from http://coffeescript.org/

## Objects:
math =
  root:   Math.sqrt
  square: square
  cube:   (x) -> x * square x

## Splats:
race = (winner, runners...) ->
  print winner, runners
```

**webpack.config.js**

```
var path = require("path");

module.exports = [
	"eval",
	"eval-cheap-source-map",
	"eval-cheap-module-source-map",
	"eval-source-map",
	"cheap-source-map",
	"cheap-module-source-map",
	"inline-cheap-source-map",
	"inline-cheap-module-source-map",
	"source-map",
	"inline-source-map",
	"hidden-source-map",
	"nosources-source-map"
].map(devtool => ({
	mode: "development",
	entry: {
		bundle: "coffee-loader!./example.coffee"
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: `./[name]-${devtool}.js`
	},
	devtool,
	optimization: {
		runtimeChunk: true
	}
}));
```

**Generated source-maps**

- source-map.js and source-map.js.map

```
(self["webpackChunk"] = self["webpackChunk"] || []).push([[0],[
/* 0 */
/*!*********************************************************************!*\
  !*** ../../node_modules/coffee-loader/dist/cjs.js!./example.coffee ***!
  \*********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

// Taken from http://coffeescript.org/

// Objects:
var math, race;

math = {
  root: Math.sqrt,
  square: square,
  cube: function(x) {
    return x * square(x);
  }
};

// Splats:
race = function(winner, ...runners) {
  return print(winner, runners);
};


/***/ })
],
0,[[0,1]]]);
//## sourceMappingURL=bundle-source-map.js.map
{"version":3,"sources":["webpack:///./example.coffee"],"names":[],"mappings":";;;;;;;;;AAEU;;;AAAA;;AACV,OACE;EAAA,MAAQ,IAAI,CAAC,IAAb;EACA,QAAQ,MADR;EAEA,MAAQ,SAAC,CAAD;WAAO,IAAI,OAAO,CAAP;EAAX;AAFR,EAFQ;;;AAOV,OAAO,SAAC,MAAD,KAAS,OAAT;SACL,MAAM,MAAN,EAAc,OAAd;AADK","file":"./bundle-source-map.js","sourcesContent":["## Taken from http://coffeescript.org/\n\n## Objects:\nmath =\n  root:   Math.sqrt\n  square: square\n  cube:   (x) -> x * square x\n\n## Splats:\nrace = (winner, runners...) ->\n  print winner, runners\n"],"sourceRoot":""}
```

- hidden-source-map.js and hidden-source-map.js.map

```
(self["webpackChunk"] = self["webpackChunk"] || []).push([[0],[
/* 0 */
/*!*********************************************************************!*\
  !*** ../../node_modules/coffee-loader/dist/cjs.js!./example.coffee ***!
  \*********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

// Taken from http://coffeescript.org/

// Objects:
var math, race;

math = {
  root: Math.sqrt,
  square: square,
  cube: function(x) {
    return x * square(x);
  }
};

// Splats:
race = function(winner, ...runners) {
  return print(winner, runners);
};


/***/ })
],
0,[[0,1]]]);
{"version":3,"sources":["webpack:///./example.coffee"],"names":[],"mappings":";;;;;;;;;AAEU;;;AAAA;;AACV,OACE;EAAA,MAAQ,IAAI,CAAC,IAAb;EACA,QAAQ,MADR;EAEA,MAAQ,SAAC,CAAD;WAAO,IAAI,OAAO,CAAP;EAAX;AAFR,EAFQ;;;AAOV,OAAO,SAAC,MAAD,KAAS,OAAT;SACL,MAAM,MAAN,EAAc,OAAd;AADK","file":"./bundle-hidden-source-map.js","sourcesContent":["## Taken from http://coffeescript.org/\n\n## Objects:\nmath =\n  root:   Math.sqrt\n  square: square\n  cube:   (x) -> x * square x\n\n## Splats:\nrace = (winner, runners...) ->\n  print winner, runners\n"],"sourceRoot":""}
```

- inline-source-map.js

```
(self["webpackChunk"] = self["webpackChunk"] || []).push([[0],[
/* 0 */
/*!*********************************************************************!*\
  !*** ../../node_modules/coffee-loader/dist/cjs.js!./example.coffee ***!
  \*********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

// Taken from http://coffeescript.org/

// Objects:
var math, race;

math = {
  root: Math.sqrt,
  square: square,
  cube: function(x) {
    return x * square(x);
  }
};

// Splats:
race = function(winner, ...runners) {
  return print(winner, runners);
};


/***/ })
],
0,[[0,1]]]);
//## sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9leGFtcGxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFVTs7O0FBQUE7O0FBQ1YsT0FDRTtFQUFBLE1BQVEsSUFBSSxDQUFDLElBQWI7RUFDQSxRQUFRLE1BRFI7RUFFQSxNQUFRLFNBQUMsQ0FBRDtXQUFPLElBQUksT0FBTyxDQUFQO0VBQVg7QUFGUixFQUZROzs7QUFPVixPQUFPLFNBQUMsTUFBRCxLQUFTLE9BQVQ7U0FDTCxNQUFNLE1BQU4sRUFBYyxPQUFkO0FBREsiLCJmaWxlIjoiLi9idW5kbGUtaW5saW5lLXNvdXJjZS1tYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIjIFRha2VuIGZyb20gaHR0cDovL2NvZmZlZXNjcmlwdC5vcmcvXG5cbiMgT2JqZWN0czpcbm1hdGggPVxuICByb290OiAgIE1hdGguc3FydFxuICBzcXVhcmU6IHNxdWFyZVxuICBjdWJlOiAgICh4KSAtPiB4ICogc3F1YXJlIHhcblxuIyBTcGxhdHM6XG5yYWNlID0gKHdpbm5lciwgcnVubmVycy4uLikgLT5cbiAgcHJpbnQgd2lubmVyLCBydW5uZXJzXG4iXSwic291cmNlUm9vdCI6IiJ9
```

- nosources-source-map.js.map

```
{"version":3,"sources":["webpack:///./example.coffee"],"names":[],"mappings":";;;;;;;;;AAEU;;;AAAA;;AACV,OACE;EAAA,MAAQ,IAAI,CAAC,IAAb;EACA,QAAQ,MADR;EAEA,MAAQ,SAAC,CAAD;WAAO,IAAI,OAAO,CAAP;EAAX;AAFR,EAFQ;;;AAOV,OAAO,SAAC,MAAD,KAAS,OAAT;SACL,MAAM,MAAN,EAAc,OAAd;AADK","file":"./bundle-nosources-source-map.js","sourceRoot":""}
```

- eval-source-map.js

```
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk"] = self["webpackChunk"] || []).push([[0],[
/* 0 */
/*!*********************************************************************!*\
  !*** ../../node_modules/coffee-loader/dist/cjs.js!./example.coffee ***!
  \*********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

eval("// Taken from http://coffeescript.org/\n\n// Objects:\nvar math, race;\n\nmath = {\n  root: Math.sqrt,\n  square: square,\n  cube: function(x) {\n    return x * square(x);\n  }\n};\n\n// Splats:\nrace = function(winner, ...runners) {\n  return print(winner, runners);\n};\n//## sourceURL=[module]\n//## sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZXhhbXBsZS5jb2ZmZWU/MjQxNiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFVTs7O0FBQUEsSUFBQSxJQUFBLEVBQUE7O0FBQ1YsSUFBQSxHQUNFO0VBQUEsSUFBQSxFQUFRLElBQUksQ0FBQyxJQUFiO0VBQ0EsTUFBQSxFQUFRLE1BRFI7RUFFQSxJQUFBLEVBQVEsUUFBQSxDQUFDLENBQUQsQ0FBQTtXQUFPLENBQUEsR0FBSSxNQUFBLENBQU8sQ0FBUDtFQUFYO0FBRlIsRUFGUTs7O0FBT1YsSUFBQSxHQUFPLFFBQUEsQ0FBQyxNQUFELEVBQUEsR0FBUyxPQUFULENBQUE7U0FDTCxLQUFBLENBQU0sTUFBTixFQUFjLE9BQWQ7QUFESyIsInNvdXJjZXNDb250ZW50IjpbIiMgVGFrZW4gZnJvbSBodHRwOi8vY29mZmVlc2NyaXB0Lm9yZy9cblxuIyBPYmplY3RzOlxubWF0aCA9XG4gIHJvb3Q6ICAgTWF0aC5zcXJ0XG4gIHNxdWFyZTogc3F1YXJlXG4gIGN1YmU6ICAgKHgpIC0+IHggKiBzcXVhcmUgeFxuXG4jIFNwbGF0czpcbnJhY2UgPSAod2lubmVyLCBydW5uZXJzLi4uKSAtPlxuICBwcmludCB3aW5uZXIsIHJ1bm5lcnNcbiJdLCJmaWxlIjoiMC5qcyJ9\n//## sourceURL=webpack-internal:///0\n");

/***/ })
],
0,[[0,1]]]);
```

- eval.js

```
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk"] = self["webpackChunk"] || []).push([[0],[
/* 0 */
/*!*********************************************************************!*\
  !*** ../../node_modules/coffee-loader/dist/cjs.js!./example.coffee ***!
  \*********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

eval("// Taken from http://coffeescript.org/\n\n// Objects:\nvar math, race;\n\nmath = {\n  root: Math.sqrt,\n  square: square,\n  cube: function(x) {\n    return x * square(x);\n  }\n};\n\n// Splats:\nrace = function(winner, ...runners) {\n  return print(winner, runners);\n};\n\n\n//## sourceURL=webpack:///./example.coffee?../../node_modules/coffee-loader/dist/cjs.js");

/***/ })
],
0,[[0,1]]]);
```

- eval-cheap-source-map.js

```
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk"] = self["webpackChunk"] || []).push([[0],[
/* 0 */
/*!*********************************************************************!*\
  !*** ../../node_modules/coffee-loader/dist/cjs.js!./example.coffee ***!
  \*********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

eval("// Taken from http://coffeescript.org/\n\n// Objects:\nvar math, race;\n\nmath = {\n  root: Math.sqrt,\n  square: square,\n  cube: function(x) {\n    return x * square(x);\n  }\n};\n\n// Splats:\nrace = function(winner, ...runners) {\n  return print(winner, runners);\n};\n//## sourceURL=[module]\n//## sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2V4YW1wbGUuY29mZmVlP2VlNTgiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGFrZW4gZnJvbSBodHRwOi8vY29mZmVlc2NyaXB0Lm9yZy9cblxuLy8gT2JqZWN0czpcbnZhciBtYXRoLCByYWNlO1xuXG5tYXRoID0ge1xuICByb290OiBNYXRoLnNxcnQsXG4gIHNxdWFyZTogc3F1YXJlLFxuICBjdWJlOiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHggKiBzcXVhcmUoeCk7XG4gIH1cbn07XG5cbi8vIFNwbGF0czpcbnJhY2UgPSBmdW5jdGlvbih3aW5uZXIsIC4uLnJ1bm5lcnMpIHtcbiAgcmV0dXJuIHByaW50KHdpbm5lciwgcnVubmVycyk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//## sourceURL=webpack-internal:///0\n");

/***/ })
],
0,[[0,1]]]);
```

- eval-cheap-module-source-map.js

```
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk"] = self["webpackChunk"] || []).push([[0],[
/* 0 */
/*!*********************************************************************!*\
  !*** ../../node_modules/coffee-loader/dist/cjs.js!./example.coffee ***!
  \*********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

eval("// Taken from http://coffeescript.org/\n\n// Objects:\nvar math, race;\n\nmath = {\n  root: Math.sqrt,\n  square: square,\n  cube: function(x) {\n    return x * square(x);\n  }\n};\n\n// Splats:\nrace = function(winner, ...runners) {\n  return print(winner, runners);\n};\n//## sourceURL=[module]\n//## sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZXhhbXBsZS5jb2ZmZWU/MjQxNiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFVTs7O0FBQUEsSUFBQSxJQUFBLEVBQUE7O0FBQ1YsSUFBQSxHQUNFO0VBQUEsSUFBQSxFQUFRLElBQUksQ0FBQyxJQUFiO0VBQ0EsTUFBQSxFQUFRLE1BRFI7RUFFQSxJQUFBLEVBQVEsUUFBQSxDQUFDLENBQUQsQ0FBQTtXQUFPLENBQUEsR0FBSSxNQUFBLENBQU8sQ0FBUDtFQUFYO0FBRlIsRUFGUTs7O0FBT1YsSUFBQSxHQUFPLFFBQUEsQ0FBQyxNQUFELEVBQUEsR0FBUyxPQUFULENBQUE7U0FDTCxLQUFBLENBQU0sTUFBTixFQUFjLE9BQWQ7QUFESyIsInNvdXJjZXNDb250ZW50IjpbIiMgVGFrZW4gZnJvbSBodHRwOi8vY29mZmVlc2NyaXB0Lm9yZy9cblxuIyBPYmplY3RzOlxubWF0aCA9XG4gIHJvb3Q6ICAgTWF0aC5zcXJ0XG4gIHNxdWFyZTogc3F1YXJlXG4gIGN1YmU6ICAgKHgpIC0+IHggKiBzcXVhcmUgeFxuXG4jIFNwbGF0czpcbnJhY2UgPSAod2lubmVyLCBydW5uZXJzLi4uKSAtPlxuICBwcmludCB3aW5uZXIsIHJ1bm5lcnNcbiJdLCJmaWxlIjoiMC5qcyJ9\n//## sourceURL=webpack-internal:///0\n");

/***/ })
],
0,[[0,1]]]);
```

- cheap-module-source-map.js.map

```
{"version":3,"file":"./bundle-cheap-module-source-map.js","sources":["webpack:///./example.coffee"],"sourcesContent":["## Taken from http://coffeescript.org/\n\n## Objects:\nmath =\n  root:   Math.sqrt\n  square: square\n  cube:   (x) -> x * square x\n\n## Splats:\nrace = (winner, runners...) ->\n  print winner, runners\n"],"mappings":";;;;;;;;;AAEA;AACA;;AADA;AACA;AAAA;AACA;AACA;AACA;AAAA;AAAA;AAFA;AACA;;AAIA;AACA;AADA;AACA;AACA;A;;A","sourceRoot":""}
```

- cheap-source-map.js.map

```
{"version":3,"file":"./bundle-cheap-source-map.js","sources":["webpack:///./example.coffee"],"sourcesContent":["// Taken from http://coffeescript.org/\n\n// Objects:\nvar math, race;\n\nmath = {\n  root: Math.sqrt,\n  square: square,\n  cube: function(x) {\n    return x * square(x);\n  }\n};\n\n// Splats:\nrace = function(winner, ...runners) {\n  return print(winner, runners);\n};\n"],"mappings":";;;;;;;;;AAAA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;A;;A","sourceRoot":""}
```



#### (3) 演练

对于本指南，我们将使用 `inline-source-map` 选项，这有助于解释说明示例意图（此配置仅用于示例，不要用于生产环境）：

**webpack.config.js**

```diff
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
 module.exports = {
   mode: 'development',
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
+  devtool: 'inline-source-map',
   plugins: [
     new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
       title: 'Development',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```

现在，让我们来做一些调试，在 `print.js` 文件中生成一个错误：

**src/print.js**

```diff
 export default function printMe() {
-  console.log('I get called from print.js!');
+  cosnole.log('I get called from print.js!');
 }
```

**运行 `npm run build**`

现在，在浏览器中打开生成的 `index.html` 文件，点击按钮，并且在控制台查看显示的错误。错误应该如下：

```bash
Uncaught ReferenceError: cosnole is not defined
   at HTMLButtonElement.printMe (print.js:2)
```

我们可以看到，此错误包含有发生错误的文件（`print.js`）和行号（2）的引用。这是非常有帮助的，因为现在我们可以确切地知道，所要解决问题的位置。



### 2、选择一个开发工具 

在每次编译代码时，手动运行 `npm run build` 会显得很麻烦。

webpack 提供几种可选方式，帮助你在代码发生变化后自动编译代码：

- webpack's [Watch Mode](https://webpack.docschina.org/configuration/watch/#watch)
-  [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)

多数场景中，你可能需要使用 `webpack-dev-server`，但是不妨探讨一下以上的所有选项。

#### (1) 使用 watch mode(*观察模式*)

你可以指示 webpack "watch" 依赖图中所有文件的更改。如果其中一个文件被更新，代码将被重新编译，所以你不必再去手动运行整个构建。

我们添加一个用于启动 webpack watch mode 的 npm scripts：

**package.json**

```diff
 {
   "name": "webpack-demo",
   "version": "1.0.0",
   "description": "",
   "private": true,
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
+    "watch": "webpack --watch",
     "build": "webpack"
   },
   "keywords": [],
   "author": "",
   "license": "ISC",
   "devDependencies": {
     "clean-webpack-plugin": "^3.0.0",
     "html-webpack-plugin": "^4.5.0",
     "webpack": "^5.4.0",
     "webpack-cli": "^4.2.0"
   },
   "dependencies": {
     "lodash": "^4.17.20"
   }
 }
```

如果不想在 watch 触发增量构建后删除 `index.html` 文件，可以在 `CleanWebpackPlugin` 中配置 [`cleanStaleWebpackAssets` 选项](https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional) 来实现：

**webpack.config.js**

```diff
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
 module.exports = {
   mode: 'development',
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
   devtool: 'inline-source-map',
   plugins: [
-    new CleanWebpackPlugin(),
+    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
     new HtmlWebpackPlugin({
       title: 'Development',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```

现在，你可以在命令行中运行 `npm run watch`，然后就会看到 webpack 是如何编译代码。 然而，你会发现并没有退出命令行。这是因为此 script 当前还在 watch 你的文件。

现在，webpack 观察文件的同时，先移除我们之前加入的错误：

**src/print.js**

```diff
 export default function printMe() {
-  cosnole.log('I get called from print.js!');
+  console.log('I get called from print.js!');
 }
```

现在，保存文件并检查 terminal(终端) 窗口。应该可以看到 webpack 自动地重新编译修改后的模块！

唯一的缺点是，为了看到修改后的实际效果，你需要刷新浏览器。如果能够自动刷新浏览器就更好了，因此接下来我们会尝试通过 `webpack-dev-server` 实现此功能。



#### (2) 使用 webpack-dev-server

`webpack-dev-server` 为你提供了一个简单的 web server，并且具有 live reloading(实时重新加载) 功能。设置如下：

```bash
npm install --save-dev webpack-dev-server
```

修改配置文件，告知 dev server，从什么位置查找文件：

**webpack.config.js**

```diff
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
 module.exports = {
   mode: 'development',
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
   devtool: 'inline-source-map',
+  devServer: {
+    contentBase: './dist',
+  },
   plugins: [
     new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
     new HtmlWebpackPlugin({
       title: 'Development',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```

以上配置告知 `webpack-dev-server`，将 `dist` 目录下的文件 serve 到 `localhost:8080` 下。

我们添加一个可以直接运行 dev server 的 script：

**package.json**

```diff
 {
   "name": "webpack-demo",
   "version": "1.0.0",
   "description": "",
   "private": true,
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
     "watch": "webpack --watch",
+    "start": "webpack serve --open",
     "build": "webpack"
   },
   "keywords": [],
   "author": "",
   "license": "ISC",
   "devDependencies": {
     "clean-webpack-plugin": "^3.0.0",
     "html-webpack-plugin": "^4.5.0",
     "webpack": "^5.4.0",
     "webpack-cli": "^4.2.0",
     "webpack-dev-server": "^3.11.0"
   },
   "dependencies": {
     "lodash": "^4.17.20"
   }
 }
```

现在，在命令行中运行 `npm start`，我们会看到浏览器自动加载页面。如果你更改任何源文件并保存它们，web server 将在编译代码后自动重新加载。试试看！



#### (3) 使用 webpack-dev-middleware

`webpack-dev-middleware` 是一个封装器(wrapper)，它可以把 webpack 处理过的文件发送到一个 server。 `webpack-dev-server` 在内部使用了它，然而它也可以作为一个单独的 package 来使用，以便根据需求进行更多自定义设置。下面是一个 webpack-dev-middleware 配合 express server 的示例。

首先，安装 `express` 和 `webpack-dev-middleware`：

```bash
npm install --save-dev express webpack-dev-middleware
```

现在，我们需要调整 webpack 配置文件，以确保 middleware(中间件) 功能能够正确启用：

**webpack.config.js**

```diff
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
 module.exports = {
   mode: 'development',
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
   devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist',
   },
   plugins: [
     new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
     new HtmlWebpackPlugin({
       title: 'Development',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
+    publicPath: '/',
   },
 };
```

我们将会在 server 脚本使用 `publicPath`，以确保文件资源能够正确地 serve 在 `http://localhost:3000` 下，稍后我们会指定 port number(端口号)。接下来是设置自定义 `express` server：

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
+ |- server.js
  |- /dist
  |- /src
    |- index.js
    |- print.js
  |- /node_modules
```

**server.js**

```javascript
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置。
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// 将文件 serve 到 port 3000。
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```

现在，添加一个 npm script，以使我们更方便地运行 server：

**package.json**

```diff
 {
   "name": "webpack-demo",
   "version": "1.0.0",
   "description": "",
   "private": true,
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
     "watch": "webpack --watch",
     "start": "webpack serve --open",
+    "server": "node server.js",
     "build": "webpack"
   },
   "keywords": [],
   "author": "",
   "license": "ISC",
   "devDependencies": {
     "clean-webpack-plugin": "^3.0.0",
     "express": "^4.17.1",
     "html-webpack-plugin": "^4.5.0",
     "webpack": "^5.4.0",
     "webpack-cli": "^4.2.0",
     "webpack-dev-middleware": "^4.0.2",
     "webpack-dev-server": "^3.11.0"
   },
   "dependencies": {
     "lodash": "^4.17.20"
   }
 }
```

现在，在 terminal(终端) 中执行 `npm run server`，将会有类似如下信息输出：

```bash
Example app listening on port 3000!
...
<i> [webpack-dev-middleware] asset index.bundle.js 1.38 MiB [emitted] (name: index)
<i> asset print.bundle.js 6.25 KiB [emitted] (name: print)
<i> asset index.html 274 bytes [emitted]
<i> runtime modules 1.9 KiB 9 modules
<i> cacheable modules 530 KiB
<i>   ./src/index.js 406 bytes [built] [code generated]
<i>   ./src/print.js 83 bytes [built] [code generated]
<i>   ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
<i> webpack 5.4.0 compiled successfully in 709 ms
<i> [webpack-dev-middleware] Compiled successfully.
<i> [webpack-dev-middleware] Compiling...
<i> [webpack-dev-middleware] assets by status 1.38 MiB [cached] 2 assets
<i> cached modules 530 KiB (javascript) 1.9 KiB (runtime) [cached] 12 modules
<i> webpack 5.4.0 compiled successfully in 19 ms
<i> [webpack-dev-middleware] Compiled successfully.
```

现在，打开浏览器，访问 `http://localhost:3000`。应该看到 webpack 应用程序已经运行！



## 五、代码分离

代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

常用的代码分离方法有三种：

- **入口起点**：使用 [`entry`](https://webpack.docschina.org/configuration/entry-context) 配置手动地分离代码。
- **防止重复**：使用 [Entry dependencies](https://webpack.docschina.org/configuration/entry-context/#dependencies) 或者 [`SplitChunksPlugin`](https://webpack.docschina.org/plugins/split-chunks-plugin) 去重和分离 chunk。
- **动态导入**：通过模块的内联函数调用来分离代码。

### 1、入口起点(entry point) 

这是迄今为止最简单直观的分离代码的方式。不过，这种方式手动配置较多，并有一些隐患，我们将会解决这些问题。先来看看如何从 main bundle 中分离 another module(另一个模块)：

**project**

```diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
+ |- another-module.js
|- /node_modules
```

**another-module.js**

```js
import _ from 'lodash';

console.log(_.join(['Another', 'module', 'loaded!'], ' '));
```

**webpack.config.js**

```diff
 const path = require('path');
 
 module.exports = {
-  entry: './src/index.js',
+  mode: 'development',
+  entry: {
+    index: './src/index.js',
+    another: './src/another-module.js',
+  },
   output: {
-    filename: 'main.js',
+    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```

正如前面提到的，这种方式存在一些隐患：

- 如果入口 chunk 之间包含一些重复的模块，那些重复模块都会被引入到各个 bundle 中。
- 这种方法不够灵活，并且不能动态地将核心应用程序逻辑中的代码拆分出来。

以上两点中，第一点对我们的示例来说无疑是个问题，因为之前我们在 `./src/index.js` 中也引入过 `lodash`，这样就在两个 bundle 中造成重复引用。在下一章节会移除重复的模块。



### 2、防止重复(prevent duplication) 

#### (1) 入口依赖 

配置 [`dependOn` option](https://webpack.docschina.org/configuration/entry-context/#dependencies) 选项，这样可以在多个 chunk 之间共享模块：

**webpack.config.js**

```diff
 const path = require('path');
 
 module.exports = {
   mode: 'development',
   entry: {
-    index: './src/index.js',
-    another: './src/another-module.js',
+    index: {
+      import: './src/index.js',
+      dependOn: 'shared',
+    },
+    another: {
+      import: './src/another-module.js',
+      dependOn: 'shared',
+    },
+    shared: 'lodash',
   },
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```

如果我们要在一个 HTML 页面上使用多个入口时，还需设置 `optimization.runtimeChunk: 'single'`，否则还会遇到[这里](https://bundlers.tooling.report/code-splitting/multi-entry/)所述的麻烦。

**webpack.config.js**

```diff
 const path = require('path');
 
 module.exports = {
   mode: 'development',
   entry: {
     index: {
       import: './src/index.js',
       dependOn: 'shared',
     },
     another: {
       import: './src/another-module.js',
       dependOn: 'shared',
     },
     shared: 'lodash',
   },
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
+  optimization: {
+    runtimeChunk: 'single',
+  },
 };
```

构建结果如下：

```bash
...
[webpack-cli] Compilation finished
asset shared.bundle.js 549 KiB [compared for emit] (name: shared)
asset runtime.bundle.js 7.79 KiB [compared for emit] (name: runtime)
asset index.bundle.js 1.77 KiB [compared for emit] (name: index)
asset another.bundle.js 1.65 KiB [compared for emit] (name: another)
Entrypoint index 1.77 KiB = index.bundle.js
Entrypoint another 1.65 KiB = another.bundle.js
Entrypoint shared 557 KiB = runtime.bundle.js 7.79 KiB shared.bundle.js 549 KiB
runtime modules 3.76 KiB 7 modules
cacheable modules 530 KiB
  ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
  ./src/another-module.js 84 bytes [built] [code generated]
  ./src/index.js 257 bytes [built] [code generated]
webpack 5.4.0 compiled successfully in 249 ms
```

由上可知，除了生成 `shared.bundle.js`，`index.bundle.js` 和 `another.bundle.js` 之外，还生成了一个 `runtime.bundle.js` 文件。

尽管可以在 webpack 中允许每个页面使用多入口，应尽可能避免使用多入口：`entry: { page: ['./analytics', './app'] }`。如此，在使用 `async` 脚本标签时，会有更好的优化以及一致的执行顺序。



#### (2) SplitChunksPlugin

[`SplitChunksPlugin`](https://webpack.docschina.org/plugins/split-chunks-plugin) 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。让我们使用这个插件，将之前的示例中重复的 `lodash` 模块去除：

**webpack.config.js**

```diff
  const path = require('path');

  module.exports = {
    mode: 'development',
    entry: {
      index: './src/index.js',
      another: './src/another-module.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
+   optimization: {
+     splitChunks: {
+       chunks: 'all',
+     },
+   },
  };
```

使用 [`optimization.splitChunks`](https://webpack.docschina.org/plugins/split-chunks-plugin/#optimization-splitchunks) 配置选项之后，现在应该可以看出，`index.bundle.js` 和 `another.bundle.js` 中已经移除了重复的依赖模块。需要注意的是，插件将 `lodash` 分离到单独的 chunk，并且将其从 main bundle 中移除，减轻了大小。执行 `npm run build` 查看效果：

```bash
...
[webpack-cli] Compilation finished
asset vendors-node_modules_lodash_lodash_js.bundle.js 549 KiB [compared for emit] (id hint: vendors)
asset index.bundle.js 8.92 KiB [compared for emit] (name: index)
asset another.bundle.js 8.8 KiB [compared for emit] (name: another)
Entrypoint index 558 KiB = vendors-node_modules_lodash_lodash_js.bundle.js 549 KiB index.bundle.js 8.92 KiB
Entrypoint another 558 KiB = vendors-node_modules_lodash_lodash_js.bundle.js 549 KiB another.bundle.js 8.8 KiB
runtime modules 7.64 KiB 14 modules
cacheable modules 530 KiB
  ./src/index.js 257 bytes [built] [code generated]
  ./src/another-module.js 84 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
webpack 5.4.0 compiled successfully in 241 ms
```



#### (3) 其他分割工具

以下是由社区提供，一些对于代码分离很有帮助的 plugin 和 loader：

- [`mini-css-extract-plugin`](https://www.npmjs.com/package/mini-css-extract-plugin): 用于将 CSS 从主应用程序中分离。

首先，需要安装 `mini-css-extract-plugin`:

```
npm install --save-dev mini-css-extract-plugin css-loader
```

推荐将 `mini-css-extract-plugin` 与 [`css-loader`](https://github.com/webpack-contrib/css-loader) 结合使用。

接下来创建文件配置Webpack：

**src/style.css**

```css
body {
  background: green;
}
```

**src/index.js**

```diff
import _ from 'lodash'
+import './styles.css'

function component() {
  const element = document.createElement('div')

  element.innerHTML = _.join(['Hello', 'webpack'], ' ')

  return element
}

document.body.appendChild(component())
```

**webpack.config.js**

```diff
const path = require('path')
+const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    another: './src/another-module.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  
+ module: {
+   rules: [
+     {
+       test: /\.css$/i,
+       use: [MiniCssExtractPlugin.loader, 'css-loader'],
+     },
+   ],
+ },
+ plugins: [
+   new MiniCssExtractPlugin()
+ ],

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
```

执行`npm run build`结果如下：

```
assets by status 555 KiB [compared for emit]
  asset vendors-node_modules_lodash_lodash_js.bundle.js 546 KiB [compared for emit] (id hint: vendors)
  asset another.bundle.js 8.68 KiB [compared for emit] (name: another)
assets by status 9.26 KiB [emitted]
  asset index.bundle.js 9.23 KiB [emitted] (name: index)
  asset index.css 30 bytes [emitted] (name: index)
Entrypoint index 556 KiB = vendors-node_modules_lodash_lodash_js.bundle.js 546 KiB index.css 30 bytes index.bundle.js 9.23 KiB
Entrypoint another 555 KiB = vendors-node_modules_lodash_lodash_js.bundle.js 546 KiB another.bundle.js 8.68 KiB
runtime modules 7.64 KiB 14 modules
code generated modules 528 KiB (javascript) 29 bytes (css/mini-extract) [code generated]
  modules by path ./src/*.js 316 bytes
    ./src/index.js 232 bytes [built] [code generated]
    ./src/another-module.js 84 bytes [built] [code generated]
  modules by path ./src/*.css 50 bytes (javascript) 29 bytes (css/mini-extract)
    ./src/style.css 50 bytes [built] [code generated]
    css ./node_modules/css-loader/dist/cjs.js!./src/style.css 29 bytes [code generated]
  ../../../node_modules/lodash/lodash.js 528 KiB [built] [code generated]
webpack 5.21.0 compiled successfully in 594 ms
✨  Done in 1.44s.
```

如上所见，`./src/style.css`被单独的打包出来。



### 3、动态导入(dynamic import) 

当涉及到动态代码拆分时，webpack 提供了两个类似的技术。第一种，也是推荐选择的方式是，使用符合 [ECMAScript 提案](https://github.com/tc39/proposal-dynamic-import) 的 [`import()` 语法](https://webpack.docschina.org/api/module-methods/#import-1) 来实现动态导入。第二种，则是 webpack 的遗留功能，使用 webpack 特定的 [`require.ensure`](https://webpack.docschina.org/api/module-methods/#requireensure)。让我们先尝试使用第一种……

在我们开始之前，先从上述示例的配置中移除掉多余的 [`entry`](https://webpack.docschina.org/concepts/entry-points/) 和 [`optimization.splitChunks`](https://webpack.docschina.org/plugins/split-chunks-plugin/#optimization-splitchunks)，因为接下来的演示中并不需要它们：

**webpack.config.js**

```diff
 const path = require('path');
 
 module.exports = {
   mode: 'development',
   entry: {
     index: './src/index.js',
-    another: './src/another-module.js',
   },
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
-  optimization: {
-    splitChunks: {
-      chunks: 'all',
-    },
-  },
 };
```

我们将更新我们的项目，移除现在未使用的文件：

**project**

```diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
- |- another-module.js
|- /node_modules
```

现在，我们不再使用 statically import(静态导入) `lodash`，而是通过 dynamic import(动态导入) 来分离出一个 chunk：

**src/index.js**

```diff
-import _ from 'lodash';
-
-function component() {
+function getComponent() {
   const element = document.createElement('div');
 
-  // Lodash, now imported by this script
-  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+  return import('lodash')
+    .then(({ default: _ }) => {
+      const element = document.createElement('div');
+
+      element.innerHTML = _.join(['Hello', 'webpack'], ' ');
 
-  return element;
+      return element;
+    })
+    .catch((error) => 'An error occurred while loading the component');
 }
 
-document.body.appendChild(component());
+getComponent().then((component) => {
+  document.body.appendChild(component);
+});
```

我们之所以需要 `default`，是因为 webpack 4 在导入 CommonJS 模块时，将不再解析为 `module.exports` 的值，而是为 CommonJS 模块创建一个 artificial namespace 对象，更多有关背后原因的信息，请阅读 [webpack 4: import() and CommonJs](https://medium.com/webpack/webpack-4-import-and-commonjs-d619d626b655)。

让我们执行 webpack，查看 `lodash` 是否会分离到一个单独的 bundle：

```bash
...
[webpack-cli] Compilation finished
asset vendors-node_modules_lodash_lodash_js.bundle.js 549 KiB [compared for emit] (id hint: vendors)
asset index.bundle.js 13.5 KiB [compared for emit] (name: index)
runtime modules 7.37 KiB 11 modules
cacheable modules 530 KiB
  ./src/index.js 434 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
webpack 5.4.0 compiled successfully in 268 ms
```

由于 `import()` 会返回一个 promise，因此它可以和 [`async` 函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)一起使用。下面是如何通过 async 函数简化代码：

**src/index.js**

```diff
-function getComponent() {
+async function getComponent() {
   const element = document.createElement('div');
+  const { default: _ } = await import('lodash');
 
-  return import('lodash')
-    .then(({ default: _ }) => {
-      const element = document.createElement('div');
+  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
 
-      element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-
-      return element;
-    })
-    .catch((error) => 'An error occurred while loading the component');
+  return element;
 }
 
 getComponent().then((component) => {
   document.body.appendChild(component);
 });
```



### 4、预获取/预加载模块(prefetch/preload module) 

webpack v4.6.0+ 增加了对预获取和预加载的支持。

在声明 import 时，使用下面这些内置指令，可以让 webpack 输出 "resource hint(资源提示)"，来告知浏览器：

- **prefetch**(预获取)：将来某些导航下可能需要的资源
- **preload**(预加载)：当前导航下可能需要资源

下面这个 prefetch 的简单示例中，有一个 `HomePage` 组件，其内部渲染一个 `LoginButton` 组件，然后在点击后按需加载 `LoginModal` 组件。

**LoginButton.js**

```js
//...
import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
```

这会生成 `<link rel="prefetch" href="login-modal-chunk.js">` 并追加到页面头部，指示着浏览器在闲置时间预取 `login-modal-chunk.js` 文件。

与 prefetch 指令相比，preload 指令有许多不同之处：

- preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
- preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
- 浏览器支持程度不同。

下面这个简单的 preload 示例中，有一个 `Component`，依赖于一个较大的 library，所以应该将其分离到一个独立的 chunk 中。

我们假想这里的图表组件 `ChartComponent` 组件需要依赖体积巨大的 `ChartingLibrary` 库。它会在渲染时显示一个 `LoadingIndicator(加载进度条)` 组件，然后立即按需导入 `ChartingLibrary`：

**ChartComponent.js**

```js
//...
import(/* webpackPreload: true */ 'ChartingLibrary');
```

在页面中使用 `ChartComponent` 时，在请求 ChartComponent.js 的同时，还会通过 `<link rel="preload">` 请求 charting-library-chunk。假定 page-chunk 体积很小，很快就被加载好，页面此时就会显示 `LoadingIndicator(加载进度条)` ，等到 `charting-library-chunk` 请求完成，LoadingIndicator 组件才消失。启动仅需要很少的加载时间，因为只进行单次往返，而不是两次往返。尤其是在高延迟环境下。



### 5、bundle 分析(bundle analysis) 

一旦开始分离代码，一件很有帮助的事情是，分析输出结果来检查模块在何处结束。 [官方分析工具](https://github.com/webpack/analyse) 是一个不错的开始。还有一些其他社区支持的可选项：

- [webpack-chart](https://alexkuz.github.io/webpack-chart/): webpack stats 可交互饼图。
- [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/): 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)：一个 plugin 和 CLI 工具，它将 bundle 内容展示为一个便捷的、交互式、可缩放的树状图形式。
- [webpack bundle optimize helper](https://webpack.jakoblind.no/optimize)：这个工具会分析你的 bundle，并提供可操作的改进措施，以减少 bundle 的大小。
- [bundle-stats](https://github.com/bundle-stats/bundle-stats)：生成一个 bundle 报告（bundle 大小、资源、模块），并比较不同构建之间的结果。



#六、懒加载

懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

### 1、示例 

我们在[代码分离](https://webpack.docschina.org/guides/code-splitting#dynamic-imports)中的例子基础上，进一步做些调整来说明这个概念。那里的代码确实会在脚本运行的时候产生一个分离的代码块 `lodash.bundle.js` ，在技术概念上“懒加载”它。问题是加载这个包并不需要用户的交互 - 意思是每次加载页面的时候都会请求它。这样做并没有对我们有很多帮助，还会对性能产生负面影响。

我们试试不同的做法。我们增加一个交互，当用户点击按钮的时候用 console 打印一些文字。但是会等到第一次交互的时候再加载那个代码块（`print.js`）。为此，我们返回到代码分离的例子中，把 `lodash` 放到主代码块中，重新运行_代码分离_中的代码。

**project**

```diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
+ |- print.js
|- /node_modules
```

**src/print.js**

```js
console.log(
  'The print.js module has loaded! See the network tab in dev tools...'
);

export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
};
```

**src/index.js**

```diff
+ import _ from 'lodash';
+
- async function getComponent() {
+ function component() {
    const element = document.createElement('div');
-   const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
+   const button = document.createElement('button');
+   const br = document.createElement('br');

+   button.innerHTML = 'Click me and look at the console!';
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.appendChild(br);
+   element.appendChild(button);
+
+   // Note that because a network request is involved, some indication
+   // of loading would need to be shown in a production-level site/app.
+   button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
+     const print = module.default;
+
+     print();
+   });

    return element;
  }

- getComponent().then(component => {
-   document.body.appendChild(component);
- });
+ document.body.appendChild(component());
```

>Warning
>注意当调用 ES6 模块的 `import()` 方法（引入模块）时，必须指向模块的 `.default` 值，因为它才是 promise 被处理后返回的实际的 `module` 对象。

现在运行 webpack 来验证一下我们的懒加载功能：

```bash
...
          Asset       Size  Chunks                    Chunk Names
print.bundle.js  417 bytes       0  [emitted]         print
index.bundle.js     548 kB       1  [emitted]  [big]  index
     index.html  189 bytes          [emitted]
...
```

### 2、框架 

许多框架和类库对于如何用它们自己的方式来实现（懒加载）都有自己的建议。这里有一些例子：

- React: [Code Splitting and Lazy Loading](https://reacttraining.com/react-router/web/guides/code-splitting)
- Vue: [Dynamic Imports in Vue.js for better performance](https://vuedose.tips/tips/dynamic-imports-in-vue-js-for-better-performance/)
- Angular: [Lazy Loading route configuration](https://angular.io/guide/router#milestone-6-asynchronous-routing) and [AngularJS + webpack = lazyLoad](https://medium.com/@var_bin/angularjs-webpack-lazyload-bb7977f390dd)



## 七、缓存

以上，我们使用 webpack 来打包我们的模块化后的应用程序，webpack 会生成一个可部署的 `/dist` 目录，然后把打包后的内容放置在此目录中。只要 `/dist` 目录中的内容部署到 server 上，client（通常是浏览器）就能够访问此 server 的网站及其资源。而最后一步获取资源是比较耗费时间的，这就是为什么浏览器使用一种名为 [缓存](https://searchstorage.techtarget.com/definition/cache) 的技术。可以通过命中缓存，以降低网络流量，使网站加载速度更快，然而，如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。由于缓存的存在，当你需要获取新的代码时，就会显得很棘手。

此指南的重点在于通过必要的配置，以确保 webpack 编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件。



### 1、输出文件的文件名(output filename) 

我们可以通过替换 `output.filename` 中的 [substitutions](https://webpack.docschina.org/configuration/output/#outputfilename) 设置，来定义输出文件的名称。webpack 提供了一种使用称为 **substitution(可替换模板字符串)** 的方式，通过带括号字符串来模板化文件名。其中，`[contenthash]` substitution 将根据资源内容创建出唯一 hash。当资源内容发生变化时，`[contenthash]` 也会发生变化。

这里使用 [起步](https://webpack.docschina.org/guides/getting-started) 中的示例和 [管理输出](https://webpack.docschina.org/guides/output-management) 中的 `plugins` 插件来作为项目基础，所以我们依然不必手动地维护 `index.html` 文件：

**project**

```diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
|- /node_modules
```

**webpack.config.js**

```diff
  const path = require('path');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      // 对于 CleanWebpackPlugin 的 v2 versions 以下版本，使用 new CleanWebpackPlugin(['dist/*'])
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
-       title: 'Output Management',
+       title: 'Caching',
      }),
    ],
    output: {
-     filename: 'bundle.js',
+     filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```

使用此配置，然后运行我们的 build script `npm run build`，产生以下输出：

```bash
...
                       Asset       Size  Chunks                    Chunk Names
main.7e2c49a622975ebd9b7e.js     544 kB       0  [emitted]  [big]  main
                  index.html  197 bytes          [emitted]
...
```

可以看到，bundle 的名称是它内容（通过 hash）的映射。如果我们不做修改，然后再次运行构建，我们以为文件名会保持不变。然而，如果我们真的运行，可能会发现情况并非如此：

```bash
...
                       Asset       Size  Chunks                    Chunk Names
main.205199ab45963f6a62ec.js     544 kB       0  [emitted]  [big]  main
                  index.html  197 bytes          [emitted]
...
```

这也是因为 webpack 在入口 chunk 中，包含了某些 boilerplate(引导模板)，特别是 runtime 和 manifest。（boilerplate 指 webpack 运行时的引导代码）



### 2、提取引导模板(extracting boilerplate) 

正如我们在 [代码分离](https://webpack.docschina.org/guides/code-splitting) 中所学到的，[`SplitChunksPlugin`](https://webpack.docschina.org/plugins/split-chunks-plugin/) 可以用于将模块分离到单独的 bundle 中。webpack 还提供了一个优化功能，可使用 [`optimization.runtimeChunk`](https://webpack.docschina.org/configuration/optimization/#optimizationruntimechunk) 选项将 runtime 代码拆分为一个单独的 chunk。将其设置为 `single` 来为所有 chunk 创建一个 runtime bundle：

**webpack.config.js**

```diff
  const path = require('path');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      // 对于 CleanWebpackPlugin 的 v2 versions 以下版本，使用 new CleanWebpackPlugin(['dist/*'])
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Caching',
      }),
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
+   optimization: {
+     runtimeChunk: 'single',
+   },
  };
```

再次构建，然后查看提取出来的 `runtime` bundle：

```bash
Hash: 82c9c385607b2150fab2
Version: webpack 4.12.0
Time: 3027ms
                          Asset       Size  Chunks             Chunk Names
runtime.cc17ae2a94ec771e9221.js   1.42 KiB       0  [emitted]  runtime
   main.e81de2cf758ada72f306.js   69.5 KiB       1  [emitted]  main
                     index.html  275 bytes          [emitted]
[1] (webpack)/buildin/module.js 497 bytes {1} [built]
[2] (webpack)/buildin/global.js 489 bytes {1} [built]
[3] ./src/index.js 309 bytes {1} [built]
    + 1 hidden module
```

将第三方库(library)（例如 `lodash` 或 `react`）提取到单独的 `vendor` chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。因此通过实现以上步骤，利用 client 的长效缓存机制，命中缓存来消除请求，并减少向 server 获取资源，同时还能保证 client 代码和 server 代码版本一致。 这可以通过使用 [SplitChunksPlugin 示例 2](https://webpack.docschina.org/plugins/split-chunks-plugin/#split-chunks-example-2) 中演示的 [`SplitChunksPlugin`](https://webpack.docschina.org/plugins/split-chunks-plugin/) 插件的 [`cacheGroups`](https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunkscachegroups) 选项来实现。我们在 `optimization.splitChunks` 添加如下 `cacheGroups` 参数并构建：

**webpack.config.js**

```diff
  const path = require('path');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      // 对于 CleanWebpackPlugin 的 v2 versions 以下版本，使用 new CleanWebpackPlugin(['dist/*'])
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Caching',
      }),
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      runtimeChunk: 'single',
+     splitChunks: {
+       cacheGroups: {
+         vendor: {
+           test: /[\\/]node_modules[\\/]/,
+           name: 'vendors',
+           chunks: 'all',
+         },
+       },
+     },
    },
  };
```

再次构建，然后查看新的 `vendor` bundle：

```bash
...
                          Asset       Size  Chunks             Chunk Names
runtime.cc17ae2a94ec771e9221.js   1.42 KiB       0  [emitted]  runtime
vendors.a42c3ca0d742766d7a28.js   69.4 KiB       1  [emitted]  vendors
   main.abf44fedb7d11d4312d7.js  240 bytes       2  [emitted]  main
                     index.html  353 bytes          [emitted]
...
```

现在，我们可以看到 `main` 不再含有来自 `node_modules` 目录的 `vendor` 代码，并且体积减少到 `240 bytes`！



### 3、模块标识符(module identifier) 

在项目中再添加一个模块 `print.js`：

**project**

```diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
+ |- print.js
|- /node_modules
```

**print.js**

```diff
+ export default function print(text) {
+   console.log(text);
+ };
```

**src/index.js**

```diff
  import _ from 'lodash';
+ import Print from './print';

  function component() {
    const element = document.createElement('div');

    // lodash 是由当前 script 脚本 import 进来的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.onclick = Print.bind(null, 'Hello webpack!');

    return element;
  }

  document.body.appendChild(component());
```

再次运行构建，然后我们期望的是，只有 `main` bundle 的 hash 发生变化，然而……

```bash
...
                           Asset       Size  Chunks                    Chunk Names
  runtime.1400d5af64fc1b7b3a45.js    5.85 kB      0  [emitted]         runtime
  vendor.a7561fb0e9a071baadb9.js     541 kB       1  [emitted]  [big]  vendor
    main.b746e3eb72875af2caa9.js    1.22 kB       2  [emitted]         main
                      index.html  352 bytes          [emitted]
...
```

……我们可以看到这三个文件的 hash 都变化了。这是因为每个 [`module.id`](https://webpack.docschina.org/api/module-variables/#moduleid-commonjs) 会默认地基于解析顺序(resolve order)进行增量。也就是说，当解析顺序发生变化，ID 也会随之改变。因此，简要概括：

- `main` bundle 会随着自身的新增内容的修改，而发生变化。
- `vendor` bundle 会随着自身的 `module.id` 的变化，而发生变化。
- `manifest` runtime 会因为现在包含一个新模块的引用，而发生变化。

第一个和最后一个都是符合预期的行为，`vendor` hash 发生变化是我们要修复的。我们将 [`optimization.moduleIds`](https://webpack.docschina.org/configuration/optimization/#optimizationmoduleids) 设置为 `'deterministic'`：

**webpack.config.js**

```diff
  const path = require('path');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      // 对于 CleanWebpackPlugin 的 v2 versions 以下版本，使用 new CleanWebpackPlugin(['dist/*'])
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Caching',
      }),
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
+     moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  };
```

现在，不论是否添加任何新的本地依赖，对于前后两次构建，`vendor` hash 都应该保持一致：

```bash
...
                          Asset       Size  Chunks             Chunk Names
   main.216e852f60c8829c2289.js  340 bytes       0  [emitted]  main
vendors.55e79e5927a639d21a1b.js   69.5 KiB       1  [emitted]  vendors
runtime.725a1a51ede5ae0cfde0.js   1.42 KiB       2  [emitted]  runtime
                     index.html  353 bytes          [emitted]
Entrypoint main = runtime.725a1a51ede5ae0cfde0.js vendors.55e79e5927a639d21a1b.js main.216e852f60c8829c2289.js
...
```

然后，修改 `src/index.js`，临时移除额外的依赖：

**src/index.js**

```diff
  import _ from 'lodash';
- import Print from './print';
+ // import Print from './print';

  function component() {
    const element = document.createElement('div');

    // lodash 是由当前 script 脚本 import 进来的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-   element.onclick = Print.bind(null, 'Hello webpack!');
+   // element.onclick = Print.bind(null, 'Hello webpack!');

    return element;
  }

  document.body.appendChild(component());
```

最后，再次运行我们的构建：

```bash
...
                          Asset       Size  Chunks             Chunk Names
   main.ad717f2466ce655fff5c.js  274 bytes       0  [emitted]  main
vendors.55e79e5927a639d21a1b.js   69.5 KiB       1  [emitted]  vendors
runtime.725a1a51ede5ae0cfde0.js   1.42 KiB       2  [emitted]  runtime
                     index.html  353 bytes          [emitted]
Entrypoint main = runtime.725a1a51ede5ae0cfde0.js vendors.55e79e5927a639d21a1b.js main.ad717f2466ce655fff5c.js
...
```

我们可以看到，这两次构建中，`vendor` bundle 文件名称，都是 `55e79e5927a639d21a1b`。



#八、创建 library

除了打包应用程序，webpack 还可以用于打包 JavaScript library。

假设你正在编写一个名为 `webpack-numbers` 的小的 library，可以将数字 1 到 5 转换为文本表示，反之亦然，例如将 2 转换为 'two'。

基本的项目结构可能如下所示：

**project**

```diff
+  |- webpack.config.js
+  |- package.json
+  |- /src
+    |- index.js
+    |- ref.json
```

初始化 npm，安装 webpack 和 lodash：

```bash
npm init -y
npm install --save-dev webpack lodash
```

**src/ref.json**

```json
[
  {
    "num": 1,
    "word": "One"
  },
  {
    "num": 2,
    "word": "Two"
  },
  {
    "num": 3,
    "word": "Three"
  },
  {
    "num": 4,
    "word": "Four"
  },
  {
    "num": 5,
    "word": "Five"
  },
  {
    "num": 0,
    "word": "Zero"
  }
]
```

**src/index.js**

```js
import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.num === num ? ref.word : accum;
  }, '');
}

export function wordToNum(word) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.word === word && word.toLowerCase() ? ref.num : accum;
  }, -1);
}
```

这个 library 的调用规范如下：

- **ES2015 module import:**

```js
import * as webpackNumbers from 'webpack-numbers';
// ...
webpackNumbers.wordToNum('Two');
```

- **CommonJS module require:**

```js
const webpackNumbers = require('webpack-numbers');
// ...
webpackNumbers.wordToNum('Two');
```

- **AMD module require:**

```js
require(['webpackNumbers'], function (webpackNumbers) {
  // ...
  webpackNumbers.wordToNum('Two');
});
```

consumer(使用者) 还可以通过一个 script 标签来加载和使用此 library：

```html
<!doctype html>
<html>
  ...
  <script src="https://unpkg.com/webpack-numbers"></script>
  <script>
    // ...
    // 全局变量
    webpackNumbers.wordToNum('Five')
    // window 对象中的属性
    window.webpackNumbers.wordToNum('Five')
    // ...
  </script>
</html>
```

注意，我们还可以通过以下配置方式，将 library 暴露为：

- global 对象中的属性，用于 Node.js。
- `this` 对象中的属性。

完整的 library 配置和代码，请查看 [webpack-library-example](https://github.com/kalcifer/webpack-library-example)。



### 1、基本配置 

现在，让我们以某种方式打包这个 library，能够实现以下几个目标：

- 使用 `externals` 选项，避免将 `lodash` 打包到应用程序，而使用者会去加载它。
- 将 library 的名称设置为 `webpack-numbers`。
- 将 library 暴露为一个名为 `webpackNumbers` 的变量。
- 能够访问其他 Node.js 中的 library。

此外，consumer(使用者) 应该能够通过以下方式访问 library：

- ES2015 模块。例如 `import webpackNumbers from 'webpack-numbers'`。
- CommonJS 模块。例如 `require('webpack-numbers')`.
- 全局变量，在通过 `script` 标签引入时。

我们可以从如下 webpack 基本配置开始：

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js',
  },
};
```



### 2、外部化 lodash 

现在，如果执行 `webpack`，你会发现创建了一个体积相当大的文件。如果你查看这个文件，会看到 lodash 也被打包到代码中。在这种场景中，我们更倾向于把 `lodash` 当作 `peerDependency`。也就是说，consumer(使用者) 应该已经安装过 `lodash` 。因此，你就可以放弃控制此外部 library ，而是将控制权让给使用 library 的 consumer。

这可以使用 `externals` 配置来完成：

**webpack.config.js**

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
    },
+   externals: {
+     lodash: {
+       commonjs: 'lodash',
+       commonjs2: 'lodash',
+       amd: 'lodash',
+       root: '_',
+     },
+   },
  };
```

这意味着你的 library 需要一个名为 `lodash` 的依赖，这个依赖在 consumer 环境中必须存在且可用。



### 3、暴露 library 

对于用法广泛的 library，我们希望它能够兼容不同的环境，例如 CommonJS，AMD，Node.js 或者作为一个全局变量。为了让你的 library 能够在各种使用环境中可用，需要在 `output` 中添加 `library` 属性：

**webpack.config.js**

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
+     library: 'webpackNumbers',
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_',
      },
    },
  };
```

这会将你的 library bundle 暴露为名为 `webpackNumbers` 的全局变量，consumer 通过此名称来 import。为了让 library 和其他环境兼容，则需要在配置中添加 `libraryTarget` 属性。这个选项可以控制以多种形式暴露 library。

**webpack.config.js**

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
      library: 'webpackNumbers',
+     libraryTarget: 'umd',
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_',
      },
    },
  };
```

有以下几种方式暴露 library：

- 变量：作为一个全局变量，通过 `script` 标签来访问（`libraryTarget:'var'`）。
- this：通过 `this` 对象访问（`libraryTarget:'this'`）。
- window：在浏览器中通过 `window` 对象访问（`libraryTarget:'window'`）。
- UMD：在 AMD 或 CommonJS `require` 之后可访问（`libraryTarget:'umd'`）。

如果设置了 `library` 但没有设置 `libraryTarget`，则 `libraryTarget` 默认指定为 `var`，详细说明请查看 [output ](https://webpack.docschina.org/configuration/output)文档。查看 [`output.libraryTarget`](https://webpack.docschina.org/configuration/output#outputlibrarytarget) 文档，以获取所有可用选项的详细列表。



#### (1) 发布准备

遵循 [生产环境](https://webpack.docschina.org/guides/production) 指南中提到的步骤，来优化生产环境下的输出结果。那么，我们还需要将生成 bundle 的文件路径，添加到 `package.json` 中的 `main` 字段中。

**package.json**

```json
{
  ...
  "main": "dist/webpack-numbers.js",
  ...
}
```

或者，按照这个 [指南](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md#typical-usage)，将其添加为标准模块：

```json
{
  ...
  "module": "src/index.js",
  ...
}
```

这里的 key(键) `main` 是参照 [`package.json` 标准](https://docs.npmjs.com/files/package.json#main)，而 `module` 是参照 [一个](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md)[提案](https://github.com/rollup/rollup/wiki/pkg.module)，此提案允许 JavaScript 生态系统升级使用 ES2015 模块，而不会破坏向后兼容性。

#### (2) 发布 library

现在，你可以 [将其发布为一个 npm package](https://docs.npmjs.com/getting-started/publishing-npm-packages)，并且在 [unpkg.com](https://unpkg.com/#/) 找到它，并分发给你的用户。

- 注册npm仓库账号

```
https://www.npmjs.com 上面的账号
$ npm adduser
```

- 上传包

```
$ npm publish
```

坑：403 Forbidden

```
查看npm源：npm config get registry
切换npm源方法一：npm config set registry http://registry.npmjs.org
切换npm源方法二：nrm use npm
```



#九、环境变量

想要消除 `webpack.config.js` 在 [开发环境](https://webpack.docschina.org/guides/development) 和 [生产环境](https://webpack.docschina.org/guides/production) 之间的差异，你可能需要环境变量(environment variable)。

webpack 命令行 [环境配置](https://webpack.docschina.org/api/cli/#environment-options) 的 `--env` 参数，可以允许你传入任意数量的环境变量。而在 `webpack.config.js` 中可以访问到这些环境变量。例如，`--env production` 或 `--env NODE_ENV=local`（`NODE_ENV` 通常约定用于定义环境类型，查看 [这里](https://dzone.com/articles/what-you-should-know-about-node-env)）。

```bash
npx webpack --env NODE_ENV=local --env production --progress
```

>Tip
>如果设置 `env` 变量，却没有赋值，`--env production` 默认表示将 `env.production` 设置为 `true`。还有许多其他可以使用的语法。更多详细信息，请查看 [webpack CLI](https://webpack.docschina.org/api/cli/#environment-options) 文档。

对于我们的 webpack 配置，有一个必须要修改之处。通常，`module.exports` 指向配置对象。要使用 `env` 变量，你必须将 `module.exports` 转换成一个函数：

**webpack.config.js**

```js
const path = require('path');

module.exports = env => {
  // Use env.<YOUR VARIABLE> here:
  console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
  console.log('Production: ', env.production); // true

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
```



## 十、安装

本指南介绍了安装 webpack 的各种方法。

### 1、前提条件 

在开始之前，请确保安装了 [Node.js](https://nodejs.org/en/) 的最新版本。使用 Node.js 最新的长期支持版本(LTS - Long Term Support)，是理想的起步。 使用旧版本，你可能遇到各种问题，因为它们可能缺少 webpack 功能， 或者缺少相关 package。



### 2、本地安装 

最新的 webpack 正式版本是：

[![GitHub release](https://img.shields.io/npm/v/webpack.svg?label=webpack&style=flat-square&maxAge=3600)](https://github.com/webpack/webpack/releases)

要安装最新版本或特定版本，请运行以下命令之一：

```bash
npm install --save-dev webpack
## 或指定版本
npm install --save-dev webpack@<version>
```

>Tip
>是否使用 `--save-dev` 取决于你的应用场景。假设你仅使用 webpack 进行构建操作，那么建议你在安装时使用 `--save-dev` 选项，因为可能你不需要在生产环境上使用 webpack。如果需要应用于生产环境，请忽略 `--save-dev` 选项。

如果你使用 webpack v4+ 版本，你还需要安装 [CLI](https://webpack.docschina.org/api/cli/)。

```bash
npm install --save-dev webpack-cli
```

对于大多数项目，我们建议本地安装。这可以在引入重大更新(breaking change)版本时，更容易分别升级项目。 通常会通过运行一个或多个 [npm scripts](https://docs.npmjs.com/misc/scripts) 以在本地 `node_modules` 目录中查找安装的 webpack， 来运行 webpack：

```json
"scripts": {
  "build": "webpack --config webpack.config.js"
}
```

>Tip
>想要运行本地安装的 webpack，你可以通过 `node_modules/.bin/webpack` 来访问它的二进制版本。另外，如果你使用的是 npm v5.2.0 或更高版本，则可以运行 `npx webpack` 来执行。



### 3、全局安装 

通过以下 NPM 安装方式，可以使 `webpack` 在全局环境下可用：

```bash
npm install --global webpack
```

>Warning
>**不推荐** 全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中， 可能会导致构建失败。



### 4、最新体验版本 

如果你热衷于使用最新版本的 webpack，你可以使用以下命令安装 beta 版本， 或者直接从 webpack 的仓库中安装：

```bash
npm install --save-dev webpack@next
## 或特定的 tag/分支
npm install --save-dev webpack/webpack#<tagname/branchname>
```

>Warning
>安装这些最新体验版本时要小心！它们可能仍然包含 bug，因此不应该用于生产环境。



## 十一、模块热替换

模块热替换(hot module replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新所有类型的模块， 而无需完全刷新。本页面重点介绍其 **实现**，而 [概念](https://webpack.docschina.org/concepts/hot-module-replacement) 页面提供了更多关于 它的工作原理以及为什么它有用的细节。

> Warning
> **HMR** 不适用于生产环境，这意味着它应当用于开发环境。更多详细信息， 请查看 [生产环境](https://webpack.docschina.org/guides/production) 指南。

### 1、启用 HMR 

此功能可以很大程度提高生产效率。我们要做的就是更新 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 配置， 然后使用 webpack 内置的 HMR 插件。我们还要删除掉 `print.js` 的入口起点， 因为现在已经在 `index.js` 模块中引用了它。

>Tip
>如果你在技术选型中使用了 `webpack-dev-middleware` 而没有使用 `webpack-dev-server`，请使用 [`webpack-hot-middleware`](https://github.com/webpack-contrib/webpack-hot-middleware) 依赖包，以在你的自定义服务器或应用程序上启用 HMR。

**webpack.config.js**

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: {
       app: './src/index.js',
-      print: './src/print.js',
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true,
    },
    plugins: [
      // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement',
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```



现在，我们来修改 `index.js` 文件，以便当 `print.js` 内部发生变更时可以告诉 webpack 接受更新的模块。

**index.js**

```diff
  import _ from 'lodash';
  import printMe from './print.js';

  function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
  }

  document.body.appendChild(component());
+
+ if (module.hot) {
+   module.hot.accept('./print.js', function() {
+     console.log('Accepting the updated printMe module!');
+     printMe();
+   })
+ }
```

更改 `print.js` 中 `console.log` 的输出内容，你将会在浏览器中看到如下的输出 （不要担心现在 `button.onclick = printMe()` 的输出，我们稍后也会更新该部分）。

**print.js**

```diff
  export default function printMe() {
-   console.log('I get called from print.js!');
+   console.log('Updating print.js...');
  }
```

**console**

```diff
[HMR] Waiting for update signal from WDS...
main.js:4395 [WDS] Hot Module Replacement enabled.
+ 2main.js:4395 [WDS] App updated. Recompiling...
+ main.js:4395 [WDS] App hot update...
+ main.js:4330 [HMR] Checking for updates on the server...
+ main.js:10024 Accepting the updated printMe module!
+ 0.4b8ee77….hot-update.js:10 Updating print.js...
+ main.js:4330 [HMR] Updated modules:
+ main.js:4330 [HMR]  - 20
```



### 2、通过 Node.js API 

在 Node.js API 中使用 webpack dev server 时，不要将 dev server 选项放在 webpack 配置对象中。而是在创建时， 将其作为第二个参数传递。例如：

```
new WebpackDevServer(compiler, options)
```

想要启用 HMR，还需要修改 webpack 配置对象，使其包含 HMR 入口起点。`webpack-dev-server` 依赖包中具有一个叫做 `addDevServerEntrypoints` 的方法，你可以通过使用这个方法来实现。这是关于如何使用的一个基本示例：

**dev-server.js**

```javascript
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost',
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(8080, 'localhost', () => {
  console.log('dev server listening on port 8080');
});
```

>Tip
>如果你正在使用 [`webpack-dev-middleware`](https://webpack.docschina.org/guides/development#using-webpack-dev-middleware)，可以通过 [`webpack-hot-middleware`](https://github.com/webpack-contrib/webpack-hot-middleware) 依赖包，在自定义 dev server 中启用 HMR。



### 3、问题 

模块热替换可能比较难以掌握。为了说明这一点，我们回到刚才的示例中。如果你继续点击示例页面上的按钮， 你会发现控制台仍在打印旧的 `printMe` 函数。

这是因为按钮的 `onclick` 事件处理函数仍然绑定在旧的 `printMe` 函数上。

为了让 HMR 正常工作，我们需要更新代码，使用 `module.hot.accept` 将其绑定到新的 `printMe` 函数上：

**index.js**

```diff
  import _ from 'lodash';
  import printMe from './print.js';

  function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;  // onclick event is bind to the original printMe function

    element.appendChild(btn);

    return element;
  }

- document.body.appendChild(component());
+ let element = component(); // 存储 element，以在 print.js 修改时重新渲染
+ document.body.appendChild(element);

  if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module!');
-     printMe();
+     document.body.removeChild(element);
+     element = component(); // 重新渲染 "component"，以便更新 click 事件处理函数
+     document.body.appendChild(element);
    })
  }
```



### 4、HMR 加载样式 

借助于 `style-loader`，使用模块热替换来加载 CSS 实际上极其简单。此 loader 在幕后使用了 `module.hot.accept`，在 CSS 依赖模块更新之后，会将其 patch(修补) 到 `<style>` 标签中。

首先使用以下命令安装两个 loader ：

```bash
npm install --save-dev style-loader css-loader
```

然后更新配置文件，使用这两个 loader。

**webpack.config.js**

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: ['style-loader', 'css-loader'],
+       },
+     ],
+   },
    plugins: [
       // 对于 CleanWebpackPlugin 的 v2 versions 以下版本，使用 new CleanWebpackPlugin(['dist/*'])
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement',
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```

如同 import 模块，热加载样式表同样很简单：

**project**

```diff
  webpack-demo
  | - package.json
  | - webpack.config.js
  | - /dist
    | - bundle.js
  | - /src
    | - index.js
    | - print.js
+   | - styles.css
```

**styles.css**

```css
body {
  background: blue;
}
```

**index.js**

```diff
  import _ from 'lodash';
  import printMe from './print.js';
+ import './styles.css';

  function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;  // onclick event is bind to the original printMe function

    element.appendChild(btn);

    return element;
  }

  let element = component();
  document.body.appendChild(element);

  if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module!');
      document.body.removeChild(element);
      element = component(); // Re-render the "component" to update the click handler
      document.body.appendChild(element);
    })
  }
```

将 `body` 的 style 改为 `background: red;`，你应该可以立即看到页面的背景颜色随之更改，而无需完全刷新。

**styles.css**

```diff
  body {
-   background: blue;
+   background: red;
  }
```



#十二、Tree Shaking

*tree shaking* 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块语法的 [静态结构](http://exploringjs.com/es6/ch_modules.html#static-module-structure) 特性，例如 [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 和 [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)。这个术语和概念实际上是由 ES2015 模块打包工具 [rollup](https://github.com/rollup/rollup) 普及起来的。

webpack 2 正式版本内置支持 ES2015 模块（也叫做 *harmony modules*）和未使用模块检测能力。新的 webpack 4 正式版本扩展了此检测能力，通过 `package.json` 的 `"sideEffects"` 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯正 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。



### 1、添加一个通用模块 

在我们的项目中添加一个新的通用模块文件 `src/math.js`，并导出两个函数：

**project**

```diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- bundle.js
  |- index.html
|- /src
  |- index.js
+ |- math.js
|- /node_modules
```

**src/math.js**

```javascript
export function square(x) {
  return x * x;
}

export function cube(x) {
  return x * x * x;
}
```

需要将 `mode` 配置设置成[development](https://webpack.docschina.org/configuration/mode/#mode-development)，以确定 bundle 不会被压缩：

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
+ devtool: 'source-map',
+ mode: 'development',
+ optimization: {
+   usedExports: true,
+ },
};
```

配置完这些后，更新入口脚本，使用其中一个新方法，并且为了简化示例，我们先将 `lodash` 删除：

**src/index.js**

```diff
- import _ from 'lodash';
+ import { cube } from './math.js';

  function component() {
-   const element = document.createElement('div');
+   const element = document.createElement('pre');

-   // Lodash, now imported by this script
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.innerHTML = [
+     'Hello webpack!',
+     '5 cubed is equal to ' + cube(5)
+   ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());
```

注意，我们**没有从 `src/math.js` 模块中 `import` 另外一个 `square` 方法**。这个函数就是所谓的“未引用代码(dead code)”，也就是说，应该删除掉未被引用的 `export`。现在运行 npm script `npm run build`，并查看输出的 bundle：

**dist/bundle.js (around lines 90 - 100)**

```js
/* 1 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
  'use strict';
  /* unused harmony export square */
  /* harmony export (immutable) */ __webpack_exports__['a'] = cube;
  function square(x) {
    return x * x;
  }

  function cube(x) {
    return x * x * x;
  }
});
```

注意，上面的 `unused harmony export square` 注释。如果你观察它下面的代码，你会注意到虽然我们没有引用 `square`，但它仍然被包含在 bundle 中。我们将在下一节解决这个问题。



### 2、将文件标记为 side-effect-free(无副作用) 

在一个纯粹的 ESM 模块世界中，很容易识别出哪些文件有 side effect。然而，我们的项目无法达到这种纯度，所以，此时有必要提示 webpack compiler 哪些代码是“纯粹部分”。

通过 package.json 的 `"sideEffects"` 属性，来实现这种方式。

```json
{
  "name": "your-project",
  "sideEffects": false
}
```

如果所有代码都不包含 side effect，我们就可以简单地将该属性标记为 `false`，来告知 webpack，它可以安全地删除未用到的 export。

>Tip
>"side effect(副作用)" 的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。

如果你的代码确实有一些副作用，可以改为提供一个数组：

```json
{
  "name": "your-project",
  "sideEffects": ["./src/some-side-effectful-file.js"]
}
```

此数组支持简单的 glob 模式匹配相关文件。其内部使用了 [glob-to-regexp](https://github.com/fitzgen/glob-to-regexp)（支持：`*`，`**`，`{a,b}`，`[a-z]`）。如果匹配模式为 `*.css`，且不包含 `/`，将被视为 `**/*.css`。

>Tip
>注意，所有导入文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似 `css-loader` 并 import 一个 CSS 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除：

```json
{
  "name": "your-project",
  "sideEffects": ["./src/some-side-effectful-file.js", "*.css"]
}
```

最后，还可以在 [`module.rules` 配置选项](https://webpack.docschina.org/configuration/module/#rulesideeffects) 中设置 `"sideEffects"`。

**具体操作入下：**

- 安装依赖

```shell
yarn add webpack-cli webpack-dev-server css-loader style-loader -D
// 注意webpack-cli 与 webpack-dev-server的版本匹配
```

- project

```diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- bundle.js
  |- index.html
|- /src
  |- index.js
  |- math.js
+ |- some-side-effectful-file.js
+ |- style.css
|- /node_modules
```

- src/some-side-effectful-file.js

```js
export default 'side effectful'
```

- src/style.css

```css
body {
  background-color: blueviolet;
}
```

- src/index.js

```diff
import { cube } from './math.js'

+import Greeting from './some-side-effectful-file'
+import './style.css'

function component() {
  const element = document.createElement('pre')
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n')

  return element
}

document.body.appendChild(component())
```

- webpack.config.js

```diff
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    usedExports: true,
  },
+ module: {
+  rules: [
+    {
+      test: /\.css$/,
+      use: ['style-loader', 'css-loader']
+    }
+  ]
+ },
+ devServer: {
+   contentBase: path.join(__dirname, 'dist')
+ }
};
```

- package.json

```diff
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "private": true,
+ "sideEffects": false,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack-dev-server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^5.0.2",
    "style-loader": "^2.0.0",
    "webpack": "^5.21.0",
    "webpack-cli": "3.3.12",
    "webpack-dev-server": "^3.11.2"
  }
}
```

- 开发环境运行项目

```
npm run build
```

结果发现，`style.css`和`some-side-effectful-file.js`都被打包了。

- 生产环境运行项目

修改`webpack.config.js`

```diff
const path = require('path')

module.exports = {
- mode: 'development',
+ mode: 'production',
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    usedExports: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
};
```

结果发现，`style.css`和`some-side-effectful-file.js`不在打包的目标文件了。

- 修改 `package.json`

```diff
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "private": true,
- "sideEffects": false,
+ "sideEffects": ["./src/some-side-effectful-file.js", "*.css"],
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack-dev-server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^5.0.2",
    "style-loader": "^2.0.0",
    "webpack": "^5.21.0",
    "webpack-cli": "3.3.12",
    "webpack-dev-server": "^3.11.2"
  }
}
```



#十三、生产环境

在本指南中，我们将深入一些最佳实践和工具，将站点或应用程序构建到生产环境中。

### 1、配置 

**development(开发环境)** 和 **production(生产环境)** 这两个环境下的构建目标存在着巨大差异。在**开发环境**中，我们需要：强大的 source map 和一个有着 live reloading(实时重新加载) 或 hot module replacement(热模块替换) 能力的 localhost server。而**生产环境**目标则转移至其他方面，关注点在于压缩 bundle、更轻量的 source map、资源优化等，通过这些优化方式改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写**彼此独立的 webpack 配置**。

虽然，以上我们将 *生产环境* 和 *开发环境* 做了细微区分，但是，请注意，我们还是会遵循不重复原则(Don't repeat yourself - DRY)，保留一个 "common(通用)" 配置。为了将这些配置合并在一起，我们将使用一个名为 [`webpack-merge`](https://github.com/survivejs/webpack-merge) 的工具。此工具会引用 "common" 配置，因此我们不必再在环境特定(environment-specific)的配置中编写重复代码。

我们先从安装 `webpack-merge` 开始，并将之前指南中已经成型的那些代码进行分离：

```bash
npm install --save-dev webpack-merge
```

**project**

```diff
  webpack-demo
  |- package.json
- |- webpack.config.js
+ |- webpack.common.js
+ |- webpack.dev.js
+ |- webpack.prod.js
  |- /dist
  |- /src
    |- index.js
    |- math.js
  |- /node_modules
```

**webpack.common.js**

```diff
+ const path = require('path');
+ const { CleanWebpackPlugin } = require('clean-webpack-plugin');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');
+
+ module.exports = {
+   entry: {
+     app: './src/index.js',
+   },
+   plugins: [
+     // 对于 CleanWebpackPlugin 的 v2 versions 以下版本，使用 new CleanWebpackPlugin(['dist/*'])
+     new CleanWebpackPlugin(),
+     new HtmlWebpackPlugin({
+       title: 'Production',
+     }),
+   ],
+   output: {
+     filename: '[name].bundle.js',
+     path: path.resolve(__dirname, 'dist'),
+   },
+ };
```

**webpack.dev.js**

```diff
+ const { merge } = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   mode: 'development',
+   devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist',
+   },
+ });
```

**webpack.prod.js**

```diff
+ const { merge } = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   mode: 'production',
+ });
```

现在，在 `webpack.common.js` 中，我们设置了 `entry` 和 `output` 配置，并且在其中引入这两个环境公用的全部插件。在 `webpack.dev.js` 中，我们将 `mode` 设置为 `development`，并且为此环境添加了推荐的 `devtool`（强大的 source map）和简单的 `devServer` 配置。最后，在 `webpack.prod.js` 中，我们将 `mode` 设置为 `production`。



### 2、NPM Scripts 

现在，我们把 `scripts` 重新指向到新配置。让 `npm start` script 中 `webpack-dev-server`, 使用 `webpack.dev.js`, 而让 `npm run build` script 使用 `webpack.prod.js`:

**package.json**

```diff
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "sideEffects": [
    "./src/some-side-effectful-file.js",
    "*.css"
  ],
  "scripts": {
-    "start": "webpack serve --open",
+    "start": "webpack serve --open --config webpack.dev.js",
-    "build": "webpack"
+    "build": "webpack --config webpack.prod.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^5.0.2",
    "html-webpack-plugin": "^5.1.0",
    "style-loader": "^2.0.0",
    "webpack": "^5.21.0",
    "webpack-cli": "3.3.12",
    "webpack-dev-server": "^3.11.2",
    "webpack-merge": "^5.7.3"
  }
}
```

随便运行下这些脚本，然后查看输出结果的变化，然后我们会继续添加一些_生产环境_配置。



## 十四、依赖管理

> es6 modules

> commonjs

> amd



### 1、带表达式的 require 语句 

如果你的 request 含有表达式(expressions)，就会创建一个上下文(context)，因为在编译时(compile time)并不清楚 **具体** 导入哪个模块。

示例，考虑到我们有包含 `.ejs` 文件的如下目录结构：

```bash
example_directory
│
└───template
│   │   table.ejs
│   │   table-row.ejs
│   │
│   └───directory
│       │   another.ejs
```

当下面的 `require()` 调用被解析：

```javascript
require('./template/' + name + '.ejs');
```

webpack 解析 `require()` 调用，然后提取出如下一些信息：

```code
Directory: ./template
Regular expression: /^.*\.ejs$/
```

**context module**

会生成一个 context module(上下文模块)。它包含 **目录下的所有模块** 的引用，如果一个 request 符合正则表达式，就能 require 进来。该context module包含一个map（映射）对象，会把requests翻译成对应的模块id。（request参考[概念术语](https://webpack.docschina.org/glossary/) ）

示例map（映射）:

```json
{
  "./table.ejs": 42,
  "./table-row.ejs": 43,
  "./directory/another.ejs": 44
}
```

此 context module 还包含一些访问这个 map 对象的 runtime 逻辑。

这意味着 webpack 能够支持动态地 require，但会导致所有可能用到的模块都包含在 bundle 中。



### 2、`require.context` 

你还可以通过 `require.context()` 函数来创建自己的 context。

可以给这个函数传入三个参数：一个要搜索的目录，一个标记表示是否还搜索其子目录， 以及一个匹配文件的正则表达式。

webpack 会在构建中解析代码中的 `require.context()` 。

语法如下：

```javascript
require.context(directory, useSubdirectories = true, regExp = /^\.\/.*$/, mode = 'sync');
```

示例：

```javascript
require.context('./test', false, /\.test\.js$/);
//（创建出）一个 context，其中文件来自 test 目录，request 以 `.test.js` 结尾。
require.context('../', true, /\.stories\.js$/);
// （创建出）一个 context，其中所有文件都来自父文件夹及其所有子级文件夹，request 以 `.stories.js` 结尾。
```

>Warning
>传递给 `require.context` 的参数必须是字面量(literal)！

#### (1) context module API 

一个 context module 会导出一个（require）函数，此函数可以接收一个参数：request。

此导出函数有三个属性：`resolve`, `keys`, `id`。

- `resolve` 是一个函数，它返回 request 被解析后得到的模块 id。
- `keys` 也是一个函数，它返回一个数组，由所有可能被此 context module 处理的请求（参考下面第二段代码中的 key）组成。

如果想引入一个文件夹下面的所有文件，或者引入能匹配一个正则表达式的所有文件，这个功能就会很有帮助，例如：

```javascript
function importAll (r) {
  r.keys().forEach(r);
}

importAll(require.context('../components/', true, /\.js$/));


const cache = {};
function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}

importAll(require.context('../components/', true, /\.js$/));
// 在构建时(build-time)，所有被 require 的模块都会被填充到 cache 对象中。
```

- `id` 是 context module 的模块 id. 它可能在你使用 `module.hot.accept` 时会用到。





## 十五、公共路径

`publicPath` 配置选项在各种场景中都非常有用。你可以通过它来指定应用程序中所有资源的基础路径。

### 1、示例 

下面提供一些用于实际应用程序的示例，通过这些示例，此功能显得极其简单。实质上，发送到 `output.path` 目录的每个文件，都将从 `output.publicPath` 位置引用。这也包括（通过 [代码分离](https://webpack.docschina.org/guides/code-splitting/) 创建的）子 chunk 和作为依赖图一部分的所有其他资源（例如 image, font 等）。

#### (1) 基于环境设置 

在开发环境中，我们通常有一个 `assets/` 文件夹，它与索引页面位于同一级别。这没太大问题，但是，如果我们将所有静态资源托管至 CDN，然后想在生产环境中使用呢？

想要解决这个问题，可以直接使用一个有着悠久历史的 environment variable(环境变量)。假设我们有一个变量 `ASSET_PATH`：

```js
import webpack from 'webpack';

// 尝试使用环境变量，否则使用根路径
const ASSET_PATH = process.env.ASSET_PATH || '/';

export default {
  output: {
    publicPath: ASSET_PATH,
  },

  plugins: [
    // 这可以帮助我们在代码中安全地使用环境变量
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
  ],
};
```

#### (2) 在运行时设置 

另一个可能出现的情况是，需要在运行时设置 `publicPath`。webpack 暴露了一个名为 `__webpack_public_path__` 的全局变量。所以在应用程序的 entry point 中，可以直接如下设置：

```js
__webpack_public_path__ = process.env.ASSET_PATH;
```

这些内容就是你所需要的。由于我们已经在配置中使用了 `DefinePlugin`， `process.env.ASSET_PATH` 将始终都被定义， 因此我们可以安全地使用。

>Warning
>注意，如果在 entry 文件中使用 ES2015 module import，则会在 import 之后进行 `__webpack_public_path__` 赋值。在这种情况下，你必须将 public path 赋值移至一个专用模块中，然后将它的 import 语句放置到 entry.js 最上面：

```js
// entry.js
import './public-path';
import './app';
```

>Tip
>当使用 `web` 或者 `web-worker` 时，`publicPath` 默认为 `'auto'`，将会自动从 `import.meta.url`、`document.currentScript`、`<script />` 或者 `self.location` 中确定公共路径。



## 十六、Shimming 预置依赖

`webpack` 编译器(compiler)能够识别遵循 ES2015 模块语法、CommonJS 或 AMD 规范编写的模块。然而，一些第三方的库(library)可能会引用一些全局依赖（例如 `jQuery` 中的 `$`）。这些库也可能创建一些需要被导出的全局变量。这些“不符合规范的模块”就是 *shimming* 发挥作用的地方。

> **我们不推荐使用全局的东西！**在 webpack 背后的整个概念是让前端开发更加模块化。也就是说，需要编写具有良好的封闭性(well contained)、彼此隔离的模块，以及不要依赖于那些隐含的依赖模块（例如，全局变量）。请只在必要的时候才使用本文所述的这些特性。

*shimming* 另外一个使用场景就是，当你希望 [polyfill](https://en.wikipedia.org/wiki/Polyfill) 浏览器功能以支持更多用户时。在这种情况下，你可能只想要将这些 polyfills 提供给到需要修补(patch)的浏览器（也就是实现按需加载）。

下面的文章将向我们展示这两种用例。

### 1、shimming 全局变量

让我们开始第一个 shimming 全局变量的用例。在此之前，我们先看看我们的项目：

**project**

```diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
|- /node_modules
```

还记得我们之前用过的 `lodash` 吗？出于演示的目的，让我们把这个模块作为我们应用程序中的一个全局变量。要实现这些，我们需要使用 `ProvidePlugin` 插件。

使用 [`ProvidePlugin`](https://www.webpackjs.com/plugins/provide-plugin) 后，能够在通过 webpack 编译的每个模块中，通过访问一个变量来获取到 package 包。如果 webpack 知道这个变量在某个模块中被使用了，那么 webpack 将在最终 bundle 中引入我们给定的 package。让我们先移除 `lodash` 的 `import` 语句，并通过插件提供它：

**src/index.js**

```diff
- import _ from 'lodash';
-
  function component() {
    var element = document.createElement('div');

-   // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

**webpack.config.js**

```diff
  const path = require('path');
+ const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
-   }
+   },
+   plugins: [
+     new webpack.ProvidePlugin({
+       _: 'lodash'
+     })
+   ]
  };
```

本质上，我们所做的，就是告诉 webpack……

> 如果你遇到了至少一处用到 `lodash` 变量的模块实例，那请你将 `lodash` package 包引入进来，并将其提供给需要用到它的模块。

如果我们 run build，将会看到同样的输出：

```bash
Hash: f450fa59fa951c68c416
Version: webpack 2.2.0
Time: 343ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  544 kB       0  [emitted]  [big]  main
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] (webpack)/buildin/global.js 509 bytes {0} [built]
   [2] (webpack)/buildin/module.js 517 bytes {0} [built]
   [3] ./src/index.js 189 bytes {0} [built]
```

我们还可以使用 `ProvidePlugin` 暴露某个模块中单个导出值，只需通过一个“数组路径”进行配置（例如 `[module, child, ...children?]`）。所以，让我们做如下设想，无论 `join` 方法在何处调用，我们都只会得到的是 `lodash` 中提供的 `join` 方法。

**src/index.js**

```diff
  function component() {
    var element = document.createElement('div');

-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.innerHTML = join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

**webpack.config.js**

```diff
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new webpack.ProvidePlugin({
-       _: 'lodash'
+       join: ['lodash', 'join']
      })
    ]
  };
```

这样就能很好的与 [tree shaking](https://www.webpackjs.com/guides/tree-shaking) 配合，将 `lodash` 库中的其他没用到的部分去除。

### 2、细粒度 shimming

一些传统的模块依赖的 `this` 指向的是 `window` 对象。在接下来的用例中，调整我们的 `index.js`：

```diff
  function component() {
    var element = document.createElement('div');

    element.innerHTML = join(['Hello', 'webpack'], ' ');
+
+   // Assume we are in the context of `window`
+   this.alert('Hmmm, this probably isn\'t a great idea...')

    return element;
  }

  document.body.appendChild(component());
```

当模块运行在 CommonJS 环境下这将会变成一个问题，也就是说此时的 `this` 指向的是 `module.exports`。在这个例子中，你可以通过使用 [`imports-loader`](https://www.webpackjs.com/loaders/imports-loader/) 覆写 `this`：

**webpack.config.js**

```diff
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: require.resolve('index.js'),
+         use: 'imports-loader?this=>window'
+       }
+     ]
+   },
    plugins: [
      new webpack.ProvidePlugin({
        join: ['lodash', 'join']
      })
    ]
  };
```

### 3、全局 exports

让我们假设，某个库(library)创建出一个全局变量，它期望用户使用这个变量。为此，我们可以在项目配置中，添加一个小模块来演示说明：

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- index.js
+   |- globals.js
  |- /node_modules
```

**src/globals.js**

```js
var file = 'blah.txt';
var helpers = {
  test: function() { console.log('test something'); },
  parse: function() { console.log('parse something'); }
}
```

你可能从来没有在自己的源码中做过这些事情，但是你也许遇到过一个老旧的库(library)，和上面所展示的代码类似。在这个用例中，我们可以使用 [`exports-loader`](https://www.webpackjs.com/loaders/exports-loader/)，将一个全局变量作为一个普通的模块来导出。例如，为了将 `file` 导出为 `file` 以及将 `helpers.parse` 导出为 `parse`，做如下调整：

**webpack.config.js**

```diff
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: require.resolve('index.js'),
          use: 'imports-loader?this=>window'
-       }
+       },
+       {
+         test: require.resolve('globals.js'),
+         use: 'exports-loader?file,parse=helpers.parse'
+       }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        join: ['lodash', 'join']
      })
    ]
  };
```

现在从我们的 entry 入口文件中(即 `src/index.js`)，我们能 `import { file, parse } from './globals.js';` ，然后一切将顺利进行。

### 4、加载 polyfills

目前为止我们所讨论的所有内容都是处理那些遗留的 package 包，让我们进入到下一个话题：**polyfills**。

有很多方法来载入 polyfills。例如，要引入 [`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/) 我们只需要如下操作：

```bash
npm install --save babel-polyfill
```

然后使用 `import` 将其添加到我们的主 bundle 文件：

**src/index.js**

```diff
+ import 'babel-polyfill';
+
  function component() {
    var element = document.createElement('div');

    element.innerHTML = join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

> 请注意，我们没有将 `import` 绑定到变量。这是因为只需在基础代码(code base)之外，再额外执行 polyfills，这样我们就可以假定代码中已经具有某些原生功能。

polyfills 虽然是一种模块引入方式，但是**并不推荐在主 bundle 中引入 polyfills**，因为这不利于具备这些模块功能的现代浏览器用户，会使他们下载体积很大、但却不需要的脚本文件。

让我们把 `import` 放入一个新文件，并加入 [`whatwg-fetch`](https://github.com/github/fetch) polyfill：

```bash
npm install --save whatwg-fetch
```

**src/index.js**

```diff
- import 'babel-polyfill';
-
  function component() {
    var element = document.createElement('div');

    element.innerHTML = join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- index.js
    |- globals.js
+   |- polyfills.js
  |- /node_modules
```

**src/polyfills.js**

```javascript
import 'babel-polyfill';
import 'whatwg-fetch';
```

**webpack.config.js**

```diff
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
-   entry: './src/index.js',
+   entry: {
+     polyfills: './src/polyfills.js',
+     index: './src/index.js'
+   },
    output: {
-     filename: 'bundle.js',
+     filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: require.resolve('index.js'),
          use: 'imports-loader?this=>window'
        },
        {
          test: require.resolve('globals.js'),
          use: 'exports-loader?file,parse=helpers.parse'
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        join: ['lodash', 'join']
      })
    ]
  };
```

如此之后，我们可以在代码中添加一些逻辑，根据条件去加载新的 `polyfills.bundle.js` 文件。你该如何决定，依赖于那些需要支持的技术以及浏览器。我们将做一些简单的试验，来确定是否需要引入这些 polyfills：

**dist/index.html**

```diff
  <!doctype html>
  <html>
    <head>
      <title>Getting Started</title>
+     <script>
+       var modernBrowser = (
+         'fetch' in window &&
+         'assign' in Object
+       );
+
+       if ( !modernBrowser ) {
+         var scriptElement = document.createElement('script');
+
+         scriptElement.async = false;
+         scriptElement.src = '/polyfills.bundle.js';
+         document.head.appendChild(scriptElement);
+       }
+     </script>
    </head>
    <body>
      <script src="index.bundle.js"></script>
    </body>
  </html>
```

现在，我们能在 entry 入口文件中，通过 `fetch` 获取一些数据：

**src/index.js**

```diff
  function component() {
    var element = document.createElement('div');

    element.innerHTML = join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
+
+ fetch('https://jsonplaceholder.typicode.com/users')
+   .then(response => response.json())
+   .then(json => {
+     console.log('We retrieved some data! AND we\'re confident it will work on a variety of browser distributions.')
+     console.log(json)
+   })
+   .catch(error => console.error('Something went wrong when fetching this data: ', error))
```

当我们开始执行构建时，`polyfills.bundle.js` 文件将会被载入到浏览器中，然后所有代码将正确无误的在浏览器中执行。请注意，以上的这些设定可能还会有所改进，我们只是对于如何解决「将 polyfills 提供给那些需要引入它的用户」这个问题，向你提供一个很棒的想法。



##5、 babel7.4 中 @babel/preset-env 的使用

**core-js介绍**

其实core-js是我们能够使用新的API的最重要的包，然而一般情况它隐藏在webpack编译后的代码中，我们一般不会去查看，所以容易被遗忘，我们在webpack生成环境下，查看编译后的代码，可以看到例如includes就是从core-js导出到我们的代码去的。

![img](https://s2.ax1x.com/2019/10/07/uR9QE9.png)

**core-js是什么**

- 它是JavaScript标准库的polyfill
- 它尽可能的进行模块化，让你能选择你需要的功能
- 它可以不污染全局空间
- 它和babel高度集成，可以对core-js的引入进行最大程度的优化

**升级core-js@3动机**

目前我们使用的都默认是core-js@2，它在 2018年 之前就封锁了分支，至此之后的特性都只会添加到core-js@3，这里有一个生产例子，使用了core-js@2不支持的新特性，导致错误

- core-js@2出现的问题
- Vue-cli使用flat报错
- vue-cli也会在V4升级core-js
- Roadmap for Vue-cli4
- core-js@3添加的特性

**core-js@3 特性概览**

- 支持ECMAScript稳定功能，引入core-js@3冻结期间的新功能，比如flat
- 加入到ES2016-ES2019中的提案，现在已经被标记为稳定功能
- 更新了提案的实现，增加了proposals配置项，由于提案阶段不稳定，需要谨慎使用
- 增加了对一些web标准的支持，比如URL 和 URLSearchParams
- 现在支持原型方法，同时不污染原型
- 删除了过时的特性

**core-js@3 与 babel**

以前我们实现API的时候，会引入整个polyfill,其实polyfill只是包括了以下两个包

```
core-js
regenerator-runtime
```

core-js@3 升级之后弃用了@babel/polyfill，以下是等价实现

```js
// babel.config.js
presets: [
  ["@babel/preset-env", {
    useBuiltIns: "entry", // or "usage"，见如下说明
    corejs: 3,
  }]
]

// 如果 useBuiltIns: "entry" 需要在打包入口文件导入两个包：
import "core-js/stable"
import "regenerator-runtime/runtime"

// 如果 useBuiltIns: "usage"，不需要在入口文件里导入包了
```



##6、什么是Browserslist

关于**preset-env**，我们还可以提供一个`targets`配置项指定运行环境，就是我们可以配置对应目标浏览器环境，那么**babel**就会编译出对应目标浏览器环境可以运行的代码。相信有同学遇到过在低版本系统ios手机里自己的项目会白屏，其实是某些语法在ios低版本系统里不支持，这个时候我们可以直接配置ios 7浏览器环境都可以支持的代码：

```js
Copy/* babel.config.js */

module.exports = {
  presets: [
    [
      "@babel/preset-env", {
        'targets': {
          'browsers': ['ie >= 8', 'iOS 7'] // 支持ie8，直接使用iOS浏览器版本7
        }
      }
    ]
  ],
  plugins: [
  ]
}
```

当然**babel**的**Browserslist**集成还支持在**package.json**文件里或者新建一个 **.browserslistrc** 文件来指定对应目标环境。

在开始WEB前端开发之前，开发者必须要明确目标环境。例如：

- IE 9 +
- Edge
- Firefox 60 +
- Chrome 60 +

#### (1) 作用

Browserslist用于配置目标环境。

#### **(2) 安装**

```
npm install --save-dev browserslist
```

#### (3) 配置

Browserslist的配置可以直接写在`package.json`的`browserslist`字段里（推荐），也可以写成名为`.browserslistrc`的配置文件，但二者不能同时使用。

**package.json**

示例：

```
{
  "browserslist": ["> 1%", "last 2 versions"]
}
```

**.browserslistrc**

示例：

```
> 1%
last 2 versions
```

#### (4) 测试

在控制台执行下面的命令会输出当前的目标环境。

```
npx browserslist
```

#### (5) 语法

注意：大小写不敏感。

**无配置**

当`package.json`中不存在`browserslist`字段且`.browserslistrc`也不存在时，相当于

```
{
  "browserslist": ["defaults"]
}
```

或

```
defaults
```

**有配置但为空**

空

**浏览器名称 + 版本号**

示例：

```
{
  "browserslist": ["ie 10"]
}
```

**浏览器名称 + 版本号范围**

示例：

```
{
  "browserslist": ["ie > 8"]
}
{
  "browserslist": ["ie 10-11"]
}
```

**浏览器版本的市场份额**

示例：

```
{
  "browserslist": ["> 1%"]
}
```

**浏览器版本的市场份额 + 地区**

示例：

```
{
  "browserslist": ["> 1% in CN"]
}
```

#### (6) 逻辑运算

**或运算**

`,`和`or`表示或运算（并集）

示例：“市场份额超过`1%`的浏览器版本”和“每种浏览器的最新`2`个版本”的并集。

```
{
  "browserslist": ["> 1%, last 2 versions"]
}
{
  "browserslist": ["> 1% or last 2 versions"]
}
{
  "browserslist": ["> 1%", "last 2 versions"]
}
```

**与运算**

`and`表示与运算（交集）

示例：“市场份额超过`1%`的浏览器版本”和“每种浏览器的最新`2`个版本”的交集。

```
{
  "browserslist": ["> 1% and last 2 versions"]
}
```

**非运算**

`not`表示非运算（补集）

注意：`not`不能作为第一个条件。

示例：“市场份额超过`0.5%`的浏览器版本”和“每种浏览器的最新`2`个版本”的差集

```
{
  "browserslist": ["> .5% and not last 2 versions"]
}
{
  "browserslist": ["> .5% or not last 2 versions"]
}
{
  "browserslist": ["> .5%, not last 2 versions"]
}
{
  "browserslist": ["> .5%", "not last 2 versions"]
}
```

[browserslist配置源](https://github.com/browserslist/browserslist#queries)



## 十七、资源模块

资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。

在 webpack 5 之前，通常使用：

- [`raw-loader`](https://webpack.docschina.org/loaders/raw-loader/) 将文件导入为字符串
- [`url-loader`](https://webpack.docschina.org/loaders/url-loader/) 将文件作为 data URI 内联到 bundle 中
- [`file-loader`](https://webpack.docschina.org/loaders/file-loader/) 将文件发送到输出目录

资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

- `asset/resource` 发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现。
- `asset/inline` 导出一个资源的 data URI。之前通过使用 `url-loader` 实现。
- `asset/source` 导出资源的源代码。之前通过使用 `raw-loader` 实现。
- `asset` 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现。

当在 webpack 5 中使用旧的 assets loader（如 `file-loader`/`url-loader`/`raw-loader` 等）和 asset 模块时，你可能想停止当前 asset 模块的处理，并再次启动处理，这可能会导致 asset 重复，你可以通过将 asset 模块的类型设置为 `'javascript/auto'` 来解决。

**webpack.config.js**

```diff
module.exports = {
  module: {
   rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          },
        ],
+       type: 'javascript/auto'
      },
   ]
  },
}
```

如需从 asset loader 中排除来自新 URL 处理的 asset，请添加 `dependency: { not: ['url'] }` 到 loader 配置中。

**webpack.config.js**

```diff
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
+       dependency: { not: ['url'] },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  }
}
```



### 1、Resource 资源 

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
+ module: {
+   rules: [
+     {
+       test: /\.png/,
+       type: 'asset/resource'
+     }
+   ]
+ },
};
```

**src/index.js**

```js
import mainImage from './images/main.png';

img.src = mainImage; // '/dist/151cfcfa1bd74779aadb.png'
```

所有 `.png` 文件都将被发送到输出目录，并且其路径将被注入到 bundle 中。

#### (1) 自定义输出文件名 

默认情况下，`asset/resource` 模块以 `[hash][ext][query]` 文件名发送到输出目录。

可以通过在 webpack 配置中设置 [`output.assetModuleFilename`](https://webpack.docschina.org/configuration/output/#outputassetmodulefilename) 来修改此模板字符串：

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
+   assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
      }
    ]
  },
};
```

另一种自定义输出文件名的方式是，将某些资源发送到指定目录：

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
+   assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
-     }
+     },
+     {
+       test: /\.html/,
+       type: 'asset/resource',
+       generator: {
+         filename: 'static/[hash][ext][query]'
+       }
+     }
    ]
  },
};
```

使用此配置，所有 `html` 文件都将被发送到输出目录中的 `static` 目录中。

`Rule.generator.filename` 与 [`output.assetModuleFilename`](https://webpack.docschina.org/configuration/output/#outputassetmodulefilename) 相同，并且仅适用于 `asset` 和 `asset/resource` 模块类型。



### 2、inline 资源(inlining asset) 

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
-   assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
-       test: /\.png/,
-       type: 'asset/resource'
+       test: /\.svg/,
+       type: 'asset/inline'
-     },
+     }
-     {
-       test: /\.html/,
-       type: 'asset/resource',
-       generator: {
-         filename: 'static/[hash][ext][query]'
-       }
-     }
    ]
  }
};
```

**src/index.js**

```diff
- import mainImage from './images/main.png';
+ import metroMap from './images/metro.svg';

- img.src = mainImage; // '/dist/151cfcfa1bd74779aadb.png'
+ block.style.background = `url(${metroMap})`; // url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDo...vc3ZnPgo=)
```

所有 `.svg` 文件都将作为 data URI 注入到 bundle 中。

#### (1) 自定义 data URI 生成器 

webpack 输出的 data URI，默认是呈现为使用 Base64 算法编码的文件内容。

如果要使用自定义编码算法，则可以指定一个自定义函数来编码文件内容：

**webpack.config.js**

```diff
const path = require('path');
+ const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.svg/,
        type: 'asset/inline',
+       generator: {
+         dataUrl: content => {
+           content = content.toString();
+           return svgToMiniDataURI(content);
+         }
+       }
      }
    ]
  },
};
```

现在，所有 `.svg` 文件都将通过 `mini-svg-data-uri` 包进行编码。



### 3、source 资源(source asset) 

**webpack.config.js**

```diff
const path = require('path');
- const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
-       test: /\.svg/,
-       type: 'asset/inline',
-       generator: {
-         dataUrl: content => {
-           content = content.toString();
-           return svgToMiniDataURI(content);
-         }
-       }
+       test: /\.txt/,
+       type: 'asset/source',
      }
    ]
  },
};
```

**src/example.txt**

```text
Hello world
```

**src/index.js**

```diff
- import metroMap from './images/metro.svg';
+ import exampleText from './example.txt';

- block.style.background = `url(${metroMap}); // url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDo...vc3ZnPgo=)
+ block.textContent = exampleText; // 'Hello world'
```

所有 `.txt` 文件将原样注入到 bundle 中。



### 4、URL 资源

当使用 `new URL('./path/to/asset', import.meta.url)`，webpack 也会创建资源模块。

**src/index.js**

```js
const logo = new URL('./logo.svg', import.meta.url);
```

根据你配置中 [`target`](https://webpack.docschina.org/configuration/target/) 的不同，webpack 会将上述代码编译成不同结果：

```js
// target: web
new URL(
  __webpack_public_path__ + 'logo.svg',
  document.baseURI || self.location.href
);

// target: webworker
new URL(__webpack_public_path__ + 'logo.svg', self.location);

// target: node, node-webkit, nwjs, electron-main, electron-renderer, electron-preload, async-node
new URL(
  __webpack_public_path__ + 'logo.svg',
  require('url').pathToFileUrl(__filename)
);
```



### 5、通用资源类型 

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
+       test: /\.txt/,
+       type: 'asset',
      }
    ]
  },
};
```

现在，webpack 将按照默认条件，自动地在 `resource` 和 `inline` 之间进行选择：小于 8kb 的文件，将会视为 `inline` 模块类型，否则会被视为 `resource` 模块类型。

可以通过在 webpack 配置的 module rule 层级中，设置 [`Rule.parser.dataUrlCondition.maxSize`](https://webpack.docschina.org/configuration/module/#ruleparserdataurlcondition) 选项来修改此条件：

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        type: 'asset',
+       parser: {
+         dataUrlCondition: {
+           maxSize: 4 * 1024 // 4kb
+         }
+       }
      }
    ]
  },
};
```

还可以 [指定一个函数](https://webpack.docschina.org/configuration/module/#ruleparserdataurlcondition) 来决定是否 inline 模块。



### 6、变更内联 loader 的语法 

在 asset 模块和 webpack 5 之前，可以使用[内联语法](https://webpack.docschina.org/concepts/loaders/#inline)与上述传统的 loader 结合使用。

现在建议去掉所有的 loader 的语法，使用资源查询条件来魔法内联语法的功能。

示例，将 `raw-loader` 替换为 `asset/source` 类型：

```diff
- import myModule from 'raw-loader!my-module';
+ import myModule from 'my-module?raw';
```

webpack 相关配置：

```diff
module: {
    rules: [
    // ...
+     {
+       resouceQuery: /raw/
+       type: 'asset/source'
+     }
    ]
  },
```

如果你想把原始资源排除在其他 loader 的解析范围以外，请使用取反的符合：

```diff
module: {
    rules: [
    // ...
+     {
+       test: /\.m?js$/,
+       resourceQuery: /^(?!raw$).*/,
+     },
      {
        resouceQuery: /raw/
        type: 'asset/source'
      }
    ]
  },
```



## 十八、entry 高级用法

### 1、每个入口使用多种文件类型 

在不使用 `import` 样式文件的应用程序中（预单页应用程序或其他原因），使用一个值数组结构的 [entry](https://webpack.docschina.org/configuration/entry-context/#entry)，并且在其中传入不同类型的文件，可以实现将 CSS 和 JavaScript（和其他）文件分离在不同的 bundle。

举个例子。我们有一个具有两种页面类型的 PHP 应用程序：home(首页) 和 account(帐户)。home 与应用程序其余部分（account 页面）具有不同的布局和不可共享的 JavaScript。我们想要从应用程序文件中输出 home 页面的 `home.js` 和 `home.css`，为 account 页面输出 `account.js` 和 `account.css`。

**home.js**

```javascript
console.log('home page type');
```

**home.scss**

```scss
// home page individual styles
```

**account.js**

```javascript
console.log('account page type');
```

**account.scss**

```scss
// account page individual styles
```

我们将在 `production(生产)` 模式中使用 [`MiniCssExtractPlugin`](https://webpack.docschina.org/plugins/mini-css-extract-plugin/) 作为 CSS 的一个最佳实践。

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    home: ['./home.js', './home.scss'],
    account: ['./account.js', './account.scss'],
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
```

由于我们未指定其他输出路径，因此使用以上配置运行 webpack 将输出到 `./dist`。`./dist` 目录下现在包含四个文件：

- home.js
- home.css
- account.js
- account.css



#十九、TypeScript

[TypeScript](https://www.typescriptlang.org/) 是 JavaScript 的超集，为其增加了类型系统，可以编译为普通 JavaScript 代码。这篇指南里我们将会学习是如何将 webpack 和 TypeScript 进行集成。

### 1、基础配置 

首先，执行以下命令安装 TypeScript compiler 和 loader：

```bash
npm install --save-dev typescript ts-loader
```

现在，我们将修改目录结构和配置文件：

**project**

```diff
  webpack-demo
  |- package.json
+ |- tsconfig.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
    |- index.js
+   |- index.ts
  |- /node_modules
```

**tsconfig.json**

这里我们设置一个基本的配置，来支持 JSX，并将 TypeScript 编译到 ES5……

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  }
}
```

查看 [TypeScript 官方文档](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 了解更多关于 `tsconfig.json` 的配置选项。

想要了解 webpack 配置的更多信息，请查看 [配置](https://webpack.docschina.org/concepts/configuration/) 概念。

现在，配置 webpack 处理 TypeScript：

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

这会让 webpack 直接从 `./index.ts` *进入*，然后通过 `ts-loader` _加载_所有的 `.ts` 和 `.tsx` 文件，并且在当前目录_输出_一个 `bundle.js` 文件。

现在让我们改变 `lodash` 在 `./index.ts` 文件中的引入， 因为在 `lodash` 的定义中没有默认(default)的导出。

**./index.ts**

```diff
- import _ from 'lodash';
+ import * as _ from 'lodash';

  function component() {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

>Tip
>如果想在 TypeScript 中保留如`import _ from 'lodash';`的语法被让它作为一种默认的导入方式，需要在文件 **tsconfig.json** 中设置 `"allowSyntheticDefaultImports" : true` 和 `"esModuleInterop" : true` 。这个是与 TypeScript 相关的配置，在本文档中提及仅供参考。



### 2、Loader 

[`ts-loader`](https://github.com/TypeStrong/ts-loader)

在本指南中，我们使用 `ts-loader`，因为它能够很方便地启用额外的 webpack 功能，例如将其他 web 资源导入到项目中。

>**Warning**
>`ts-loader`使用`tsc`TypeScript编译器，并取决于您的`tsconfig.json`配置。确保避免设置[`module`](https://www.typescriptlang.org/tsconfig#module)为“ CommonJS”，否则webpack将无法[摇晃您的代码](https://webpack.docschina.org/guides/tree-shaking)。

请注意，如果您已经在使用[`babel-loader`](https://github.com/babel/babel-loader)代码转译，则可以使用[`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript)Babel并让其处理JavaScript和TypeScript文件，而无需使用其他加载器。请记住，与相反`ts-loader`，底层[`@babel/plugin-transform-typescript`](https://babeljs.io/docs/en/babel-plugin-transform-typescript)插件不执行任何类型检查。



### 3、Source Maps 

想要了解 source map 的更多信息，请查看 [开发](https://webpack.docschina.org/guides/development) 指南。

想要启用 source map，我们必须配置 TypeScript，以将内联的 source map 输出到编译后的 JavaScript 文件中。必须在 TypeScript 配置中添加下面这行：

**tsconfig.json**

```diff
  {
    "compilerOptions": {
      "outDir": "./dist/",
+     "sourceMap": true,
      "noImplicitAny": true,
      "module": "commonjs",
      "target": "es5",
      "jsx": "react",
      "allowJs": true
    }
  }
```

现在，我们需要告诉 webpack 提取这些 source map，并内联到最终的 bundle 中。

**webpack.config.js**

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.ts',
+   devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```

查看 [devtool](https://webpack.docschina.org/configuration/devtool/) 文档以了解更多信息。



### 4、使用第三方类库 

在从 npm 安装 third party library(第三方库) 时，一定要记得同时安装此 library 的类型声明文件(typing definition)。你可以从 [TypeSearch](https://microsoft.github.io/TypeSearch/) 中找到并安装这些第三方库的类型声明文件。

举个例子，如果想安装 lodash 类型声明文件，我们可以运行下面的命令：

```bash
npm install --save-dev @types/lodash
```

想了解更多，可以查看 [这篇文章](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/)。



### 5、导入其他资源 

想要在 TypeScript 中使用非代码资源(non-code asset)，我们需要告诉 TypeScript 推断导入资源的类型。在项目里创建一个 `custom.d.ts` 文件，这个文件用来表示项目中 TypeScript 的自定义类型声明。我们为 `.svg` 文件设置一个声明：

**custom.d.ts**

```typescript
declare module '*.svg' {
  const content: any;
  export default content;
}
```

H这里，我们通过指定任何以 `.svg` 结尾的导入(import)，将 SVG 声明(declare) 为一个新的模块(module)，并将模块的 `content` 定义为 `any`。我们可以通过将类型定义为字符串，来更加显式地将它声明为一个 url。同样的概念适用于其他资源，包括 CSS, SCSS, JSON 等。



### 6、构建性能 

>**Warning**
>这可能会降低构建性能。



## 二十、构建性能

### 1、通用环境 

无论你是在 [开发环境](https://webpack.docschina.org/guides/development) 还是在 [生产环境](https://webpack.docschina.org/guides/production) 下运行构建脚本，以下最佳实践都会有所帮助。

#### (1) 更新到最新版本 

使用最新的 webpack 版本。我们会经常进行性能优化。webpack 的最新稳定版本是：

[![latest webpack version](https://img.shields.io/github/package-json/v/webpack/webpack.svg?label=webpack&style=flat-square&maxAge=3600)](https://github.com/webpack/webpack/releases)

将 **Node.js** 更新到最新版本，也有助于提高性能。除此之外，将你的 package 管理工具（例如 `npm` 或者 `yarn`）更新到最新版本，也有助于提高性能。较新的版本能够建立更高效的模块树以及提高解析速度。

#### (2) loader 

将 loader 应用于最少数量的必要模块。而非如下:

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
};
```

通过使用 `include` 字段，仅将 loader 应用在实际需要将其转换的模块：

```js
const path = require('path');

module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],
  },
};
```

#### (3) 引导(bootstrap)

每个额外的 loader/plugin 都有其启动时间。尽量少地使用工具。

#### (4) 解析 

以下步骤可以提高解析速度：

- 减少 `resolve.modules`, `resolve.extensions`, `resolve.mainFiles`, `resolve.descriptionFiles` 中条目数量，因为他们会增加文件系统调用的次数。
- 如果你不使用 symlinks（例如 `npm link` 或者 `yarn link`），可以设置 `resolve.symlinks: false`。
- 如果你使用自定义 resolve plugin 规则，并且没有指定 context 上下文，可以设置 `resolve.cacheWithContext: false`。

#### (5) dll 

使用 `DllPlugin` 为更改不频繁的代码生成单独的编译结果。这可以提高应用程序的编译速度，尽管它增加了构建过程的复杂度。

#### (6) 小即是快(smaller = faster) 

减少编译结果的整体大小，以提高构建性能。尽量保持 chunk 体积小。

- 使用数量更少/体积更小的 library。
- 在多页面应用程序中使用 `SplitChunksPlugin`。
- 在多页面应用程序中使用 `SplitChunksPlugin `，并开启 `async` 模式。
- 移除未引用代码。
- 只编译你当前正在开发的那些代码。

#### (7) worker 池(worker pool) 

`thread-loader` 可以将非常消耗资源的 loader 分流给一个 worker pool。

#### (8) 持久化缓存 

在 webpack 配置中使用 [`cache`](https://webpack.docschina.org/configuration/other-options/#cache) 选项。使用 `package.json` 中的 `"postinstall"` 清除缓存目录。

#### (9) 自定义 plugin/loader 

对它们进行概要分析，以免在此处引入性能问题。

#### (10 )Progress plugin 

将 `ProgressPlugin` 从 webpack 中删除，可以缩短构建时间。请注意，`ProgressPlugin` 可能不会为快速构建提供太多价值，因此，请权衡利弊再使用。

### 2、开发环境 

以下步骤对于_开发环境_特别有帮助。

#### (1) 增量编译 

使用 webpack 的 watch mode(监听模式)。而不使用其他工具来 watch 文件和调用 webpack 。内置的 watch mode 会记录时间戳并将此信息传递给 compilation 以使缓存失效。

在某些配置环境中，watch mode 会回退到 poll mode(轮询模式)。监听许多文件会导致 CPU 大量负载。在这些情况下，可以使用 `watchOptions.poll` 来增加轮询的间隔时间。

#### (2) 在内存中编译 

下面几个工具通过在内存中（而不是写入磁盘）编译和 serve 资源来提高性能：

- `webpack-dev-server`
- `webpack-hot-middleware`
- `webpack-dev-middleware`

#### (3) stats.toJson 加速 

webpack 4 默认使用 `stats.toJson()` 输出大量数据。除非在增量步骤中做必要的统计，否则请避免获取 `stats` 对象的部分内容。`webpack-dev-server` 在 v3.1.3 以后的版本，包含一个重要的性能修复，即最小化每个增量构建步骤中，从 `stats` 对象获取的数据量。

#### (4) Devtool 

需要注意的是不同的 `devtool` 设置，会导致性能差异。

- `"eval"` 具有最好的性能，但并不能帮助你转译代码。
- 如果你能接受稍差一些的 map 质量，可以使用 `cheap-source-map` 变体配置来提高性能
- 使用 `eval-source-map` 变体配置进行增量编译。

>Tip
>在大多数情况下，最佳选择是 `eval-cheap-module-source-map`。

#### (5) 避免在生产环境下才会用到的工具 

某些 utility, plugin 和 loader 都只用于生产环境。例如，在开发环境下使用 `TerserPlugin` 来 minify(压缩) 和 mangle(混淆破坏) 代码是没有意义的。通常在开发环境下，应该排除以下这些工具：

- `TerserPlugin`
- `[fullhash]`/`[chunkhash]`/`[contenthash]`
- `AggressiveSplittingPlugin`
- `AggressiveMergingPlugin`
- `ModuleConcatenationPlugin`

#### (6) 最小化 entry chunk 

webpack 只会在文件系统中输出已经更新的 chunk。某些配置选项（HMR, `output.chunkFilename` 的 `[name]`/`[chunkhash]/[contenthash]`，`[fullhash]`）来说，除了对已经更新的 chunk 无效之外，对于 entry chunk 也不会生效。

确保在生成 entry chunk 时，尽量减少其体积以提高性能。下面的配置为运行时代码创建了一个额外的 chunk，所以它的生成代价较低：

```js
module.exports = {
  // ...
  optimization: {
    runtimeChunk: true
  }
};
```

#### (7) 避免额外的优化步骤 

webpack 通过执行额外的算法任务，来优化输出结果的体积和加载性能。这些优化适用于小型代码库，但是在大型代码库中却非常耗费性能：

```js
module.exports = {
  // ...
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
};
```

#### (8) 输出结果不携带路径信息 

webpack 会在输出的 bundle 中生成路径信息。然而，在打包数千个模块的项目中，这会导致造成垃圾回收性能压力。在 `options.output.pathinfo` 设置中关闭：

```js
module.exports = {
  // ...
  output: {
    pathinfo: false,
  },
};
```

#### (9) Node.js 版本 8.9.10-9.11.1 

Node.js v8.9.10 - v9.11.1 中的 ES2015 `Map` 和 `Set` 实现，存在 [性能回退](https://github.com/nodejs/node/issues/19769)。webpack 大量地使用这些数据结构，因此这次回退也会影响编译时间。

之前和之后的 Node.js 版本不受影响。

#### (10) TypeScript loader 

你可以为 loader 传入 `transpileOnly` 选项，以缩短使用 `ts-loader` 时的构建时间。使用此选项，会关闭类型检查。如果要再次开启类型检查，请使用 [`ForkTsCheckerWebpackPlugin`](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin)。使用此插件会将检查过程移至单独的进程，可以加快 TypeScript 的类型检查和 ESLint 插入的速度。

```js
module.exports = {
  // ...
  test: /\.tsx?$/,
  use: [
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      },
    },
  ],
};
```

>Tip
>这是一个关于 `ts-loader` [完整示例](https://github.com/TypeStrong/ts-loader/tree/master/examples/fork-ts-checker-webpack-plugin)的 Github 仓库。



### 3、生产环境 

以下步骤对于_生产环境_特别有帮助。

>Warning
>不要为了很小的性能收益，牺牲应用程序的质量！注意，在大多数情况下，优化代码质量比构建性能更重要。

#### (1) 多个 compilation 对象 

在创建多个 compilation 时，以下工具可以帮助到你：

- [`parallel-webpack`](https://github.com/trivago/parallel-webpack)：它允许在一个 worker 池中运行 compilation。
- `cache-loader`：可以在多个 compilation 之间共享缓存。

#### (2) Source Maps 

source map 相当消耗资源。你真的需要它们？



### 4、工具相关问题 

下列工具存在某些可能会降低构建性能的问题：

#### (1) Babel 

- 最小化项目中的 preset/plugin 数量。

#### (2) TypeScript 

- 在单独的进程中使用 `fork-ts-checker-webpack-plugin` 进行类型检查。
- 配置 loader 跳过类型检查。
- 使用 `ts-loader` 时，设置 `happyPackMode: true` / `transpileOnly: true`。

#### (3) Sass 

- `node-sass` 中有个来自 Node.js 线程池的阻塞线程的 bug。 当使用 `thread-loader` 时，需要设置 `workerParallelJobs: 2`。



## 廿一、内容安全策略

webpack 能够为其加载的所有脚本添加 `nonce`。要启用此功能，需要在引入的入口脚本中设置一个 `__webpack_nonce__` 变量。应该为每个唯一的页面视图生成和提供一个唯一的基于 hash 的 nonce，这就是为什么 `__webpack_nonce__` 要在入口文件中指定，而不是在配置中指定的原因。注意，`nonce` 应该是一个 base64 编码的字符串。

### 1、示例 

在 entry 文件中：

```js
// ...
__webpack_nonce__ = 'c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM=';
// ...
```



### 2、启用 CSP 

注意，默认情况下不启用 CSP。需要与文档(document)一起发送相应的 `CSP` header 或 meta 标签 `<meta http-equiv="Content-Security-Policy" ...>`，以告知浏览器启用 CSP。以下是一个包含 CDN 白名单 URL 的 CSP header 的示例：

```html
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com;
```

更多CSP知识，请移步[内容安全策略（CSP）详解](https://www.cnblogs.com/both-eyes/p/10841875.html)



#廿二、编写一个Loader

`loader`是一个 `node` 模块。当应用 `loader` 转换资源时，将调用此函数。给定的函数将使用提供给它的上下文访问[Loader API](https://webpack.docschina.org/api/loaders/)`this`。

### 1、基本配置

在深入研究不同类型的`loader`，及它们的用法和示例之前，让我们看一下可以在本地开发和测试加载器的三种方式。

为了测试单个装载程序，你可以简单地在配置文件中，使用`path` 来解析一个本地文件：

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve('path/to/loader.js'),
            options: {
              /* ... */
            },
          },
        ],
      },
    ],
  },
};
```

要测试多个，您可以利用`resolveLoader.modules`配置来更新webpack在何处搜索 `loader`。例如，如果你的项目中有一个本地`/loaders`目录：

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  //...
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')],
  },
};
```





#廿三、编写一个Plugin



#廿四、脚手架



## 廿五、渐进式网络应用程序



## 廿六、ECMAScript Modules



## 廿七、Package exports



## 廿八、Web Workers



## 廿九、集成



## 三十、开发 - Vagrant




