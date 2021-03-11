/**
 * 条件类型
 */

interface Fish {
    name1: string
}

interface Water {
    name2: string
}

interface Bird {
    name3: string
}

interface Sky {
    name4: string
}

// naked type 裸类型 单纯是T
type condition<T> = T extends Fish ? Water : Sky
let con: condition<Fish> = {name2: 'water'}

/**
 * 条件类型的分发 (先将Fish传入->name2 再讲Bird->name4)
 * 条件类型有一个特征 分布式有条件类型 ，但是分布式有条件类型是有前提的，
 * 条件类型里待检查的类型必须是 naked type parameter
 * none naked type 此时包裹到其他东西里面去了 就不是 naked类型了 这个时候就不分发了 因为传入进去可能不匹配了
 * type condition2<T> = [T] extends [Fish] ? Water : Sky
 */
let con1: condition<Fish | Bird> = {name2: '2', name4: '4'}
let con2: condition<Fish | Bird> = {name4: '4'}

// 找出T中不包含U的部分
type Diff<T, U> = T extends U ? never : T
// type R = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'> // ->d

type Filter<T, U> = T extends U ? T : never
type R4 = Filter<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'> // -> a b c

/**
 * 内置条件类型
 * 1. Exclude排除 不同的部分
 * 2. Extract提取 相同的部分
 * 3. NonNullable 从T中排除掉 null undefined
 * 4. ReturnType 获取函数的返回类型
 */

// type Exclude<T, U> = T extends U ? never : T
type R5 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'> // ->d 和Diff一样

// type Extract<T, U> = T extends U ? T : never
type R6 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'> // ->d 和Diff一样

// type NonNullable<T> = T extends null | undefined ? never : T;
type CommonType = 'a' | null | undefined
type R7 = NonNullable<CommonType>  // a

// infer 推断的意思  相当于声明一个变量
// type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
type R8 = ReturnType<any>

function getUser(name: string, age: number) {
    return {name: 'zl', age: 20}
}

type GetUserType = typeof getUser
// type ReturnUserType = ReturnType<GetUserType>
// let r: ReturnUserType = {
//     name: 'z',
//     age: 18
// }

// 获取函数参数类型  P-> [string, number]
// type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
type ParamType = Parameters<GetUserType>
let params: ParamType   // params-> [name: string, age: number]

// 获取构造函数实例类型
class Animal {
    constructor(public name: string) {
        this.name = name
    }

    getName() {
        console.log(this.name)
    }
}

// 获取构造函数参数的类型
// type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
type Params = ConstructorParameters<typeof Animal>


// type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
type PersonInstance = InstanceType<typeof Animal>
let instance: PersonInstance = {
    name: 'zl',
    getName() {
    }
}

/**
 * infer 应用
 * 元组转 联合
 * E 代表元素的类型 2种类型 不写infer 就是any了 声明在哪里就指向什么类型
 * infer 可以用在任何位置 比如 参数 返回值 函数 等
 * eg:
 * type ExpInfer<T> = T extends { name: infer X } ? X : never
 * type KK = ExpInfer<{ name: string }>  // kk -> string
 */

type ElementOf<T> = T extends Array<infer E> ? E : never
type ITuple = [string, number]
type TupleToUnion = ElementOf<ITuple>  // string | number

/**
 * 如何将 联合类型转化为交叉类型  string | number -> string & number
 */
// TODO
type T1 = {name:string}
type T2 = {name:string}

export {}