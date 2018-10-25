function serverReq(mUrl,mData,sucFun,errFun) {
    wx.request({
      url: serAdd(mUrl),
      data: mData,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method:"POST",
      success: function(res) {
        if (typeof sucFun == 'function') sucFun(res.data);
      },
      fail:function(res){
        if (typeof errFun == 'function'){
          errFun(res.data);
        }else{
          //if (res.errMsg.indexOf('TLS 版本必') == -1){
            wx.showModal({ title: '小程序提示', content: '网络错误，请稍后重试', showCancel: false });
            wx.hideToast();
          //}
        }
      }
    });
}
function getNetType(){
  wx.getNetworkType({
    success: function (res) {
      if (res.networkType == 'none') {
        wx.showModal({ title: '温馨提示', content: '网络错误，请稍后重试', showCancel: false });
      }
    }
  });
}
function serAdd(addres){
  var serInter = 'https://app.psyrogers.vip/';
	
  var kc = 'biz/wxapp/';
	var returnStr = serInter;
	switch (addres){
    case 'wx/login':
    case 'user/get':
    case 'wx/phone/bind':
    case 'slideshow/list':
    case 'tags/list':
    case 'resources/list':
    case 'resources/search':
    case 'cc/list':
    case 'teacher/list':
    case 'curriculum/get':
    case 'cwChild/list':
    case 'cw/get':
    case 'order/create':
    case 'order/getStatus':
    case 'teacher/detail':
    case 'user/listCC':
    case 'userFolder/list':
    case 'userFolder/toggle':
			returnStr = serInter+kc+addres;
			break;
    case 'findSwi.php':
    case 'web.php':
      returnStr = 'http://app.psyrogers.org/' + addres;
      break;  		
		case 'local':
      returnStr = 'http://app.psyrogers.org/';
			break;	
		default:
			returnStr = serInter;
			break;
	}
	return returnStr;
}
function serUrl(url){
	var myUrl = "";
	if(url != null && url != undefined){
		myUrl = url;
	}
	if(myUrl.length > 5){
		var myType = url.substr(0,5);
    if (myType != "http:" && myType != "wxfil" && myType != "https"){
			myUrl = serAdd('local') + myUrl;
		}
	}
	return myUrl;
}
module.exports = {
  serverReq:serverReq,
  serAdd:serAdd,
	serUrl:serUrl,
  getNetType:getNetType
}