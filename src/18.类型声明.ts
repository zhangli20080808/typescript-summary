/**
 类型声明
 1. 声明文件可以让我们不需要将js重构为ts，只需要加上声明文件就可以使用系统
 2. 类型声明在编译的时候会被删除(declare 给编辑器看的,提示用的)，不会影响真正的代码
 3. 关键字 declare 标识声明的意思 我们可以使用它来各种声明  不用去管他的实现 如果没有 declare 只有 namespace 需要实现

 declare var // 声明全局变量
 declare function
 declare class  // 声明全局类
 declare enum  // 声明全局枚举类型
 declare namespace // 声明含有子属性的全局变量 在命名空间内部不需要再使用 declare 了
 interface 和type 声明全局类型

 普通类型声明文件
 declare let age: string
 declare function getName(): string
 declare class Animal {
    name: string
 }
 getName()
 new Animal()

 */

declare namespace $ {
    function ajax(url: string, setting: any): void
    let name: string
    namespace fn {
        function extend(url: string, setting: any): void
    }
}
// $.ajax('/test',{})
// $.name
// $.fn.extend({})

//

/**
 * 类型声明文件 .d.ts 文件
 * 1.手写   2. 第三方声明文件
 * js中有很多内置对象，可以在ts中被当做已经声明好的类型
 * 内置对象是根据标准在global上的对象 这些内置对象的类型声明文件 就包含在ts核心库的声明文件中
 */

 export {}