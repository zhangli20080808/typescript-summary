import Promise from './promise/index';

let promise = new Promise((resolve, reject) => {
  resolve('陈宫1');
  // throw new Error('123');
  // reject('我失败了');
});

promise
  .then(
    (resolveData1) => {
      console.log(resolveData1, '第一个then成功了');
      return 'ok1';
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
  )
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
