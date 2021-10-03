(function () {
  'use strict';

  /**
   * 1. promise 回调实现  1. 实现actionType 2. Promise回调实现 3. 测试类实现 4.then方法
     5. 同步级联 then 方法
     6. 单级异步 + then方法收集 - 单级then方法
   */
  var Promise$1 = /** @class */ (function () {
      function Promise(executor) {
          var _this = this;
          this.onResolvedCallbacks = []; //存储成功的的所有的回调 只有pending的时候才存储
          this.onRejectedCallbacks = []; //存储失败的的所有的回调
          //executor 默认传入 一开始就执行 默认是 pending
          this.status = 'pending';
          this.resolve = function (value) {
              console.log('进入resolve函数', value, _this.status);
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
      Promise.prototype.then = function (resolveInThen, rejectInThen) {
          var _this = this;
          return new Promise(function (resolve, reject) {
              var result;
              console.log(_this, 'this'); // 外部的
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
                  _this.onResolvedCallbacks.push(function () {
                      result = resolveInThen(_this.resolve_executor_value);
                      console.log('异步中执行的结果', result);
                  });
                  _this.onRejectedCallbacks.push(function () {
                      result = rejectInThen(_this.reject_executor_value);
                      console.log('异步中执行的结果', result);
                  });
              }
          });
      };
      return Promise;
  }());

  var promise = new Promise$1(function (resolve, reject) {
      // resolve('陈宫1');
      // throw new Error('123');
      // reject('我失败了');
      // 异步过程
      // 发布、订阅，就是当真正执行 resolve的时候 我们再去执行 then的回调，先将then的方法的回调订阅下来
      setTimeout(function () {
          resolve('陈宫1');
      }, 1000);
  });
  promise
      .then(function (resolveData1) {
      console.log(resolveData1, '第一个then成功了');
      return 'ok1';
  }, function (err) {
      console.log(err, 'err');
      return 'fail1';
  });
  // .then(
  //   (resolveData2) => {
  //     console.log(resolveData2, '第二个then成功了');
  //     return 'ok2';
  //   },
  //   (err) => {
  //     console.log(err, '第二个then失败了');
  //     return 'fail2';
  //   }
  // );
  // .then(
  //   (resolveData3) => {
  //     console.log(resolveData3, '第三个then成功了');
  //   },
  //   (err) => {
  //     console.log(err, '第三个then失败了');
  //   }
  // );
  // .catch((err) => {
  //   console.log(err, 'err');
  // });
  console.log('end');

}());
//# sourceMappingURL=bundle.js.map
