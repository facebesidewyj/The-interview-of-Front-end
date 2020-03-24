# PWA介绍

* 什么是PWA：

  PWA是Progressive Web Applications，被称为渐进式网络应用。PWA不是特指一种技术，而是应用多项技术来改善用户体验的Web App。其核心包括：Web App Manifest、Service Worker、Web Push等，解决用户体验是PWA被提出的核心。

* PWA的特性：
  * 渐进式：适用所有浏览器
  * 类原生应用：可以给用户提供类原生的体验
  * 持续更新：不涉及版本问题
  * 安全性：必须使用HTTPS协议提供服务
  * 可安装：可以被用户添加到桌面
  * 可索引：可被搜索爬虫索引到，标记为应用
* PWA的核心技术：
  * Web App Manifest：manifest.json文件，配置了应用的名称、图标、主路径地址、主题颜色等，具有manifest.json文件的系统会被系统收录。
  * Service Worker：PWA应用的核心，用来实现离线和缓存
    * 独立于网页的线程
    * 不能操作DOM
    * 可以操作本地缓存
    * 可以实现离线化推送
    * 一旦被安装，就永远存在
    * 必须是HTTPS的服务
  * Web Push：借助Service Worker和Notification Api实现推送通知
  * 骨架屏：提升用户首屏体验

# Service Worker 工作原理

Service Worker是一个独立于主线程的工作线程，一旦安装就会永久存在，具有不可逆性，并且具有自己独立的上下文context。Service Worker的工作原理主要体现在它的生命周期上。

* 生命周期

  * 注册：navigator.serviceWorker.register实现注册，注册之前为了防止作用域污染，先注销之前已经生效的Service Worker
  * 安装：一旦安装就会永久存在，调用install事件，self.addEventListener('install', () => {})
  * 激活：activate事件，self.addEventListener('activate', () => {})
  * 拦截请求：fetch事件，可以控制当前作用域下页面的请求资源
  * 结束：被更新或者注销

  