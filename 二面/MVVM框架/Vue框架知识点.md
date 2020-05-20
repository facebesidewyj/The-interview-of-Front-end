# MVVM 和 MVC对比

* MVC：Model，View，Controler。MVC 是单向通信，控制器C承担的任务巨大，不利于维护
* MVVM：Model(服务器中的数据实体),View(视图),ViewModel(核心枢纽 Vue.js)。MVVM 采用双向绑定，View 的变动自动反应在 ViewModel，反之亦然

# Vue3.0新特性

* Virtual DOM重构，优化页面渲染速度
* 基于Proxy实现数据响应式
* Flow转换为TS
* 报错信息优化
* 支持tree-shaking

# Vue内部运行机制

* 初始化及挂载：初始化分三步：
  * new Vue()之后会调用_init()函数初始化，初始化生命周期、事件、props、computed、watch等。
  * 遍历data通过Object.defineProterty()设置Getter和Setter函数来完成**双向绑定**和**依赖收集**。
  * 执行$mount来挂载组件
* 模版编译：挂载组件需要进行编译（Vue 提供了两个版本，一个包含编译代码，一个不包含编译代码），这里编译分三步：
  * 正则解析template模版中的指令、class、style等数据，形成AST（抽象语法树）
  * 标记静态节点，在diff算法里会跳过静态节点，提升性能
  * 将AST生成渲染VNode所需要的render function字符串
* 响应式：render function生成的VNode被渲染时会执行Getter函数进行**依赖收集**。当修改data对象中的值时会触发Setter函数来更新视图实现双向绑定：
  * 依赖收集：目的是将Watcher观察者对象存放到当前闭包中的Dep订阅者的subs队列中
  * 双向绑定：目的是通知订阅者Dep的subs队列中的每一个Watcher观察者来执行update（nextTick异步更新）。
* Virtual DOM：render function字符串会转化成VNode对象（JS对象），VNode是对真实DOM的一层抽象
* 视图更新：在更新视图时会进行新老VNode的diff算法，并把改动的差异更新到DOM上
  * patchVNode：执行diff算法对比出差异
  * updateChildren：更新差异到DOM上

# 双向绑定的基本原理

通过 Object.defineProperty()来实现数据劫持，并重写 get 和 set 方法，来实现数据双向绑定。

* Object.defineProperty(obj, props, descriptor)方法解析：

  * obj：目标对象，要实现绑定的对象
  * props：需要操作的属性名
  * descriptor：属性描述符，具有两种形式：
    * 存取描述符，键值属性如下：
      * enumerable：属性是否可枚举，默认false
      * configurable：属性是否可被修改或删除，默认为false
      * get：获取属性触发的函数
      * set：设置属性触发的函数
    * 数据描述符，键值属性如下：
      * enumerable：属性是否可枚举，默认false
      * configurable：属性是否可被修改或删除，默认为false
      * value：属性对应的值，默认为undefined
      * writable：属性是否可被赋值运算符改变，默认为false

  ```javascript
  let obj = {
    name: 'vue'
  }
  Object.defineProperty(obj, 'name', {
    enumerable: true,
    configurable: true,
    get: function() {
      return obj['name']
    },
    set: function(newVal) {
      if(newVal !== obj['name']){
        obj['name'] = newVal
        // 更新触发
      }
    }
  })
  ```

* Object.defineProperty 与 reflect.defineProperty 的区别：

  Object.defineProperty(obj, name, descriptor)在无法定义属性时，会抛出一个错误，而 Reflect.defineProperty(obj, name, descriptor)则会返回 false。
  
* Object.defineProperty与Proxy的区别

  * Object.defineProperty是修改传入的对象的getter和setter来实现拦截
  * Proxy会重新生成一个代理对象，修改代理对象才能触发拦截
  * Proxy可以拦截更多的行为，比如in、delete等函数操作，Object.defineProperty只能拦截getter和setter

> 对于数组的操作和对象新增属性，Object.defineProperty并不能拦截到这些操作，对于数组来说，Vue重写了Array的内部函数实现对数组的响应式拦截。对于对象新增属性来说，Vue提供了set函数来手动执行双向绑定

# Vue中的依赖收集

依赖收集主要收集当前响应式对象的依赖关系，在对象变化时通知所有被依赖的目标执行相应的操作

Vue中的依赖收集由Dep订阅者这个类来实现的，它的主要作用是用来存放Watcher对象。

实现依赖收集分为一下几步：

* 在Dep类内部创建一个缓存队列subs，用来存放所有被依赖的Watcher观察者。
* 每一次render之后，会触发响应式对象的Getter函数。
* 在Getter函数中会把当前Watcher对象（Watcher有id标识避免重复）push到Dep的subs队列中
* 当需要更新视图，也就是Setter函数被触发时，会执行Dep类中的notify方法，执行所有Watcher的update方法更新视图（nextTick异步更新）

