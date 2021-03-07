class Person2 {
  constructor(public name: string) {
    this.name = name;
  }
}

interface IClass<T> {
  // 表示一个构造函数类型
  new (name: string): T; // 可以用类当做类型
}

function createInstance<T>(classN: IClass<T>, name: string) {
  return new classN(name);
}

let result = createInstance<Person2>(Person2, 'zl');

// 泛型 就是当调用的时候来传入一个类型 先用一个标识来占位
// 特性 在声明时不能确定类型 只有在使用的时候才能确定类型
// 使用 函数 接口 类型别名 类

// 函数中使用
function createArray(times: number, val: any) {
  let result = [];
  for (let i = 0; i < times; i++) {
    result.push(val);
  }
  return result;
}
let res = createArray(3,'abc')
export {};
