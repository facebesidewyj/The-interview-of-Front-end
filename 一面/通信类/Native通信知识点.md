# JSBridge原理

* JSBridge介绍：JSBridge是用来给JavaScript提供调用Native功能的接口，它的核心是构建Natvie端和非Native端**双向消息通信通道**

* JSBridge的应用场景：

  * 基于Web UI的Hybrid构建方案，例如：微信浏览器
  * 基于非Web UI但业务逻辑基于JavaScript的构建方案，例如RN

  > 各端小程序的实现方案，是基于Web UI，但是为了优化体验，Web UI的渲染和JavaScript的执行是隔离开的，因此小程序的解决方案基于上面这两种之间。

* JSBridge的通信原理：

  * JavaScript调用Native接口：
    * Api注入：通过WebView提供的接口，向JavaScript的context(window)中注入对象或者方法，浏览器端通过window上的对象或者方法直接调用（postmessage方法）
    * URL Scheme解析：灵活性差，会创建请求耗时，但兼容低版本系统，属于降级方案
  * Natvie调用JavaScript方法：JavaScript方法必须在window对象上，Native通过WebView直接调用相应的api来执行JavaScript字符串代码。
  * JavaScript调用Native接口之后的回调函数执行方式：类似JSONP的回调机制，回调函数设置唯一标识（可以是对象的key或数组的索引），并把唯一标识传递给Native端，Native执行回调时把唯一标识透传回来由JavaScript端寻找对应的回调执行

* JSBridge如何引用：

  * Native端注入：注入时机需与JavaScript端协商一致，注入失败需要重试机制，版本可控
  * JavaScript端引用：注入时机可控，版本维护成本高