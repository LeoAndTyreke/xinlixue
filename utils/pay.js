let mServer = require('server.js');
let err = require('inteError.js');

let mOrder = '';

function getOrders(mToken,mSpIds,sucFun){
  mServer.serverReq('order/create', { token: mToken, productIds: mSpIds }, function (data){
    console.log(JSON.stringify(data))
    if (data.result === 'success') {
      mOrder = data.items.order.orderNO;
      hyPay(data.items.request, sucFun);
    } else {
      err.inteE(data);
    }
  });
}
function hyPay(mObj,sucFun){
    var mres = {status:'failure'};
    wx.requestPayment({
        'timeStamp': mObj.timeStamp,
        'nonceStr': mObj.nonceStr,
        'package': mObj.package,
        'signType': mObj.signType,
        'paySign': mObj.sign,
        'success':function(res){
            mres.status = 'success';
            mres.data = res;
            if(typeof sucFun == 'function')sucFun(mres);
        },
        'fail':function(res){
            if(typeof sucFun == 'function')sucFun(mres);
        }
    })
}
function pollingPay(mToken,sucFun){
    var mLoop = 0;
    polling();
    function polling(){
      mServer.serverReq('order/getStatus', { token: mToken, orderNO: mOrder }, function (data){
        console.log(JSON.stringify(data));
        if (data.result === 'success'){
          if (data.items && data.items.status == '9'){
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

module.exports = {
  getOrders:getOrders,
  pollingPay:pollingPay
}