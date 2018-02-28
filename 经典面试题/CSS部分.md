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

# 什么是 FOUC？如何避免

Flash Of Unstyle Content：页面闪烁，样式表加载问题。

解决：将样式表放到 head 标签里

# 块级元素、行内元素和行内置换元素

块级元素： div、p、form、等

行内元素 IFC：span、i、em、strong

行内置换元素：内容不受 CSS 视觉格式化模型控制，元素本身拥有固定尺寸的元素，例如：img，input，button，select，textarea。

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
