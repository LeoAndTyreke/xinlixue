let mLogin = require('../../utils/mLogin.js');
let mBouD = require('../../utils/boughtData.js');
Page({
  data: {
    ccList:[]
  },
  bindLess: function (e) {
    wx.navigateTo({ url: '/pages/lesson/lesson?id=' + e.target.id });
  },
  onLoad: function (options) {
    let that = this;
    mLogin.getUserInfo(function (mToken) {
      mBouD.getPayData(mToken, function (data) {
        that.setData({ ccList: data });
      })
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