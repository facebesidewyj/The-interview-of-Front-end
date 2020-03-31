# Promise实现原理

Promise是一种异步编程的解决方案，遵循[Promises/A+规范](https://www.ituring.com.cn/article/66566)。ES6将其写入了语言标准，提供了原生Promise对象，但Promise内部还是使用回调函数来处理异步调用的，并且提供了then方法支持链式调用，使我们在处理异步操作时变得简洁和优雅

Promise的实现用到了观察者模式，内部维护了一个状态机和回调函数队列，当调用then方法时，Promise会将传入的函数注册到回调队列中，然后在状态改变时批量执行。

> **Promise里的then方法是用来注册回调函数的，真正的执行是在resolve函数和reject函数中**。

基础Promise示例：

```javascript
export default class YPromise {
  constructor(fn) {
    this.state = 'pending'
    this.data = null
    this.resolveCallbackList = []
    this.rejectCallbackList = []

    const resolve = function(value) {
      setTimeout(() => {
        if (this.state === 'pending') {
          if (value instanceof Promise) {
            value.then(
              (val) => {
                this.state = 'resolve'
                this.data = val
                this.resolveCallbackList.forEach((callback) => {
                  callback(this.data)
                })
              },
              (error) => {
                this.state = 'reject'
                this.data = error
                this.rejectCallbackList.forEach((callback) => {
                  callback(this.data)
                })
              }
            )
          } else {
            this.state = 'resolve'
            this.data = value
            this.resolveCallbackList.forEach((callback) => {
              callback(this.data)
            })
          }
        }
      }, 0)
    }

    const reject = function(error) {
      setTimeout(() => {
        if (this.state === 'pending') {
          this.state = 'reject'
          this.data = error
          this.rejectCallbackList.forEach((callback) => {
            callback(error)
          })
        }
      }, 0)
    }

    try {
      fn(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onResolve, onReject) {
    return new Promise((resolve, reject) => {
      function handleResolve(value) {
        try {
          if (typeof onResolve !== 'function') {
            resolve(value)
          } else {
            const res = onResolve(value)
            if (res instanceof Promise) {
              res.then(resolve, reject)
            } else {
              resolve(res)
            }
          }
        } catch (err) {
          resolve(err)
        }
      }

      function handleReject(error) {
        try {
          if (typeof onReject !== 'function') {
            reject(error)
          } else {
            const res = onReject(error)
            if (res instanceof Promise) {
              res.then(resolve, reject)
            } else {
              reject(res)
            }
          }
        } catch (err) {
          reject(err)
        }
      }

      switch (this.state) {
        case 'pending':
          this.resolveCallbackList.push(handleResolve)
          this.rejectCallbackList.push(handleReject)
          break
        case 'resolve':
          handleResolve(this.data)
          break
        case 'reject':
          handleReject(this.data)
          break
      }
    })
  }
  catch(onReject) {
    return this.then(null, onReject)
  }

  finally(callback) {
    return this.then(
      (value) => {
        YPromise.resolve(callback()).then(() => {
          return value
        })
      },
      (reason) => {
        YPromise.resolve(callback()).then(() => {
          throw reason
        })
      }
    )
  }

  static resolve(value) {
    if (value instanceof Promise) {
      return value
    }
    return new YPromise((resolve) => {
      resolve(value)
    })
  }

  static reject(error) {
    return new YPromise((resolve, reject) => {
      reject(error)
    })
  }

  static all(promiseList) {
    return new YPromise((resolve, reject) => {
      let res = []
      let count = 0
      for (let i = 0; i < promiseList.length; i++) {
        const promise = promiseList[i]
        this.resolve(promise).then(
          (value) => {
            res[i] = value
            count++
            if (count === promiseList.length) {
              resolve(res)
            }
          },
          (error) => {
            reject(error)
          }
        )
      }
    })
  }

  static race(promiseList) {
    return new YPromise((resolve, reject) => {
      for (const promise of promiseList) {
        this.resolve(promise).then(
          (value) => {
            resolve(value)
          },
          (error) => {
            reject(error)
          }
        )
      }
    })
  }
}

```

# Promise与Async/await区别

* Promise本质是触发执行回调函数，相比于async/await来说使用起来更加繁琐
* async/await的错误处理try/catch可以捕获同步或异步错误，Promise的catch只能捕获内部错误
* async/await的中间值处理更加优雅，调试更加方便
* async/await比Promise性能好，async/await在底层优化了堆栈处理，因为await cb()会暂停async的函数处理，而promise.then(cb)是把回调函数添加到了回调链中，当发生异常时，Promise要按回调链去寻址，而async/await可以直接访问内存，性能更优。

# Promise.all如何控制并发

所谓控制Promise.all的并发数量，实际就是控制Promise实例化的个数，创建一个执行数组executing缓存正在执行的promise实例，遍历要执行Promise.all的Promise数组，并添加调用链.then()，在触发后控制执行数组executing的长度，当循环结束后，所有的Promise数组的状态都不是pending了，直接调用Promise.all进行输出。async-pool这个库对其进行了实现：

```javascript
async function asyncPool(limit, list, promiseFn) {
  let ret = []
  let executing = []
  for(const item of list) {
    const p = Promise.resolve().then(() => {
      return promiseFn(item)
    })
    ret.push(p)
    const e = p.then(() => {
      return executing.splice(executing.indexof(e), 1)
    })
    executing.push(e)
    
    while(executing.length >= limit) {
      await Promise.race(executing)
    }
    
    return Promise.all(ret)
  }
}
```

# Promise的retry实现原理

Promise的重试策略，其核心思想是使用递归来实现

```javascript
Promise.prototype.retry = function(fn, times, delay) {
  return new Promise((resolve, reject) => {
    let error = null
    function attempt() {
      if(times === 0) {
        reject(error)
      } else {
        fn.then(resolve).catch((err) => {
          times--
          error = err
          setTimeout(() => {
            attempt()
          }, delay)
        })
      }
    }
    attempt
  })
}
```

