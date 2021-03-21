interface Person {
    name: string,
    age: number,
    gender: string
}

class Teacher {
    constructor(public info: Person) {
    }

    getInfo<T extends keyof Person>(key: T): Person[T] {
        return this.info[key]
    }
}

const teacher = new Teacher({name: 'zl', age: 20, gender: '男'})
const res = teacher.getInfo('age')

export {}