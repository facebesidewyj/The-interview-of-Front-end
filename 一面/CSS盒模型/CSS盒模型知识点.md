# CSS 盒模型有几种。

两种：第一种为 W3C 标准盒模型，第二种为 IE 传统盒模型。

# 标准模型和 IE 模型的区别

标准盒模型总宽度=margin+boder+padding+width。

IE 盒模型总宽度=margin+width。

区别只是 width 属性的计算。

1. W3C 标准盒模型的 width 属性只是 content 的宽度。
2. IE 盒模型的 width 属性包括 padding 和 border 的宽度。

# CSS 如何设置这两种模型

box-sizing 属性，属性值为 border-box 为 IE 盒模型，属性值为 content-box 为 W3C 标准盒模型，属性值为 inherit 将继承父盒子的值

# JS 如何获取盒模型对应的宽和高

1. 获取内联样式的宽和高：Element.style.width; Element.style.height;
2. 获取渲染完成之后的宽和高：Element.currentStyle.width; Element.currentStyle.height;（只有 IE 支持）
3. 获取计算后的宽和高（与上述一样，兼容性高）：window.getComputedStyle(Element).width; window.getComputedStyle(Element).height;
4. 获取元素相对于视口的位置，来计算出高度：Element.getBoundingClientRect();该方法返回一个对象，包含一组矩形集合。
5. 返回元素的可见宽度和高度，包括 padding 和 border：Element.offsetWidth;Element.offsetHeight;

# offsetTop和scrollTop和scrollHeight分别代表什么

* offsetTop：只读属性，返回当前元素距离其父元素顶部内边距距离的位置
* scrollTop：可以获取或设置一个元素在垂直方向上的滚动像素
* scrollHeight：只读属性，表示一个元素生成的可滚动高度

>  这些值获取时需要时时计算，会引起重排

# 根据盒模型解释边距重叠概念

两个或多个盒子的垂直相邻边界会发生重合，形成单一边界的情况。

# 什么是块级格式化上下文

Block Formatting Context 边距重叠解决方案

# 块级格式化上下文的原理

1. 浮动盒子的区域不会与 BFC 发生重叠
2. 计算 BFC 高度时，是计算内部所有元素的高度，包括内部的浮动元素的高度。
3. BFC 在页面上是一个独立的容器，里面的子元素并不会影响到外面的元素。外面的元素也不会影响到 BFC 里面的子元素。
4. 同一个 BFC 中的元素相互影响，会发生边距重叠。

# 如何创建块级格式化上下文

1. float 属性值不为 none。
2. position 属性值为 absolute 或 fixed
3. display 属性值为 inline-block、table-cell、inline-flex。
4. overflow 属性值不为 visible
5. fieldset 元素

# 块级格式化上下文的使用场景

1. 自适应两栏布局
2. 清除浮动
3. 防止垂直 margin 重叠

# CSS 层叠上下文

* 层叠上下文：我们可以理解为一个元素含有层叠上下文，我们就认为这个元素在 Z 轴上“高人一等”。
  
  > Z 轴指的是用户与浏览器屏幕之间一条看不见的垂直线
  
* 层叠水平：指在同一个层叠上下文中元素在 Z 轴上的显示顺序

* 层叠上下文的创建：
  * 默认创建：根元素 html
  * 配合 z-index 触发创建：
    *  z-index不为auto的绝对/相对/固定定位元素，会创建层叠上下文
    * 被flex布局嵌套的子元素，设置z-index会创建层叠上下文
  * 不需要配合z-index触发创建：
    * opacity小于1的元素
    * transform不为none的元素
    * perspective不为none的元素
    * 被filter修饰事元素
  
* 同一层叠上下文的层叠水平：正z-inde元素 > z-index为auto或z-inde为0或不依赖z-index的元素 > inline或inline-block元素 > float元素 > block元素 >  负 z-index元素 > background/border元素

* 比较两个dom的显示顺序：

  * 如果在相同层叠上下文中，按层叠水平来比较
  * 如果不在相同层叠上下文中，找到共同的祖先层叠上下文（有可能是html元素），再根据层叠水平比较

# 使用flex需要注意的点

* flex-grow：元素的放大比例，默认为0
* flex-shrink：元素的缩小比例，默认为1，空间不足将会等比缩小
* flex-basis：元素占主轴的空间，默认为auto
* order：定义元素的排列顺序，越小越靠前
* align-self：元素自身的对齐方式，可覆盖align-item属性

> flex属性是flex-grow、flex-shrink、flex-basis的缩写