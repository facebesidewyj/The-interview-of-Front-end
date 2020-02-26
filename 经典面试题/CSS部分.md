# CSS 选择器有哪些

1. 通用选择器：\*
2. id 选择器：#id 值
3. 类选择器：.class 名称
4. 后代选择器：空格
5. 子选择器：>
6. 兄弟选择器：～
7. 直接兄弟选择器：+
8. 伪类选择器：:nth-child(n), 选取前三个::nth-child(-n+3)：选取小于等于 3 的元素索引

# CSS 雪碧图优缺点

优点：减少请求次数。提高压缩比，减少资源大小。

缺点：图片合并麻烦。维护麻烦。

# 描述一下 CSS 的优先级规则

优先级：内联样式>内部样式>外部样式

# 怎么让偶数的 li 标签内的字体变成红色

```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
```

答案：

```css
ul li:nth-child(even) {
  background-color: red;
}
```

# display:none 与 visibility:hidden 的区别

1. display:none：非继承属性，元素消失不占空间，产生重绘重排。
2. visibility:hidden：继承属性，元素消失继续占据空间，只能造成重绘。

visibility 的 collapse 属性：用在非表格元素上将与 display:none 效果一样，但用在表格元素上，元素消失，担任然占据空间。

# CSS 外部引用之 link 与@import 的区别

1. link 是 html 提供的标签，@import 是 css 提供的语法
2. link 标签在页面被加载的时候，css 也在加载，而@import 是在页面加载完成后再加载 css。
3. 兼容性的区别。
4. link 标签 支持 dom 去改变样式。

# CSS 伪元素和伪类

伪类：

1. :required 选中具有 required 属性的元素
2. :optional 选中不具有 require 属性的元素
3. :valid 通过验证规则时触发
4. :invalid 没通过验证规则时触发

伪元素:

1. ::after 创建一个伪元素，作为以选中元素的最后一个子元素
2. ::before 创建一个伪元素，作为以选中元素的第一个子元素
3. ::first-letter 选中块级元素的第一行第一个字母
4. ::first-line 选择块级元素的第一行
5. ::selection 应用于被用户选取高亮的内容部分

# CSS 有哪些继承属性

1. 关于文字属性
2. line-height
3. color
4. visibility
5. cursor

# 写出 position 的所有属性和他们的作用

position 的属性及其作用：

* absolute：绝对定位，相对于 static 定位以外的第一个父元素进行定位
* fixed：根据浏览器窗口进行绝对定位
* relative：相对自身的位置进行定位
* static：默认值，没有定位
* inherit：从父元素继承定位属性值

# position 跟 display、margin collapse、overflow、float 这些特性相互叠加后会怎么样

如果元素的 display 为 none，那么元素不被渲染，position,float 不起作用。

如果元素拥有 position:absolute;或者 position:fixed;属性那么元素将为绝对定位，float 不起作用。

如果元素 float 属性不是 none，元素会脱离文档流，根据 float 属性值来显示。

设置浮动和绝对定位的行内块的元素，margin 不会和垂直方向上的其他元素 margin 折叠。

# 什么是 FOUC？如何避免

Flash Of Unstyle Content：页面闪烁，样式表加载问题。

解决：将样式表放到 head 标签里

# rem px pt em (区别)

1. px 与 pt

   px 指的是像素，是屏幕上显示数据的最基本点，表示相对大小。pt 则是印刷行业常用元素，一般用于打印样式设置。

2. em 与 rem

   em 是相对长度单位，相当于当前对象的字体尺寸，基于父元素的 font-size 来计算的。rem 也是相对长度单位，只不过是基于 html 的 font-size 来计算的（默认 html 元素的字体大小为 16px）。

# ::after 和:after 的区别

单冒号用于 CSS3 伪类，双冒号用于 CSS3 伪元素。新的 CSS3 中引入的伪元素不支持单冒号的写法。

::after 是伪元素，css3 明确伪元素使用双冒号

:after 是伪类

# 一个 div 实现的红绿灯（手写 CSS）

```
// div
<div class="traffic-light"></div>

// css
.traffic-light {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #000;
    animation-name: trafficlight;
    animation-duration: 10s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

@keyframes trafficlight {
    0% {
        background-color: red;
    }
    40% {
        background-color: red;
    }
    41% {
        background-color: yellow
    }
    59% {
        background-color: yellow
    }
    60% {
        background-color: green
    }
    100% {
        background-color: green
    }
}
```

