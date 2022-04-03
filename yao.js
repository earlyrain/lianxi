class Computed {
  constructor(num) {
    this.num = num;
    // 积分列表
    this.count = Array(num).fill(0);
    this.indexArr = this.count.reduce((p, c, i)  => {
      p.push(i);
      return p;
    }, [])
    // 跳过的人
    this.jump = [];
  }

  yao() {
    this.loop(this.indexArr)
    console.log('jump', this.jump);
    console.log('count----------', this.count);
    return this.jump;
  }

  random() {
    return Math.ceil(Math.random()*12)
  }
  // arr中存的是count中的序号
  loop(arr) {
    let ready = {}, first = 0, second = 0;
    for (let i = 0; i < arr.length; i++) {
      // count中的序号
      let j = arr[i];
      // 如果是上次分享的人积分清0，并跳过.只有第一次会执行
      if (this.jump.includes(j)) {
        this.count[j] = 0;
        continue;
      }
      this.count[j] += this.random();
      let current = this.count[j];
      if (current > second) {
        if (current > first) {
          second = first;
          first = current;
          ready[current] = [j];
        } else if (current === first) {
          ready[current].push(j);
        } else {
          second = current;
          ready[current] = [j];
        }
      } else if (current === second) {
        ready[current].push(j);
      }
    }
    // 最多不超过两个
    if (ready[first].length === 2) {
      this.jump = ready[first];
    }else if (ready[first].length + ready[second].length === 2) {
      this.jump = [ready[first][0], ready[second][0]]
    // 超过2个
    } else {
      let arr = ready[first].length > 2 ? ready[first] : ready[first].concat(ready[second]);
      this.loop(arr);
    }
  }
}

const computed = new Computed(8);
console.log(computed.yao());
console.log(computed.yao());
console.log(computed.yao());
console.log(computed.yao());
console.log(computed.yao());