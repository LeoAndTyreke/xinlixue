let mLogin = require('../../utils/mLogin.js');
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onShareAppMessage: function () {
    return {
      title: '知识付费',
      desc: '知识付费',
      path: 'pages/index/index?shid=' + mLogin.getUserId()
    }
  }
})