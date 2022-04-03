// 1
// const user = {};
// function set(obj,path,value){
//   let paths = path.split('.');
//   if (paths.length === 1) {
//     obj[path] = value;
//   } else {
//     let current = obj;
//     for (let i = 0; i < paths.length; i++) {
//       if (i === paths.length - 1) {
//         current[paths[i]] = value
//       } else {
//         if (!current[paths[i]]) {
//           current = current[paths[i]] = {}
//         } else {
//           current = current[paths[i]]
//         }
//       }
//     }
//   }
//   console.log(obj)
// }

// set(user,'name','张三')
// //{'name':'张三'}
// set(user,'img.url.width',300);
// set(user,'img.host','http');
/*
{
  name:'张三',
  img:{
    url:{
      width:300,
    },
    host:'http:'
  }
}
*/

// 2
// 把一个接口请求用装饰器方式扩展为可重试函数

const axios = require('axios');
const request = ()=>{
  console.log('获取百度')
  return axios.get('http://www.baidu2.com')
}

const withRetry=(req,times,check)=>{
  return new Promise((resolve,reject)=>{
    const sendReq = ()=>{
      req().then(resolve,(response)=>{
        if(check(response)&&times.length){
            getRes(times.shift(),sendReq);
            console.count('重试次数')
        }else{
          reject(response);
        }
      })
    }
    sendReq();
  })
}
// 如果错误为‘ECONNRESET’ 则在 1000 2000 3000毫秒时重试
withRetry(request,[1000,2000,3000],(res)=>{
  return res.code === 'ECONNRESET';
}).then(res=>{
  console.log(res);
},rej=>{
  console.log(rej);
})



const getRes = (time,cb)=>{
    setTimeout(()=>{
      cb();
    },time)
}