(function () {
  'use strict';

  // https://zhuanlan.zhihu.com/p/382699039
  var isFunction = function (val) {
      return typeof val === 'function';
  };
  var isObject = function (val) {
      return val !== null && typeof val === 'object';
  };
  var isPromise = function (val) {
      return isObject(val) && isFunction(val.then);
  };

  /**
   * 1. promise 回调实现  1. 实现actionType 2. Promise回调实现 3. 测试类实现 4.then方法
     5. 同步级联 then 方法
     6. 单级异步 + then方法收集 - 单级then方法
     7. 多个异步 + 多级then方法收集 - 多级then方法
   */
  var Promise$1 = /** @class */ (function () {
      function Promise(executor) {
          var _this = this;
          this.onResolvedCallbacks = []; //存储成功的的所有的回调 只有pending的时候才存储
          this.onRejectedCallbacks = []; //存储失败的的所有的回调
          //executor 默认传入 一开始就执行 默认是 pending
          this.status = 'pending';
          this.resolve = function (value) {
              // console.log('进入resolve函数', value, this.status);
              if (_this.status === 'pending') {
                  _this.status = 'fulfilled';
                  // value[10] = 100;
                  _this.resolve_executor_value = value;
                  _this.onResolvedCallbacks.forEach(function (cb) { return cb(); });
              }
          };
          this.reject = function (reason) {
              if (_this.status === 'pending') {
                  _this.status = 'rejected';
                  _this.reject_executor_value = reason;
                  _this.onRejectedCallbacks.forEach(function (cb) { return cb(); });
              }
          };
          try {
              // 执行函数
              executor(this.resolve, this.reject);
          }
          catch (error) {
              // 标识当前有异常  那就使当前的异常作为失败的原因
              // 在执行resolve时，reject失败的状态下的一个执行过程
              this.status = 'pending';
              this.reject(error);
              // throw new Error('程序停止......');
          }
      }
      Promise.all = function (promises) {
          return new Promise(function (resolve, reject) {
              var allPromiseResolveSuccessValue = [];
              promises.forEach(function (promise, index) {
                  promise.then(function (resolveSuccess) {
                      ProcessData(resolveSuccess, index);
                  }, function (rejectFail) {
                      // 只要有一个promise对象的resolve执行失败，就执行reject
                      reject(rejectFail);
                      return;
                  });
              });
              function ProcessData(resolveSuccess, index) {
                  allPromiseResolveSuccessValue[index] = resolveSuccess;
                  if (index === promises.length - 1) {
                      resolve(allPromiseResolveSuccessValue);
                  }
              }
          });
      };
      Promise.resolve = function (value) {
          // resolve里面放一个promise会等待这个promise执行完
          return new Promise(function (resolve, reject) {
              resolve(value);
          });
      };
      Promise.reject = function (reason) {
          // reject 并不会解析 promise值
          return new Promise(function (resolve, reject) {
              reject(reason);
          });
      };
      Promise.prototype.then = function (resolveInThen, rejectInThen) {
          var _this = this;
          return new Promise(function (resolve, reject) {
              var result;
              // console.log(this, 'this'); // 外部的
              if (_this.status === 'fulfilled') {
                  result = resolveInThen(_this.resolve_executor_value);
                  // 重新调用 resolve 会重新走 executor
                  resolve(result);
              }
              if (_this.status === 'rejected') {
                  result = rejectInThen(_this.reject_executor_value);
                  reject(result);
              }
              if (_this.status === 'pending') {
                  // console.log('pending state')
                  // 等会成功的时候 再让他执行 分别将成功和失败的回调存起来
                  _this.processManyAsyncAndSync(resolveInThen, rejectInThen, resolve, reject);
              }
          });
      };
      /**
       * 执行多个异步方法 + 多级 then的处理方法
       * @param resolveInThen
       * @param rejectInThen
       * @param resolve
       * @param reject
       */
      Promise.prototype.processManyAsyncAndSync = function (resolveInThen, rejectInThen, resolve, reject) {
          var _this = this;
          var result;
          this.onResolvedCallbacks.push(function () {
              result = resolveInThen(_this.resolve_executor_value);
              console.log('异步中执行的结果', result);
              // 异步处理方式 如何采用同步的方式去处理呢？
              if (isPromise(result)) {
                  result.then(function (resolveSuccess) {
                      resolve(resolveSuccess);
                  }, function (rejectSuccess) {
                      reject(rejectSuccess);
                  });
              }
              else {
                  resolve(result);
              }
              // resolve(result.resolve_executor_value);
              // if (isPromise(result)) {
              //   setTimeout(() => {
              //     console.log(result, 'result');
              //     resolve(result.resolve_executor_value);
              //   }, 5);
              // } else {
              //   resolve(result);
              // }
          });
          this.onRejectedCallbacks.push(function () {
              result = rejectInThen(_this.reject_executor_value);
              // console.log('异步中执行的结果', result);
              reject(result);
          });
      };
      return Promise;
  }());

  var promise1 = new Promise$1(function (resolve, reject) {
      console.log('第一个promise同步区域');
      setTimeout(function () {
          resolve('setTimeout的第一个promise');
      }, 5);
  });
  var promise2 = new Promise$1(function (resolve, reject) {
      console.log('第二个promise同步区域');
      setTimeout(function () {
          reject('setTimeout的第二个promise');
      }, 5);
  });
  var promise3 = new Promise$1(function (resolve, reject) {
      console.log('第三个promise同步区域');
      setTimeout(function () {
          resolve('setTimeout的第三个promise');
      }, 5);
  });
  Promise$1.all([promise2, promise1, promise3]).then(function (resolveValue) {
      console.log('promise->all-resolve', resolveValue);
  }, function (rejectValue) {
      console.log('promise->all-reject', rejectValue);
  });

}());
//# sourceMappingURL=bundle.js.map
