let mLogin = require('../../utils/mLogin.js');
let mMenD = require('../../utils/menusData.js');
let mPh = require('../../utils/iPhone.js');
Page({
  data: {
    mObj:{},
    mList:[]
  },
  binWCList:function(e){
    let mTag = e.target;
    if (mTag.id == 'wcch' || mTag.id == 'wcchbt') {
      if (mTag.dataset.uid != '') {
        if (mTag.dataset.url == '') {
          return;
        }
        wx.redirectTo({ url: '/pages/play/play?id=' + mTag.dataset.uid });
      }
    }
  },
  onLoad: function (options) {
    let that = this;
    let mChid = options.id;
    let mcId = options.cid;
    let mScTop = 0;
    let mScTopPx = 0;
    mLogin.getUserInfo(function (mToken) {
      mMenD.getMenData(mToken, mChid, function (data) {
        let mCwLis = data.cwList;
        that.setData({ mObj: data.cc });
        mCwLis.forEach(function (val, ind) {
          mScTop ++;
          val.children.forEach(function (cval, cind) {
            mScTop++;
            if (mcId == cval.uid){
              mScTopPx = mScTop * 98 * mPh.getWH();
              cval.vbool = true;
            }else{
              cval.vbool = false;
            }
          })
        })
        that.setData({ mList: mCwLis });
        that.moveScrollTop(mScTopPx-100);
      })
    });
  },
  moveScrollTop:function(mTop){
    if (mTop < 0) mTop=0;
    setTimeout(function(){
      wx.pageScrollTo({ scrollTop: mTop, duration: 500 });
    },500)
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