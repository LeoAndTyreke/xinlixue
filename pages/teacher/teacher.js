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
    mLogin.getUserInfo(function (mToken) {
      mTeaD.getTeaData(mToken, mTid, function (data) {
        wx.setNavigationBarTitle({ title: data.teacher.name });
        that.setData({ mObj: data.teacher });
        that.setData({ ccList: data.cc });
        that.ccIdStr(data.cc,'');
      })
    });
  },
  ccIdStr:function(mArr,mPid){
    let that = this;
    let mIds = '';
    let mMoney = 0;
    mArr.forEach(function (val, ind) {
      if (val.purchasedFlag == 0 && val.uid != mPid){
        mIds += val.uid + ',';
        mMoney += parseInt(val.price);
      }
    })
    mIds = mIds.substr(0, mIds.length - 1);
    that.setData({ ccIds:mIds});
    that.page.myMon = parseFloat(Math.round(mMoney)/100);
  },
  updataPay:function(mNum){
    this.setData({ ccIds: '' });
  },
  onShow: function () {
    let that = this;
    let mPIds = mPay.getPayId();
    let mAllStr = that.data.ccIds;
    if (mPIds == mAllStr) {
      that.updataPay('1');
    } else if (mPIds != '') {
      //mAllStr = mAllStr.replace(mPIds + ',', '');
      that.ccIdStr(that.data.ccList, mPIds);
    }
  },
  onShareAppMessage: function () {

  }
})