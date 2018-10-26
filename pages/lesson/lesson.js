let mLogin = require('../../utils/mLogin.js');
let mLesD = require('../../utils/lesData.js');
let mColD = require('../../utils/colleData.js');
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
    let that = this;
    mPay.getOrders(mLogin.getToken(), that.data.mObj.uid,function(data){
      mPay.pollingPay(mLogin.getToken(),function(data){
        if (data.status == '9'){
          wx.showToast({ title: '支付成功', icon: 'none', duration: 1500 });
          that.updataPay('1');
        }else{
          wx.showToast({ title: '支付失败', icon: 'none', duration: 1500 });
        }
      })
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
    }
  },
  binCol:function(e){
    let that = this;
    let myObj = this.data.mObj;
    mColD.setFol(mLogin.getToken(), that.data.mObj.uid,function(data){
      if (myObj.folderFlag == 1){
        myObj.folderFlag = 0;
      }else{
        myObj.folderFlag = 1;
      }
      that.setData({ mObj: myObj});
    })
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
  updataPay:function(mNum){
    let myObj = this.data.mObj;
    myObj.purchasedFlag = mNum;
    this.setData({ mObj: myObj});
  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  }
})