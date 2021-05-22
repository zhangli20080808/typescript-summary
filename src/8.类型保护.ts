// 类型保护  具体到某个类型 类型判断
// 1. typeof
function getVal(val: string | number) {
    if (typeof val === 'string') {
        val.padStart;
    } else {
        val.toFixed;
    }
}

// 区分类 2. instanceof
class Dog {
}

class Cat {
}

let getInstance = (passClass: new () => Dog | Cat) => {
    return new passClass();
};

let instance = getInstance(Dog);
if (instance instanceof Dog) {
    instance;
} else {
    instance;
}

// 3. in

// interface Fish {
//   breathing: string;
// }
// interface Bird {
//   flying: string;
// }
// function getType(animal: Fish | Bird) {
//   if ('breathing' in animal) {
//     animal; // Fish
//   } else {
//     animal; // Bird
//   }
// }

// ts 特有的一些 可辨识的类型
interface IButton1 {
    class: 'warning';
    click: string;
}

interface IButton2 {
    class: 'success';
    move: string;
}

function getButton(val: IButton1 | IButton2) {
    if (val.class === 'warning') {
        // 可以辨识出来是button1
        val;
    } else {
        val;
    }
}

// getButton({class: 'success'});

// is 语法  自定义类型

interface Fish {
    breathing: string;
}

interface Bird {
    flying: string;
}

// 是不是Fish
function isFish(animal: Fish | Bird): animal is Fish {
    // 不能直接返回 true或false
    return 'animal' in animal;
    // return (animal as Fish).breathing !== undefined
}

function getType(animal: Fish | Bird) {
    if (isFish(animal)) {
        animal; // Fish
    } else {
        animal.flying; // Bird
    }
}

//  null 保护 ！非空断言 有一种情况会失效

function getNum(val?: number | null) {
    val = val || 10.1;

    function a() {
        if (val != null) { // ts无法检测内部变量函数，需要再次进行判断
            val.toFixed;
        }
    }

    a();
}
// 对代码的完整性进行保护 反推代码 never

export {};
