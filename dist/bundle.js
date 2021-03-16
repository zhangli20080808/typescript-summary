(function () {
    'use strict';

    /**
     * 模块和命名空间
     * 1. 模块 解决全局变量问题
     * 1.1 全局模块
     *     在默认情况下，当我们在一个新的ts文件中书写代码时，他处于全局命名空间中
     *     全局是危险的，会和文件内的代码命名冲突，推荐使用文件模块
     * 1.2 文件模块  -- 也被称作外部模块
     *     如果在你的ts文件的根级别位置含有export或者import，那么他会在这个文件中创建
     *     一个本地的作用域
     *     (如果出现了export或者import，那么这个文件就成了一个外部模块，简称模块)
     *     * 模块是ts中外部模块的简称，侧重于代码和复用
     *     * 模块在自己声明的作用域里面执行，而不是在全局作用域里面
     *     * 一个模块里面的变量 函数 类 在外部是不可见的,除非你把他导出
     *     * 如果你想使用一个模块里面的变量，则需要导入
     *2. 模块规范
     *   推荐使用commonjs规范
     *3. 命名空间 -- 本质是一个对象，将一系列相关的属性放在对象上  解决命名冲突
     */
    var Zoo;
    (function (Zoo) {
        var Dog = /** @class */ (function () {
            function Dog() {
            }
            Dog.prototype.eat = function () {
                console.log('zoo dog');
            };
            return Dog;
        }());
        Zoo.Dog = Dog;
        var monkeyArea;
        (function (monkeyArea) {
            var Monkey = /** @class */ (function () {
                function Monkey() {
                }
                Monkey.prototype.eat = function () {
                    console.log('monkey eating');
                };
                return Monkey;
            }());
            monkeyArea.Monkey = Monkey;
        })(monkeyArea || (monkeyArea = {}));
    })(Zoo || (Zoo = {}));
    var Home;
    (function (Home) {
        var Dog = /** @class */ (function () {
            function Dog() {
            }
            Dog.prototype.eat = function () {
                console.log('home dog');
            };
            return Dog;
        }());
        Home.Dog = Dog;
    })(Home || (Home = {}));

    var dogZoo = new Zoo.Dog();
    dogZoo.eat();
    var dogHome = new Home.Dog();
    dogHome.eat();
    /**
     文件  模块  命名空间的关系
     */

}());
//# sourceMappingURL=bundle.js.map
