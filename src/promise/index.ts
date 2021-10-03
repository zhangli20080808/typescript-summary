/**
 * 1. promise 回调实现  1. 实现actionType 2. Promise回调实现 3. 测试类实现 4.then方法
 */

import {
  ResolveType,
  RejectType,
  ExecutorType,
  StatusType,
} from './actionType';
class Promise<T = any> {
  public resolveFn!: ResolveType;
  public rejectFn!: RejectType;
  public status!: StatusType;
  public resolve_executor_value!: any;
  public reject_executor_value!: any;
  public reason!: undefined;
  constructor(executor: ExecutorType) {
    //executor 默认传入 一开始就执行 默认是 pending
    this.status = 'pending';
    this.resolveFn = (successValue: any) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.resolve_executor_value = successValue;
      }
    };
    this.rejectFn = (rejectValue?: any) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reject_executor_value = rejectValue;
      }
    };
    executor(this.resolveFn, this.rejectFn);
  }
  then(resolveInThen: ResolveType, rejectInThen: RejectType) {
    if (this.status === 'fulfilled') {
      resolveInThen(this.resolve_executor_value);
    }
    if (this.status === 'rejected') {
      rejectInThen(this.reject_executor_value);
    }
  }

  // catch(callback){

  //   callback()
  // }
}

export default Promise;
