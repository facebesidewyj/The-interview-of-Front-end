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

# 双向绑定是什么原理，可以写出来吗？

通过 Object.defineProperty()来实现数据劫持，并重写 get 和 set 方法，来实现数据双向绑定。 注意事项：

1. object.defineProperty 的用法熟记 object.defineProperty(obj, prop, descriptor)


```javascript
var Book = {};
var name = '';
Object.defineProperty(Book, 'name', {
   set: function(value) {
 name = value
   }
   get: function() {
 return name;
   }
});
```

2. object.defineProperty 与 reflect.defineProperty 的区别

Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而 Reflect.defineProperty(obj, name, desc)则会返回 false。

3. object.defineProperty 要会手写

# 使用了什么设计模式？

注意事项：

1. 观察者设计模式原理掌握
2. 最好能写出设计模式的伪代码
3. 如果没有问道设计模式，也要找时机表现出来

需要有一个监听者 Observer 也就是 Object.defineProperty()来监听数据的变化，当数据变化时，监听者会通知所有观察者列表，也就是执行 set 函数中观察者的更新操作，在更新的过程中，会把数据更新到 view 中。

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

在编译时，将真实的 DOM 转移到 Fragment（DOM 片段）上，通过 complie 对指令的识别，并生成指令描述对象，来进行相应的处理。
