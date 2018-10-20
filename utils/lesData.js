let mServer = require('server.js');
let err = require('inteError.js');

function getLesData(mToken, mId, sucFun) {
  mServer.serverReq('curriculum/get', { token: mToken, uid: mId}, function (data) {
    //console.log('curriculum:' + JSON.stringify(data));
    if (data.result === 'success') {
      if (typeof sucFun == 'function') sucFun(data.items);
    } else {
      err.inteE(data);
    }
  });
}

module.exports = {
  getLesData: getLesData
}