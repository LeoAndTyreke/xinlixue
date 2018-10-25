let mServer = require('server.js');
let err = require('inteError.js');

let jiaZai = {
  jBool: false,
  jNum: 0
}
let mSList = [];

function seaInit() {
  mSList = [];
  jiaZai = {
    jBool: false,
    jNum: 0
  }
}
function searFolServer(mToken, sucFun) {
  mServer.serverReq('userFolder/list', { token: mToken, start: jiaZai.jNum, count: 10 }, function (data) {
    //console.log('userFolder:' + JSON.stringify(data));
    if (data.result === 'success') {
      if (data.items) {
        let mArr = data.items;
        if (mArr.length >= 10) {
          setJZ(true, 10);
        } else {
          setJZ(false, 0);
        }
        mSList = setSonList(mArr);
        if (typeof sucFun == 'function') sucFun(mSList);
      }
    } else {
      err.inteE(data);
    }
  });
}
//缓存列表
function setJZ(mBool, mNum) {
  let nmN = jiaZai.jNum + mNum;
  jiaZai = {
    jBool: mBool,
    jNum: nmN
  };
}
function getJZ() {
  return jiaZai;
}
function setSonList(mArr) {
  mSList = mSList.concat(mArr);
  return mSList;
}
function getSeList() {
  return mSList;
}

function setFol(mToken, mId, sucFun) {
  mServer.serverReq('userFolder/toggle', { token: mToken, targetId:mId}, function (data) {
    //console.log('toggle:' + JSON.stringify(data));
    if (data.result === 'success') {
      if (typeof sucFun == 'function') sucFun(data.items);
    } else {
      err.inteE(data);
    }
  });
}

module.exports = {
  getJZ: getJZ,
  setJZ: setJZ,
  setSonList: setSonList,
  searFolServer: searFolServer,
  seaInit: seaInit,
  getSeList: getSeList,
  setFol: setFol
}