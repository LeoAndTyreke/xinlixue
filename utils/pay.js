let mServer = require('server.js');
let err = require('inteError.js');

function getOrders(mToken,mSpIds,sucFun){
  mServer.serverReq('order/create', { token: mToken, productIds: mSpIds }, function (data){
    console.log(JSON.stringify(data))
    if (data.result === 'success') {
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
function pollingPay(ordId,sucFun){
    var mLoop = 0;
    polling();
    function polling(){
      mServer.serverReq('order/notify',{orders:ordId},function(msg){
            console.log(JSON.stringify(msg));
            if(msg.status === 'success'){
                if(typeof sucFun == 'function')sucFun(msg);
            }else{
                if(mLoop < 10){
                    setTimeout(polling,1000);
                }else{
                    if(typeof sucFun == 'function')sucFun(msg);
                }
                mLoop ++;
            }
        });
    }
}

module.exports = {
  getOrders:getOrders,
  pollingPay:pollingPay
}