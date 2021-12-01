const permission = require('./modules/permission');

const mocks = [
  // permission
  { method: 'get', path: '/getUserInfo', response: permission.userInfo },
];

module.exports = mocks;
