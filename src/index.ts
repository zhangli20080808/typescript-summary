// 类型推断
// 1. 当赋值时会去推断

// 2. 函数默认会进行推断 函数会根据右边的类型 推到左边的类型 不用标注sum类型
// 3. 返回值的推断
const sum = (a: string, b: string): string => {
  return a + b; // return {a,b}
};

// 4. 属性推断
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


// 类型保护
export {};
