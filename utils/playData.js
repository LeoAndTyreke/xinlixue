let mServer = require('server.js');
let err = require('inteError.js');

function getPlayData(mToken, mId, sucFun) {
  mServer.serverReq('cw/get', { token: mToken, uid: mId }, function (data) {
    //console.log('cw/get:' + JSON.stringify(data));
    if (data.result === 'success') {
      if (typeof sucFun == 'function') sucFun(data.items.cw);
    } else {
      err.inteE(data);
    }
  });
}

module.exports = {
  getPlayData: getPlayData
}