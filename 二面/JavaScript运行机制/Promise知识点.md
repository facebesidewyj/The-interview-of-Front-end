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

# Promise.all如何控制并发