// 装饰器  拓展属性和方法 或者重写 装饰器就是函数 函数返回函数 执行完成之后还是函数
// 使用装饰器的目的 语法糖 为了使用简单
// 范围 只能装饰类 不能装饰函数(以为函数会变量提升)

function aaa(target: any) {
  console.log('2');
}

function xxx(target: any) {
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
function toUpperCase(target: any, key: string) {
  console.log(target, key);
  let value = target[key];
  Object.defineProperty(target, key, {
    get() {
      return value.toUpperCase();
    },
    set(newVal) {
      value = newVal;
    },
  });
}
function double(num: number) {
  return function (target: any, key: string) {
    //修饰静态属性 target 类
    let value = target[key];
    Object.defineProperty(target, key, {
      get() {
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
function toEnum(target: any, key: string, description: PropertyDescriptor) {
  console.log(target, key, description);
  // configurable: true enumerable: true value: ƒ () writable: true
  description.enumerable = false;
}

@aaa
@xxx
class Person {
  say!: Function;
  // 比如初始化的时候装饰属性
  @toUpperCase
  name: string = ' zhangLi'; // 直接默认走set
  @double(3)
  static age: number = 10; // 修改类静态属性时 不会走set方法

  @toEnum
  getName() {}
}

let person = new Person();
// 需要在类中生命 say方法 不然会报错
// person.say();
console.log(person.name); // ZHANGLI
console.log(Person.age); // 30

export {};
