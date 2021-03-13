type Proxy<T> = {
    get(): T,
    set(value: T): void
}
type InitProxy<T> = {
    [P in keyof T]: Proxy<T[P]>
}

function initProxy<T>(obj: T): InitProxy<T> {
    let result = <InitProxy<T>>{}
    for (const key in obj) {
        result[key] = {
            get: () => {
                console.log('get key 自定义逻辑')
                return obj[key]
            },
            set: (value) => {
                console.log('set')
                obj[key] = value
            }
        }
    }
    console.log(result,obj,'res')
    return result
}

interface Person {
    name: string
    age: number
}

let person: Person = {
    name: 'zk',
    age: 20
}

let testObj: any = initProxy<Person>(person)
console.log(testObj.name, 'name')
// testObj.name = '123'
// testObj.age = 10
console.log(testObj, 'result')


// function unProxy<T>(t: InitProxy<T>): T {
//     let result: any = {} as T
//     for (let key in t) {
//         result[key] = t[key]
//     }
//     return result
// }
//
// let originalPerson = unProxy<Person>(testObj)
// console.log(originalPerson)
export {}