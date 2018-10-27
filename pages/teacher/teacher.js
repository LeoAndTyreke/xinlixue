let mLogin = require('../../utils/mLogin.js');
let mTeaD = require('../../utils/teaData.js');
let mPay = require('../../utils/pay.js');
Page({
  data: {
    mObj:{},
    ccList:[],
    ccIds:''
  },
  page:{
    myMon:0
  },
  bindLess: function (e) {
    wx.navigateTo({ url: '/pages/lesson/lesson?id=' + e.target.id });
  },
  payList:function(e){
    let that = this;
    let mIds = that.data.ccIds;
    if (mIds != ''){
      wx.navigateTo({ url: '/pages/orderInfo/orderInfo?ids=' + mIds + '&moe=' + that.page.myMon });
    }
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
        console.log(data.cc)
        that.ccIdStr(data.cc);
      })
    });
  },
  ccIdStr:function(mArr){
    let that = this;
    let mIds = '';
    let mMoney = 0;
    mArr.forEach(function (val, ind) {
      if (val.purchasedFlag == 0){
        mIds += val.uid + ',';
        mMoney += parseFloat(val.priceInfo);
      }
    })
    mIds = mIds.substr(0, mIds.length - 1);
    that.setData({ ccIds:mIds});
    that.page.myMon = mMoney;
  },
  updataPay:function(mNum){
    this.setData({ ccIds: '' });
  },
  onShow: function () {
    let that = this;
    let mPIds = mPay.getPayId();
    if (mPIds == that.data.ccIds) {
      that.updataPay('1');
    }
  },
  onShareAppMessage: function () {

  }
})