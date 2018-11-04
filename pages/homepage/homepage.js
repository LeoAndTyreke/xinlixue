let mLogin = require('../../utils/mLogin.js');
Page({
  data: {
    mObj:{}
  },
  binMlist:function(e){
    let mTag = e.target;
    if (mTag.id == 'tgzx') {
      wx.navigateTo({ url: '/pages/promote/promote'});
    } else if (mTag.id == 'wdgm') {
      wx.navigateTo({ url: '/pages/bought/bought'});
    }
  },
  onLoad: function (options) {
    let that = this;
    mLogin.getUserInfo(function (mToken) {
      that.setData({ mObj: mLogin.getUser() });
    });
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