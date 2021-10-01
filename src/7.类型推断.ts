/**
 * 类型推断 - ts会自动的尝试分析变量的类型，如果ts能够自动分析变量类型，我们就什么都不用做了，
 *           如果ts无法分析变量类型的话，我们就需要类型注解
 * 1. 赋值时会去推断
 * 2. 函数默认会进行推断 函数会根据右边的类型 推到左边的类型 不用标注sum类型
 * 3. 返回值的推断
 * 4. 属性判断
 *
 * 类型注解
 * let count: number -> 这种显示的声名count变量是一个number类型数据的写法，成为类型注解
 * 我们来告诉ts 变量是什么类型
 */

const sum = (a: string, b: string): string => {
  return a + b; // return {a,b}
};

//  属性推断
let school = {
  name: 'zhangLi',
  age: 20,
};
type InputSize = ['large', 'small'];
const { name } = school; // name:string
interface ISchool {
  // 通过索引访问操作符获取类型中的类型
  name: string;
  age: number;
  address: {
    n: string;
  };
}
type Test = ISchool['address']['n']; // 接口中取属性 只能使用[]

// 类型的反推 把某个类型拿出来再去使用
type MySchool = typeof school;

export {};
