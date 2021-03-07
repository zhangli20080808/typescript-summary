// 泛型 就是当调用的时候来传入一个类型 先用一个标识来占位
// 特性 在声明时不能确定类型 只有在使用的时候才能确定类型
// 使用 函数 接口 类型别名 类

// 函数中使用
function createArray<T>(times: number, val: T) {
  let result = [];
  for (let i = 0; i < times; i++) {
    result.push(val);
  }
  return result;
}
let res = createArray<string>(3, 'abc'); // 不传入会自动推到
// 泛型可以使用多个 比如有很多参数 每个参数都有类型

//  交换类型 传入参数是个元组 [number,string] => [string,number]
// A B代表类型变量
// function swap<T, K>(tuple: [T, K]): [K, T] {
//   return [tuple[1], tuple[0]];
// }
// swap([1, 2]);

// 写到函数上的泛型 表示调用函数的时候 传入具体类型
// 写在接口后面的 表示使用接口时传入的类型  MySwap<T, K>
interface MySwap<T, K> {
  (tuple: [T, K]): [K, T];
}
interface IArr<B> {
  [key: number]: B;
}
const swap = <B>(tuple: IArr<B>): IArr<B> => {
  return [tuple[0], tuple[1]];
};
let r = swap([0, '1']);

export {};
