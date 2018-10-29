let mServer = require('server.js');
let err = require('inteError.js');

function getProData(mToken,sucFun) {
  mServer.serverReq('spread/detail', { token: mToken}, function (data) {
    //console.log('userSpread:' + JSON.stringify(data));
    if (data.result === 'success') {
      if (typeof sucFun == 'function') sucFun(data.items);
    } else {
      err.inteE(data);
    }
  });
}

function getProOrdData(mToken, sucFun){
  mServer.serverReq('spread/list', { token: mToken }, function (data) {
    //console.log('spread:' + JSON.stringify(data));
    if (data.result === 'success') {
      if (typeof sucFun == 'function') sucFun(data.items.sp);
    } else {
      err.inteE(data);
    }
  });
}

module.exports = {
  getProData: getProData,
  getProOrdData: getProOrdData
}