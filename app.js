let mLogin = require('utils/mLogin.js');
let mPh = require('utils/iPhone.js');
let user = require('utils/user.js');
let err = require('utils/inteError.js');
App({
  onLaunch: function (e) {
    let that = this;
    //系统信息
    mPh.obtain();
    mPh.verDet();
    err.inteE({ resultCode:102});
    //调试
    //wx.setEnableDebug({ enableDebug: true });
    //登录（获取用户信息）
    mLogin.getUserInfo(function (mToken) {
      user.getUser(mToken);
      //console.log('mToken::' + mToken);
      console.log('uObj:' + JSON.stringify(mLogin.getUser()))
    });

    console.log(JSON.stringify(e.query.shid));

  }
})