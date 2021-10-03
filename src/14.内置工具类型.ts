/**
 * 
 * 1. 各种内置工具类型的理解
 * 2. keyof 理解
   K extends keyof any  /  K in keyof T   /  K in T  /  深入Record完成异步数据扁平化 
 * 3. in 操作符的理解 - 完全可以把它理解为 for...in/for...of 这种遍历的思路
 * 4. extends 简单理解 - 约束  T extends U ? X : Y ->  U 中的属性在 T 中都有
 * 5. never类型，它表示永远不会出现的类型，通常被用来将收窄联合类型或是接口，或者作为条件类型判断的兜底
 * 6. typeof 获取类型
   5. object 和 Record的区别 

 * +? 变为可选  -? 变为必选   修饰符 ？+ -
 * 1. Partial 可以将传入的属性由必选变成非可选
 * 2. Required  把可选项变成必选项
 * 3. Readonly  [只读修饰符：readonly，位置在键名，如 readonly key: string,去除只读修饰符：-readonly，位置同readonly。]
 */

type T1 = keyof any; // string | number | symbol

/** ====================================  Partial 必选变成非可选  =========================**/

/**
*  很好理解 批量定义
*  1. keyof T 拿到T对应key的所有集合,循环 T
*  2. 迭代T中的所有T 通过 P in keyof T
    T[P] -> 获取值得类型
* 
*  type Partial<T> = {
        [P in keyof T]?: T[P]; 
    };

    3. Teacher -> 范型中keyof的使用
    场景：类中有一个对象，根据index或者key值获取对象中的某一项内容的时候，又想正确的推断出返回内容的类型的时候，可以使用 Teacher 这种模式
    4. in keyof T 和 extends keyof T 的区别
    [P in keyof T] -> 精确匹配  && <T, K extends keyof T> -> 包含了里面的属性值就可以，多了无所谓
*/
interface IPerson {
  name: string;
  age: number;
  gender: string;
}
class Teacher {
  constructor(private info: IPerson) {}

  // getInfo1(key: string) {
  //   if (key === 'name' || key === 'age' || key === 'gender') {
  //     return this.info[key]
  //   }
  // }

  //  [type T = 'name' ,key:'name',Person['name']]  [type T = 'age' ,key:'age',Person['age']]  [type T = 'gender' ,key:'gender',Person['gender']]
  // T extends 'name'  等价于  type T = 'name'
  getInfo<T extends keyof IPerson>(key: T): IPerson[T] {
    return this.info[key];
  }
}

const teacher = new Teacher({
  name: 'zl',
  age: 18,
  gender: 'male',
});
const test = teacher.getInfo('name');
// const test2 = teacher.getInfo1('names') // 自动推断出三种类型，最终返回字符串，可以手动 as ,不是最优解->string | number | undefined

type A = Partial<IPerson>;
const a: A = {
  name: '123',
  age: 1,
  gender: 'male',
};

// 不过需要考虑嵌套的情况
interface Company {
  name: string;
  id: number;
}

interface Person {
  name: string;
  id: number;
  company: Company;
}

// 递归变成可选项 取到的值如果还是对象 进行递归操作
type DeepPartial<T> = {
  [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U];
};

type PersonPartial = DeepPartial<Person>;
// 如果传了 company 但是 company 没有传id 和 name 会报错 不过也可以处理 实现DeepPartial 将每个属性变成可选类型

let p: PersonPartial = {
  name: 'zl',
  id: 12,
  company: {},
};

/** ====================================  Required - 把可选项变成必选项 =========================**/

interface ATest {
  name: string;
  id?: number;
}
// type Required<T> = { [P in keyof T]-?: T[P]; }
type RequireA = Required<ATest>;
const demo: RequireA = {
  name: 'zl',
  id: 1,
};

/** ====================================  Pick - 捡 只需要的属性 =========================**/
/**
* 场景：比如说 需要从一个接口中 挑选出一些字段
  对比：Extract -> 把相同的部分抽离出来，多个选几个 && Pick - 从某个类型中挑选属性
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
*/

interface Person2 {
  name: string;
  id: number;
  age: number;
}
let result: Person2 = { name: 'zl', id: 1, age: 20 };
type KeyOfPerson = keyof Person2; // "name" | "id" | "age"
type ResultInfo = Pick<Person2, 'name' | 'id'>;

// example TODO
interface ToDo {
  title: string;
  completed: boolean;
  desc: string;
}
let todoList: ToDo[] = [
  {
    title: '开发管理',
    completed: true,
    desc: '13123123',
  },
  {
    title: '测试',
    completed: true,
    desc: '456',
  },
];
type MyRecord<T> = {
  [P in keyof any]: T;
};

type TodoRecordType = MyRecord<ToDo>;
let todoTypeRecord: TodoRecordType = {};
todoList.map((todo) => {
  todoTypeRecord[todo['title']] = todo;
});
console.log(todoTypeRecord, 'todoTypeRecord');

// pick出  completed 和 title 为 预览做准备
type TRestObj = MyRecord<Pick<ToDo, 'title' | 'completed'>>;
function convertSubTodoItemList() {
  // reduce 第二个参数是 Todo 类型，所以可以解构成{ title, completed }
  return todoList.reduce((prev, { title, completed }) => {
    return {
      ...prev,
      [title]: { title, completed },
    };
  }, {} as TRestObj);
}

// 方法二
let subTodoItemList: MyRecord<Pick<ToDo, 'title' | 'completed'>> = {
  title: { title: 'df', completed: false },
};
function convertSubTodoItemList2(subTodoItemList: TRestObj = {}) {
  todoList.forEach(({ title, completed }) => {
    subTodoItemList[title] = { title, completed };
  });
  return subTodoItemList;
}

