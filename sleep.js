function lazyMan(name) {
  class LazyMan {
    constructor(name) {
      this.tasks = [];
      let fn = () => {
        console.log(`Hi! This is ${name} !`)
        this.next();
      }
      this.tasks.push(fn);
      setTimeout(() => {
        this.next();
      })
    }
    next() {
      let fn = this.tasks.shift();
      typeof fn === 'function' && fn();
    }
    eat(str) {
      let fn = () => {
        console.log(`Eat ${str} ~`);
        this.next();
      }
      this.tasks.push(fn);
      return this;
    }
    sleepFirst(t) {
      let fn = () => {
        setTimeout(() => {
          console.log(`Wake up after ${t} s!`);
          this.next();
        }, t * 1000)
      }
      this.tasks.unshift(fn);
      return this;
    }
    sleep(t) {
      let fn = () => {
        setTimeout(() => {
          console.log(`Wake up after ${t} s!`);
          this.next();
        }, t * 1000)
        // let now = Date.now();
        // while(Date.now() - now < t * 1000) {
        //   this.next();
        // }
        // console.log(`Wake up after ${t} s!`);
      }
      this.tasks.push(fn);
      return this;
    }
  }
  return new LazyMan(name);
}

lazyMan('litao').eat('nini').sleep(4).eat('jsss').sleepFirst(2);