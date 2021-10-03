function isString(str: any): str is string {
  return typeof str === 'string';
}
// https://zhuanlan.zhihu.com/p/382699039
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function';

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object';

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then);
};
