let mLess = require('../../utils/lessonsData.js');
let mLogin = require('../../utils/mLogin.js');
Page({
  data: {
    lessonListData:[]
  },
  page:{
    typ:'',
    val:''
  },
  bindLess: function (e) {
    console.log(e.target.id);
    wx.navigateTo({ url: '/pages/lesson/lesson' });
  },
  onLoad: function (options) {
    let that = this;
    that.page.typ = options.type;
    that.page.val = options.value;
    mLess.seaInit();
    that.updataList();
  },
  onShow: function () {

  },
  onReachBottom: function () {
    let that = this;
    let mJZ = mLess.getJZ();
    if (mJZ.jBool) {
      mLess.setJZ(false, 0);
      that.updataList();
    }
  },
  updataList:function(){
    let that = this;
    if (that.page.typ == 'search') {
      mLess.searchServer(that.page.val, function (mList) {
        that.setData({ lessonListData: mList });
      });
    } else if (that.page.typ == 'more') {
      mLess.moreServer(mLogin.getToken(), function (mList) {
        that.setData({ lessonListData: mList });
      });
    } else if (that.page.typ == 'type') {

    }
  },
  onShareAppMessage: function () {

  }
})