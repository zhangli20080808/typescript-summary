// 交叉类型
interface Person1 {
    handsome: string;
}

interface Person2 {
    name: string;
}

type Person3 = Person1 & Person2;
let person: Person3 = {
    // 交叉的部分
    handsome: '1',
    name: 'zl',
};

interface Person4 {
    name: string;
}

interface Person5 {
    name: number;
}

// type Person6 = Person4 & Person5; //string  number  ->never

// function xxx(): never {
//     throw new Error('');
// }
//
// let person7: Person6 = {
//     name: xxx(),
// };

// 常用 多个对象的合并
function mixin<T, K>(obj1: T, obj2: K): T & K {
    let result = {} as T & K;
    for (let id in obj1) {
        result[id] = obj1[id] as any;
    }
    for (let id in obj2) {
        // @ts-ignore
        if (!result.hasOwnProperty(id)) {
            result[id] = obj2[id] as any
        }
    }
    return result;
}

// let r = mixin({a: 1}, {b: 2});


export {};
