let mLogin = require('../../utils/mLogin.js');
let mUser = require('../../utils/user.js');
let mOrdD = require('../../utils/orderData.js');
let mPay = require('../../utils/pay.js');
Page({
  data: {
    mInp: {
      mSHR: '',
      mSJH: '',
      mXXDZ: '',
      region: ['北京市', '北京市', '东城区']
    },
    mMoe: ''
  },
  page:{
    mIds:'',
    mMoe:''
  },
  formSubmit:function(e){
    let that = this;
    let mValue = e.detail.value;
    let mData = that.data.mInp;
    mData.mSHR = mValue.mSHR;
    mData.mSJH = mValue.mSJH;
    mData.mXXDZ = mValue.mXXDZ;
    mOrdD.setOrdData(mData);

    if (mData.mSHR == '' || mData.mSJH == '' || mData.mXXDZ == ''){
      wx.showToast({ title: '信息不全', icon: 'none', duration: 1500 });
      return;
    }
    mPay.getOrders(mLogin.getToken(), that.page.mIds, JSON.stringify(mData),function(data){
      mPay.pollingPay(mLogin.getToken(),function(data){
        if (data.status == '9'){
          wx.showToast({ title: '支付成功', icon: 'none', duration: 1500 });
          wx.navigateBack();
        }else{
          wx.showToast({ title: '支付失败', icon: 'none', duration: 1500 });
        }
      })
    });
  },
  onLoad: function (options) {
    let that = this;
    let mOrd = mOrdD.getOrdData();
    if (mOrd.mSHR == ''){
      mOrd.mSHR = mLogin.getUser().nickName;
    }
    if (mOrd.mSJH == ''){
      mOrd.mSJH = mUser.getPhone();
    }
    that.setData({mInp:{
        mSHR: mOrd.mSHR,
        mSJH: mOrd.mSJH,
        mXXDZ: mOrd.mXXDZ,
        region: mOrd.region
      }
    });

    that.page.mIds = options.ids;
    that.page.mMoe = options.moe;
    that.setData({ mMoe: that.page.mMoe});
  },
  onShow: function () {

  },
	regionChange: function (e) {
    let mInps = this.data.mInp;
    mInps.region = e.detail.value;
		this.setData({
      mInp: mInps
		})
	},
  onShareAppMessage: function () {

  }
})