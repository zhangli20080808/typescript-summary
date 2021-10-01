```js
/**
类型守卫： 准备工作 - new底层发生了什么？
 */
function Person(name, age) {
  this.name = name;
  this.age = age;
}
let person = new Person('zhangLi', 20);
console.log(person, typeof person); // object 

// new 一个实例对象的底3步
// 1. 创建一个obj对象  let obj = new Object()

let obj = {};
// 2. 让新创建对象的 __proto__ 变量指向 Person原型对象空间
obj.__proto__ = Person.prototype;

// 3. 借用Person的构造函数 为obj对象变量 增加age属性和phone属性  constructor 会指向构造函数对象空间
Person.apply(obj, ['zhangLi', 10]);
console.log(obj, 'obj');
```
