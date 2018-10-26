let mServer = require('server.js');
let err = require('inteError.js');

function getMenData(mToken, mId, sucFun) {
  mServer.serverReq('cc/detail', { token: mToken, uid: mId, start: 0, count:100 }, function (data) {
    //console.log('cwChild/list:' + JSON.stringify(data));
    if (data.result === 'success') {
      if (typeof sucFun == 'function') sucFun(data.items);
    } else {
      err.inteE(data);
    }
  });
}

module.exports = {
  getMenData: getMenData
}