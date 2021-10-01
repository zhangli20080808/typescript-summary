/**
   后面 - 重点理解 infer 和 TS高级类型 以及泛型的升级进阶
 * 条件类型
 * 语法？ 三元表达式(ts中的语法) -> T extends U ? X : Y
 * 场景？对于类型无法确定的场景， 使用条件类型来在 运行时动态 来确定最终的类型
 * 注意：条件类型不会立刻完成判断，有时会在使用的时候完成判断
   理解成本：何时条件类型系统会收集到足够的信息来确定类型，也就是说，条件类型有时不会立刻完成判断，比如工具库提供的函数，需要用户在使用时传入参数才会完成 条件类型 的判断
 *
 * 内置条件类型 never-永远拿不到，联合类型中如何有never出现，是没有意义的，会变成空
 * 1. Exclude 类型的排除 不同的部分
 * 2. Extract 抽离提取类型 相同的部分
 * 3. NonNullable 从T中排除掉 null undefined
 * 4. ReturnType 获取函数的返回类型
   5. 类型推导 infer 
   5.1 查看函数返回值类型
 */

/** ====================================  泛型约束  =========================**/
function pickSingleValue<T extends object, U extends keyof T>(
    obj: T,
    key: U
  ): T[U] {
    return obj[key];
  }
  /** ====================================   条件分发  =========================**/
  /*
    概念：
   * 1. 裸类型参数 - naked type 裸类型 单纯是T，没有额外被[]包裹过的 -> 条件类型会在实例化时期自动分发到联合类型上
   * 2. 实例化 - 其实就是条件类型的判断过程
   * 3. 分发到联合类型
   * demo
   *     type T1 = TypeName<string | (() => void)>  -> "string" | "function"
   *     对于 TypeName，它内部的类型参数 T 是没有被包裹过的
   *     TypeName<string | (() => void)> 会被分发为 TypeName<string> | TypeName<(() => void)>
   *     最后分发为"string" | "function"
   *
   * 抽象过程
   * ( A | B | C ) extends T ? X : Y
   * 相当于
   * (A extends T ? X : Y) | (B extends T ? X : Y) | (B extends T ? X : Y)
   * 使用[]包裹后，不会进行额外的分发逻辑。
   * [A | B | C] extends [T] ? X : Y
   *
   * 没有被 [] 额外包装的联合类型参数，在条件类型进行判定时会将联合类型分发，分别进行判断
   */
  // naked type 裸类型 单纯是T -> 条件类型会在实例化时期自动分发到联合类型上
  type Naked<T> = T extends boolean ? 'Y' : 'N';
  type Wrapped<T> = [T] extends [boolean] ? 'Y' : 'N';
  
  /** 
  分发两次 'N'|'Y'
  Distributed 类型别名，参数类型 string| boolean 会正确的分发，先分发到  Naked<string> | Naked<boolean>，在进行判断
  Wrapped 不会进行分发，因为被包裹了 所以直接进行判断  [number | boolean]  extends [boolean]  -> 'N'
   */
  type Distributed = Naked<string | boolean>;
  type NotDistributed = Wrapped<number | boolean>;
  
  interface Fish {
    name1: string;
  }
  
  interface Water {
    name2: string;
  }
  
  interface Bird {
    name3: string;
  }
  
  interface Sky {
    name4: string;
  }
  
  // 源码用的多些  写代码会比较少 范型约束 约束这个人是否满足Fish的特性
  type Condition<T> = T extends Fish ? Water : Sky;
  let con: Condition<Fish> = { name2: 'water' };
  
  /**
   * 条件类型的分发 (先将Fish传入->name2 再讲Bird传入->name4)
   * 条件类型有一个特征 分布式有条件类型 ，但是分布式有条件类型是有前提的，
   * 条件类型里待检查的类型必须是 naked type parameter
   *
   * none naked type 此时包裹到其他东西里面去了 就不是 naked类型了 这个时候就不分发了 因为传入进去可能不匹配了
   * type condition2<T> = [T] extends [Fish] ? Water : Sky
   */
  let con1: Condition<Fish | Bird> = { name2: '2', name4: '4' };
  let con2: Condition<Fish | Bird> = { name4: '4' };
  
  let con3: Condition<Fish & Bird> = { name2: 'name2' }; // 没有分发，交叉类型不考虑
  
  // 找出T中不包含U的部分
  type Diff<T, U> = T extends U ? never : T;
  type R = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>; // ->d
  
  type Filter<T, U> = T extends U ? T : never;
  type R4 = Filter<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>; // -> a b c
  
  /** ====================================  Exclude  =========================**/
  // type Exclude<T, U> = T extends U ? never : T
  // type TWorker = 'a' | 'b' | 'c';
  interface Worker {
    name: string;
    age: number;
    email: string;
    salary: string;
  }
  interface Student {
    name: string;
    age: number;
    email: string;
    grande: string;
  }
  // keyof Worker = 'name' | 'age' | 'email' | 'salary'
  type TWorker = keyof Worker;
  // let a: TWorker = 'age';
  type ER = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>; // -> d
  type R5 = Exclude<'age' | 'email' | 'name' | 'xx', keyof Worker>; // ->'xx'
  
  // 获取 Worker 接口类型中存在的属性，在student中不存在的属性
  type TResult = Exclude<keyof Worker, keyof Student>; // salary
  
  /** ====================================  Extract  =========================**/
  /**
  type Extract<T, U> = T extends U ? T : never
   1. 在父类和子类中的应用
   定律：1. 子类 extends 父类 ->返回 true 返回T类型  2. 子类继承父类本身不成立，返回false，返回never类型,如果要成立，属性要一样多
   虽然是个泛型约束，但是子类和父类的继承也是保证这个泛型约束成立不成立的条件之一
   2. 在联合类型中的使用 
   3. 函数约束
   */
  class Person {
    name!: string;
  }
  class ChinesePeople extends Person {
    public phone!: string;
  }
  
  type extraType = Extract<ChinesePeople, Person>; //ChinesePeople
  type extraType2 = Extract<Person, ChinesePeople>; //never
  
  // 联合类型会进行分发 讲never改成boolean
  type Extract2<T, U> = T extends U ? T : boolean;
  type R6 = Extract2<string | number, string>;
  
  // 分解判断
  // 1. 第一次 string extends string ？ T: boolean  -> string
  // 2. 第二次 number extends string ？ T: boolean  -> boolean
  // 联合结果  string | boolean
  
  // 同上， 分别和后面的联合类型进行比较，返回结果
  type R61 = Extract2<string | number | symbol, string | number>;
  
  /**
   * 函数约束 
     条件：参数类型和返回值相同的情况下
     1. 参数少的函数类型 extends 参数多的函数类型 -> true
     2. 参数多的函数类型 extends 参数少的函数类型 -> false
   */
  type fun1 = (one: number, two: string) => string;
  type fun2 = (one: number) => string;
  
  type beginType1 = fun1 extends fun2 ? fun1 : never; // never
  type beginType2 = fun2 extends fun1 ? fun2 : never; // fn2
  
  type ExtractType1 = Extract<fun1, fun2>; // never
  type ExtractType2 = Extract<fun2, fun1>; // (one: number) => string
  
  /** ====================================  NonNullable  =========================**/
  // type NonNullable<T> = T extends null | undefined ? never : T;
  type CommonType = 'a' | null | undefined;
  type R7 = NonNullable<CommonType>; // -> a
  
  /** ====================================  ReturnType 获取函数的返回类型 =========================**/
  // 定义：infer表示在extends条件语句中以占位符来出现用来 修饰数据类型的关键字(守卫后面的数据类型的)，被修饰的关键字要等到使用时才能被推断出来
  // 占位符R出现位置 1. 函数类型的参数类型位置上 2. 函数返回值 3. 会出现在类型的泛型具体化上
  // infer 推断的意思  相当于声明一个变量 R-表示返回值类型 ,infer R -> 取出返回值类型 R 不用声名，占位符一样 infer写在哪里就推导哪里的类型
  // type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
  type R8 = ReturnType<any>;
  
  function getUser(name: string, age: number) {
    return { name: 'zl', age: 20 };
  }
  // 不执行函数，取出类型 typeof
  type GetUserType = typeof getUser;
  type ReturnUserType = ReturnType<GetUserType>;
  let r: ReturnUserType = {
    name: 'z',
    age: 18,
  };
  
  /** =========  Parameters 获取函数参数类型  P-> [string, number] 出入的类型需要是一个函数，infer推导参数 将参数类型推导出来，塞到变量P中，返回P ====**/
  // type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
  type ParamType = Parameters<GetUserType>;
  let params: ParamType; // params-> [name: string, age: number]
  
  /** ================  ConstructorParameters 获取构造函数参数类型 =========================**/
  // 类的双重性质 1.代表构造函数对象变量  2.代表类型
  class Animal {
    constructor(public name: string) {
      this.name = name;
    }
  
    getName() {
      console.log(this.name);
    }
  }
  
  // 获取构造函数参数的类型 - 获取到Animal构造函数参数类型，放到一个元祖中 [name: string]
  // type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
  type Params = ConstructorParameters<typeof Animal>;
  
  // type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
  type PersonInstance = InstanceType<typeof Animal>;
  let instance: PersonInstance = {
    name: 'zl',
    getName() {},
  };
  
  /**
   * infer 应用
   * 元组转 联合
   * E 代表元素的类型 2种类型 不写infer 就是any了 声明在哪里就指向什么类型
   * infer 可以用在任何位置 比如 参数 返回值 函数 等
   * eg:
   * type ExpInfer<T> = T extends { name: infer X } ? X : never
   * type KK = ExpInfer<{ name: string }>  // kk -> string
   */
  
  type ElementOf<T> = T extends Array<infer E> ? E : never;
  type ITuple = [string, number];
  type TupleToUnion = ElementOf<ITuple>; // string | number
  
  /**
   * 如何将 联合类型转化为交叉类型  string | number -> string & number
   */
  type T1 = { name: string };
  type T2 = { age: number };
  // U 要把参数传给a的x 需要name 把参数传给b的x 需要age 所以U 是交叉类型 具备T1和T2的属性
  type ToIntersection<T> = T extends {
    a: (x: infer U) => void;
    b: (x: infer U) => void;
  }
    ? U
    : never;
  type T3 = ToIntersection<{ a: (x: T1) => void; b: (x: T2) => void }>; //T1 & T2
  
  /** ====================================  infer，inference -  用于修饰作为类型参数的泛型 =========================**/
  // infer R，R表示 待推断的类型
  // 通常 infer不会被直接使用，而是与条件类型一起，被放置在底层工具类型中
  
  // type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
  /**
   * 1. (...args: any[]) => infer R 是一个整体，这里函数的返回值类型的位置被 infer R 占据了。
   * 2. 当 ReturnType 被调用，类型参数 T 、R 被显式赋值（T为 typeof foo，infer R被整体赋值为string，即函数的返回值类型）
   *    如果 T 满足条件类型的约束，就返回 infer 完毕的R 的值，在这里 R 即为函数的返回值实际类型
   *    相当于一个变量-占位符
   * 3. 类型系统在获得足够的信息（通常来自于条件的延迟推断）后，就能将 infer 后跟随的类型参数推导出来，最后通常会返回这个推导结果
   */
  
  // demo 参数类型位置上
  // type inferType<T> = T extends (params: infer P) => any ? P : T;
  
  interface Customer {
    name: string;
    money: number;
  }
  // type custFuncType = (cust: Customer,str:string) => void;
  type custFuncType = (cust: Customer, str: string) => string;
  // type InferType = inferType<custFuncType>; //
  // type AAA = (params:infer P)=>any  错误写法  仅条件类型的 "extends" 子句中才允许 "infer" 声明
  
  // 返回值类型上
  type inferType<T> = T extends (params: any) => infer P ? P : T;
  
  type ReturnValueType = inferType<custFuncType>;
  
  /**
  一个类的构造函数的类型表示 1. new (...args:any[])=>any 2. typeof 类
  */
  
  export {};
  