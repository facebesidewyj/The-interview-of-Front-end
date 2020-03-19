# 谈谈你对 MVVM 的认识？

注意事项：

1. 聊聊 MVC，彰显知识面涉猎较多

Model,View,Controler

2. 把 MVVM 定义说清楚

Model(服务器中的数据实体),View(视图),ViewModel(核心枢纽 Vue.js)

3. 对比 MVVM 和 MVC

MVC 是单向通信。

MVVM 采用双向绑定，View 的变动自动反应在 ViewModel，反之亦然。

# Vue内部运行机制

* 初始化及挂载：初始化分三步：
  * new Vue()之后会调用_init()函数初始化，初始化生命周期、事件、props、computed、watch等。
  * 遍历data通过Object.defineProterty()设置Getter和Setter函数来完成**双向绑定**和**依赖收集**。
  * 执行$mount来挂载组件
* 编译：挂载组件需要进行编译，这里分三步：
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
  * descriptor：对象描述符，常用描述属性如下：
    * enumerable：属性是否可枚举，默认false
    * configurable：属性是否可被修改或删除，默认为false
    * get：获取属性触发的函数
    * set：设置属性触发的函数

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

# Vue中的依赖收集

依赖收集主要收集当前响应式对象的依赖关系，在对象变化时通知所有被依赖的目标执行相应的操作

Vue中的依赖收集有Dep订阅者这个类来实现的，它的主要作用是用来存放Watcher观察者对象的。

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

# computed与watch区别

* computed是计算属性，依赖其他data中的其他数据得出计算的值，并且具有缓存，只有当计算的值变化时才会返回
* watch是监听到值的变化就会返回，在回调中执行一些逻辑操作，比如请求接口等

> computed和watch都支持对象写法，扩展更多功能

# 使用了什么设计模式？

注意事项：

1. 观察者设计模式原理掌握
2. 最好能写出设计模式的伪代码
3. 如果没有问道设计模式，也要找时机表现出来

需要有一个监听者 Observer 也就是 Object.defineProperty()来监听数据的变化，当数据变化时，监听者会通知所有观察者列表，也就是执行 set 函数中观察者的更新操作，在更新的过程中，会把数据更新到 view 中。

观察者模式与发布-订阅模式的区别：

* 主体思想一致
* 观察者模式中，通常观察者和被观察者知道双方的存在，并在发生变化后主动通知
* 发布-订阅模式中，发布者和订阅者不知道双方的存在，通过中间事件队列来处理，订阅者属于被动通知

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

注意事项：

1. 熟记对应的几个节点
2. 熟记每个节点的触发的时机
3. 最好演练下

new Vue()对象的过程中，首先执行 init 操作，也就是编译过程，这时有两个钩子函数 beforeCreate()和 created()。

可以对 DOM 进行访问的钩子函数：mounted()。

在生成 DOM 之前访问的钩子函数：beforeMounted()。

数据进行变化之前的钩子函数：beforeUpdate()。

数据变化之后的钩子函数：update()。

对象销毁之前的钩子函数：beforeDestroy()。

销毁的钩子函数：destroyed()。

beforecreate : 举个栗子：可以在这加个 loading 事件

created ：在这结束 loading，还做一些初始化，实现函数自执行

mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情

beforeDestory： 你确认删除 XX 吗？ destoryed ：当前组件已被删除，清空相关内容

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

本质上，Vue的data变化时会调用nextTick函数，并把Watcher的update函数当成回调函数传入nextTick函数，nextTick创建了一个异步任务（优先微任务），在调用栈执行完毕后，批量执行被传入的回调函数。所以当我们在使用`this.$nexxTick(()=>{// TODO})`时，并不会立即执行，而是传入了一个回调函数，在调用栈执行完毕后（宏任务），再去触发。

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

实例化VueRouter时的mode参数控制路由的实现模式，在浏览器中实现路由的方式有三种：

* 利用url中hash（默认）：利用浏览器url中#后面的hash值变化，不会引起页面刷新的特性，同时监听hashchange事件，实现单页面跳转。
* 利用H5中的history：利用H5的新特性history栈的pushState、replaceState和监听popstate事件，实现单页面跳转。
* abstract模式：用的较少，node环境或weex中会用到。

hash模式和history模式的区别：

* pushState设置的新url是可以与当前url同源的任意url，而hash只可修改#后的部分
* pushState设置的新url可以与当前url相同，并且也会添加记录到栈中，而hash设置相同的值不会添加到记录栈中
* pushState可以通过stateObject添加任意类型的数据到记录中，而hash只能使用字符串