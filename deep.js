// function clone(target, map = new WeakMap()) {
//   if (typeof target === 'object') {
//     const isArray = Array.isArray(target);
//     let cloneTarget = isArray ? [] : {};
//     if (map.get(target)) return map.get(target);
//     map.set(target, cloneTarget);

//     let keys = isArray ? undefined : Object.keys(target);
//     forEach(keys || target, (val, key) => {
//       if (keys) {
//         key = val
//       }
//       cloneTarget[key] = clone(target[key], map)
//     })
//     return cloneTarget;
//   } else {
//     return target;
//   }
// }

function clone(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    // let cloneTarget;
    // if (Array.isArray(target)) {
    //   cloneTarget = [];
    //   target.forEach((v, key) => {
    //     cloneTarget[key] = clone(target[key]);
    //   })
    // } else {
    //   cloneTarget = {};
    //   Object.keys(target).forEach(key => {
    //     cloneTarget[key] = clone(target[key]);
    //   })
    // }
    let isArray = Array.isArray(target);
    let cloneTarget = isArray ? [] : {};

    if (map.has(target)) return map.get(target);
    map.set(target, cloneTarget);

    Reflect.ownKeys(target).forEach(key => {
      cloneTarget[key] = clone(target[key], map);
    })

    // let keys = isArray ? undefined : Object.keys(target);
    // forEach(keys || target, (v, key) => {
    //   if (keys) {
    //     key = v
    //   }
    //   cloneTarget[key] = clone(target[key], map)
    // })
    return cloneTarget;
  } else {
    return target;
  }
}

function forEach(obj, callback) {
  let i = -1;
  const length = obj.length;
  while(++i < length) {
    callback(obj[i], i);
  }
}

// function forEach(obj, callback) {
//   let i = -1;
//   const length = obj.length;
//   while(++i < length) {
//     callback(obj[i], i)
//   }
//   return obj;
// }

let target = {a: 12, b: { c: 'sd', d: { e: 12 } }, f: [1,2,3]};
target.target = target;

console.log(clone(target))