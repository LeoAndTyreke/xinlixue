let mServer = require('server.js');
let err = require('inteError.js');

function getPayData(mToken, sucFun) {
  mServer.serverReq('user/listCC', { token: mToken}, function (data) {
    //console.log('user/listCC:' + JSON.stringify(data));
    if (data.result === 'success') {
      if (typeof sucFun == 'function') sucFun(data.items);
    } else {
      err.inteE(data);
    }
  });
}

module.exports = {
  getPayData: getPayData
}