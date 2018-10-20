let mLogin = require('../../utils/mLogin.js');
let mPlaD = require('../../utils/playData.js');
Page({
  data: {
    mObj:{}
  },
  binPay:function(e){
    console.log(this.data.mObj.pid)
    console.log(this.data.mObj.uid)
  },
  binMen: function (e) {
    wx.navigateTo({ url: '/pages/menus/menus?id=' + this.data.mObj.uid });
  },
  onLoad: function (options) {
    let that = this;
    let mChid = options.id;
    mLogin.getUserInfo(function (mToken) {
      mPlaD.getPlayData(mToken, mChid, function (data) {
        console.log(JSON.stringify(data));
        wx.setNavigationBarTitle({ title: data.name });
        that.setData({ mObj: data });
      })
    });
  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  }
})