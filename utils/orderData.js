let mData = {
  mSHR: '',
  mSJH: '',
  mXXDZ: '',
  region: ['北京市', '北京市', '东城区']
};

function setOrdData(data) {
  mData = data;
  try {
    wx.setStorageSync('orderData', JSON.stringify(mData));
  } catch (e) { }
}

function getOrdData(){
  let mOrder = wx.getStorageSync('orderData');
  if (mOrder) {
    mData = JSON.parse(mOrder);
  }
  return mData;
}

////////////////////////////////////////////////////////////
let shareId = '';
function setShareid(mId) {
  shareId = mId;
}
function getShareId(){
  return shareId;
}

module.exports = {
  setOrdData: setOrdData,
  getOrdData: getOrdData,
  setShareid: setShareid,
  getShareId: getShareId
}