# Vue组件通信

1. 父子组件通信：
   * props和emit：实现语法糖`v-model`
   * `$parent`和`$children`：访问组件的数据和方法
   * `$listeners`和`.sync`
2. 兄弟组件通信：通过`this.$parent.$children`进行查找实现
3. 跨多级组件通信：`provide`和`inject`实现
4. 任意通信：Vuex或Event Bus

# v-if、v-show和v-html的底层实现

* v-if：不会生成VNode节点，render时不会进行渲染
* v-show：会生成VNode，render时也会渲染成真实DOM节点，只是改变了display为属性
* v-html：清除该节点下的所有节点，调用innerHTML来设置DOM

# computed与watch区别

* computed是计算属性，依赖其他data中的其他数据得出计算的值，并且具有缓存，只有当计算的值变化时才会返回
* watch是监听到值的变化就会返回，在回调中执行一些逻辑操作，比如请求接口等

> computed和watch都支持对象写法，扩展更多功能

# Vue 组件的 data 属性为什么是函数

1. 每个组件都是 Vue 的实例，每个组件都应该有自己作用域。
2. 函数拥有自己的作用域，可以避免组件共享 data 属性

# 列表中key的作用

列表中的key可以理解为是VNode节点的键，依靠key可以更准确更快速的找的其对应的VNode节点，使其在数据变化时强制更新组件，避免“原地复用”。

* 更准确：避免就地复用，在比较新老VNode相等时更准确
* 更效率：利用key生成的map能更快找到对应的VNode节点，避免遍历寻找

> 虽然简单的DOM结构在不使用key时，可以有效的复用节点，提高效率。但更推荐统一规范，在使用列表时增加key

# VNode解析

* Virtual DOM：一棵以JS对象(VNode节点)作为基础的树，用对象属性来描述节点，实际上它只是对一层对真实DOM的抽象

* VNode：本质上就是JS对象，这个对象上有一些能正确直观的描述清楚当前的节点信息的属性。

  ```javascript
  class VNode {
    constructor(tag, data, children, text, elm) {
      // 标签信息
      this.tag = tag
      // 数据信息
      this.data = data
      // 子节点信息
      this.children = children
      // 文本信息
      this.text = text
      // 真实的DOM节点
      this.elm = elm
    }
  }
  ```

# 生命周期是什么？

new Vue()对象的过程中，首先执行 init 操作，这时有两个钩子函数 beforeCreate()和 created()。

在生成 DOM 之前访问的钩子函数：beforeMounted()。

可以对 DOM 进行访问的钩子函数：mounted()。

数据进行变化之前的钩子函数：beforeUpdate()。

数据变化之后的钩子函数：update()。

对象销毁之前的钩子函数：beforeDestroy()。

销毁的钩子函数：destroyed()。

beforecreate : 举个栗子：可以在这加个 loading 事件

created ：在这结束 loading，还做一些初始化，实现函数自执行

mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情

beforeDestory： 你确认删除 XX 吗？ destoryed ：当前组件已被删除，清空相关内容

> 子组件的beforeCreate是在父组件的beforeMounted之后在执行的，子组件执行完毕mounted之后，最后触发父组件的mounted

# diff算法执行过程

diff算法是通过同层的树节点进行比较，而非对树进行逐层搜索遍历的方式，所以复杂的只有O(n)，是一种相当高效的算法。

patch函数基本执行过程：

* patch函数接收三个参数，分别是新老VNode节点和父元素
* 当老VNode节点不存在时，直接把新VNode节点批量添加到父元素上
* 当新VNode节点不存在时，批量删除老VNode节点
* 如果新老VNode存在并且相等，则进行patchNode，做新老VNode节点diff对比，并更新
* 如果新老VNode存在并且不相等，则删除老VNode节点，添加新VNode节点

> 注：更新DOM用到了nodeOps类用来做一层函数封装，区分平台，统一api

# nextTick原理

nextTick函数通过传入一个回调函数callback，这个callback会被存到一个队列中，这样会当render结束后在下一个tick时触发队列中的所有函数。

本质上，Vue的data变化时会调用nextTick函数，并把Watcher的update函数当成回调函数传入nextTick函数，nextTick创建了一个异步任务（优先微任务），在调用栈执行完毕后，批量执行被传入的回调函数。所以当我们在使用`this.$nextTick(()=>{// TODO})`时，并不会立即执行，而是传入了一个回调函数，在调用栈执行完毕后（宏任务），再去触发。

