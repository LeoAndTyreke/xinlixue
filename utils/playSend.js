let mServer = require('server.js');
let err = require('inteError.js');

let mTim = '0:00';
let tOld = new Date().getTime();
let mTok = '';
let mPid = '';

function init(mToken, mChid){
  mTim = '0:00';
  mTok = mToken;
  mPid = mChid;
}

function getPlaySend(mToken, mId,pStr, sucFun) {
  mServer.serverReq('userResPsRate/send', { token: mToken, targetId: mId, psRate:pStr }, function (data) {
    //console.log('userResPsRate:' + JSON.stringify(data));
    if (data.result === 'success') {
      if (typeof sucFun == 'function') sucFun(data.items);
    } else {
      err.inteE(data);
    }
  });
}

function setVidTim(mNum){
  let myTim = parseInt(mNum);
  let sTim = myTim%60;
  let mmTim = parseInt(myTim/60);
  if (sTim < 10) sTim = '0' + sTim;

  mTim = mmTim + ':' + sTim;

  sendTime(mTim);
}
function sendEve(){
  sendTime(mTim);
}

function sendTime(mTim){
  let nowT = new Date().getTime();
  if ((nowT - tOld) < 2000) {
    return true;
  }
  getPlaySend(mTok, mPid, mTim)

  tOld = new Date().getTime();
}

module.exports = {
  init: init,
  getPlaySend: getPlaySend,
  setVidTim: setVidTim,
  sendTime: sendTime,
  sendEve: sendEve
}