(function () {
  'use strict';

  // 以往
  // export const STATUS = {
  //   na: 'xxx',
  //   nb: 'bbb',
  // };
  // 枚举类型
  var USER_ROLE;
  (function (USER_ROLE) {
      USER_ROLE[USER_ROLE["USER"] = 0] = "USER";
      USER_ROLE[USER_ROLE["ADMIN"] = 1] = "ADMIN";
      USER_ROLE[USER_ROLE["MANAGE"] = 2] = "MANAGE";
  })(USER_ROLE || (USER_ROLE = {}));
  console.log(1 /* ADMIN */);

}());
//# sourceMappingURL=bundle.js.map
