let mLogin = require('../../utils/mLogin.js');
let mPlaD = require('../../utils/playData.js');
let mPlaS = require('../../utils/playSend.js');
let net = require('../../utils/network.js');
let glo = require('../../utils/gloData.js');
let WxParse = require('../../wxParse/wxParse.js');
let mMp3 = require('../../temp/mimp3.js');
Page({
  data: {
    mObj:{},
    mCObj:{},
    mBs:{mbool:false,num:1.0},
    mPic:true,
    mCon: {sliderValue: 0,updateState: false,playStates: true,curStr: '00:00', durStr: '00:00',bgimg: ''}
  },
  page:{
    mTyp:'',
    mPlT:0
  },
  binSha:function(e){
    this.setData({ mPic: false });
  },
  binMen: function (e) {
    let mObj = this.data.mObj;
    wx.redirectTo({ url: '/pages/menus/menus?id=' + this.data.mCObj.uid +'&cid='+ mObj.uid});
  },
  binBS:function(e){
    let myBs = this.data.mBs;
    if (myBs.num == 1.0){
      myBs.num = 1.5;
      this.setData({ mBs: myBs});
      if (this.videoContext) this.videoContext.playbackRate(1.5);
    }else{
      myBs.num = 1.0;
      this.setData({ mBs: myBs });
      if (this.videoContext) this.videoContext.playbackRate(1.0);
    }
  },
  vidEve:function(e){
    let myBs = this.data.mBs;
    if (e.type == 'play'){
      myBs.mbool = true;
      this.setData({ mBs: myBs });
    } else if (e.type == 'pause' || e.type == 'ended'){
      myBs.mbool = false;
      this.setData({ mBs: myBs });
    }
    this.playEndSend();
  },
  vidTim:function(e){
    let mTnum = e.detail.currentTime;
    this.playTimeSend(mTnum);
  },
  playEndSend:function(){
    mPlaS.sendEve();
  },
  playTimeSend: function (mTnum) {
    mPlaS.setVidTim(mTnum);
    if (this.data.mObj.feeFlag != 1 || this.data.mCObj.purchasedFlag == 1) {
      return;
    }
    if (mTnum > this.page.mPlT) {
      mMp3.pUnload();
      this.videoContext.pause();
      wx.showModal({
        content: '试试看结束，喜欢请购买',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.navigateBack();
          }
        }
      })
    }
  },
  picBind:function(e){
    let mTarg = e.target;
    let myObj = this.data.mCObj;
    if (mTarg.id == 'yqcard'){
      wx.navigateTo({ url: '/pages/card/card?id=' + myObj.uid});
    }
    this.setData({ mPic: true});
  },
  binNote:function(e){
    wx.navigateTo({ url: 'pnote'});
  },
  updataCon: function (data) {
    this.setData({
      mCon: data
    })
  },
  onLoad: function (options) {
    let that = this;
    let mChid = options.id;

    that.page.mPlT = glo.getGlo().trailTime;
    
    mLogin.getUserInfo(function (mToken) {
      mPlaD.getPlayData(mToken, mChid, function (data) {
        wx.setNavigationBarTitle({ title: data.cw.name });
        that.setData({ mObj: data.cw });
        that.setData({ mCObj: data.cc });
        that.setPlayer(data);
        WxParse.wxParse('article', 'html', data.cw.subjectNote, that, 5);
        mPlaS.init(mToken, mChid);
        that.page.mTyp = that.extName(data.cw.fileUrl)
        that.autoplay(that.page.mTyp);
      })
    });
  },
  setPlayer: function (data){
    let that = this;
    if (that.page.mPlT <= 0) {
      that.playTimeSend(1);
      return;
    }
    if (data.cw.type == 1) {//mp3
      mMp3.setPthis(that);
      mMp3.setUpCont(that.updataCon);
      let myCon = that.data.mCon;
      myCon.bgimg = data.cc.frontPage;
      mMp3.init(myCon, {
        title: data.cw.name,
        coverImgUrl: data.cc.frontPage,
        src: data.cw.fileUrl
      });
    }
  },
  onShow: function () {
    
  },
  onHide:function(res){
    if (this.data.mObj.feeFlag == 1 && this.data.mCObj.purchasedFlag != 1) {
      mMp3.pUnload();
    }
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  onUnload:function(res){
    mMp3.pUnload();
  },
  extName:function(mUrl){
    let medTyp = '';
    if (mUrl && mUrl != '') {
      var medArr = mUrl.toLowerCase().split('.');
      medTyp = medArr[medArr.length - 1];
    }
    return medTyp;
  },
  autoplay:function(mTyp){
    let that = this;
    if (mTyp == 'mp3') {
      setTimeout(function(){
        if (net.getType() == 'wifi' && that.videoContext) that.videoContext.play();
      },500)
    } else if (mTyp == 'mp4'){
      that.setData({ mBs: { mbool: false, num: 1.0 } });
    }
  },
  onShareAppMessage: function () {
    let myObj = this.data.mCObj;
    return {
      title: '快和Rogers一起来学考研心理～',
      desc: '快和Rogers一起来学考研心理～',
      path: 'pages/lesson/lesson?id=' + myObj.uid + '&shid=' + mLogin.getUserId()
    }
  }
})