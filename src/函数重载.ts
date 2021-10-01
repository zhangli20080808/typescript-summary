/**
 函数类型 1.声明 2.表达式  可选参数 剩余参数
 * 函数类型的两种声明方式
 1. 在我们熟悉的 “JS 函数” 上直接声明参数和返回值：
 2. 直接声明你想要的函数类型
 注意：最好标注返回值，避免内部书写错误而没有错误提示,比如 add 方
 
 考虑入参和函数的返回值
 声名 不赋值 就是any 类型

 如果使用的是表达式，我们给他定义了类型，可以把一个兼容的函数赋予给它
 */

// 类型守卫 is in -> 进一步收窄类型
export type Falsy = false | '' | 0 | null | undefined;

export const isFalsy3 = (val: unknown): val is Falsy => !val;

const isFalsy = (value: any): boolean => {
  return value === 0 ? true : !!value;
};

type IValue = (value: any) => boolean;

const isFalsy2: IValue = (value) => {
  return value === 0 ? true : !!value;
};

// 对于解构类型的参数定义
function add({ first, second }: { first: number; second: number }): number {
  // return first + second + ''
  return first + second;
}

const test = add({ first: 1, second: 2 });

// 可选参数 两种声名方式
let sum = (a: string, b?: string) => {};
let sum2 = (a: string, b: string = 'b') => {};
sum2('1');

// 剩余参数

let sum3 = (...args: (number | string)[]) => {};
sum3(1, 2, 3, 4);

// 函数的重载  - 比如 希望把一个字符串 或者 数字 转换成一个数组
// 123 -> [1,2,3]
// '123' -> ['1','2','3']
// 主要是ts中的 和js没啥关系 比如需要根据参数的不同 限制他的功能 中间不能包含其他语句
// 我们希望 value是number的时候返回number数组 是string的时候返回string数组
function toArray(value: string): string[];
function toArray(value: number): number[];
function toArray(value: number | string) {
  if (typeof value === 'string') {
    return value.split('');
  } else {
    return value
      .toString()
      .split('')
      .map((item) => parseInt(item));
  }
}
