import {Home, Zoo} from "./17.namespace";

let dogZoo = new Zoo.Dog()
dogZoo.eat()
let dogHome = new Home.Dog()
dogHome.eat()

/**
 文件  模块  命名空间的关系
 2. 空间 namespace 和 module不一样  namespace 在全局中具有唯一性
 */