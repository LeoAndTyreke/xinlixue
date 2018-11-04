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
    return {
      title: '快和Rogers一起来学考研心理～',
      desc: '快和Rogers一起来学考研心理～',
      path: 'pages/index/index'
    }
  }
})