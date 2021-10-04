import Promise from './index';
let promise1 = new Promise((resolve, reject) => {
  console.log('第一个promise同步区域');
  setTimeout(() => {
    resolve('setTimeout的第一个promise');
  }, 5);
});
let promise2 = new Promise<void>((resolve, reject) => {
  console.log('第二个promise同步区域');
  setTimeout(() => {
    resolve('setTimeout的第二个promise');
  }, 5);
});

let promise3 = new Promise<void>((resolve, reject) => {
  console.log('第三个promise同步区域');
  setTimeout(() => {
    resolve('setTimeout的第三个promise');
  }, 5);
});

Promise.all([promise1, promise2, promise3]).then(
  (resolveValue) => {
    console.log('promise->all-reslove', resolveValue);
  },
  (rejectValue) => {
    console.log('promise->all-reject', rejectValue);
  }
);