# 写出一个 div 元素 1s 内从 left:0 过渡到 left:500px

```
// div
<div></div>

// css
.traffic-light {
    position: relative
    width: 50px;
    height: 50px;
    animation: move 1s linear;
}

@keyframes move{
	from{left: 0;}
	to{left: 500px;}
}
```

# 左右布局，左边定宽，右边自适应，不少于 3 中方法

1. float 布局：左边左浮定宽，右边设置 BFC 不设置宽度。
2. flex：左边定宽，右边 flex 设为 1
3. table：设为 table-cell，左边定宽，右边不定宽。
4. absolute+padding：左边绝对定位，父元素 padding-left 设为左边元素宽度

# CSS3 用过哪些新属性

border-radius 圆角

box-shadow text-shadow 文本和框的阴影

box-sizing 盒模型设置

flex 布局

transition 过渡

# BFC 和 IFC

1. BFC：块级格式化上下文
2. IFC：内联格式化上下文，行内盒子模型

# 对栅格的理解

以规则的网格阵列来进行页面排版布局，便于维护和开发。

# 居中的几种方案

1. 水平居中

   * 父元素设置`text-align:center`，子元素设置`display:inline-block`
   * 元素设置`display:table;margin:0 auto`
   * 元素设置`position:absolute; left:50%; transform:translateX(-50%);`
   * 父元素设置`display:flex;justify-content:center;`，子元素设置`margin:0 auto`

2. 垂直居中

   * 父元素设置`display:table-cell;vertical-align:middle`
   * 元素设置`position:absolute; top:50%; transform:translateY(-50%);`
   * 元素设置`display:flex;align-items:center`

3. 水平垂直居中

   * 父元素设置`text-align:center;display:table-cell;vertical-align:middle`，子元素设置`display:inline-block`
   * 元素设置`position:absolute; top:50%; left:50%; transform:translate3d(-50%, -50%, 0);`
   * 元素设置`display:flex;justify-content:center;align-items:center`

# 1 像素边框的问题

伪类+缩放实现：通过@media 媒体查询，查询当前屏幕的设备像素比，根据设备像素比来进行缩放`transform: scaleY(系数)`。

# 修改 chrome 自动填充密码的样式

1. 覆盖 chrome 的私有属性 input : -webkit-autofill
2. div 覆盖

# 用纯 CSS 创建一个三角形的原理是什么？

```css
// 把上、左、右三条边隐藏掉（颜色设为 transparent）
#demo {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
```
# 用纯 CSS 创建一个加号

```css
div {
    width: 150px;
    height: 150px;
}

div::before {
    position: absolute;
    background-color: red;
    content: "";
    width: 150px;
    height: 50px;
    top: 50px;
}

div::after {
    position: absolute;
    background-color: red;
    content: "";
    width: 50px;
    height: 150px;
    left: 50px;
}
```

# css 多列等高如何实现

父元素设置 overflow:hidden。

子元素利用 padding-bottom 和 margin-bottom 正负值相抵实现。

# li 与 li 或行内块元素之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

空白字符，将父元素的 font-size 设为 0 即可。

# CSS 优化、提高性能的方法有哪些？

1. 提取共有样式，增强复用性，按模块编写组件
2. 使用构架和压缩工具

# 设置元素浮动后，该元素的 display 值是多少

display:block

# 怎么让 Chrome 支持小于 12px 的文字

可以将小于 12px 的文字做成图片

# 让页面里的字体变清晰，变细用 CSS 怎么做

-webkit-font-smoothing: antialiased;

# font-style 属性可以让它赋值为“oblique” oblique 是什么意思

文字斜体

# 如果需要手动写动画，你认为最小时间间隔是多久，为什么？

多数显示器默认频率是 60Hz，即 1 秒刷新 60 次，所以理论上最小间隔为 1/60＊1000ms ＝ 16.7ms

# 什么是 CSS 预处理器 / 后处理器

预处理器例如：LESS、Sass、Stylus，用来预编译 Sass 或 less，增强了 css 代码的复用性，还有层级、mixin、变量、循环、函数等，具有很方便的 UI 组件模块化开发能力，极大的提高工作效率。

后处理器例如：PostCSS，通常被视为在完成的样式表中根据 CSS 规范处理 CSS，让其更有效；目前最常做的是给 CSS 属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。
