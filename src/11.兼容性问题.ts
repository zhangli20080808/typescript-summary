// ts中的兼容性问题 一个类型能否被赋予给另一个类型
// 1. 基本数据类型的兼容性
let str!: string
let temp!: string | number

temp = str

// str  = temp  // ts是从安全性来考虑

// ts也叫鸭子类型检测 只要结构长得像就可以
interface myNum {
    toString(): string
}

let str2: myNum = 'xxx' //比如字符串的功能很多 只要包含了toString 就可以把值赋给他

let myNumber!: myNum   // myNumber只要有toString方法就行 你有就行
// let str3:string = myNumber // myNum只有一个方法 从安全行考虑 不要从小类型可以赋值给大类型这种思路思考

// 2. 接口类型的兼容
interface Animal {
    name: string,
    age: string
}

interface Person {
    name: string,
    age: string,
    address: string
}

let animal!: Animal
let person!: Person
animal = person  // 我要的你有就行 person有 name  age

// 3. 函数的兼容性问题 参数 返回值 比如forEach index可以不写
// 函数的兼容性 参数要求 赋值的函数的参数要 <= 被赋值函数的参数 和接口正好相反
let sum1 = (a: string, b: string) => {
}
let sum2 = (a: string) => {
}
// sum1 = sum2  ok的

// 实现一个简单的forEach
type ForEachFn<T> = (item: T, index: number) => void

function forEach<T>(arr: T[], cb: ForEachFn<T>) {
    for (let i = 0; i < arr.length; i++) {
        cb(arr[i], i)
    }
}

// 能用接口就用接口 用不了就用别名 没有继承没有拓展直接用type
forEach<number>([1, 2, 4], function (item) {
})

// 1.基本类型 可以把小范围的赋予给大范围的
// 2.接口类型 可以把多的赋予给少的
// 3.函数的兼容性 可以把参数少的赋予给参数多的函数
// 4.函数的返回值遵循1，2


// 类兼容
// 只要出现了 private protected 永远不兼容
// 枚举类型永远不兼容

// 泛型 根据最终的结果确定是否 兼容  返回的结果一样就兼容
interface A<T> {
    [key: number]: T
}

interface B<T> {

}

type A1 = A<string>
type B1 = B<number>
let a1!: A1
let b1!: B1
// a1 = b1
export {}