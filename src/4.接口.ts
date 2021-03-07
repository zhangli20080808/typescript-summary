// 接口
// 1. 描述对象的属性、形状
// 2. 根据接口 提供一些新的类 供别人使用

// 接口可以实现 被继承 type不能
// type可以写联合类型

// 一般 能用接口就是用接口，不能就换成type

// interface可以描述 (属性、方法、类)

// 2. 描述函数

// interface IFullName {
//   (firstName: string, lastName: string): string;
// }
// const fullName = (firstName: string, lastName: string) => {
//   return firstName + lastName;
// };

// // 混合类型  一个函数返回一个函数 返回的函数有属性
// interface ICount {
//   (): number;
//   count: number;
// }
// const fn: ICount = () => {
//   return ++fn.count;
// };
// fn.count = 0;

// 3. 接口特性
interface IVeg {
  taste: string;
  color: string;
  readonly a: string;
  // 可选属性 只读属性
  [key: string]: any; // 自定义类型 限制死的 其他的随意
}
// 1. 如果定义的值比接口中的多可以 采用类型断言 直接断言成对应的接口
// const tomato: IVeg = {
//   taste: 'great',
//   color: 'red',
//   size: 10,
// } as IVeg;

// 2. 多个重名接口会进行合并操作
// interface IVeg {
//   size: number;
// }
// interface ITest extends IVeg {
//   size: number;
// }
// const tomato: ITest = {
//   taste: 'great',
//   color: 'red',
//   size: 10,
// };

// 可索引接口
// interface IArr {
//   [key: number]: any;
// }
// let arr: IArr = [1, {}, '33'];

// 接口可以被类实现
interface SpeakAble {
  // 接口中的内容都是抽象的，没有具体实现
  name: string;
  say(): void; // 描述类的原型方法 表示不关心方法的返回值
}
interface SpeakB {
  sayChinese(): void;
}

//  注意 可以实现多个接口 要注意接口中如果同名 不同类型 会有问题
class Speak implements SpeakAble, SpeakB {
  sayChinese(): void {
    throw new Error('Method not implemented.');
  }
  name!: string;
  say(): void {
    throw new Error('Method not implemented.');
  }
}

// 抽象类 不能为实例化 只有抽象类里面的内容 可以被标记 abstract 子类也必须要实现
abstract class Animal {
  // 抽象类中可以包含抽象方法和抽象属性
  abstract name: string; // 可以没有实现
  // 没有标记成 abstract 可以去实现  但是抽象属性必须在子类中实现
  eat() {
    console.log('eating');
  }
}
// 父类一般都不会被实例化
class Cat extends Animal {
  name!: string;
}

// 可以描述对象 函数 类 类的实例

