// es6中的类  类来调用的静态属性 私有的实例属性 共享的原型属性

// as 断言成 xxx
// ！非空断言
// ？链判断运算符 有值取值 没有 返回undefined

class Pointer {
  x!: number; // 表示实例上有这个属性
  y!: number;
  constructor(x: number, y?: number, ...args: number[]) {
    // 这些参数 函数中的使用方式，这里都可以使用
    this.x = x;
    // 因为我们的参数是可选的 undefined不能赋值给number 可以采用 断言 或者类型保护的方式解决这个问题
    // if (y) {
    //   this.y = y;
    // }
    this.y = y as number;
  }
}
let point = new Pointer(1, 2, 3, 4, 5);

// 类中的修饰符  (public private  protected  限制了访问空间和访问范围) readonly
// 1. public 表示父类本身 子类 外面都可以访问这个属性
// 2. protected 受保护的 父类本身 子类 能访问到这个属性 外面访问不到
// 3. private 私有属性 只有自己能访问到

// 如果 constructor 被标识成了 protected、private,则此类不能被new，被标识成了private，则不能被子类继承
class Animal {
  protected name!: string;
  public readonly age!: number; // 标识 此属性不能更改 readonly
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  // 静态属性和静态方法 通过类来调用的都是静态方法(是可以被继承的)
  static type = 'animal';
  static getName() {
    return 'zhangLi';
  }
  say() {
    console.log('父类 say');
  }
}
// let animal = new Animal('大象', 100);

class Cat extends Animal {
  address = '';
  constructor(name: string, age: number, address: string) {
    super(name, age); // Animal.call 指代父类
    this.address = address;
  }
  // 子类重写父类的静态方法 调用父类的静态方法 通过super 静态方法中的super指代的是父类
  static getName() {
    console.log(super.getName());
    return '猫';
  }
  say() {
    // 原型中的super指代的是父类的原型
    super.say(); // Animal.prototype
    console.log('cat say');
  }
  private _eat: string = '';
  // 属性访器 来访问私有属性
  get eat() {
    // 原型属性
    return this._eat;
  }
  set eat(newVal) {
    this._eat = newVal;
  }
}
let tom = new Cat('tom', 100, 'US');
console.log(Cat.getName());
// tom.say();
tom.eat = 'hello';
console.log(tom.eat);

// 原型 实例 静态 super 属性访问器
export {};
