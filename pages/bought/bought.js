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

  }
})