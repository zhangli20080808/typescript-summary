(function () {
    'use strict';

    // ts中的兼容性问题 一个类型能否被赋予给另一个类型
    function forEach(arr, cb) {
        for (var i = 0; i < arr.length; i++) {
            cb(arr[i], i);
        }
    }
    // 能用接口就用接口 用不了就用别名 没有继承没有拓展直接用type
    forEach([1, 2, 4], function (item) {
    });

}());
//# sourceMappingURL=bundle.js.map
