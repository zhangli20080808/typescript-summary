/**
类型断言
定义： 把两种能有重叠关系的数据类型进行相互转换的的一种ts语法
格式： A 数据类型的变量 as B 数据类型。 A和B必须具有重叠关系
重叠关系理解： 9种场景
1.如果A和B都是类，且有继承关系
  无论A、B谁是父类或者子类，A的对象变量可以断言成B类型，B的对象变量也可以断言成A类型
  一般情况，我们是将 父类的对象变量断言成子类
*/

class Person {
  public username!: string;
  step() {}
  say() {}
}

class Stu extends Person {
  public username!: string;
  public age!: number;
  constructor(name: string, age: number, address: string) {
    super();
  }
  study() {}
}
let person = new Person();

// let result = person as Stu  类型断言
// let result = <Stu>person  类型转换

let stu = new Stu('zhangLi', 18, '杭州');

/**
2. 如果 A B 是类，且没有继承关系
  两个类中的任意一个类的所有的 public 实例属性 加上所有的public实例 和 另一个类的所有 public实例属性+实例方法
  完全相同或者是另外一个类的子类，则可以相互断言
*/

/**
3. 如果 A是类，B是接口，并且A类实现了B接口，则A的对象变量可以断言成B接口类型，反之亦然，即B接口类型的对象变量也可断言成A类型 
*/

interface Person2 {
  username: string;
  age: number;
  address: string;
  phone: number;
}
class Student implements Person2 {
  public username!: string;
  public age!: number;
  public address!: string;
  public phone!: number;
  public kkk() {}
  constructor(username: string, age: number, address: string) {
    this.address = address;
  }
}

let person2: Person2 = { username: 'zl', address: 'hz', age: 19, phone: 11 };
let result = person2 as Student;
// let result2 = <Student>person2
let student = new Student('zhangLi', 20, 'hz');
let result3 = student as Person2;

/**
4. 如果 A是类，B是接口，并且A类  没有实现了B接口。通2规则,考虑安全性吧
 */

// 5. 如果A是类，B是type定义的对象数据类型 。且由A类实现了B type 定义的数据类型，则A可以断言成B type定义的数据类型。
// 7. 如果A是一个函数上参数变量的联合类型，例如 string ｜ number,那么在函数内部可以断言成number或者string
// 8. 多个类组成的联合类型如何断言？类似联合类型的断言
/**
类型断言存在的意义和场景
1. 对象中的Symbol数据类型取值问题
2. 加分计算，巧用any
 */

let syMid = Symbol('zhangLi');
let obj = { [syMid]: 'xxx', username: 'zl', age: 20 };
let username = obj[syMid];
// let obj2 = obj[syMid as unknown]; // 类型“unknown”不能作为索引类型使用

export {};
