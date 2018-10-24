let mLogin = require('../../utils/mLogin.js');
let mTeaD = require('../../utils/teaData.js');
let mPay = require('../../utils/pay.js');
Page({
  data: {
    mObj:{},
    ccList:[],
    ccIds:''
  },
  bindLess: function (e) {
    wx.navigateTo({ url: '/pages/lesson/lesson?id=' + e.target.id });
  },
  payList:function(e){
    let mIds = this.data.ccIds;
    if (mIds != ''){
      mPay.getOrders(mLogin.getToken(), mIds, function (data) {
        console.log(JSON.stringify(data))
        // mPay.pollingPay(ordId,function(data){

        // })
      });
    }
    console.log(mIds)
  },
  onLoad: function (options) {
    let that = this;
    let mTid = options.id;
    console.log(mTid)
    mLogin.getUserInfo(function (mToken) {
      mTeaD.getTeaData(mToken, mTid, function (data) {
        wx.setNavigationBarTitle({ title: data.teacher.name });
        that.setData({ mObj: data.teacher });
        that.setData({ ccList: data.cc });
        that.ccIdStr(data.cc);
      })
    });
  },
  ccIdStr:function(mArr){
    let that = this;
    let mIds = '';
    mArr.forEach(function (val, ind) {
      if (val.purchasedFlag == 0){
        mIds += val.uid + ',';
      }
    })
    mIds = mIds.substr(0, mIds.length - 1);
    that.setData({ ccIds:mIds});
  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  }
})