】React v16版本引入了Fiber机制，Fiber本质上是一个虚拟堆栈帧，新的调度器会按照优先级自由调度这些帧，从而将之前的同步渲染改成了异步渲染。 

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

* 异步更新，触发render函数
* 多次调用内部会合并成一次，保证每次调用都触发，需要传入第二个参数回调函数

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