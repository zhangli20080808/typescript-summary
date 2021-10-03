import Promise from './promise/index';

let promise = new Promise((resolve, reject) => {
  // resolve('陈宫1');
  // throw new Error('123');
  // reject('我失败了');
  // 异步过程
  // 发布、订阅，就是当真正执行 resolve的时候 我们再去执行 then的回调，先将then的方法的回调订阅下来
  setTimeout(() => {
    resolve('陈宫1');
  }, 1000);
});

promise
  .then(
    (resolveData1) => {
      console.log(resolveData1, '第一个then成功了');
      // return 'ok1';
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('zl');
        }, 5);
      });
    },
    (err) => {
      console.log(err, 'err');
      return 'fail1';
    }
  )
  .then(
    (resolveData2) => {
      console.log(resolveData2, '第二个then成功了');
      return 'ok2';
    },
    (err) => {
      console.log(err, '第二个then失败了');
      return 'fail2';
    }
  );
// .then(
//   (resolveData3) => {
//     console.log(resolveData3, '第三个then成功了');
//   },
//   (err) => {
//     console.log(err, '第三个then失败了');
//   }
// );
// .catch((err) => {
//   console.log(err, 'err');
// });
console.log('end');
