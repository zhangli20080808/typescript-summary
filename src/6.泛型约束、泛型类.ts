/**
 * 泛型 就是当调用的时候来传入一个类型 先用一个标识来占位
 * 特性 在声明时不能确定类型 只有在使用的时候才能确定类型
 * 使用 函数 接口 类型别名 类
 */

// 函数中使用
function createArray<T>(times: number, val: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < times; i++) {
        result.push(val);
    }
    return result;
}

// 使用方式 2种 复杂场景可能需要手动传入
let res = createArray<string>(3, 'abc'); // 不传入会自动推到

// 类型推断
let res2 = createArray(3, '111');

// 泛型变量 可以使我们的T当做一部分使用 而不是整个类型的使用 灵活
function ident<T>(arg: T): T {
    return arg;
}

// 泛型函数类型
let myIdent: <T>(arg: T) => T = ident;

// 使用对象字面量形式定义
interface GenericIdent<T> {
    (arg: T): T;
}

let myIdent2: GenericIdent<number> = ident;

// 泛型可以使用多个 比如有很多参数 每个参数都有类型

//  交换类型 传入参数是个元组 [number,string] => [string,number]
// A B代表类型变量
// function swap<T, K>(tuple: [T, K]): [K, T] {
//   return [tuple[1], tuple[0]];
// }
// swap([1, 2]);

// 写到函数上的泛型 表示调用函数的时候 传入具体类型
// 写在接口后面的 表示使用接口时传入的类型  MySwap<T, K>
// interface MySwap<T, K> {
//   (tuple: [T, K]): [K, T];
// }
// interface IArr<B> {
//   [key: number]: B;
// }
// const swap = <B>(tuple: IArr<B>): IArr<B> => {
//   return [tuple[0], tuple[1]];
// };
// let r = swap([0, '1']);

// 函数求和
const sum = <T extends number>(a: T, b: T): T => {
    return (a + b) as T;
};
sum(1, 2); // 1和2具备数字的能力，约束T是number类型
//  extends 泛型约束 约束泛型的能力

// 希望传入的数据 只要是带有length属性就可以 可以使字符串 数组各种把
// 此处的extends不是继承的意思 是包含、约束的意思 T满足WithLen里面的条件
type WithLen = { length: number };

function getType<T extends WithLen>(obj: T) {
    obj.length;
}

getType('1');

// 默认泛型 不传递 默认给与类型
interface DStr<T = string> {
    name: T;
}

type T1 = DStr;
type T2 = DStr<number>;
type T3 = DStr<boolean>;
let str1: T1 = {name: '123'};
let str2: T2 = {name: 123};
let str3: T3 = {name: true};

// 属性约束
// 1. T是一个对象类型 2.K是T中的一个属性
// keyof 表示取对象中所有的key属性
const getVal = <T extends Object, K extends keyof T>(obj: T, key: K) => {
    return obj[key];
};
getVal({a: 1, b: 2}, 'a');

type t1 = keyof any; // string | number | symbol
type t2 = keyof (string | number); // "toString" | "valueOf"

// 泛型类 类中使用泛型
// 注意 泛型类指的是我们实例部分的类型  类的静态属性是不能使用的
class MyArray<T> {
    public arr: T[] = [];
    public num!: T;

    add(v: T) {
        this.arr.push(v);
    }

    set!: (x: T, y: T) => T;
}

let array = new MyArray<number>();
array.add(1);
array.add(2);
array.add(3);

// 类类型在工厂函数中的应用
function create<T>(c: { new(): T }): T {
    return new c();
}

export {};
