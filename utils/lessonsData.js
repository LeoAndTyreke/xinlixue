let mServer = require('server.js');
let err = require('inteError.js');

let jiaZai = {
  jBool: false,
  jNum: 0
}
let mSList = [];

function seaInit(){
  mSList = [];
  jiaZai = {
    jBool: false,
    jNum: 0
  }
}
function searchServer(value){
  console.log(value);
  mServer.serverReq('resources/search', { keyword: value, start: jiaZai.jNum, count:10}, function (data) {
    console.log('listSea:'+JSON.stringify(data));
    if (data.result === 'success') {
      if (data.items && data.items.cc){
        let mArr = data.items.cc;
        if (mArr.length >= 10) {
          setJZ(true, 10);
        } else {
          setJZ(false, 0);
        }
        mSList = setSonList(mArr);
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

module.exports = {
  getJZ: getJZ,
  setJZ: setJZ,
  setSonList: setSonList,
  searchServer: searchServer,
  seaInit: seaInit
}