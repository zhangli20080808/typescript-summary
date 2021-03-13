(function () {
    'use strict';

    function initProxy(obj) {
        var result = {};
        var _loop_1 = function (key) {
            result[key] = {
                get: function () {
                    console.log('get key 自定义逻辑');
                    return obj[key];
                },
                set: function (value) {
                    console.log('set');
                    obj[key] = value;
                }
            };
        };
        for (var key in obj) {
            _loop_1(key);
        }
        console.log(result, obj, 'res');
        return result;
    }
    var person = {
        name: 'zk',
        age: 20
    };
    var testObj = initProxy(person);
    console.log(testObj.name, 'name');
    // testObj.name = '123'
    // testObj.age = 10
    console.log(testObj, 'result');

}());
//# sourceMappingURL=bundle.js.map
