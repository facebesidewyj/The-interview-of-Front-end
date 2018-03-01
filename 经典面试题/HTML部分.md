# 前端要注意哪些 SEO

1. 合理的 title，description，keywords。
2. 语义化 HTML 代码。
3. 重要内容不用 JS 输出。
4. 尽量避免 iframe。
5. 提高加载速度。
6. 非装饰性图片必须加上 alt。

# web 开发中会话跟踪的方法有哪些

1. cookie
2. session
3. url 重写
4. ip 地址

# img 标签的 alt 和 title 区别

1. title：全局属性之一，其解释作用，鼠标浮于元素上方会显示。
2. alt：img 标签特有属性，是图片内容的等价描述，图片无法加载时显示，有利于 SEO。

# 写出 form 的属性和属性分别的作用

form 标签为用户创建表单，是块级元素。

form 标签的属性及作用：

* accept-charset： 规定服务器可处理的表单字符集
* action：规定表单向何处发送数据
* autocomplete：是否启用表单自动完成功能，浏览器基于之前输入过的值进行提示
* enctype：规定表单在发送数据之前如何对其进行编码
* method：规定用于发送 form-data 的 HTTP 方法（get 或 post 等等）
* name：表单名称
* novalidate：不对表单进行验
* target：规定在何处打开 action URL

# input 的属性和作用

在 HTML 中，input 标签没有结束标签。

input 的常用属性及作用：

* value：规定 input 标签的值
* type：规定 input 标签的类型
* readonly：规定标签为只读
* required：指定输入字段的值是必须的
* name：名称
* maxLength：规定字符输入的最大长度
* disabled: 禁用标签
* checked：首次加载时选中标签
* pattern：使用正则规定输入字段的规则
* placeholder：帮助输入的提示字段

# HTML 的全局属性有哪些

1. title：元素解释信息
2. class：类标识
3. id：元素 id，唯一标识
4. style：行内样式
5. data-\*：自定义属性
6. lang：元素内容的语言

# HTML 语义化好处

1. 代码可读性，维护性
2. 利于 SEO
3. 支持屏幕阅读器（方便阅读障碍的人）
4. 页面结构清晰

# 块级元素、行内元素和行内置换元素

块级元素： div、p、form、h1-6 等

行内元素 IFC：span、i、em、strong

行内置换元素：内容不受 CSS 视觉格式化模型控制，元素本身拥有固定尺寸的元素，例如：img，input，button，select，textarea。

空元素：br、hr、link、meta

# HTTP 请求报文结构

1. 请求行：请求方法、URI、协议
2. 请求头：若干行请求头，包括 Host、User-Agent 等
3. 空行：标识下面要发送请求体了
4. 请求体：消息实体

# HTTP 响应报文结构

1. 响应行：HTTP 版本、状态码、状态描述
2. 响应头：若干行响应头，包括：Date、Server 等
3. 空行：标识下面要发送响应体了
4. 响应体：消息实体

# 什么是渐进增强

所有人都能访问 **页面基本功能和内容** 的同时为更高级浏览器提供更好的用户体验。

核心原则：

1. 语义化标签
2. CSS 增强布局
3. JS 兼容性

# label 标签作用

label 为 input 元素定义标注。

1. for 属性：绑定 input 标签的 id 属性值，点击 input 元素绑定的 label，input 将自动获得焦点。
2. accesskey 属性：规定访问这个控件的热键。

# 介绍一下你对浏览器内核的理解？

渲染引擎：HTML、图片、css 的显示和整理

JS 引擎：执行和解析 JS

# 常见的浏览器内核有哪些？

Trident 内核：IE、360

Webkit 内核：google、safari

Gecko 内核：firefox

# html5 有哪些新特性、移除了那些元素？如何处理 HTML5 新标签的浏览器兼容问题？

常用的一些：

1. API 层：

   * Web Socket：长连接协议

   * sessionStorage 和 localStorage 网络存储

   * canvas：动画和图形相关

2. 元素与属性

   * `<section>`章节标签，区段。
   * `<video>`和`<audio>`音频和视频标签。
   * `<footer>`和`<header>`底部和头部语义化标签。
   * `<datalist>`提醒用户输入，输入跟随标签。
   * `<nav>`导航标签。
   * `<audio><video>`音频和视频
   * `<email><date>`表单控件

3. 处理兼容性

   * document.createElement 生成标签并添加样式
   * 使用成熟的 H5 框架或模板

# HTML5 的离线储存怎么使用，工作原理能不能解释一下？

原理：HTML5 的离线存储是基于一个 **新建的.appcache 文件的缓存机制(不是存储技术)** ，通过这个文件上的解析清单离线存储资源，这些资源就会 **像 cookie 一样** 被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

使用：

1. 页面头部添加 mainfest 属性
2. 编写 cache.mainfest 文件
3. 离线时调用 window.applicationCache

# 请描述一下 cookies，sessionStorage 和 localStorage 的区别？

cookies:网站为了标识用户信息而存储在终端上的数据，大小不能超过 4kb，会在请求中传递到服务器。

sessionStorage:本地存储，大小不超过 5M，页面关闭后数据自动删除。

localStorage:本地存储，大小不超过 5M，页面关闭后数据保存，除非主动删除。

# iframe 有那些缺点？

缺点：阻塞页面、不利于 SEO、iframe 与主页面共享连接池。

解决：利用 JS 动态加载，动态给 iframe 设置 src。

# input 和 textarea 的区别

1. input：可以指定 type 属性来改变样式和行为，宽和高只能用 css 设定，不能换行输入。
2. textarea：可以输入多行文字，输入初始值需要用标签包裹，可以夹杂 html 代码，宽高除了用 css 指定之外，还可以用 rows 和 cols 指定。
3. 相同点：都可以使用 maxlength 和 minlength 等输入限制。

# 用一个 div 模拟 textarea 的实现

`<div contenteditable="true"></div>`

# 忽略页面中的电话号码

`<meta name="format-detection" content="telephone=no" />`

# webSocket 如何兼容低浏览器？

Adobe Flash Socket

ActiveX HTMLFile (IE)

基于 multipart 编码发送 XHR

基于长轮询的 XHR

# 页面可见性（Page Visibility API） 可以有哪些用途？

通过 visibilityState 的值检测页面当前是否可见，以及打开网页的时间等;
在页面被切换到其他后台进程的时候，自动暂停音乐或视频的播放；

# 实现不使用 border 画出 1px 高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果。

`<div style="height:1px;overflow:hidden;background:red"></div>`

# title 与 h1 的区别、b 与 strong 的区别、i 与 em 的区别

title:title 属性没有明确意义，只是个标题。

h1:表明层级信息的标题

b:展示强调的内容

strong:屏幕阅读器会加重语气

i:斜体

em:强调的文本
