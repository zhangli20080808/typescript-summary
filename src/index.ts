/**
 * 差级 A-B  =  Exclude
 */

type SetDifference<T, U> = T extends U ? never : T

type A = string | number
type B = number | boolean

type AB = SetDifference<A, B>  // string

type t1 = keyof any; // string | number | symbol
/**
 * Omit 忽略  =  Exclude + Pick
 * keyof T  = name | age | visible
 * K -> age
 * SetDifference ->  name | visible
 * { name: string, visible: boolean }
 */

type Omit<T, K extends keyof any> = Pick<T, SetDifference<keyof T, K>>
type IProps = { name: string, age: number, visible: boolean }
type OmitAgeProps = Omit<IProps, 'age'>


/**
 * Diff 和 Omit很像
 */

namespace a {
    type IProps = { name: string, age: number, visible: boolean }
    type Diff<T extends object, U extends object> = Pick<T, SetDifference<keyof T, keyof U>>
    type DefaultProps = { age: number }
    type DiffProps = Diff<IProps, DefaultProps> // {name: string, visible: boolean}
}
namespace b {
    // 交叉属性  InterSection
    type InterSection<T extends object, U extends object> = Pick<T, Extract<keyof U, keyof T> & Extract<keyof T, keyof U>>
    type IProps = { name: string, age: number, visible: boolean }
    type DefaultProps = { age: number }
    type DuplicateProps = InterSection<IProps, DefaultProps> // {age: number}
}

namespace c {
    // OverWrite 就是用 U的同名属性覆盖T的同名属性
    type InterSection<T extends object, U extends object> = Pick<T, Extract<keyof U, keyof T> & Extract<keyof T, keyof U>>
    type Diff<T extends object, U extends object> = Pick<T, SetDifference<keyof T, keyof U>>

    type OldProps = { name: string, age: number, visible: boolean }
    type NewProps = { age: string, other: string }
    type OverWrite<T extends object,
        U extends object,
        // Diff -> { name: string, visible: boolean } & { age: string }
        I = Diff<T, U> & InterSection<U, T>> = Pick<I, keyof I>
    // OverWrite2 覆盖并且把多于的属性也加入其中
    type OverWrite2<T extends object,
        U extends object,
        // Diff -> { name: string, visible: boolean } & { age: string }
        I = Diff<T, U> & U> = Pick<I, keyof I>

    type ReplaceProps = OverWrite<OldProps, NewProps> // {name: string, visible: boolean, age: number}
    type ReplaceProps2 = OverWrite2<OldProps, NewProps> // {name: string, visible: boolean, age: string, other: string}


}
export {}