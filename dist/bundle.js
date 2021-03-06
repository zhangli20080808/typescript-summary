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
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    // es6中的类  类来调用的静态属性 私有的实例属性 共享的原型属性
    // as 断言成 xxx
    // ！非空断言
    // ？链判断运算符 有值取值 没有 返回undefined
    var Pointer = /** @class */ (function () {
        function Pointer(x, y) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            // 这些参数 函数中的使用方式，这里都可以使用
            this.x = x;
            // 因为我们的参数是可选的 undefined不能赋值给number 可以采用 断言 或者类型保护的方式解决这个问题
            // if (y) {
            //   this.y = y;
            // }
            this.y = y;
        }
        return Pointer;
    }());
    new Pointer(1, 2, 3, 4, 5);
    // 类中的修饰符  (public private  protected  限制了访问空间和访问范围) readonly
    // 1. public 表示父类本身 子类 外面都可以访问这个属性
    // 2. protected 受保护的 父类本身 子类 能访问到这个属性 外面访问不到
    // 3. private 私有属性 只有自己能访问到
    // 如果 constructor 被标识成了 protected、private,则此类不能被new，被标识成了private，则不能被子类继承
    var Animal = /** @class */ (function () {
        function Animal(name, age) {
            this.name = name;
            this.age = age;
        }
        Animal.getName = function () {
            return 'zhangLi';
        };
        Animal.prototype.say = function () {
            console.log('父类 say');
        };
        // 静态属性和静态方法 通过类来调用的都是静态方法(是可以被继承的)
        Animal.type = 'animal';
        return Animal;
    }());
    // let animal = new Animal('大象', 100);
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat(name, age, address) {
            var _this = _super.call(this, name, age) || this;
            _this.address = '';
            _this._eat = '';
            _this.address = address;
            return _this;
        }
        // 子类重写父类的静态方法 调用父类的静态方法 通过super 静态方法中的super指代的是父类
        Cat.getName = function () {
            console.log(_super.getName.call(this));
            return '猫';
        };
        Cat.prototype.say = function () {
            // 原型中的super指代的是父类的原型
            _super.prototype.say.call(this); // Animal.prototype
            console.log('cat say');
        };
        Object.defineProperty(Cat.prototype, "eat", {
            // 属性访器 来访问私有属性
            get: function () {
                // 原型属性
                return this._eat;
            },
            set: function (newVal) {
                this._eat = newVal;
            },
            enumerable: false,
            configurable: true
        });
        return Cat;
    }(Animal));
    var tom = new Cat('tom', 100, 'US');
    console.log(Cat.getName());
    // tom.say();
    tom.eat = 'hello';
    console.log(tom.eat);

}());
//# sourceMappingURL=bundle.js.map
