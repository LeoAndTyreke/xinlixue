let mServer = require('server.js');
let err = require('inteError.js');

let indSwi = [];
let indTyp = [];
let indCou = [];
let indTea = [];

//缓存轮播列表
function setIndSwi(sucFun) {
  let mSend = {

  }
  mServer.serverReq('teacher/list', mSend, function (data) {
    console.log('list:'+JSON.stringify(data));
    if (data.status === 'success') {
      indSwi = data.cont.indSwi;
      try {
        wx.setStorageSync('myIndSwi', JSON.stringify(indSwi));
      } catch (e) { }
      if (typeof sucFun == 'function') sucFun(indSwi);
    }else{
      err.inteE(data);
    }
  });
}
function getIndSwi() {
  if (indSwi && indSwi.length > 0) {
    return indSwi;
  } else {
    let mIndSwi = wx.getStorageSync('myIndSwi');
    if (mIndSwi) {
      indSwi = JSON.parse(mIndSwi);
    }
    return indSwi;
  }
}



module.exports = {
  setIndSwi: setIndSwi,
  getIndSwi: getIndSwi
}