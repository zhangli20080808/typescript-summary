import Promise from './promise/index';
let promise1 = new Promise((resolve, reject) => {
  console.log('第一个promise同步区域');
  setTimeout(() => {
    resolve('setTimeout的第一个promise');
  }, 5);
});
let promise2 = new Promise<void>((resolve, reject) => {
  console.log('第二个promise同步区域');
  setTimeout(() => {
    reject('setTimeout的第二个promise');
  }, 5);
});

let promise3 = new Promise<void>((resolve, reject) => {
  console.log('第三个promise同步区域');
  setTimeout(() => {
    resolve('setTimeout的第三个promise');
  }, 5);
});

Promise.all([promise2, promise1, promise3]).then(
  (resolveValue) => {
    console.log('promise->all-resolve', resolveValue);
  },
  (rejectValue) => {
    console.log('promise->all-reject', rejectValue);
  }
);

// Promise.resolve(100)
//   .finally(() => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve('hello'); // 我这个地方 resolve 这个hello 其实没啥用
//       }, 2000);
//     });
//   })
//   .then(
//     (data) => {
//       console.log(data, 'data');
//     },
//     (fail) => {
//       console.log(fail, 'fail');
//     }
//   )
//   .catch((err) => {
//     console.log(err, 'catch');
//   });

export {};
