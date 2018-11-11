let mServer = require('server.js');
let err = require('inteError.js');

let mNote = '';

function getPlayData(mToken, mId, sucFun) {
  mServer.serverReq('cw/get', { token: mToken, uid: mId }, function (data) {
    //console.log('cw/get:' + JSON.stringify(data));
    if (data.result === 'success') {
      mNote = data.items.cw.note;
      if (typeof sucFun == 'function') sucFun(data.items);
    } else {
      err.inteE(data);
    }
  });
}

function getNot(){
  return mNote;
}

module.exports = {
  getPlayData: getPlayData,
  getNot: getNot
}