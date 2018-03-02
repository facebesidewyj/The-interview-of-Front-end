# 使用 MVVM 框架带来的好处

1. 数据驱动视图，减少 DOM
2. 组件化编程，便于维护，局部 css 和 js 避免全局混乱
3. 虚拟 DOM 提升性能
4. 路由控制

# vue 的路由怎么实现的

路由：直接找到与地址匹配的组件，并将其渲染出来。改变浏览器地址，但不请求服务器。

实现方式：地址中添加#来欺骗浏览器，地址的改变是在进行页面内导航。

# vue 的挂载怎么实现的 el 和 $mount 有啥区别

创建 Vue 实例的时候，Vue 的构造函数将自动运行`this._init`启动函数，启动函数最后一步执行`vm.$mount(vm.$options.el)`将实例挂载到 dom 上。

流程：html 字符串->render 函数->vnode->真实 dom 节点

el 与$mount 区别：当 Vue 实例中没有 el 属性时，则证明该实例还没挂载到 dom 上，如果要延迟挂载可以调用$mount 来进行手动挂载。

# vue router 与 location.href 的区别

vue router 是 hash 值改变，页面内跳转

location.href 是页面跳转，页面刷新

# React 与 Vue 的区别

相似之处：都使用了 Virtual Dom 将真实 Dom 转化成虚拟 Dom。都支持组件化。

区别：模板编写的区别，React 更适合大型项目，原生 APP 和 Web 端通吃。
