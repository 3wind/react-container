const permission = require('./modules/permission');
const reduxData = require('./modules/reduxTest');

const mocks = [
  // permission
  { method: 'get', path: '/getUserInfo', response: permission.userInfo },
  //reduxData
  { method: 'get', path: '/reduxTest', response: reduxData.data },
];

module.exports = mocks;
