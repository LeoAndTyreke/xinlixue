let mServer = require('server.js');
let err = require('inteError.js');

let mOrder = '';
let mProIds = '';
let mProEnd = '';

function getOrders(mToken,mSpIds,mAdd,mshaid,sucFun){
  mProIds = mSpIds;
  let mSend = {
    token: mToken,
    productIds: mSpIds,
    userAddress: mAdd
  }
  if (mshaid != ''){
    mSend.refId = mshaid;
  }

  mServer.serverReq('order/create', mSend, function (data){
    console.log(JSON.stringify(data))
    if (data.result === 'success') {
      mOrder = data.items.order.orderNO;
      if (data.items.order.cFlag == 1){
        mProEnd = mProIds;
        sucFun({ status:'9'});
      } else {
        hyPay(data.items.request, mToken, sucFun);
      }
    } else {
      err.inteE(data);
    }
  });
}
function hyPay(mObj,mToken,sucFun){
    wx.requestPayment({
        'timeStamp': mObj.timeStamp,
        'nonceStr': mObj.nonceStr,
        'package': mObj.package,
        'signType': mObj.signType,
        'paySign': mObj.sign,
        'success':function(res){
          console.log(res)
          pollingPay(mToken, sucFun)
        },
        'fail':function(res){
          if (typeof sucFun == 'function') sucFun(res);
        }
    })
}
function pollingPay(mToken,sucFun){
    var mLoop = 0;
    polling();
    function polling(){
      mServer.serverReq('order/getStatus', { token: mToken, orderNO: mOrder }, function (data){
        //console.log(JSON.stringify(data));
        if (data.result === 'success'){
          if (data.items && data.items.status == '9'){
            mProEnd = mProIds;
            if (typeof sucFun == 'function') sucFun(data.items);
          } else if (data.items && data.items.status == '1'){
            if (mLoop < 10) {
              setTimeout(polling, 1000);
            } else {
              if (typeof sucFun == 'function') sucFun(data.items);
            }
            mLoop++;
          }else{
            if (typeof sucFun == 'function') sucFun(data.items);
          }
        }else{
          if (typeof sucFun == 'function') sucFun(data.items);
                
        }
      });
    }
}

function getPayId(){
  return mProEnd;
}

module.exports = {
  getOrders:getOrders,
  pollingPay:pollingPay,
  getPayId: getPayId
}