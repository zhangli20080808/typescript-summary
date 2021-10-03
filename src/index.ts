import Promise from './promise/index';

let promise = new Promise((resolve, reject) => {
  // resolve('陈宫1');
  reject('我失败了');
});

promise.then(
  (res) => {
    console.log(res, 'res');
  },
  (err) => {
    console.log(err,'err');
  }
);  
// .catch((err) => {
//   console.log(err, 'err');
// });
