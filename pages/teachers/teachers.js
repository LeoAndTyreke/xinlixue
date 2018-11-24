let mTeac = require('../../utils/teachersData.js');
let mLogin = require('../../utils/mLogin.js');
Page({
  data: {
    teacherListData:[]
  },
  bindTeac: function (e) {
    wx.navigateTo({ url: '/pages/teacher/teacher?id=' + e.target.id });
  },
  onLoad: function (options) {
    let that = this;
    mTeac.mInit();
    that.updataList();
  },
  onShow: function () {

  },
  onReachBottom: function () {
    let that = this;
    let mJZ = mTeac.getJZ();
    if (mJZ.jBool) {
      mTeac.setJZ(false, 0);
      that.updataList();
    }
  },
  updataList: function () {
    let that = this;
    mTeac.teacherServer(mLogin.getToken(), function (mList) {
      that.setData({ teacherListData: mList });
    });
  },
  onShareAppMessage: function () {
    return {
      title: '快和Rogers一起来学考研心理～',
      desc: '快和Rogers一起来学考研心理～',
      path: 'pages/index/index'
    }
  }
})