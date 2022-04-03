function print1(msg) {
  console.log('msg', msg)
}

function throttle(fn, time, t) {
  let count = 0;
  return function() {
    count++
    if (count > t) return;
    let args = arguments;
    setTimeout(() => {
      fn.apply(this, args);
      count = 0;
    }, time)
  }
}

// let print = throttle(print1, 1000, 2)

// print(1);
// print(2);
// print(3);

// setTimeout(() => {
//   print(4);
// }, 2000);

// function debounce(fn, time) {
//   let timeout = null;
//   return function () {
//     let args = arguments;
//     if (timeout) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(() => {
//       fn.apply(this, args);
//     }, time)
//   }
// }

function debounce(fn, time) {
  let timeout = null;
  return function () {
    let args = arguments;
    if (timeout) {
      clearTimeout(timeout)
    } else {
      fn.apply(this, args);
    }

    timeout = setTimeout(() => {
      timeout = null;
    }, time)

  }
}

let print2 = debounce(print1, 1000);

print2(1);
print2(2);
print2(3);
print2(4);
print2(5);
setTimeout(() => {
  print2(6)
}, 2000)