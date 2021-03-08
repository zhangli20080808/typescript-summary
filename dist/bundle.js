(function () {
  'use strict';

  // 泛型 就是当调用的时候来传入一个类型 先用一个标识来占位
  function getType(obj) {
      obj.length;
  }
  getType('1');
  // 类中使用泛型
  var MyArray = /** @class */ (function () {
      function MyArray() {
          this.arr = [];
      }
      MyArray.prototype.add = function (v) {
          this.arr.push(v);
      };
      return MyArray;
  }());
  var array = new MyArray();
  array.add(1);
  array.add(2);
  array.add(3);

}());
//# sourceMappingURL=bundle.js.map
