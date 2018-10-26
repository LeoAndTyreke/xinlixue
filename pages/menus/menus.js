let mLogin = require('../../utils/mLogin.js');
let mMenD = require('../../utils/menusData.js');
Page({
  data: {
    mObj:{},
    mList:[]
  },
  onLoad: function (options) {
    let that = this;
    let mChid = options.id;
    mLogin.getUserInfo(function (mToken) {
      mMenD.getMenData(mToken, mChid, function (data) {
        that.setData({ mObj: data.cc });
        that.setData({ mList: data.cwList });
      })
    });
  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  }
})