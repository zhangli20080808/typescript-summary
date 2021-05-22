// null 和 undefined 既可以作为类型 也可以作为值
// let s = 'foo'
// s= null
//
// let sn :string | null = 'bus'
// sn = null
//
// sn = undefined

let u: undefined = undefined;
let s: null = null;

function fn(x: number, y?: number) {
  return x + (y || 0);
}

fn(1, 2);
fn(1);
fn(1, undefined);

// fn(1,null)  // 报错

function breakIng(name: string | null): string {
  function postFix(ept: string) {
    // ! 明确告诉编辑器 name不为null
    return name!.charAt(0) + '. the ' + ept;
  }

  name = name || 'bob';
  return postFix(name);
}
// 字符串字面量类型

// unknown -> 可以表示任何值，当我们想用any的时候，用unknown代替，简单来说 unknown 是一个严格版本的any
// let b: { [key: string]: unknown }
// b = {name: 'Jack'}
// b = () => {}

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === '';

// 在一个函数里，改变传入的对象本身是不好的
const cleanObject = (object?: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  if (!object) {
    return {};
  }
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};
export {};
