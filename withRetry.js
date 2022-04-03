const axios = require('axios');
const request = ()=>{
  console.log('获取百度')
  return axios.get('http://www.baidu2.com')
}

const withRetry=(req,times,check)=>{
  return new Promise((resolve, reject) => {
    let task = () => req().then(resolve).catch((rej) => {
      if (times.length && check(rej)) {
        setTimeout(() => {
          task()
        }, times.shift())
      } else {
        reject(rej);
      }
    });
    task();
  })
}
// 如果错误为‘ECONNRESET’ 则在 1000 2000 3000毫秒时重试
withRetry(request,[1000, 2000, 3000],(res)=>{
  return res.code === 'ECONNRESET';
}).then(res=>{
  console.log(res);
},rej=>{
  console.log(rej);
})
