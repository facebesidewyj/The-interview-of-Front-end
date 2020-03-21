# 如何理解JS的单线程。

JS是按照语句出现的顺序执行的，并且同一时间只能做一件事。

# 什么是任务队列。

同步任务：主线程控制，根据语句出现的顺序一个接一个的顺序执行。

异步任务：进入Event Table并注册函数，

# 什么是Event Loop。

js的执行机制

1. 同步和异步任务分别进入不同的"场所"，同步任务进入主线程，异步任务进入Event Table，并注册函数。
2. 当指定的事情完成时，Event Table会将这个函数移入Event Queue。
3. 主线程内的任务执行完毕，会去Event Queue读取对应函数，进入主线程执行。
4. 上述过程不断重复就形成了事件循环。

# Event Loop 过程解析

* 初始状态：调用栈为空，微任务队列为空，宏任务队列只有一个script脚本（整体代码）
* 全局上下文（script脚本）被推入调用栈，同步代码执行。执行过程中会产生新的宏任务和微任务，它们会被推入到各自的任务队列里。同步代码执行完毕，script脚本被移出宏任务队列
* 宏任务执行完毕后，会检查微任务队列，将队列中的微任务逐个执行完毕，直到队列清空。需要注意的是：**宏任务是一个一个执行的，微任务是一队一队执行的，微任务队列没有清空不会执行下一个宏任务**
* 执行渲染，更新界面
* 检查是否有Web Worker任务，如果有则进行处理
> 上述过程循环执行，直到所有队列都被清空

# 哪些语句会被放入异步任务队列。

1. setTimeout和setInterval
2. DOM事件，注册事件时
3. ES6中的Promise
4. AJAX请求

# 放入异步任务队列的时机。

异步任务中的函数注册完成，并且执行了初始化的一些操作，以AJAX为例，当AJAX发送请求完成，success函数就进入了异步任务队列，等待主线程任务执行完毕，然后执行success回调函数。

# 宏任务与微任务

* 浏览器宏任务：I/O操作、setTimeout、setInterval、requestAnimationFrame
* 浏览器微任务：MutationObserver、Promise.then catch finally
* JS第一个要执行的宏任务式Script标签，之后会执行当前所有微任务
* 在当前微任务没有执行完成时，是不会执行下一个宏任务的
* 所有会进入的异步都是指的事件回调中的那部分代码

# Promise实现原理

Promise是一种异步编程的解决方案，遵循[Promises/A+规范](https://www.ituring.com.cn/article/66566)。ES6将其写入了语言标准，提供了原生Promise对象，但Promise内部还是使用回调函数来处理异步调用的，并且提供了then方法支持链式调用，使我们在处理异步操作时变得简洁和优雅

Promise的实现用到了观察者模式，内部维护了一个回调函数队列，当调用then方法时，Promise会将传入的函数注册到回调队列中，然后在状态改变时批量执行。

基础Promise示例：

```javascript
class Promise {
  callbacks = [];
  state = 'pending';//增加状态
  value = null;//保存结果
  constructor(fn) {
    fn(this._resolve.bind(this), this._reject.bind(this));
  }
  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      this._handle({
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
        resolve: resolve,
        reject: reject
      });
    });
  }
  catch(onError) {
    return this.then(null, onError);
  }
  finally(onDone) {
    if (typeof onDone !== 'function') return this.then();

    let Promise = this.constructor;
    return this.then(
      value => Promise.resolve(onDone()).then(() => value),
      reason => Promise.resolve(onDone()).then(() => { throw reason })
    );
  }
  static resolve(value) {
    if (value && value instanceof Promise) {
      return value;
    } else if (value && typeof value === 'object' && typeof value.then === 'function') {
      let then = value.then;
      return new Promise(resolve => {
        then(resolve);
      });

    } else if (value) {
      return new Promise(resolve => resolve(value));
    } else {
      return new Promise(resolve => resolve());
    }
  }
  static reject(value) {
    if (value && typeof value === 'object' && typeof value.then === 'function') {
      let then = value.then;
      return new Promise((resolve, reject) => {
        then(reject);
      });

    } else {
      return new Promise((resolve, reject) => reject(value));
    }
  }
  _handle(callback) {
    if (this.state === 'pending') {
      this.callbacks.push(callback);
      return;
    }

    let cb = this.state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;

    if (!cb) {//如果then中没有传递任何东西
      cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
      cb(this.value);
      return;
    }

    let ret;

    try {
      ret = cb(this.value);
      cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
    } catch (error) {
      ret = error;
      cb = callback.reject
    } finally {
      cb(ret);
    }

  }
  _resolve(value) {

    if (value && (typeof value === 'object' || typeof value === 'function')) {
      var then = value.then;
      if (typeof then === 'function') {
        then.call(value, this._resolve.bind(this), this._reject.bind(this));
        return;
      }
    }

    this.state = 'fulfilled';//改变状态
    this.value = value;//保存结果
    this.callbacks.forEach(callback => this._handle(callback));
  }
  _reject(error) {
    this.state = 'rejected';
    this.value = error;
    this.callbacks.forEach(callback => this._handle(callback));
  }
}
```

# Promise与Async/await区别

* Promise本质是触发执行回调函数，相比于async/await来说使用起来更加繁琐
* async/await的错误处理try/catch可以捕获同步或异步错误，Promise的catch只能捕获内部错误
* async/await的中间值处理更加优雅，调试更加方便
* async/await比Promise性能好，async/await在底层优化了堆栈处理，因为await cb()会暂停async的函数处理，而promise.then(cb)是把回调函数添加到了回调链中，当发生异常时，Promise要按回调链去寻址，而async/await可以直接访问内存，性能更优。

