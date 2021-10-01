/**
   特性
   Typescript 更像Java,让Js可以开发大型企业应用，弱类型可能会隐藏很多错误，ts不会取代ts，只是类型校验
   ts提供的类型系统帮助我们在写代码时丰富的语法提示
   编写代码时，会对代码进行类型检查从而避免很多的线上错误

 * 1. 基础类型  - 字符串 数字 布尔类型 元组 枚举 any null undefined symbol void
 * 2. 对象类型  - 把基础类型合并到一起的一种复杂类型 比如 teacher
 */

/** ====================================  对象类型 对象 数组 函数  =========================**/
// 元组 标识长度和个数都 (内容存放类型) 限制好了
let tuple: [string, number, boolean] = ['zl', 123, true];
// 可以向元组中添加内容，不能通过索引添加属性 只能通过方法
// 只能放入元组中已经声明过的类型,此处push对象 会报错
tuple.push('name');

/**
 * 使用场景 比如csv 文件格式的转化
 */
const testList: [string, string, number][] = [
  ['zk', 'male', 20],
  ['zl', 'female', 21],
  ['zc', 'male', 20],
];

// 对象类型
const teacher: {
  name: string;
  age: number;
} = {
  name: 'zl',
  age: 18,
};

// object 除了 number, string, boolean, bigint , symbol, null, or undefined，其他都是 object。
// 注意： 对象类型，非原始对象类型 object 比如平时传入的参数是对象，类型又想使用object
const create = (obj: object) => {};

create({});
create([]);
create(function () {});

// 如果不在自己定义的模块内 声名name会报错 因为全局下已经声名了name
let name = '1';

// 数组 存放一类类型的集合
let arr1: number[] = [1, 2, 3];
let arr2: undefined[] = [undefined, undefined];
type User = { name: string; age: number };

let objectArr: User[] = [{ name: '123', age: 10 }];

// 其他的case，比如 JSON.parse()并不会帮我们自动去推断
interface Name {
  name: string;
}

const rowData = '{"name":"zl"}';
const newData: Name = JSON.parse(rowData);

/* ================         联合类型              ================*/
// 联合类型可以看做并集 既能使用字符串 也能使用数字 当没有初始化的时候，只能调用两者中公有的方法
// 联合类型最主要的使用场景还是 条件类型 部分
let arr3: (string | number)[] = [1, 2, 3, '4'];
let arr4: Array<string | number> = [1, 2, 3, '4'];

let ele: HTMLElement | null = document.getElementById('id');
ele!.style.color = 'red'; // ! 非空断言，一定有值 ts语法只能存在ts中
// ele?.style.color = 'red'; // ele&&ele.style

// 类型断言 不能断言不存在的属性
(ele as HTMLElement).style.color = 'green';

// 类型别名 type
// 以往
export const STATUS = {
  //   na: 'xxx',
  //   nb: 'bbb',
};

/** ====================================  枚举类型  =========================**/
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

/** ====================================  undefined | null   =========================**/

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

/** ======== never类型 - 表示永远不会出现的类型，通常被用来收窄联合类型或是接口，或者作为条件类型判断的兜底 =======**/

/***
 * 1. never类型 永远不是任何类型的子类型 可以把never赋值给任意类型
 * 2. 永远达不到有三种情况 1.错误 2. 死循环 3.类型判断时会出现never
 * 3. 尤大对never类型的理解介绍 https://www.zhihu.com/question/354601204/answer/888551021
 */

// let n!: never;
// str2 = n;

function MyError(): never {
  throw new Error('xxx');
}
function whileTue(): never {
  while (true) {}
}
function byType(val: string | number) {
  if (typeof val === 'string') {
    // val.replace();
  } else if (typeof val === 'number') {
    // val.toFixed;
  } else {
    // 取不到类型或值得时候 都是never 比如参数类型 val 没有 boolean的时候
    val; // never  主要永远完整性和标识出错的情况
  }
}

let n = MyError(); // n->never

// Symbol BigInt Symbol表示独一无二 比如做一些常量 或者一些私有属性 都可以使用Symbol
let s1 = Symbol('zl');
let s2 = Symbol('zl');

console.log(s1 === s2); // false

// BigInt
// let num1 = Number.MAX_SAFE_INTEGER + 1;
let num1 = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
// let num2 = Number.MAX_SAFE_INTEGER + 2;
let num2 = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(2);
console.log(num1 === num2); // true 包装之后 false

/** ======== 类型的问题  1. 类型推断 2. 类型问题  =======
 number和Number的区别？ 
**/

// 11..toString()  11.0.toString
let number1: number = 123;
let number2: Number = 123;
let number3: number = Number(11); // 转成number赋值给number，也行
// let number4 :number = new Number(11) {}  错误语法  不能把实例赋值给基本类型
// 类也是一个类型 可以描述实例 也可以描述基本类型，一般我们标注类型都使用基本类型
// https://juejin.cn/post/6844903710120738824 -》思考类型使用具体情节
let number5: Number = new Number(11);

/**
 tuple  tuple 是 “数量固定，类型可以各异” 版的数组。
 典型的元组
 在 React 中有可能使用 tuple 的地方就是 custom hook 的返回值，注意 isHappy → tomIsHappy 以及其他名字的变化，这里使用 tuple 的好处就显现出来了：便于使用者重命名：

 const useHappy = () => {
   //....
   return [isHappy, makeHappy, makeUnHappy]
}

 const SomeComponent = () => {
  const [tomIsHappy, makeTomHappy, makeTomUnHappy] = useHappy(false)
  // ...
}
 */
// 啥时候需要声明类型 理论上来说在我们声明任何变量的时候都需要声明类型（包括普通变量、函数、组件、hook 等等），
// 声明 函数、组件、hook 等需要声明参数 和 返回值的类型。

/**
4.x版本的一些新特性
1. const 为何也能被修改？ 如何解决
 */
const arrList = [1, 2, 3, 'zhangLi'];
arrList[0] = 4;

// 通过  as const 对数组种每一个元素做了一个只读限制，导致无法修改
const arrList2 = [1, 2, 3, 'zhangLi'] as const;
// arrList2[0] = 4  //报错 无法分配到 "数组的索引为0的位置的元素" ，因为它是只读属性。ts(2540)

function showArr(arr: readonly any[]) {
  // readonly 不允许修改
  console.log(arr);
}
showArr(arrList2); 
