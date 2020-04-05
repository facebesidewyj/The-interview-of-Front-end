# Webpack的构建流程简述

Webpack构建流程是一个串行的单线程构建，类似工厂的流水线，主要分为以下几步：

* 初始化参数：合并配置文件和CLI中的参数，生成最终的参数
* 编译准备：初始化Compiler对象，并传入上一步生成的参数，执行对象的run方法开始编译
* 寻找入口：根据entry的配置确定入口文件
* 执行编译：从入口文件出发，执行配置的Loader对其进行编译，然后分析出依赖的模块，递归对所有模块执行编译
* 编译完成：完成对所有模块的编译工作
* 输出资源：根据入口文件和各个模块的依赖关系，输出一个包含多个模块的chunk代码块
* 完成输出：将chunk代码块以文件的形式输出

# Loader和Plugin的区别

* Loader：本质上是一个函数，将输入的内容转化为Webpack能识别的JavaScript代码，充当JavaScript翻译官的角色。Webpack官方推荐单一Loader原则，并且尽量只让Loader参与编译的事情。Loader的配置规则类型为数组，每一个项是一个Object
* Plugin：本质上是一个类（构造函数），内部需要声明一个基于Webpack的钩子函数，供Webpack所调用，基于事件流框架Tapable。Plugin主要参与工程的构建，配置规则类型也是数组，每一项一个插件实例

# Webpack构建优化

Webpack构建速度优化：

* 单一Loader原则，enforce强制Loader的执行顺序（pre、post），使用include和exclude来避免不必要的转译，如果可以，开启Loader的缓存，将编译结果缓存到文件系统（例如babel-loader?cacheDirectory=true）
* 缩小打包作用域，明确模块路径，减少Webpack文件系统递归查找的时间
* 接入DllPlugin来处理庞大的node_modules，配合DllReferencePlugin对manifest.json引用，让node_modules不会跟随业务代码一起打包，而是自身依赖发生变化时才重新打包编译
* 使用HappyPack开启多线程并行执行Loader（目前停止维护了，配合业务使用）

Webpack构建结果体积优化：

* 使用webpack-bundle-analyzer插件可视化分析构建结果，找出问题点，拆分模块
* 使用uglifyjs-webpack-plugin等插件压缩JavaScript和CSS代码，可根据业务开启图片压缩
* 使用SplitChunksPlugin进行公共资源提取（Vue-cli3内置）
* 接入Tree-shaking，删除冗余代码，依赖ES6的模块化的静态分析，对CommonJs无效

# Webpack热更新原理

Webpack的热更新又称为热替换（Hot Module Replacement），这个机制可以做到不刷新浏览器就将变化新模块替换掉旧模块

* Webpack监听模块变化，将根据配置文件对模块重新进行编译和打包，并将打包后的代码以JavaScript对象的形式保存在内存中，并告知webpack-dev-server变动的代码
* webpack-dev-server与浏览器通过socket.js建立长链接，将webpack编译打包的各个阶段告知浏览器，比如变动代码之后生成的hash值
* 浏览器根据hash的diff之后，向webpack-dev-server发送AJAX获取更新的文件列表，再通过JSONP获取到变动的代码模块
* HotModulePlugin将会对新旧模块进行diff，来判断是否更新模块
* 如果HMR失败，将会推倒live load执行浏览器刷新