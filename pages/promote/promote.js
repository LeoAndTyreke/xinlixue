let mLogin = require('../../utils/mLogin.js');
let mProD = require('../../utils/proData.js');
Page({
  data: {
    mObj: { balanceInfo: 0, totalDebitInfo:0},
    mList:[]
  },
  bindLess: function (e) {
    wx.navigateTo({ url: '/pages/lesson/lesson?id=' + e.target.id });
  },
  onLoad: function (options) {
    let that = this;
    mLogin.getUserInfo(function (mToken) {
      mProD.getProData(mToken,function(data){
        if (data.ub){
          that.setData({ mObj: data.ub});
        }
        if (data.cc){
          that.setData({ mList: data.cc });
        }
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