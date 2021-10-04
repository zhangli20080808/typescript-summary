/**
 * 1. promise 回调实现  1. 实现actionType 2. Promise回调实现 3. 测试类实现 4.then方法
   5. 同步级联 then 方法
   6. 单级异步 + then方法收集 - 单级then方法
   7. 多个异步 + 多级then方法收集 - 多级then方法
 */

import {
  ResolveType,
  RejectType,
  ExecutorType,
  StatusType,
} from './actionType';
import { isPromise } from './util';
class Promise<T = any> {
  public resolve!: ResolveType;
  public reject!: RejectType;
  public status!: StatusType;
  public resolve_executor_value!: any;
  public reject_executor_value!: any;
  public reason!: undefined;
  public onResolvedCallbacks: (() => void)[] = []; //存储成功的的所有的回调 只有pending的时候才存储
  public onRejectedCallbacks: (() => void)[] = []; //存储失败的的所有的回调

  static all(promises: Promise[]): Promise<any> {
    return new Promise((resolve, reject) => {
      let allPromiseResolveSuccessValue: Array<any> = [];
      promises.forEach((promise, index) => {
        promise.then(
          (resolveSuccess) => {
            ProcessData(resolveSuccess, index);
          },
          (rejectFail) => {
            // 只要有一个promise对象的resolve执行失败，就执行reject
            reject(rejectFail);
            return;
          }
        );
      });
      function ProcessData(resolveSuccess: any, index: number) {
        allPromiseResolveSuccessValue[index] = resolveSuccess;
        if (index === promises.length - 1) {
          resolve(allPromiseResolveSuccessValue);
        }
      }
    });
  }

  static resolve(value: any): Promise<any> {
    // resolve里面放一个promise会等待这个promise执行完
    return new Promise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject(reason: any): Promise<any> {
    // reject 并不会解析 promise值
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }

  constructor(executor: ExecutorType) {
    //executor 默认传入 一开始就执行 默认是 pending
    this.status = 'pending';
    this.resolve = (value: any) => {
      // console.log('进入resolve函数', value, this.status);

      if (this.status === 'pending') {
        this.status = 'fulfilled';
        // value[10] = 100;
        this.resolve_executor_value = value;
        this.onResolvedCallbacks.forEach((cb) => cb());
      }
    };
    this.reject = (reason?: any) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reject_executor_value = reason;
        this.onRejectedCallbacks.forEach((cb) => cb());
      }
    };
    try {
      // 执行函数
      executor(this.resolve, this.reject);
    } catch (error) {
      // 标识当前有异常  那就使当前的异常作为失败的原因
      // 在执行resolve时，reject失败的状态下的一个执行过程
      this.status = 'pending';
      this.reject(error);
      // throw new Error('程序停止......');
    }
  }
  then(resolveInThen: ResolveType, rejectInThen: RejectType) {
    return new Promise((resolve, reject) => {
      let result: any;
      // console.log(this, 'this'); // 外部的
      if (this.status === 'fulfilled') {
        result = resolveInThen(this.resolve_executor_value);
        // 重新调用 resolve 会重新走 executor
        resolve(result);
      }
      if (this.status === 'rejected') {
        result = rejectInThen(this.reject_executor_value);
        reject(result);
      }

      if (this.status === 'pending') {
        // console.log('pending state')
        // 等会成功的时候 再让他执行 分别将成功和失败的回调存起来
        this.processManyAsyncAndSync(
          resolveInThen,
          rejectInThen,
          resolve,
          reject
        );
      }
    });
  }

  /**
   * 执行多个异步方法 + 多级 then的处理方法
   * @param resolveInThen
   * @param rejectInThen
   * @param resolve
   * @param reject
   */
  processManyAsyncAndSync(
    resolveInThen: ResolveType,
    rejectInThen: RejectType,
    resolve: ResolveType,
    reject: RejectType
  ) {
    let result: any;
    this.onResolvedCallbacks.push(() => {
      result = resolveInThen(this.resolve_executor_value);
      console.log('异步中执行的结果', result);
      // 异步处理方式 如何采用同步的方式去处理呢？
      if (isPromise(result)) {
        result.then(
          (resolveSuccess) => {
            resolve(resolveSuccess);
          },
          (rejectSuccess) => {
            reject(rejectSuccess);
          }
        );
      } else {
        resolve(result);
      }
      // resolve(result.resolve_executor_value);

      // if (isPromise(result)) {
      //   setTimeout(() => {
      //     console.log(result, 'result');
      //     resolve(result.resolve_executor_value);
      //   }, 5);
      // } else {
      //   resolve(result);
      // }
    });
    this.onRejectedCallbacks.push(() => {
      result = rejectInThen(this.reject_executor_value);
      // console.log('异步中执行的结果', result);
      reject(result);
    });
  }

  // catch(callback){

  //   callback()
  // }

  /**
   * 无论如何都会执行 还可以跟then 有点类似于catch
   */
  // finally(callback: any) {
  //   return this.then(
  //     (value) => {
  //       return Promise.resolve(callback().then(() => value));
  //     },
  //     (err) => {
  //       return Promise.reject(
  //         callback().then(() => {
  //           throw err;
  //         })
  //       );
  //     }
  //   );
  // }
  //就是一个成功的then
  // catch(callback: Function) {
  //   return this.then(null, callback);
  // }
}

export default Promise;
