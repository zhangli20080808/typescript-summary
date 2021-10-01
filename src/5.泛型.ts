/**
 * 范型 generic
 * 理解 - 范指的类型，可以理解为、当调用的时候来传入一个具体类型 先用一个标识来占位
 * 特性 - 1. 在声明时不能确定类型,只有在使用的时候才能决定类型 2. 编译期间进行数据类型安全检查的数据类型
   注意：范型是参数化的数据类型，使用时明确化后的数据类型  就是参数的值
 * 在 TypeScript 的整个类型编程体系中，它是最基础的那部分，所有的进阶类型都基于它书写。
 * 就像编程时我们不能没有变量，类型编程中的变量就是泛型。

   使用范围 - 函数 类 类型别名 类
 *
 * 在类型编程里，泛型就是变量。

   a. 范型格式
   范型 形参参数类型一般有两种表示：1. A-Z的字母(大多数情况) 2. 语义化的单词来表示->装饰器的应用较多
   b. 范型的any化 - 范型默认值的一种特殊情况，没有给范型指定特定类型的时候，就会采用默认值
   c. 范型的默认值问题
 *
 * https://juejin.cn/post/6989796543880495135#heading-1
 */

/** =======================  函数中范型的声名 和普通的类型使用基本上是一致的，不过要<>声名  =========================**/

function sun<T>(first: T, second: T): T {
  return first;
}

function map<T>(params: T[]) {
  // function map<ABC>(params: Array<ABC>) {
  return params;
}

// 多个范型
function sun2<T, P>(first: T, second: P) {
  return `${first}${second}`;
}

sun<string>('1', '2');

map<string>(['123', '456']);

sun2<string, number>('1', 2); // 如果我们不写传入的类型对范型进行匹配的话， TS会帮我们做类型推断

// 范型不止可以定义一个参数，也可以定义两个参数

/** =======================  class中范型的使用  =========================**/

interface Item {
  name: string;
}

// 1. 类中声名范型，不知道什么类型
// 2.T extends Item -> T未来会对应一个具体的类型，具体的类型必须拥有 Item中的所有属性
// 3. 实例化的时候 就得到了一个具体类型

class DataManager<T extends Item> {
  constructor(private data: T[]) {}

  // 根据索引来查找
  getItem(index: number): string {
    return this.data[index].name;
  }
}

const data = new DataManager([
  {
    name: 'zl',
  },
]);

// 思考？ 在具体类型上面的一些约束，以及参数的具体化
// 目前 DataManager 是可以接受所有类型的，如果只接受 string 或者 number 该如何处理呢？
// 可以描述 对象 函数 类 类的实例 - demo 根据传入的类返回对应的实例
class Person2 {
  constructor(public name: string, public age: number) {}
}

interface Constructor<T> {
  // 表示一个构造函数类型
  new (...args: any[]): T; // 可以用类当做类型
}
// type Constructor<T> = new (...args: any[]) => T;

// new (name:string) => any
function createInstance<T>(constructor: Constructor<T>, ...args: any[]) {
  return new constructor(args);
}

let result = createInstance<Person2>(Person2, 'zl', '1');
let result2 = createInstance(Person2, 'zl', '1'); // 也可以自己去推导，不需要将T具体化

// 参数args具体化
function createInstance2<T, CP extends new (...args: any[]) => any>(
  constructor: Constructor<T>,
  ...args: ConstructorParameters<CP>
) {
  return new constructor(...args);
}
let result3 = createInstance2<Person2, typeof Person2>(Person2, 'zl', 20);

/**
unknown/object/Object 区别
思考1？ 
a. object为什么不能代替类上的范型的3个原因
1. 编译期间object无法进行类型安全检查，而范型在编译期间可以进行类型检查，比如有 Customer,Student类，我们只希望
   添加Customer类的对象，当添加其他类的对象的时候，就会报错，object是做不到的
2. object无法接受非object类型的变量，范型可以
3. object类型数据获取属性和方法 没有自动提示   
// let a: object = {}; // 点不出属性
// let b: Object = {}; // 可以点出Object上的属性方法，unknown 点不出


b. any 为什么也不能替换范型上的类型
1. any编译期间 无法进行类型安全检查，而范型可以
2. any可以获取任意属性和方法而不会出现编译错误，导致潜在风险，而范型有效的规避了这些问题
3. 没有提示
*/

export {};
