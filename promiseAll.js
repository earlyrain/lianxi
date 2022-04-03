const axios = require('axios');

function promiseAll(arr) {
  return new Promise((resolve, reject) => {
    let promiseRes = [];
    let count = 0;
    // for (let i = 0; i < arr.length; i++) {
    //   arr[i].then((res) => {
    //     promiseRes[i] = res;
    //     count++;
    //     if (count === arr.length) {
    //       resolve(promiseRes);
    //     }
    //   }).catch(reject);
    // }
    arr.forEach((item, i) => {
      Promise.resolve(item).then(res => {
        promiseRes[i] = res;
        count++;
        if (count === arr.length) {
          resolve(promiseRes);
        }
      }).catch(reject)
    });
  })
}

const p1 = Promise.resolve('p1');
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2 2')
  }, 2000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3 1')
  }, 1000);
});

const p4 = Promise.reject('p4 reject');
const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p5 1')
  }, 1000);
});

// promiseAll([p1, p2, p3, p4, p5])
promiseAll([p1, p2, p3])
// promiseAll([p1, p2, p4])
// promiseAll([p1, p2, p5])
  .then(res => {
    console.log("🚀 ~ file: promiseAll.js ~ line 9 ~ res", res)
  }).catch(err => {
    console.log('err', err);
  })