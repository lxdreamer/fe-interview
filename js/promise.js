class MyPromise{
  constructor(fn) {
    this.PENDING = 'PENDING';
    this.REJECTED = 'REJECTED';
    this.FULFILLED = 'FULFILLED';
    this.status = this.PENDING;
    this.onFulFilled = [];
    this.onRejected = [];
    this.value = void 0;
    this.reason = void 0;
    this.fn = fn;
    try{
      this.fn(this.resolve,this.reject)
    }catch(e){
      this.reject(e)
    }
  };
  resolve(value) {
    if(this.status === this.PENDING){
      this.status = this.FULFILLED;
      this.value = value;
      this.onFulFilled.map(fn=>fn(value))
    }
  };
  reject(reason) {
    if(this.status === this.PENDING){
      this.status = this.REJECTED;
      this.reason = reason;
      this.onRejected.map(fn=>fn(value));
    }
  };
  then(onFulFilled,onRejected) {
    if(this.status === this.FULFILLED) {
      typeof onFulFilled === 'function' && onFulFilled(this.value);
    }
    if(this.status === this.REJECTED) {
      typeof onRejected === 'function' && onRejected(this.reason);
    }
    if(this.status === this.PENDING){
      typeof onFulFilled === 'function' && this.onFulFilled.push(onFulFilled)
      typeof onRejected === 'function' && this.onRejected.push(onRejected)
    }
  }
}
