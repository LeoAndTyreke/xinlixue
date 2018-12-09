let mServer = require('server.js');
let err = require('inteError.js');

function getCardData(mToken, mId, sucFun) {
  mServer.serverReq('qrCode/get', { token: mToken, targetId: mId }, function (data) {
    //console.log('qrCode:' + JSON.stringify(data));
    if (data.result === 'success') {
      if (typeof sucFun == 'function') sucFun(data.items);
    } else {
      err.inteE(data);
    }
  });
}

module.exports = {
  getCardData: getCardData
}