let mLogin = require('../../utils/mLogin.js');
let mLesD = require('../../utils/lesData.js');
let mPay = require('../../utils/pay.js');
Page({
  data: {
    showDetail: true,
    mObj:{},
    wcList:[]
  },
  toggleTab: function () {
    this.setData({
      showDetail: !this.data.showDetail
    })
  },
  binPay:function(e){
    mPay.getOrders(mLogin.getToken(), this.data.mObj.uid,function(data){
      console.log(JSON.stringify(data))
      // mPay.pollingPay(ordId,function(data){

      // })
    });
    console.log(this.data.mObj.price)
    console.log(this.data.mObj.uid)
  },
  binWCList:function(e){
    let mTag = e.target;
    if (mTag.id == 'wcch'){
      if (mTag.dataset.uid != ''){
        wx.navigateTo({ url: '/pages/play/play?id=' + mTag.dataset.uid });
      }
      console.log(mTag.dataset.uid)
    }
  },
  onLoad: function (options) {
    let that = this;
    let mLid = options.id;
    mLogin.getUserInfo(function (mToken) {
      mLesD.getLesData(mToken, mLid,function(data){
        wx.setNavigationBarTitle({ title: data.cc.name });
        that.setData({ mObj: data.cc});
        that.setData({ wcList: data.cwList });
      })
    });
  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  }
})