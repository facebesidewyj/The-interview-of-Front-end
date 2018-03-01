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

# CSS 外部引用之 link 与@import 的区别

1. link 是 html 提供的标签，@import 是 css 提供的语法
2. link 标签在页面被加载的时候，css 也在加载，而@import 是在页面加载完成后再加载 css。
3. 兼容性的区别。
4. link 标签 支持 dom 去改变样式。

# CSS 伪元素和伪类

伪元素：

1. :required 选中具有 required 属性的元素
2. :optional 选中不具有 require 属性的元素
3. :valid 通过验证规则时触发
4. :invalid 没通过验证规则时触发

伪类:

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

# 什么是 FOUC？如何避免

Flash Of Unstyle Content：页面闪烁，样式表加载问题。

解决：将样式表放到 head 标签里

# rem px pt em (区别)

1. px 与 pt

   px 指的是像素，是屏幕上显示数据的最基本点，表示相对大小。pt 则是印刷行业常用元素，一般用于打印样式设置。

2. em 与 rem

   em 是相对长度单位，相当于当前对象的字体尺寸，基于父元素的 font-size 来计算的。rem 也是相对长度单位，只不过是基于 html 的 font-size 来计算的（默认 html 元素的字体大小为 16px）。

# ::after 和:after 的区别

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

# 水平居中的实现方式

1. center 标签
2. margin：`margin: 0 auto;`
3. 父元素设置 text-align:center，子元素实现居中。
4. table+margin:`display:table; margin: 0 auto`
5. 父元素设置 flex：`display:flex;justify-content:center;`子元素实现居中
6. absolute+负 margin
7. transform+relative:`position:relative;left:50%;transform:transateX(-50%);display:inline-block`

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
