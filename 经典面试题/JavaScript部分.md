# ==运算符判断相等的流程是怎样的

1. 如果两个值类型相同，按照===进行比较。
2. 如果一个是 null，一个是 undefined，则他们相等。
3. 如果两个值类型不同则将其转换为数字类型进行比较。

# 事件委托

利用事件冒泡和事件触发对象 event.target 来绑定事件

# 跨域问题，及解决方式

处于安全考虑，浏览器会限制脚本发起的跨域请求，例如 XMLHttpRequest 和 Fetch 遵循同源策略。

同源策略限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互，这是一个用于隔离潜在恶意文件的安全机制。

解决方式：

1. JSONP：利用加载 JS 文件不需要遵循同源策略限制的原理
2. CORS：在服务端返回允许跨域的访问头。
3. WebSocket：WebSocket 不遵循同源策略限制。

# JSONP 原理

JSONP 原理是加载一个 script，并执行一段回调 JS 来获取请求到的数据。

缺点：

1. 无法发送特定的请求头
2. 只能是 get 请求
3. 无法发送 body

# 手写 parseInt 的实现

```
function parseInt(str) {
  // 隐式类型转换
  return str / 1;
}
```

# es6 新增里哪些新功能

箭头函数、模块化、类的声明、reflect、块级作用域、promise 实现

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

# 手写 Jquery 插件

闭包+继承

伪代码:

```javascript
(function($) {
  $.fn.extend({
    pluginName: function(arguments) {
      // 逻辑
    }
  });
})(jQuery);
```

# 数组去重

```javascript
var arr = [1, 1, 1, 2, 2, 3, 3, 4, 45, 5];
var newArr = arr.filter((item, index, arr) => {
  return arr.indexOf(item) === index;
});
```

# JS 命名空间

1. js 并不提供原生命名空间的支持
2. 通过对象字面量来模拟命名空间
3. 通过闭包实现命名空间

# 0.1 + 0.2

不等于 0.3，等于 0.30000000000000004

js 是不区分整数和浮点数的，JS 中的所有数字都是浮点数。

# jQuery 被誉为工厂函数的是

$()

# 使用箭头函数时要注意的地方

当要求是动态上下文时，就不能使用箭头函数，比如：构造器创建对象，定义方法等。

# 闭包

## 什么是闭包

闭包是在某个作用域内定义的函数，它可以访问这个作用域内的所有变量。

当一个内部函数访问其函数作用域之外的变量引用时，就形成了一个闭包。

简单来说，闭包是一个具有封闭对外不公开的结构或空间。

## 闭包作用

保存自己的私有变量，提供接口 get 或 set 给外部调用，但外部不能直接访问该变量。

缺点：内存常驻，容易内存泄漏。

## 闭包的基本模型

1. 对象模式

   函数内部定义一个对象，对象中绑定多个函数，例如：

   ```javascript
   function createPerson() {
     var name = '';
     return {
       getName: function() {
         return name;
       },
       setName: function(val) {
         name = val;
       }
     };
   }
   var person = createPerson();
   person.setName('jack');
   person.getName(); // jack
   ```

2. 函数模式

   函数内部定义一个新函数，返回新函数，用新函数获得函数的内部数据，例如：

   ```javascript
   function foo() {
     var num = Math.random();
     function func() {
       return num;
     }
     return func;
   }

   var f = foo();
   var num1 = f();
   var num2 = f();
   ```

3. 沙箱模式

   沙箱模式是一个子调用函数，例如 jQuery：

   ```javascript
   (function() {
     var jQuery = function() {
       jQuery.show = function {console.log(1);}
       window.jQuery = window.$ = jQuery;
     };
   })();

   $.show(); // 1
   ```

# 深拷贝与浅拷贝

浅拷贝只是复制某个对象的指针，而不是复制对象本身，新旧对象指向同一块内存。

深拷贝会复制一个一模一样的对象，并且创建新的内存。例如：递归 Object.assign()方法。

# es5 中的 this 和箭头函数

es5 中的 this 总是代表它的直接调用者，例如：obj.test()，this 就是 obj。

定时器中的匿名函数由于没有默认的宿主对象，所有 this 指向 Window。

箭头函数中的 this，指的是定义它的对象。

# 默认不冒泡的事件

focus、load、resize 等还有 media 相关事件，都不冒泡

# 这里有一个 url `https://baijiahao.baidu.com/s?id=1583617694892288463&wfr=spider&for=pc`写一个函数 获取 query 的参数和值存放在一个对象中。

```javascript
function parseQueryString(url) {
  let paramStr = url.substr(url.lastIndexOf('?') + 1);
  const json = JSON.parse(
    '{"' +
      decodeURIComponent(paramStr)
        .replace(/"/g, '\\"')
        .replace(/=/g, '":"')
        .replace(/&/g, '","') +
      '"}'
  );
  return json;
}
```

# 手写一个倒计时功能

```javascript
let time = 10;
let timer = null;
function countDownTime() {
  if (time === 0) {
    clearTimeout(timer);
  } else {
    time--;
    timer = setTimeout(() => {
      countDownTime();
    }, 1000);
  }
}
countDownTime();
```

# 手写一个深浅 clone 有什么优化的方案？

浅 clone：引用的复制，并不开辟新的内存地址，操作的还是同一个对象。方法：Object.assign 和 Array.slice()、Array.concat()。Array.slice()、Array.concat()看起来像深拷贝，但其实不是，对于数组里的对象元素还是只复制里其引用。

```javascript
function shallowClone(obj) {
  var o = {};
  for (var i in obj) {
    o[i] = obj[i];
  }
  return o;
}

// 利用Object.assign也能实现浅拷贝
var newObj = Object.assign({}, obj);
```

深 clone：开辟新的内存地址，将原对象中的各个属性逐个复制进去。可以利用 JSON.parse()和 JSON.stringify()来实现。但是这样会有个缺点，对象中的函数类型和正则表达式无法进行深拷贝，构造函数也会变成 Object()。

```javascript
var obj = {
  name: 'jack',
  child: {
    name: 'child'
  }
};

// 将JS对象转换成JSON字符串
var jsonStr = JSON.stringify(obj);

// 将JSON字符串转化为JS对象
var newObj = JSON.parse(jsonStr);
```

# arguments 和数组有什么区别

arguments：类数组类型为 Object，利用键值对获取属性

数组：数组类型为 Array，从 Array.prototype 继承了一些方法，自动更新 length 属性。利用索引获取数据。

# jQuery 的 on 、bind 和 delegate 的区别

首先 bind 和 delegate 底层都是通过 on 函数来实现。

bind 是将同一个事件处理函数添加到每一个匹配的元素上，click()是它的简写，浪费性能。

delegate 只将事件添加到根元素上。

# 原生 js 实现 jQuery 的 on 函数

封装 addEventListener，判断是否兼容 IE，不兼容就封装 attachEvent，多个事件需要遍历事件循环，伪代码：

```javascript
Element.prototype.on = function(type, fn) {
  let events = type.split(' ');
  for (let i = 0; i < events.length; i++) {
    window.addEventListener ? this.addEventListener(events[i], fn) : this.attachEvent('on' + events[i], fn);
  }
};
```

# 算法:找出 100 以内的 7 的倍数和有 7 的整数

```javascript
let res = [];
for (var i = 1; i < 100; i++) {
  if (i % 7 === 0 || i.toString().indexOf('7') > -1) {
    res.push(i);
  }
}
console.log(res);
```

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
