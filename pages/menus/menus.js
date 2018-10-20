let mLogin = require('../../utils/mLogin.js');
let mMenD = require('../../utils/menusData.js');
Page({
  data: {
    mList:[]
  },
  onLoad: function (options) {
    let that = this;
    let mChid = options.id;
    mLogin.getUserInfo(function (mToken) {
      mMenD.getMenData(mToken, mChid, function (data) {
        console.log(JSON.stringify(data));
        that.setData({ mList: data });
      })
    });
  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  }
})