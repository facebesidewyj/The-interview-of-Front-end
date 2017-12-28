# DOM事件的级别。

1. DOM0级事件：将一个函数赋值给一个事件处理属性，例如：

  ```
  <button id="btn"></button>
  <script>
  var btn = document.querySelector("#btn");
  btn.onclick = function() {
  console.log("click");
  }

  // 事件解绑
  btn.onclick = null
  </script>
  ```

  DOM0级事件处理程序的缺点在于，一个处理程序无法同时绑定多个处理函数。

2. DOM2级事件：定义了addEventListener和removeEventListener，分别用来绑定和解绑事件，该方法包含三个参数，分别为绑定的事件名，处理函数和是否在捕获时执行。例如：

  ```
  <button id="btn"></button>
  <script>
  var btn = document.querySelector("#btn");

  function show() {
  console.log('click');
  }

  btn.addEventListener('click', show, false);

  // 事件解绑
  btn.removeEventListener('click', show, false);
  </script>
  ```

  DOM2级事件在DOM0事件基础上弥补了一个处理程序无法同时绑定多个函数的问题。

  > 注：IE8及以下版本不支持addEventListener和removeEventListener。

3. DOM3级事件：DOM3级事件在DOM2级事件的基础上增加了更多的事件类型，例如：blur、load、scroll、keydown等。

> 注：由于DOM1级中并没有定义事件相关的内容，所以没有DOM1级事件。

# DOM事件模型。

# DOM事件流。

1. 从window对象传导到目标节点上，称为"捕获阶段"。
2. 在目标节点上触发，称为"目标阶段"。
3. 从目标节点传导回window对象上，称为"冒泡阶段"。

# 描述DOM事件捕获的具体流程。

# Event对象的常见应用。

# 自定义事件。
