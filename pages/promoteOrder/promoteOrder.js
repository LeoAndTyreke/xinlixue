let mLogin = require('../../utils/mLogin.js');
let mProD = require('../../utils/proData.js');
Page({
  data: {
    mList:[]
  },
  onLoad: function (options) {
    let that = this;
    mLogin.getUserInfo(function (mToken) {
      mProD.getProOrdData(mToken, function (data) {
        that.setData({ mList: data });
      })
    });
  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  }
})