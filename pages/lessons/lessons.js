let mLess = require('../../utils/lessonsData.js');
Page({
  data: {
    lessonListData:[]
  },
  page:{
    sea:''
  },
  bindLess: function (e) {
    console.log(e.target.id);
    wx.navigateTo({ url: '/pages/lesson/lesson' });
  },
  onLoad: function (options) {
    mLess.seaInit();
    if (options.type == 'search'){
      this.page.sea = options.value;
      mLess.searchServer(options.value);
    }
  },
  onShow: function () {

  },
  onReachBottom: function () {
    let mJZ = mLess.getJZ();
    if (mJZ.jBool) {
      mLess.setJZ(false, 0);
      this.searchServer(this.page.sea);
    }
  },
  onShareAppMessage: function () {

  }
})