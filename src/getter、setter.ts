/**
 * getter/setter
 * 属性保护 - 对属性加密，再暴露出去, 转化一波
 * 1. 内部变量我们一般以 _开头和 getter相配合
 * 2. set get 添加自定义逻辑 保护变量
 */
class Person {
  constructor(private _name: string) {}

  get name() {
    return this._name + 'zl';
  }

  set name(name: string) {
    this._name = name;
  }
}

const person = new Person('i am is');
console.log(person.name);
person.name = 'zhangLi';

/** ========  单例模式 - 一个类只允许通过这个类 获取一个这个类的实例  =========================**/

/**
 * 常规实例化方案 通过new来获取类的实例
 * 思考？ 只能通过这个类获取一个这个类的实例，那我们就不能通过new的方式 -> 如何解决呢？
 */

class InitClassDemo {
  // 表示这个instance属性存储的内容的类型是 InitClassDemo
  private static instance: InitClassDemo;

  private constructor(public name: string) {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new InitClassDemo('zl');
    }
    return this.instance;
  }
}

const demo = InitClassDemo.getInstance();
console.log(demo.name);

export {};
