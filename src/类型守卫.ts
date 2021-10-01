/**
    定义：在语句的会级作用域 缩小变量的一种类型推断的 行为
 *  由于可以为 null 的类型能和其它类型定义为联合类型，那么需要使用类型保护来去除 null
 *  类型保护  具体到某个类型 类型判断
 *  1. typeof - 类型判断，检测一个变量的类型
 *  2. instanceof - 实例判断
 *  3. in - 属性、方法 或者函数判断
 *  4. is
    5. 字面量相等判断 == === != !==
 */
// 去除null 如果编译器不能够去除 null 或 undefined，你可以使用类型断言手动去除。语法是添加 !

function f(sn: string | null): string {
  if (sn === null) {
    return 'default';
  } else {
    return sn;
  }
  // return sn || 'default'
}

/**
 * typeof
 * 检测的范围 - 包括 string | number | boolean | symbol | undefined| object| function
 * 局限性 - 不能区分数组合对象

 * 替代方案 

  Object.prototype.toString.call({}) // '[object Object]'
  Object.prototype.toString.call(null); // '[object Null]'
  Object.prototype.toString.call(new Set()); // '[object Set]'
  Object.prototype.toString.call(new Map()); // '[object Map]'

  替代方案仍然解决不了的问题
  就是无法获取一个自定义的类的实例变量或构造函数的对象变量的真正创建类型，这个时候需要 instanceof 来解决
 */

function getVal(first: string | number, second: string | number) {
  if (typeof first === 'string' || typeof second === 'string') {
    // val.padStart;
    return `${first}${second}`;
  } else {
    // val.toFixed;
    return first + second;
  }
}

/**
 * 区分类 2. instanceof - instanceof类型保护是通过构造函数来细化类型的一种方式
   格式： 对象变量 instanceof 类名或者函数名
   主要作用：准确判断一种自定义函数 或者类创建的对象变量的数据类型
 */

class Dog {}

class Cat {}

let getInstance = (passClass: new () => Dog | Cat) => {
  return new passClass();
};

let instance = getInstance(Dog);
if (instance instanceof Dog) {
  instance;
} else {
  instance;
}

class Bird1 {
  fly() {
    console.log('bird fly');
  }

  layEggs() {
    console.log('bird lay eggs');
  }
}

class Fish1 {
  swim() {
    console.log('fish swim');
  }

  layEggs() {
    console.log('fish lay eggs');
  }
}

function getRandomPet() {
  return Math.random() > 0.5 ? new Bird1() : new Fish1();
}

let pet = getRandomPet();

if (pet instanceof Bird1) {
  pet.fly();
}
if (pet instanceof Fish1) {
  pet.swim();
}

// 3. in 语法来做类型保护

// interface Fish {
//   breathing: string;
// }
// interface Bird {
//   flying: string;
// }
// function getType(animal: Fish | Bird) {
//   if ('breathing' in animal) {
//     animal; // Fish
//   } else {
//     animal; // Bird
//   }
// }

// ts 特有的一些 可辨识的类型
interface IButton1 {
  class: 'warning';
  click: string;
}

interface IButton2 {
  class: 'success';
  move: string;
}

function getButton(val: IButton1 | IButton2) {
  if (val.class === 'warning') {
    // 可以辨识出来是button1
    val;
  } else {
    val;
  }
}

// getButton({class: 'success'});

/**
 * is 语法  用户自定义的类型保护
 * 下面的demo中，animal is Fish -> 类型谓词,谓词为 parameterName is Type 这种形式
 * parameterName 必须是来自于当前函数签名里的一个参数名
 *
 */

interface Fish {
  breathing: string;
}

interface Bird {
  flying: string;
}

// 是不是Fish
function isFish(animal: Fish | Bird): animal is Fish {
  // 不能直接返回 true或false
  return 'animal' in animal;
  // return (animal as Fish).breathing !== undefined
}

function getType(animal: Fish | Bird) {
  if (isFish(animal)) {
    animal; // Fish
  } else {
    animal.flying; // Bird
  }
}

//  null 保护 ！非空断言 有一种情况会失效

function getNum(val?: number | null) {
  val = val || 10.1;

  function a() {
    if (val != null) {
      // ts无法检测内部变量函数，需要再次进行判断
      val.toFixed;
    }
  }

  a();
}

// 综合实例
class StringUtil {
  public static trimSpace(str: string): string {
    return str.replace(/\s+/g, '');
  }
}
interface ITestObj {
  username: string;
  age: number;
  eat: () => void;
  allowInput: 1;
}
let testObj: ITestObj = {
  username: 'i am zhangLi',
  age: 20,
  eat() {
    console.log(StringUtil.trimSpace(this.username) + '吃饭');
  },
  allowInput: 1,
};

/**
 * 判断是否是字符串的 自定义守卫方法
 * @param str
 */
function isString(str: any): str is string {
  return typeof str === 'string';
}
// https://zhuanlan.zhihu.com/p/382699039
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function';

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object';

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then);
};

/**
满足一下四点 - 类型守卫，静态方法
 * 1. 当对象字符串属性有空格时，就去掉空格后输出
   2. 当遇到对象方法时，就执行，其他数据类型的属性一律直接输出
   3. 只有对象中包含 allowInput 属性时，才允许输出
   4. 函数接受到外部传入的null、undefined、{}时，直接输出不是一个合法的对象
 */

function processObjOutput(obj: any) {
  if (
    obj === undefined ||
    obj === null ||
    Object.prototype.toString.call(obj) === '[object Object]'
  ) {
    console.log('不合法对象');
    return;
  }
  if ('allowInput' in obj) {
    // 判断 allowInput 属性或者方法在obj
    let value: unknown;
    Object.keys(obj).forEach((key) => {
      value = obj[key];
      // if (typeof value === 'string') {  // 写法和low -> 使用自定义守卫，可以参考vue3 源码
      // }
      if (isString(value)) {
        // 把范围缩小为string类型，在语句块内使用
        console.log(key + ':', StringUtil.trimSpace(value));
      } else if (isFunction(value)) {
        obj[key]();
      } else {
        console.log(`key:${value}`);
      }
    });
  }
}
processObjOutput(testObj);
let su = new StringUtil();
if (su instanceof StringUtil) {
  console.log(' su 是 StringUtil 的一个实例对象');
}

export {};
