# CSS 部分

1. 描述一下 CSS 的优先级规则

   优先级：内联样式>内部样式>外部样式

2. 如何兼容移动浏览器、不同手机、不同版本垂直距中写法

3. 这是什么写法，编译出来的是什么

   ```css
   @component broad {
     @component head {
       margin: 0;
       @nav-hard {
         padding: 0;
       }
     }
   }
   ```

   sass 写法，编译出来为：

4. 怎么让偶数的 li 标签内的字体变成红色

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

# JS 部分

以下代码输出什么？

1. 第一题

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

2. 第二题

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

3. 第三题

   ```javascript
   function valueof() {
     return 1;
   }
   var valueof;
   alert(typeof valueof);
   ```

   答案：function

   解释：函数声明会优先变量提升，但函数表达式不会提升，如果一个变量的名字与函数的名字相同，那么函数的名字会覆盖变量的名字。

4. 第四题

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

5. 第五题

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
