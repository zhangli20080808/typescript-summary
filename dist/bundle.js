(function () {
  'use strict';

  /**
   * 1. promise 回调实现  1. 实现actionType 2. Promise回调实现 3. 测试类实现 4.then方法
     5. 同步级联 then 方法
   */
  var Promise$1 = /** @class */ (function () {
      function Promise(executor) {
          var _this = this;
          //executor 默认传入 一开始就执行 默认是 pending
          this.status = 'pending';
          this.resolve = function (value) {
              console.log('进入resolve函数', value, _this.status);
              if (_this.status === 'pending') {
                  _this.status = 'fulfilled';
                  // value[10] = 100;
                  _this.resolve_executor_value = value;
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
          });
      };
      return Promise;
  }());

  var promise = new Promise$1(function (resolve, reject) {
      resolve('陈宫1');
      // throw new Error('123');
      // reject('我失败了');
  });
  promise
      .then(function (resolveData1) {
      console.log(resolveData1, '第一个then成功了');
      return 'ok1';
  }, function (err) {
      console.log(err, 'err');
      return 'fail1';
  })
      .then(function (resolveData2) {
      console.log(resolveData2, '第二个then成功了');
      return 'ok2';
  }, function (err) {
      console.log(err, '第二个then失败了');
      return 'fail2';
  });
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

}());
//# sourceMappingURL=bundle.js.map
