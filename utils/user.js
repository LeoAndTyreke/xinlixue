let mServer = require('server.js');

let userObj = null;
let userPhone = '';

function mUserPhone(mSend, sucFun) {
  mServer.serverReq(mServer.serAdd('uLogin.php'), mSend, function (data) {
    //console.log('phone:' + JSON.stringify(data));
    if (data.status === 'success') {
      userPhone = data.cont.phone;
      if (typeof sucFun == 'function') sucFun(data);
    }
  });
}

function setPhone(detail, sucFun){
  if (detail.errMsg !== 'getPhoneNumber:ok') {
    return;
  }
  let mSendObj = {};
  mSendObj.action = 'addp';
  if (detail.encryptedData) mSendObj.encry = detail.encryptedData;
  if (detail.iv) mSendObj.iv = detail.iv;
  wx.login({
    success: function (res) {
      if (res.code) {
        mSendObj.code = res.code;
        mUserPhone(mSendObj, sucFun);
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  });
}

function getUser(mToken, sucFun) {
  if (userObj){
    if (typeof sucFun == 'function') sucFun(userObj);
  }else{
    mServer.serverReq(mServer.serAdd('uLogin.php'), { action:'user', token:mToken}, function (data) {
      //console.log('phone:' + JSON.stringify(data));
      if (data.status === 'success') {
        userObj = data.cont.userInfo;
        getDisable();
      }
      if (typeof sucFun == 'function') sucFun(userObj);
    });
  }
}

function getPhone(){
  let mPh = '';
  if (userObj && userObj.phone){
    mPh = userObj.phone;
  } else if (userPhone != ''){
    mPh = userPhone;
  }
  return mPh;
}

function getDisable(){
  let mBoo = false;
  if (userObj && userObj.dis && userObj.dis == '1'){
    mBoo = true;
  }
  if (mBoo) {
    wx.showToast({
      title: '由于违规操作，当前用户已经被禁用',
      icon: 'none',
      mask:true,
      duration: 2000000
    })
  }
}


module.exports = {
  setPhone: setPhone,
  getUser: getUser,
  getPhone: getPhone,
  getDisable: getDisable
}