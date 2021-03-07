(function () {
  'use strict';

  // 泛型 就是当调用的时候来传入一个类型 先用一个标识来占位
  var swap = function (tuple) {
      return [tuple[0], tuple[1]];
  };
  swap([0, '1']);

}());
//# sourceMappingURL=bundle.js.map
