/**
 * 内置工具类型
 * +? 变为可选  -? 变为必选   修饰符？+ -
 * 1. Partial可以将传入的属性由非可选变成可选
 * 2. Required
 * 3. Readonly
 */

interface IProps {
    a: string
    b: number
    c: boolean
}

/**
 *  很好理解 批量定义
 *  1. keyof T 拿到T对应key的所有集合
 *  2. 迭代T中的所有k 通过 P in keyof T
 *  type Partial<T> = {
        [P in keyof T]?: T[P];
    };
 */

type A = Partial<IProps>
const a: A = {
    a: '123',
    b: 1,
    c: true
}

// 不过需要考虑嵌套的情况

interface Company {
    name: string
    id: number
}

interface Person {
    name: string
    id: number
    company: Company
}

// 递归变成可选项
type DeepPartial<T> = {
    [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U]
}

type PersonPartial = DeepPartial<Person>
// 如果传了 company 但是 company 没有传id 和 name 会报错 不过也可以处理 实现DeepPartial 将每个属性变成可选类型

let p: PersonPartial = {
    name: 'zl',
    id: 12,
    company: {}
}

// 把可选项变成必选项
interface ATest {
    name: string
    id?: number
}

type RequireA = Required<ATest>
const demo: RequireA = {
    name: 'zl',
    id: 1
}

// Pick 捡 只需要的属性
interface Person2 {
    name: string
    id: number
    age: number
}

let result: Person2 = {name: 'zl', id: 1, age: 20}
/**
 * type Pick<T, K extends keyof T> = {
     [P in K]: T[P];
   };
 */

type KeyOfPerson = keyof Person2  // "name" | "id" | "age"
type ResultInfo = Pick<Person2, 'name' | 'id'>

// Extract 有啥区别  对象中提取  类型提取
// type Extract<T, U> = T extends U ? T : never;
type E = Extract<string | number | boolean, string | number>
let e: E = 1 //string


/**
 * Record
 * 将一个类型的所有属性值都映射到另一个类型上并创建新的类型
 */
export {}