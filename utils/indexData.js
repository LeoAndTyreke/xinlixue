let mServer = require('server.js');
let err = require('inteError.js');

let indSwi = [];
let indTyp = [];
let indCou = {};

//缓存轮播列表
function setIndSwi(sucFun) {
  mServer.serverReq('slideshow/list', {}, function (data) {
    //console.log('listSwi:'+JSON.stringify(data));
    if (data.result === 'success') {
      indSwi = data.items;
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

//分类列表
function setIndTag(sucFun) {
  mServer.serverReq('tags/list', {}, function (data) {
    //console.log('listTag:' + JSON.stringify(data));
    if (data.result === 'success') {
      indTyp = data.items;
      try {
        wx.setStorageSync('myIndTag', JSON.stringify(indTyp));
      } catch (e) { }
      if (typeof sucFun == 'function') sucFun(indTyp);
    } else {
      err.inteE(data);
    }
  });
}
function getIndTag() {
  if (indTyp && indTyp.length > 0) {
    return indSwi;
  } else {
    let mIndTag = wx.getStorageSync('myIndTag');
    if (mIndTag) {
      indTyp = JSON.parse(mIndTag);
    }
    return indTyp;
  }
}

//课程和教师列表
function setIndCou(sucFun) {
  mServer.serverReq('resources/list', {}, function (data) {
    //console.log('listCou:' + JSON.stringify(data));
    if (data.result === 'success') {
      indCou = data.items;
      try {
        wx.setStorageSync('myIndCou', JSON.stringify(indCou));
      } catch (e) { }
      if (typeof sucFun == 'function') sucFun(indCou);
    } else {
      err.inteE(data);
    }
  });
}
function getIndCou() {
  if (indCou.tc && indCou.cc) {
    if (indCou.cc.length > 0 || indCou.tc.length > 0 ){
      return indCou;
    }
  } else {
    let mIndCou = wx.getStorageSync('myIndCou');
    if (mIndCou) {
      indCou = JSON.parse(mIndCou);
    }
    return indCou;
  }
}

module.exports = {
  setIndSwi: setIndSwi,
  getIndSwi: getIndSwi,
  setIndTag: setIndTag,
  getIndTag: getIndTag,
  setIndCou: setIndCou,
  getIndCou: getIndCou
}