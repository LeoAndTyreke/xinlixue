let mCtx = null;
let canW = 750;
let canH = 1072;
let canInt = 0;
let canFun = null;
let canId = 'myCanvas';
let canBC = true;

let mDObj = {};

function canInit(ctx,mw,mh){
  if (ctx){
    mCtx = ctx;
  }else{
    mCtx = wx.createCanvasContext(canId);
  }
  if (mw)canW = mw;
  if (mh)canH = mh;
}
function drawImg(fun, mObj){
  if (mObj){
    mDObj = mObj;
  }
  canFun = fun;
  canInt = 0;
  canBC = true;
  
  mCtx.beginPath();
  mCtx.setFillStyle('#ffffff');
  mCtx.fillRect(0, 0, canW,canH);
  mCtx.draw(true);

  //头部背景
  let mBgImg = contImgUrl(mDObj.couB);
  if (mBgImg != ''){
    wx.getImageInfo({
      src: mBgImg,
      success: function (res) {
        mCtx.drawImage(res.path, 0, 0, canW, canH);
        setTimeout(function () {
          mCtx.draw(true);
          drawImg2();
        }, 100);
      }
    })
  }else{
    drawImg2();
  }
}
function drawImg2(){
  //二维码
  let mERImg = contImgUrl(mDObj.couE);
  if (mERImg != '') {
    wx.getImageInfo({
      src: mERImg,
      success: function (res) {
        uImgDraw(res.path, 275, (canH - 234), 200, 200, 1);
      }
    })
  } else {
    uImgDraw('', 275, (canH-234), 200, 200, 1);
  }
}
function uImgDraw(mImg, xNum, yNum, imgW,imgH, cNum) {
  if (mImg != '') {
    mCtx.drawImage(mImg, xNum, yNum, imgW, imgH);
  } else {
    mCtx.setFillStyle('#EEEEEE');
    mCtx.fillRect(xNum, yNum, imgW, imgH);
    mCtx.fill();
  }
  mCtx.draw(true);
  canInt += cNum;
  drawEnd();
}
function drawEnd(){
  if (canInt >= 1){
    setTimeout(function () {
      generateImg();
    }, 200);
  }
}
function generateImg() {
  let that = this;
  wx.canvasToTempFilePath({
    canvasId: canId,
    success: function (res) {
      if (typeof canFun == 'function') canFun(res.tempFilePath);
      butnSave(res.tempFilePath);
    },
    fail: function (res) {
      wx.showToast({ title: '生成图失败', icon: 'none', duration: 2000 });
    }
  })
}
function butnSave(imgUrl) {
  let that = this;
  if (canBC) {
    canBC = false;
    wx.saveImageToPhotosAlbum({
      filePath: imgUrl,
      success(res) {
        wx.showToast({ title: '保存成功',icon: 'success', duration: 900 });
      },
      fail: function (res) {
        canBC = true;
      }
    })
  }
}
function contImgUrl(url) {
  var myUrl = "";
  if (url != null && url != undefined) {
    myUrl = url;
  }
  if (myUrl.length > 5) {
    var myType = url.substr(0, 5);
    if (myType != "http:" && myType != "wxfil" && myType != "https") {
      myUrl = 'https://psyrogers.vip/' + myUrl;
    } else if (myType == "http:" || myType == "wxfil") {
      myUrl = '';
    }
  }
  return myUrl;
}

//设置数据
function setObj(mObj){
  //初始化
  canInit();
  //设置数据
  mDObj = mObj;
}
module.exports = {
  canInit: canInit,
  drawImg: drawImg,
  setObj: setObj
}


/*
页面
<canvas canvas-id="myCanvas" style="position:absolute;width:750px;height:1340px;top:-1340px;left:-750px" />

引入
let mCImg = require('../../utils/canToImg.js');

设置数据
mCImg.setObj(data.cont,rwm);
生成图片
mCImg.drawImg();
*/