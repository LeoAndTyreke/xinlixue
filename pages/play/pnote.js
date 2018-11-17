let mPlaD = require('../../utils/playData.js');
let WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    nodes:[]
  },
  onLoad: function (options) {
    let that = this;
    let mNote = mPlaD.getNot();
    that.setData({ nodes: mNote});
    WxParse.wxParse('article', 'html', mNote, that, 5);
  },
  onShow: function () {

  },
  onShareAppMessage: function () {
    return {
      title: '快和Rogers一起来学考研心理～',
      desc: '快和Rogers一起来学考研心理～',
      path: 'pages/index/index'
    }
  }
})