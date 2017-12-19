# CSS盒模型有几种。

两种：第一种为W3C标准盒模型，第二种为IE传统盒模型。

# 标准模型和IE模型的区别

1. W3C标准盒模型的width属性只是content的宽度。
2. IE盒模型的width属性包括padding和border的宽度。

# CSS如何设置这两种模型

box-sizing属性，属性值为border-box为IE盒模型，属性值为content-box为W3C标准盒模型，属性值为inherit将继承父盒子的值

# JS如何获取盒模型对应的宽和高

1. 获取内联样式的宽和高：Element.style.width; Element.style.height;
2. 获取渲染完成之后的宽和高：Element.currentStyle.width; Element.currentStyle.height;（只有IE支持）
3. 获取计算后的宽和高（与上述一样，兼容性高）：window.getComputedStyle(Element).width; window.getComputedStyle(Element).height;
4. 获取元素相对于视口的位置，来计算出高度：Element.getBoundingClientRect();该方法返回一个对象，包含一组矩形集合。
5. 返回元素的可见宽度和高度，包括padding和border：Element.offsetWidth;Element.offsetHeight;

# 根据盒模型解释边距重叠概念

两个或多个盒子的垂直相邻边界会发生重合，形成单一边界的情况。

# 什么是块级格式化上下文

Block Formatting Context边距重叠解决方案

# 块级格式化上下文的原理

1. 浮动盒子的区域不会与BFC发生重叠
2. 计算BFC高度时，是计算内部所有元素的高度，包括内部的浮动元素的高度。
3. BFC在页面上是一个独立的容器，里面的子元素并不会影响到外面的元素。外面的元素也不会影响到BFC里面的子元素。
4. 同一个BFC中的元素相互影响，会发生边距重叠。

# 如何创建块级格式化上下文

1. float属性值不为none。
2. position属性值为absolute或fixed
3. display属性值为inline-block、table-cell、inline-flex。
4. overflow属性值不为visible
5. fieldset元素

# 块级格式化上下文的使用场景

1. 自适应两栏布局
2. 清除浮动
3. 防止垂直margin重叠
