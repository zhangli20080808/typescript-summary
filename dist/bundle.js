(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    // 装饰器  拓展属性和方法 或者重写 装饰器就是函数 函数返回函数 执行完成之后还是函数
    function aaa(target) {
        console.log('2');
    }
    function xxx(target) {
        console.log(1);
        // 修饰类本身当前参数就是类 一个参数
        target.prototype.say = function () {
            console.log('say');
        };
    }
    /**
     *
     * @param target 原型
     * @param key 属性
     */
    function toUpperCase(target, key) {
        console.log(target, key);
        var value = target[key];
        Object.defineProperty(target, key, {
            get: function () {
                return value.toUpperCase();
            },
            set: function (newVal) {
                value = newVal;
            },
        });
    }
    function double(num) {
        return function (target, key) {
            //修饰静态属性 target 类
            var value = target[key];
            Object.defineProperty(target, key, {
                get: function () {
                    return value * num;
                },
            });
        };
    }
    /**
     * 将 getName 转换为可枚举属性
     * @param target
     * @param key
      // configurable: true enumerable: true value: ƒ () writable: true
     * @param description Object.defineProperty 的第三个参数  configurable enumerable  value
     */
    function toEnum(target, key, description) {
        console.log(target, key, description);
        // configurable: true enumerable: true value: ƒ () writable: true
        description.enumerable = false;
    }
    var Person = /** @class */ (function () {
        function Person() {
            // 比如初始化的时候装饰属性
            this.name = ' zhangLi'; // 直接默认走set
        }
        Person.prototype.getName = function () { };
        Person.age = 10; // 修改类静态属性时 不会走set方法
        __decorate([
            toUpperCase
        ], Person.prototype, "name", void 0);
        __decorate([
            toEnum
        ], Person.prototype, "getName", null);
        __decorate([
            double(3)
        ], Person, "age", void 0);
        Person = __decorate([
            aaa,
            xxx
        ], Person);
        return Person;
    }());
    var person = new Person();
    // 需要在类中生命 say方法 不然会报错
    // person.say();
    console.log(person.name); // ZHANGLI
    console.log(Person.age); // 30

}());
//# sourceMappingURL=bundle.js.map
