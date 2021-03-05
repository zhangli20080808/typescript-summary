// 基础类型  字符串 数字 布尔类型 元组 枚举 any null undefined
// 元组 标识长度和个数都 (内容存放类型) 限制好了
let tuple: [string, number, boolean] = ['zl', 123, true];
// 可以向元组中添加内容，不能通过索引添加属性 只能通过方法
// 只能放入元组中已经声明过的类型
tuple.push('name');

// 数组 存放一类类型的集合
let arr1: number[] = [1, 2, 3];

// 联合类型可以看做并集 既能使用字符串 也能使用数字
let arr3: (string | number)[] = [1, 2, 3, '4'];
let arr4: Array<string | number> = [1, 2, 3, '4'];

// 以往
// export const STATUS = {
//   na: 'xxx',
//   nb: 'bbb',
// };

// 枚举类型
enum USER_ROLE {
  USER = 0, // 默认下标是从0开始
  ADMIN,
  MANAGE,
}
// 默认可以正向取出，也可以反举  传入一个对象，往对象中不停的赋值
// console.log(USER_ROLE[0]); // USER
// console.log(USER_ROLE['USER']); // 0

// 异构枚举 可以在枚举中放不同的类型 可以通过数字向下推断
// 常量枚举 默认只是提供了一个类型

const enum USER_ROLES {
  USER,
  ADMIN,
}
console.log(USER_ROLES.ADMIN);

// any类型 不进行类型检测 相当于没有写类型
// null undefined 任何类型的子类型
// 在严格模式下 只能将null赋值给null undefined 赋予给 undefined
let str2: number | string | undefined;
str2 = undefined; // 不能将类型“undefined”分配给类型“string | number”
let u: undefined = undefined;

// void 只能接受 null 和 undefined  一般用于 函数的返回值
// 函数默认的返回值是 undefined 默认在严格模式下，不能讲null赋给void
let v: void;
// v= null // 严格模式报错
v = undefined;

// never类型 永远不是任何类型的子类型 可以把never赋值给任意类型
// 永远达不到有三种情况 1.错误 2. 死循环 3.类型判断时会出现never

// function MyError(): never {
//   throw new Error('xxx');
// }
// function byType(val: string | number) {
//   if (typeof val === 'string') {
//     val;
//   } else if (typeof val === 'number') {
//     val;
//   } else {
//     // 取不到类型或值得时候 都是never
//     val; // never  主要永远完整性和标识出错的情况
//   }
// }

// let n = MyError(); // n->never

// Symbol BigInt Symbol表示独一无二 比如做一些常量 或者一些私有属性 都可以使用Symbol
let s1 = Symbol('zl')
let s2 = Symbol('zl')