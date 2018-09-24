let mFSwi = {};
let mFSort = [];
let jiaZai = {
  jBool: false,
  jNum: 0
}
let mFList = [];
let msoName = '';

//缓存轮播列表
function setFSwi(mArr) {
  mFSwi = mArr;
  try {
    wx.setStorageSync('myFindSwiT', new Date().getTime());
    wx.setStorageSync('myFindSwi', JSON.stringify(mFSwi));
  } catch (e) { }
}
function getFSwi() {
  if (mFSwi.sList && mFSwi.sList.length > 0){
    return mFSwi;
  }else{
    let mSList = wx.getStorageSync('myFindSwi');
    let mSTime = wx.getStorageSync('myFindSwiT');
    let mChaTime = parseInt(((new Date().getTime() - mSTime) / 1000) / 3600);
    if (mSList && mChaTime < 2) {
      mFSwi = JSON.parse(mSList);
    }
    return mFSwi;
  }
}

//缓存分类列表
function setFSort(mArr) {
  mFSort = mArr;
  try {
    wx.setStorageSync('myFindSortT', new Date().getTime());
    wx.setStorageSync('myFindSort', JSON.stringify(mFSort));
  } catch (e) { }
}
function getFSort() {
  if (mFSort.length > 0) {
    return mFSort;
  } else {
    let mSList = wx.getStorageSync('myFindSort');
    let mSTime = wx.getStorageSync('myFindSortT');
    let mChaTime = parseInt(((new Date().getTime() - mSTime) / 1000) / 3600);
    if (mSList && mChaTime < 2) {
      mFSort = JSON.parse(mSList);
    }
    return mFSort;
  }
}

//缓存列表
function setJZ(mBool,mNum){
  let nmN = jiaZai.jNum + mNum;
  jiaZai = {
    jBool: mBool,
    jNum: nmN
  };
}
function getJZ(){
  return jiaZai;
}
function setFinList(mArr){
  mFList = mArr;
  try {
    wx.setStorageSync('myFindJiaZai', JSON.stringify(jiaZai));
    wx.setStorageSync('myFindListT', new Date().getTime());
    wx.setStorageSync('myFindList', JSON.stringify(mFList));
  } catch (e) { }
}
function getFinList() {
  if (mFList.length > 0) {
    return mFList;
  } else {
    let mSList = wx.getStorageSync('myFindList');
    let mSTime = wx.getStorageSync('myFindListT');
    let mChaTime = parseInt(((new Date().getTime() - mSTime) / 1000) / 3600);
    if (mSList && mChaTime < 2) {
      mFList = JSON.parse(mSList);

      let mJZ = wx.getStorageSync('myFindJiaZai');
      if (mJZ) jiaZai = JSON.parse(mJZ);
    }
    return mFList;
  }
}

//缓存分类名
function setSoName(mStr){
  msoName = mStr;
}
function getSoName(){
  return msoName;
}


module.exports = {
  setFSwi: setFSwi,
  getFSwi: getFSwi,
  setFSort: setFSort,
  getFSort: getFSort,
  setJZ: setJZ,
  getJZ: getJZ,
  setSoName: setSoName,
  getSoName: getSoName,
  setFinList: setFinList,
  getFinList: getFinList
}