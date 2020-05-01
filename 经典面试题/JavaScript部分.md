# javascript 代码中的"use strict";是什么意思 ?

严格模式：规范化 JS 代码，提高编译效率，为新版本的 JS 标准做铺垫。

# 模块化开发怎么做？

立即执行函数，不暴露私有成员：

```javascript
var module = (function() {
  var _name = 'jack';
  var m1 = function() {
    console.log(1);
  };
  var m2 = function() {
    console.log(2);
  };
  return {
    m1: m1,
    m2: m2
  };
})();
```

# documen.write 和 innerHTML 的区别

document.write 只能重绘整个页面

innerHTML 可以重绘页面的一部分

# Set 和 Map 结构

Set：类似数组，成员值是唯一的，不可重复。

Map：类似对象，键值对进行存储。

# ==运算符判断相等的流程是怎样的

1. 如果两个值类型相同，按照===进行比较。
2. 如果一个是 null，一个是 undefined，则他们相等。
3. 如果两个值类型不同则将其转换为数字类型进行比较。

# 事件委托

利用事件冒泡和事件触发对象 event.target 来绑定事件

# 手写 parseInt 的实现

```
function parseInt(str) {
  // 隐式类型转换
  return str / 1;
}
```

# [1,2,3].map(parseInt) 输出什么

答案：`[1, NaN, NaN]`

解释：map 的回调函数自动传入三个参数：当前值，索引和目标数组，parseInt 在没有传入指定参数的情况下，会自动接收三个参数，所以代码就会变成如下形式：

```javascript
parseInt(1, 0, [1, 2, 3]);
parseInt(2, 1, [1, 2, 3]);
parseInt(3, 2, [1, 2, 3]);
```

由于 parseInt 只能接收两个参数：要转换的值和进制数，所以[1,2,3]被忽略，parseInt 方法中没有指定基数/基数为 0 时有三种情况：

1. 第一个参数以'0x'或'0X'开头，以 16 进制解析。
2. 第一个参数以 0 开头，ES5 中规定以 10 进制解析。
3. 其他情况，以十进制解析。

当进制数为 1 或大于 36 时，解析为 NaN。进制数在 2 到 36 之间时，第一个参数不属于该进制下的数，则解析为 NaN。所以依次输出 1，NaN，NaN。

# JS 命名空间

1. js 并不提供原生命名空间的支持
2. 通过对象字面量来模拟命名空间
3. 通过闭包实现命名空间

# 默认不冒泡的事件

focus、load、resize 等还有 media 相关事件，都不冒泡

# arguments 和数组有什么区别

arguments：类数组类型为 Object，利用键值对获取属性

数组：数组类型为 Array，从 Array.prototype 继承了一些方法，自动更新 length 属性。利用索引获取数据。

# 以下代码输出什么？

```javascript
var arr = 'ABB';
if (2 > 1) {
  arr = 'BCC';
  let arr;
  console.log(arr);
}
```

答案：undefined

解释：js 中没有块级作用域，let 绑定不受变量提升的约束，这意味着 let 声明不会被提升到当前，let arr 重新定义了，该变量处于从块开始到初始化处理的“暂存死区，所以为 undefined。

# 以下代码输出什么？

```javascript
if (!('a' in window)) {
  var a = 1;
}
alert(a);
```

答案：undefined

解释：因为 js 没有块级作用域，JavaScript 引擎在执行的时候，会把所有变量的声明都提升到当前作用域的最前面，所以代码进行顺序应该为：

```javascript
var a;

// a已经定义了
if (!('a' in window)) {
  a = 1;
}
alert(a);
```

# 以下代码输出什么？

```javascript
function valueof() {
  return 1;
}
var valueof;
alert(typeof valueof);
```

答案：function

解释：函数声明会优先变量提升，但函数表达式不会提升，如果一个变量的名字与函数的名字相同，那么函数的名字会覆盖变量的名字。

# 以下代码输出什么？

```javascript
var bb = 1;
function aa(bb) {
  bb = 2;
  alert(bb);
}
aa(bb);
alert(bb);
```

答案：2 和 1

解释：函数中的 bb 被当作参数来使用，所以 bb=2 只是改变参数值，并不被当作全局变量来对待。

# 以下代码输出什么？

```javascript
function A() {}

function B(a) {
  this.a = a;
}

function C(a) {
  if (a) {
    this.a = a;
  }
}
A.prototype.a = 1;
B.prototype.a = 1;
C.prototype.a = 1;
console.log(new A().a);
console.log(new B().a);
console.log(new C(2).a);
```

答案：1 undefined 2

解释：

1. 对象 A 中没有私有属性 a，所以直接取 A 对象原型上的值。
2. 对象 B 中有私有属性 a，但传入的参数为 undefined，所以输出 undefined。
3. 对象 C 也有私有属性 a，并且对传入的参数做了判断，如果有参数则创建私有属性 a，没有参数就取 C 对象原型上的 a。

# 以下代码输出什么？

```javascript
function Developer() {} 
console.log(Object instanceof Function)
console.log(Function instanceof Object)
console.log(Object instanceof Object)
console.log(Function instanceof Function) 
console.log(Developer instanceof Function) 
console.log(Developer instanceof Developer)
```

答案：true true true true true false

解释：

1. Object、Function、Array这些都是构造函数Function的实例
2. Function的原型对象为Object
3. 所有的对象都是Object的实例