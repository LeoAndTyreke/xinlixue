let mServer = require('server.js');
let err = require('inteError.js');

function getTeaData(mToken, mId, sucFun) {
  mServer.serverReq('teacher/detail', { token: mToken, uid: mId }, function (data) {
    console.log('teacher:' + JSON.stringify(data));
    if (data.result === 'success') {
      if (typeof sucFun == 'function') sucFun(data.items);
    } else {
      err.inteE(data);
    }
  });
}

module.exports = {
  getTeaData: getTeaData
}