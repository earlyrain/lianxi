// Promise存在三个状态（state）pending、fulfilled、rejected
// pending（等待态）为初始态，并可以转化为fulfilled（成功态）和rejected（失败态）
// 成功时，不可转为其他状态，且必须有一个不可改变的值（value）
// 失败时，不可转为其他状态，且必须有一个不可改变的原因（reason）
// new Promise((resolve, reject)=>{resolve(value)}) resolve为成功，接收参数value，状态改变为fulfilled，不可再次改变。
// new Promise((resolve, reject)=>{reject(reason)}) reject为失败，接收参数reason，状态改变为rejected，不可再次改变。
// 若是executor函数报错 直接执行reject();
// Promise有一个叫做then的方法，里面有两个参数：onFulfilled,onRejected,成功有成功的值，失败有失败的原因

// 解决链式调用
function resolvePromise(promise2, x, resolve, reject) {
  // 循环引用报错
  if (x === promise2) {
    return reject(new TypeError('chaining cycle detected for promise'));
  }
  // 防止多次调用
  let called;
  // x不是null 是对象或者函数
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // A+规定，声明 then = x的then方法
      let then = x.then;
      // 证明是promise
      if (typeof then === 'function') {
        // 执行then 第一个参数是this， 后面是成功和失败的回调
        then.call(x, y => {
          // 成功和失败只能调用一次
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          if (called) return;
          called = true;
          reject(err);
        })
      } else {
        // 直接成功
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;

    // 成功存放的数组
    this.onResolvedCallbacks = [];
    // 失败存放的数组
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    let reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    };

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw(err) };
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        }, 0)

      }
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(()=> {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          }, 0)
        });
        this.onRejectedCallbacks.push(()=> {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          }, 0)
        });
      }
    })
    return promise2;
  }

  catch(fn) {
    return this.then(null, fn);
  }
}

MyPromise.resolve = (val) => {
  return new MyPromise((resolve, reject) => {
    resolve(val)
  })
}

MyPromise.reject = (val) => {
  return new MyPromise((resolve, reject) => {
    reject(val)
  })
}

let request = new MyPromise((resolve, reject) => {
  for (var i = 0; i < 10; i++) {
    console.log(1111111, i)
  }
  setTimeout(() => {
    resolve(i);
  }, 1000)
});
request.then(res => {
  console.log("🚀 ~ file: promise.js ~ line 123 ~ res", res)
  return new MyPromise((resolve) => {
    setTimeout(() => {
      resolve(20)
    }, 1000)
  })
}, () => {}).then(res => {
  console.log("🚀 ~ file: promise.js ~ line 130 ~ res", res)
}, () => {})
