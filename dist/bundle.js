(function () {
  'use strict';

  /**
   * 1. promise 回调实现  1. 实现actionType 2. Promise回调实现 3. 测试类实现 4.then方法
   */
  var Promise$1 = /** @class */ (function () {
      function Promise(executor) {
          var _this = this;
          //executor 默认传入 一开始就执行 默认是 pending
          this.status = 'pending';
          this.resolveFn = function (successValue) {
              if (_this.status === 'pending') {
                  _this.status = 'fulfilled';
                  _this.resolve_executor_value = successValue;
              }
          };
          this.rejectFn = function (rejectValue) {
              if (_this.status === 'pending') {
                  _this.status = 'rejected';
                  _this.reject_executor_value = rejectValue;
              }
          };
          executor(this.resolveFn, this.rejectFn);
      }
      Promise.prototype.then = function (resolveInThen, rejectInThen) {
          if (this.status === 'fulfilled') {
              resolveInThen(this.resolve_executor_value);
          }
          if (this.status === 'rejected') {
              rejectInThen(this.reject_executor_value);
          }
      };
      return Promise;
  }());

  var promise = new Promise$1(function (resolve, reject) {
      // resolve('陈宫1');
      reject('我失败了');
  });
  promise.then(function (res) {
      console.log(res, 'res');
  }, function (err) {
      console.log(err, 'err');
  });
  // .catch((err) => {
  //   console.log(err, 'err');
  // });

}());
//# sourceMappingURL=bundle.js.map
