let mLogin = require('../../utils/mLogin.js');
let mCarD = require('../../utils/cardData.js');
let mCImg = require('../../utils/canToImgc.js');
Page({
  data: {
    mEr:'',
    mList:[],
    canUrl: ''
  },
  bindchange:function(e){
    let that = this;
    let mDet = e.detail;
    let mBgArr = that.data.mList;
    mCImg.setObj({
      couB: mBgArr[mDet.current],
      couE: that.data.mEr
    });
    console.log(mDet.current)
  },
  savebind: function (e) {
    let that = this;
    wx.showToast({ title: '图片合成中', mask: true, icon: 'loading', duration: 2000 });
    mCImg.drawImg(function (data) {
      wx.hideToast();
      //that.setData({ canUrl: data });
    });
  },
  onLoad: function (options) {
    let that = this;
    let mCid = options.id;

    mLogin.getUserInfo(function (mToken) {
      mCarD.getCardData(mToken, mCid, function (data) {
        that.setData({ mEr: data.codeUrl });
        that.setData({ mList: data.backgrounds });
        mCImg.setObj({
          couB: data.backgrounds[0],
          couE: data.codeUrl
        });
      })
    })
  },
  onShow: function () {
  
  },
  onShareAppMessage: function () {
    return {
      title: '快和Rogers一起来学考研心理～',
      desc: '快和Rogers一起来学考研心理～',
      path: 'pages/index/index'
    }
  }
})