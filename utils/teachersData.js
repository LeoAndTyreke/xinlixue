let mServer = require('server.js');
let err = require('inteError.js');

let jiaZai = {
  jBool: false,
  jNum: 0
}
let mSList = [];

function mInit() {
  mSList = [];
  jiaZai = {
    jBool: false,
    jNum: 0
  }
}
function teacherServer(mToken, sucFun) {
  mServer.serverReq('teacher/list', { token: '', start: jiaZai.jNum, count: 10 }, function (data) {
    //console.log('listTea:' + JSON.stringify(data));
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
function getList() {
  return mSList;
}



module.exports = {
  getJZ: getJZ,
  setJZ: setJZ,
  teacherServer: teacherServer,
  mInit: mInit,
  getList: getList
}