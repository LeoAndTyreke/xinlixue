let mServer = require('server.js');
let err = require('inteError.js');

let mGlo = null;

function getGloData(sucFun) {
  if (mGlo){
    if (typeof sucFun == 'function') sucFun(mGlo);
  }else{
    mServer.serverReq('appcfg/get', {}, function (data) {
      //console.log('appcfg:' + JSON.stringify(data));
      if (data.result === 'success') {
        mGlo = data.items;
        try {
          wx.setStorageSync('myGloObj', JSON.stringify(mGlo));
        } catch (e) { }
        if (typeof sucFun == 'function') sucFun(mGlo);
      } else {
        err.inteE(data);
      }
    });
  }
}

function getGlo(){
  return mGlo;
}

module.exports = {
  getGloData: getGloData,
  getGlo: getGlo
}