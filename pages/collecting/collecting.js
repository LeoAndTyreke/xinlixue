let mLogin = require('../../utils/mLogin.js');
let mColD = require('../../utils/colleData.js');
Page({
  data: {
    mList:[]
  },
  bindLess: function (e) {
    wx.navigateTo({ url: '/pages/lesson/lesson?id=' + e.target.id });
  },
  onLoad: function (options) {
    let that = this;
    
    mLogin.getUserInfo(function (mToken) {
      mColD.seaInit();
      that.updataList();
    });
  }, 
  onShow: function () {

  },
  onReachBottom: function () {
    let that = this;
    let mJZ = mColD.getJZ();
    if (mJZ.jBool) {
      mColD.setJZ(false, 0);
      that.updataList();
    }
  },
  updataList: function () {
    let that = this;
    mColD.searFolServer(mLogin.getToken(), function (data) {
      that.setData({ mList: data });
    });
  },
  onShareAppMessage: function () {

  }
})