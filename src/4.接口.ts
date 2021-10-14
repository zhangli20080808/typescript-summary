/**
 * 接口 -> 其实就是在开发过程中，TS帮助我们做语法提示的一个东西
 * 1. 描述对象的属性、形状
 * 2. 根据接口 提供一些新的类型，供别人使用 

 * 相同点 - 都可以描述一个函数或者对象
   不同点 - 接口可以被实现，被继承 , type不能，但是type可以通过交叉类型 来实现 extends的行为，并且两者并不是相互独立的
   也就是说 interface 可以 extends type, type 也可以 与 interface 类型 交叉
 * 
   不同点 
 * 1. type 可以声明基本类型别名，联合类型，元组等类型
   2. interface 能够声明合并，type不行
 * 原则： 一般 能用接口就是用接口，不能就换成type， type只是一个别名，接口才是真正的类型
 *
 * interface可以描述 (属性、方法、类)
 * 3. 描述函数
 * 4. 接口特性
 * 5. 参数 传入一个变量和以字面量的形势传递进去是有区别的
 *
 * 6. 可索引接口
 * 7. extends 和 implements 的应用场景
 *    a. extends：类继承interface 或 abstract 时使用
 *    b. implements：子类继承父类时使用

 * 8. class实现接口 和 继承接口有什么区别？
 *    JavaScript是单继承的，如果你继承了一个类就不能再继承其他类，不过可以实现多个接口

   类和接口有什么区别呢？接口是规范，类是对接口规范的实现
   接口只是一个类型 - 修饰对象或者被类实现，经过ts编译后就会消失
   类既是接口，又是类型

   8. 类的接口和抽象类有什么区别
   接口就是接口、类就是类、类可以实现接口
  
 */

/* ===============  type 与 type 交叉 =================*/

type Name1 = {
  name: string;
};
type User1 = Name & { age: number };

/* ===============  interface extends type =================*/
type Name = {
  name: string;
};
interface User extends Name {
  age: number;
}
let user: User = { name: 'zl', age: 10 };

/* ===============  type 与 interface 交叉 =================*/
interface Name3 {
  name: string;
}
type User3 = Name & {
  age: number;
}

/* ===============  描述函数 =================*/
interface IFullName {
  // 在接口中不能 ()=>void
  apple: () => void;
  (firstName: string, secondName: string): string;
}

/* ===============  描述混合类型  计数器 一个函数返回一个函数 返回的函数有属性 既是函数又是属性 =================*/
interface ICount {
  (): number;

  count: number;
}

const fn: ICount = () => {
  return ++fn.count;
};
fn.count = 0;
console.log(fn());
console.log(fn());

/* ===============  接口特性 =================*/
interface IVeg {
  taste: string;
  color: string;
  // readonly a?: string;

  // 可选属性 只读属性
  [key: string]: any; // 自定义类型 限制死的 其他的随意
}

// 1. 如果定义的值比接口中的多 可以采用类型断言 直接断言成对应的接口
const tomato: IVeg = {
  taste: 'great',
  color: 'red',
  size: 10,
} as IVeg;

// 2. 多个重名接口会进行合并操作
interface IVeg {
  size: number;
}

// 接口拓展 不改变原有接口上
interface ITest extends IVeg {
  size: number;
}

const tomato2: ITest = {
  taste: 'great',
  color: 'red',
  size: 10,
};

/* ===============  可索引接口 =================*/
interface IArr {
  [key: number]: any;
}

let arr: IArr = [1, {}, '33'];

// 接口可以被类实现
interface SpeakAble {
  // 接口中的内容都是抽象的，没有具体实现
  name: string;

  say(): void; // 描述类的原型方法 表示不关心方法的返回值,而不是没返回值 - 特性
}

// 接口可以代表函数的类型 描述函数
interface SpeakB {
  sayChinese(): void;

  // (word: string) : string
}

// 注意 可以实现多个接口 要注意接口中如果同名 不同类型 会有问题
// 我们的类应用接口，当我们的类去应用接口的时候，必须要求类中必须含有接口中的属性

class Speak implements SpeakAble, SpeakB {
  sayChinese(): void {
    throw new Error('Method not implemented.');
  }

  // 不加 ! 会报错
  // 说是属性没有在构造器里面初始化。但是每个类每个属性都要初始化的话太麻烦了。可以配置 strictPropertyInitialization-》true 不推荐

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

// 接口继承 -> 父类一般都不会被实例化
class Cat extends Animal {
  name!: string;
}

// 可以描述对象 函数 类 类的实例  参数是变量和字面量时候的区别注意，注意这个校验特性
interface Person {
  name: string;
  age?: number;

  [key: string]: any;

  say(): string;
}

interface Teacher extends Person {
  teach(): string;
}

const getPersonName = (person: Person): void => {
  console.log(person.name);
};
const setPersonName = (person: Teacher, name: string): void => {
  person.name = name;
};
const person = {
  name: 'zl',
  sex: 'male',
  say() {
    return 'hello';
  },
  teach() {
    return 'teach';
  },
};
getPersonName(person); // 不报错
setPersonName(person, 'zl'); // 不报错
// getPersonName({name: 'zl', sex: '123'}) // 报错 -> 当传入字面量的时候，TS会进行强校验，此处多传了
// 但是如果以一个缓存变量的形式传入，就没有这么严格了，只要有就行，多余的属性没有关系



// 不同点
// type 可以声明基本类型别名，联合类型，元组等类型
// 基本类型别名
type Name4 = string

// 联合类型
interface Dog {
    // wong();
}
interface Cat {
    // miao();
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]

// type 语句中还可以使用 typeof 获取实例的 类型进行赋值

// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement('div');
type B = typeof div


// interface 可以而 type 不行 -能够声明合并
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string
}
*/
export {};
