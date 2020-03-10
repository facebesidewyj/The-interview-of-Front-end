# 了解 MVVM 框架吗？

注意事项：

1. 收住优点，攒着往下说，开启引导模式
2. 低调谨慎

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
  * 双向绑定：目的是通知订阅者Dep的subs队列中的每一个Watcher观察者来执行update。
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
* 在Getter函数中会把当前Watcher对象push到Dep的subs队列中
* 当需要更新视图，也就是Setter函数被触发时，会执行Dep类中的notify方法，执行所有Watcher的update方法更新视图

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

# 有看过源码吗？

Observer 的角色：new Vue()实例时，调用了 Observer，遍历所有的 data 数据，并且使用 Object.defineProperty()拦截每个数据，当读取数据时，判断是否为数据添加观察者；当数据变化时通知观察者。

Observer 调用完之后要实例化 Watcher，Watcher 会调一下 get 函数，get 函数检测到 watcher 对象有值，就会把 watcher 放到观察者列表。

在编译时，将真实的 DOM 转移到 Fragment（DOM 片段）对象上，通过 complie 对指令的识别，并生成指令描述对象，来进行相应的处理。

# VNode解析

# template模版的编译过程

# diff算法执行过程

# nextTick原理

# Vuex的工作原理