Vue源码中根据兼容性分别用setTimeout、setImmediate、Promise等方式在事件队列中创建了一个异步任务，在当前调用栈执行完毕后才去执行这个异步任务。[next-tick](https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js#L90)

```javascript
let callbacks = []
let pending = false
function nextTick(cb) {
  callbacks.push(cb)
  
  if(!pending) {
    pending = true
    setTimeout(flushCallbacks, 0)
  }
}

function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.lenght = 0
  for(let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```

# keep-alive实现原理

1. 简介：keep-alive是一个Vue的内置抽象组件，不会被当成DOM渲染，它可以将不活动的组件保存内存中，而是在组件切换时将其销毁。一般适用于一些低频交互组件或只保证一次状态的不可变组件。

2. 钩子函数：activated表示激活，deactivated表示非激活

3. 实现原理：

   * 在组件的created函数中会声明一个cache对象，用来作为缓存容器，保存VNode节点
   * destroyed函数会在组件被销毁时清空所有缓存
   * render函数中获取子组件的名称，并匹配include和exclude属性，匹配成功将子组件的VNode添加到缓存容器中，匹配失败直接返回子组件的VNode节点
   * 使用watch来监听include和exclude两个属性，在其变化时遍历缓存中的所有项，将名称不匹配的子组件销毁

   > Keep-alive 组件的缓存基于VNode节点而不是DOM结构，它将满足条件的VNode缓存起来，在渲染时直接从缓存对象中去取

# Vuex的工作原理

* Vuex介绍：Vuex是一个专门为Vue设计，用于对Vue程序进行状态管理的库，它借鉴了flux、redux的基本思想，将共享的数据抽离到全局，以一个单例Store进行管理，同时利用Vue的响应式机制对状态进行管理和更新。
  * State：存放数据，本质上是一个Map对象
  * Mutation：同步操作，修改State必须通过Mutation进行操作，实现了单向数据流，本质上是一个Map对象
  * Action：异步接口走Action，无法直接操作State，必须通过Mutation，本质上是一个Map对象

* Vuex工作原理：Vuex借鉴了MVC的架构模式，使内部数据形成了一个单向数据流，方便维护。

  * 首先Vuex提供了一个install方法供Vue注册插件时调用，install函数会将vuexInit(Vuex初始化)方法挂载到Vue的beforeCreated钩子中，并保存了Vue对象的引用

  * 我们知道使用Vuex需要在new Vue()时传入store，所以vuexInit在初始化执行时，会从Vue的`$options`中获取store并赋值给`this.$store`，如果取不到，会取父节点的`$store`，这样就保证了我们能在Vue实例中直接通过`this.$store`获取Vuex中的数据。

  * 响应式实现：在初始化Store时，在Vuex中Store的构造函数中，会初始化调用new Vue()，并且把state对象的引用赋值给Vue.data.$$state，这样Vuex中的state就被Vue中的Dep依赖收集了。当state被修改时，Dep会通知Watcher进行update，实现响应式绑定。

    ```javascript
    constructor() {
      this._vm = new Vue({
        data: {
          $$state: state
        }
      })
    }
    ```

> Vuex利用一个单例对象的引用地址，绑定到Vue的data属性中，实现数据的响应式管理

# Vue-Router工作原理

Vue-Router提供install函数供Vue注册插件，在install函数中会获取传入的router对象并对当前route做响应式处理，监听route变化，渲染对应的组件UI。同时将Vue-Router的生命周期钩子函数混入到Vue.config中。

在实例化Vue-Router时的mode参数控制路由的实现模式，在浏览器中实现路由的方式有三种：

* 利用url中hash（默认）：利用浏览器url中#后面的hash值变化，不会引起页面刷新的特性，同时监听hashchange事件，实现单页面跳转。
* 利用H5中的history：利用H5的新特性history栈的pushState、replaceState改变URL，同样不会引起刷新，但是会更新浏览器的历史记录，监听popstate事件，实现单页面跳转。
* abstract模式：用的较少，node环境或weex中会用到。

hash模式和history模式的区别：

* pushState设置的新url是可以与当前url同源的任意url，而hash只可修改#后的部分
* pushState设置的新url可以与当前url相同，并且也会添加记录到栈中，而hash设置相同的值不会添加到记录栈中
* pushState可以通过stateObject添加任意类型的数据到记录中，而hash只能使用字符串
* history模式需要服务器支持，把所以路由重定向到根页面，url上不会有#，hash模式url上有#号

# 如何批量引入组件

* 借助webpack的require.context函数获取一个特定的上下文
* 暴露一个根文件，根文件中引入并注册所有需要的组件

# Vue实现对数组的响应式

由于`Object.defineProperty()`只能监听数组本身，而不能劫持数组中的内部元素，所以Vue不能检测以下数组的变动：

* 通过索引直接设置数据项
* 数据长度变化

Vue在初始化遍历data通过Object.defineProterty()进行数据劫持时，会判断数组类型，当data中有数组类型并且具有原型对象时，调用`protoAugment(value, arrayMethods)`改变数组的`__proto__` 使其指向Vue实现的变异数组

变异数组的实现：功能扩展、数组劫持

```javascript
const arrayProto = Array.prototype
const newArray = Object.create(arrayProto)

const methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']

methodsToPatch.forEach((method) => {
  const originalMethod = arrayProto[method]
  Object.defineProperty(newArray, method, {
    value: (...args) => {
    	const res = originalMethod.apply(this, args)
      const ob = this.__ob__
    	let inserted
    	switch(method) {
      	case 'unshift':
      	case 'push':
        	inserted = args
        	break
      	case 'splice':
        	inserted = args.slice(2)
        	break
    	}
      // 获取数组要执行劫持的参数项
    	if(inserted) {
        // 重新实现响应式绑定
      	ob.observeArray(inserted)
    	}
      // 通过监听队列更新
    	ob.dep.notify()
    	return res
  	},
    enumerable: true,
    writable: true,
    configurable: true
  })
})

export newArray
```

# Vue-loader原理及template编译过程

* Vue-loader执行原理：
  * Vue-loader允许一种名为单文件组件的格式（SFC）来撰写Vue组件
  * Vue-loader处理过后的模块是一个JS对象，包括render方法，createElement方法
  * Vue-loader对Vue组件文件里的每个代码块（例如：template、script、style）都采取不同的loader来进行处理，Webpack中可以设置相应的loader来处理这些代码块
  * Vue-loader在执行中包含两部分：Vue-loader-plugin和Vue-loader
    * Vue-loader-plugin作用：Webpack在实例化compiler对象之后，会依次执行所有plugin的apply方法，apply做了三件事情：
      * 事件监听：监听normalModuleLoader钩子函数，标记loaderContext[NS] = true
      * 格式化rules：将Webpack中配置的rules使用new RuleSet格式化，并clone一份用于Vue文件的代码解析
      * 自定义rules：在rules加入Vue-loader内部提供的rules，pitcher-rule对应pitcher-loader
    * Vue-loader作用：Webpack分析到依赖的Vue组件文件时，会匹配到对应的loader，去执行Vue-loader的逻辑
      * 解析.Vue文件生成descriptor：对.vue文件进行parse生成descriptor（代码块：template、script等），根据descriptor生成资源请求路径（例如：`import { render, staticRenderFns } from "./source.vue?vue&type=template&id=27e4e96e&scoped=true&lang=pug&"`），对template的解析默认使用vue-template-compiler来解析成JS代码的
      * 执行pitch函数自定义资源请求：执行pitcher-loader更新资源请求路径，跳过不必要的loader
      * 依次执行配置的loader：将新的资源请求路径交给Webpack依赖解析，根据资源请求上的loader顺序，执行对应的loader。template是有template-loader来处理的，JS代码交给babel-loader，CSS交给css-loader
* Vue中template模版的编译过程（vue-template-compiler）：将模版转换成render函数的过程，称之为Vue的编译过程。Vue提供两个版本代码，一个是Runtime+Compiler的，一个是Runtime Only的，前者会在运行时来执行编译过程，后者不包含编译代码，需要借助Webpack的Vue-loader来静态编译（生产环境多采用后者，减少代码体积大小）。编译过程涉及以下4个方面：
  * 编译入口：在包含编译代码的Vue中，Vue会在$mount函数中执行`compileToFunctions`来执行编译操作。为了区分各个平台的编译过程，Vue使用函数柯里化的技巧实现了`baseOptions`的参数保留，并通过`createCompilerCreator(baseCompile)`把基础的编译过程函数抽离来实现都平台编译（weex）
  * parse：将template模版字符串转换成AST语法树（while循环模版字符串），整个parse过程利用正则表达式（simplehtmlparser提供基础支持），当解析开始标签、闭合标签、文本的时候都会去执行对应的回调函数来生成AST语法树，创建步骤如下：
    * 创建AST元素：根据元素类型调用`createASTElement`创建AST对象
    * 处理AST元素：处理AST对象中的各种指令（v-if、v-for等）
    * 管理AST树：建立树级结构，生成AST树
  * optimize：`markStatic(root)` 标记静态节点，`markStaticRoots(root, false)` 标记静态根。深度遍历整个AST语法树，标记静态节点，使其不被重复渲染
  * codegen：将优化后的的AST语法树生成可执行的代码，将拼接的方法字符串调用`new Function()`生成render函数。render函数中利用方法名简写对应各个生成VNode的方法，例如：`_c` 就是执行 `createElement` 去创建 VNode；`_l` 对应 `renderList` 渲染列表；`_v` 对应 `createTextVNode` 创建文本 VNode；`_e` 对应 `createEmptyVNode`创建空的 VNode