/** ====================================  Exclude - 移除传入的键值 =========================**/
/**
 * type Exclude<T, U> = T extends U ? never : T;
 * 类型参数在 U 中，就剔除掉它（赋值为 never）
 */
type ExcludeDemo = Exclude<string | number | boolean, string | number>; // boolean

// /** ====================================  Extract - 移除传入的键值 =========================**/

// Extract 有啥区别  对象中提取  类型提取把可选项变成必选项
// type Extract<T, U> = T extends U ? T : never;
type E = Extract<string | number | boolean, string | number>;
let e: E = 1; // string | number

/** ====================================  Omit - 移除传入的键值 =========================**/

/**
 * 简单理解： 使用 Exclude 对原接口成员，删除掉传入的联合类型成员，再使用 Pick
 * K extends keyof any - 剔除的参数必须是联合类型，做一个约束
 */

type OmitDemo<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/** ===============  Record 记录 - 将一个类型的所有属性值都映射到另一个类型上并创建新的类型 =========================**/
// 使用Record完成异步数据扁平化   --  数组->对象
// demo1
// let obj = { name: 'zhangLi', age: 18 };
// 我们可以手动标记类型
// type Record<K extends string | number | symbol, T> = { [P in K]: T; }

// 对象中的key必须是 string、number、symbol
// type XXX = keyof any;
// keyof any -> 三个类型 string | number | symbol

type TestRecord<K extends keyof any, T> = {
  [P in 'name' | 'age']: T;
};
// let obj2: TestRecord<string, IPerson> = {
//   name: { name: 'zl', age: 1, gender: '' },
//   age: { name: 'zl', age: 1, gender: '' },
// };

let obj: Record<string, any> = { name: 'zhangLi', age: 18 };
// let obj2: Record<string, number> = { name: 'zhangLi', age: 18 };  // 报错

type MyName = 'a' | 'b' | 'c';

interface IPersonName {
  widgets: string[];
  title?: string;
  keepAlive?: boolean;
}
const newRecord: Record<MyName, IPersonName> = {
  a: { widgets: ['1'], title: 'zl', keepAlive: true },
  b: { widgets: ['1'], title: 'zl', keepAlive: true },
  c: { widgets: ['1'], title: 'zl', keepAlive: true },
};

// 比如可索引类型
interface Foo {
  [keys: string]: string; // 可以是字符串，数字
}
// 等同于Record<string, string>

// 小demo理解
type TestType = {
  name: string;
  [x: number]: any;
};
// let testType: TestType = { name: 'zl', 101: 'xxx', '102': 'xxxx', '101d': 123 };

// Record理解  比如传入一个对象 返回一个新对象

/**
 * map 方法
 * name,age  - T
 * zhangLi 18 - K
 * U 函数返回值
 */

function map<T extends keyof any, K, U>(
  obj: Record<T, K>,
  cb: (item: K, key: T) => U
): Record<T, U> {
  let result = {} as Record<T, U>;
  for (let key in obj) {
    result[key] = cb(obj[key], key);
  }
  return result;
}

let res = map({ name: 'zhangLi', age: 18 }, (item, key) => {
  // return `${item}_ok`; // Record<"name" | "age", string>
  // return 123  // Record<"name" | "age", number>
  return { apple: `${item}_ok` };
  //   Record<"name" | "age", {
  //     apple: string;
  // }>
});
const goodSId = Symbol('goodId');
interface Goods {
  [goodSId]: number;
  name: string;
  price: number;
}
let goodRecord: Record<number, Goods> = {};
let good: Goods = { [goodSId]: 101, name: 'zl', price: 100 };
// 目标
// {101: {[goodSId]: 101, name: 'zl', price: 100 }}}
// 单个对象转化
// goodRecord[good[goodSId]] = good;
// {
//   "101": {
//       "name": "zl",
//       "price": 100
//       "Symbol(goodId)": 101
//   }
// }
// console.log(goodRecord,'');
// 处理数组
let goodsList: Goods[] = [
  {
    [goodSId]: 101,
    name: '1',
    price: 1,
  },
  {
    [goodSId]: 102,
    name: '2',
    price: 2,
  },
  {
    [goodSId]: 103,
    name: '3',
    price: 3,
  },
];
goodsList.forEach((goods) => {
  goodRecord[goods[goodSId]] = goods;
});
console.log('goodRecord', goodRecord);
//  {
//   101: {name: '1', price: 1, Symbol(goodId): 101
//   102: {name: '2', price: 2, Symbol(goodId): 102}
//   103: {name: '3', price: 3, Symbol(goodId): 103}
//  }

// 第二种扁平化实现方式 使用 keyof any
let goodRecord2: Record<keyof any, Goods> = {};

/**
Record 和 object 的区别
 1. Record具备泛型，获取值可以有自动提示功能，object无法实现提示
 2. Record获取的是索引参数类型，所以可以赋值为空 object也可以，但是再次赋值会报错
 */
let objTest: object = {};
objTest.then = 'fd';

let objTest2: Record<any, any> = {};
objTest2.then = '123'
/**
 Record和Map的区别
 实际开发在显示数据时候，数据扁平化我们采用 Record，主要是正好符合 Record的特性
 reason1: Record有多种实现方式，Map需要修改底层源码才能做到
 reason2: Record属于轻量的type类型，Map相对重量级
 如果读取和显示数据频繁，使用 前者
 如果增删改比较多，使用Map
 */

let goodMap = new Map<any, Goods>();
goodMap.set('zl', good);
goodMap.set('行脚', good);
goodMap.set(good[goodSId], good);
export {};
