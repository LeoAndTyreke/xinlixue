let mType = 'none';

function initType(){
  wx.getNetworkType({
    success(res) {
      mType = res.networkType;
    }
  })
  wx.onNetworkStatusChange(function (res) {
    if (res.isConnected){
      mType = res.networkType;
    }
  }) 
}

function getType(){
  return mType;
}
module.exports = {
  initType: initType,
  getType: getType
}