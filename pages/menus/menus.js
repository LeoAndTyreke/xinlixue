let mLogin = require('../../utils/mLogin.js');
let mMenD = require('../../utils/menusData.js');
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
    mLogin.getUserInfo(function (mToken) {
      mMenD.getMenData(mToken, mChid, function (data) {
        let mCwLis = data.cwList;
        that.setData({ mObj: data.cc });
        mCwLis.forEach(function (val, ind) {
          val.children.forEach(function (cval, cind) {
            if (mcId == cval.uid){
              cval.vbool = true;
            }else{
              cval.vbool = false;
            }
          })
        })
        that.setData({ mList: mCwLis });
      })
    });
  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  }
})