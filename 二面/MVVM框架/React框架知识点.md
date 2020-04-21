# React的生命周期

React v16版本引入了Fiber机制，Fiber本质上是一个虚拟堆栈帧（requestIdleCallback机制），新的调度器会按照优先级自由调度这些帧，从而将之前的同步渲染改成了异步渲染。 

对于异步渲染来说，分为reconciliation和commit

* reconciliation：可以打断，除了shouldComponentUpdate之外，不建议使用
  * componentWillMount：在render函数执行之前，组件挂载前的执行，已经过期，不推荐使用
  * componentWillReceiveProps：可使用getDerivedStateFromProps来替换，该函数会在初始化（render函数之前，constructor之后）和update（最先）时被调用
  * shouldComponentUpdate：组件update之前会被调用，返回true和false来控制是否更新DOM，默认返回true，update时在getDerivedStateFromProps函数之后，render函数之前执行
  * componentWillUpdate：可使用getSnapshotBeforeUpdate来替换，该函数会在update后DOM更新前被调用
* commit：不能打断，直至页面渲染完成
  * componentDidMount：组件挂载后（插入DOM树中），render函数之后执行，可以使用setState函数
  * componentDidUpdate：update时，在render函数之后执行，更新后立即被调用，可以使用setState函数，但是必须被条件语句包裹。
  * componentWillUnmount：组件移除时被调用，在组件销毁或卸载之前被触发，此时不应再调用setState函数

各阶段生命周期函数执行顺序：

* 挂载：组件被创建并插入DOM时
  * constructor：构造函数，如果不执行初始化state或绑定函数，则不需要实现构造函数
  * getDerivedStateFromProps：常用于动画，倒计时等组件，该函数需要返回一个对象来更新state，返回null则不更新state
  * render：组件中必须要实现的方法，保持render为纯函数，使组件更易于维护
  * componentDidMount：组件挂载之后调用，用于调用接口，添加订阅事件等
* 更新：
  * getDerivedStateFromProps
  * shouldComponentUpdate
  * render
  * getSnapshotBeforeUpdate：常用于处理页面滚动停留位置，聊天界面等，返回snapshot或null
  * componentDidUpdate：首次渲染不会调用，更新之后会立即调用，用于网络请求
* 销毁：
  * componentWillUnmount：清除定时器，订阅器等
* 错误处理：
  * getDerivedStateFromError：后代组件抛出错误时被调用，返回对象用于更新state，UI容错兜底处理
  * componentDidCatch：后代组件抛出错误时被调用，用于记录错误

# setState函数

* 每次执行setState时，都会触发render函数
* 在React的生命周期或事件处理函中执行setState，React会设置一个标志位，标志着当前setState操作是往任务队列里存放任务，当函数调用完毕时，再去批量处理任务队列，重置标识位。多次调用内部会合并成一次，保证每次调用都触发，需要传入第二个参数回调函数
* 对于setTimeout等函数中执行setState来说，超出了React的控制范围，React不再往任务队列中添加任务，而是强制同步更新
* 当setState的第一个参数时函数时，React会将其直接添加到任务队列，不会进行调用合并

# React组件通信

父子组件通信：props加回调函数的形式

兄弟组件通信：可以用父组件做中转

跨多级组件通信：16.3版本以上可以使用Context接口

任意组件通信：Redux或Event Bus

# React事件机制

React将事件统一绑定在了document上，并且冒泡到document上的事件也不是浏览器原生事件，而是React自己实现的合成事件，如果我们想取消事件冒泡的话，调用event.stopPropagation是无效的，应该调用event.preventDefault。

为什么要使用合成事件：

* 抹平了浏览器差异，实现跨平台
* 事件复用

# React与Vue的对比

相同点：

* 都是视图层框架，挂载id之后渲染html
* 都使用了VNode，template和render解析完成后都是createElement，都采用了异步更新
* 组件化思想
* 都支持服务端渲染，和对应的状态管理工具
* 社区优秀

不同点：

* 语法不同
* 数据机制不同，Vue基于Object.definedProperty实现响应式，React基于state状态机制
* 思想不同，Vue实现双向绑定，数据可变，React单向数据流，函数式编程
* Vue提供了大量友好的语法糖，写法自由度高，React更推崇all in js严谨一些，维护性高，工程化集成容易
* Vue开发门槛低，需要严格的开发规范去约束，React开发成本高，需要更多抽象思维