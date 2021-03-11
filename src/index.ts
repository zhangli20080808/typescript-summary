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

export {}