(function () {
  'use strict';

  // 泛型 就是当调用的时候来传入一个类型 先用一个标识来占位
  function getType(obj) {
      obj.length;
  }
  getType('1');
  // 属性约束
  // 1. T是一个对象类型 2.K是T中的一个属性
  // keyof 表示取对象中所有的key属性
  var getVal = function (obj, key) {
      return obj[key];
  };
  getVal({ a: 1, b: 2 }, 'a');
  // 泛型类 类中使用泛型
  // 注意 泛型类指的是我们实例部分的类型  类的静态属性是不能使用的
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
