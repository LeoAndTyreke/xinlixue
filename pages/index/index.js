let mLogin = require('../../utils/mLogin.js');
let mIndD = require('../../utils/indexData.js');
Page({
  data: {
    ads: [],
    focusBool: false,
		categories:[],
    lessonListData:[],
    teacherListData:[]
	},
  binSwi:function(e){
    let mTag = e.target;
    if (mTag.dataset.linktyp == '1'){
      wx.navigateTo({ url: '/pages/web/web?link=' + mTag.dataset.link});
    } else if (mTag.dataset.linktyp == '2'){
      wx.navigateTo({ url: mTag.dataset.link});
    }
  },
  binLes:function(e){
    wx.navigateTo({ url: '/pages/lessons/lessons?type=more' });
  },
  binTea: function (e) {
    wx.navigateTo({ url: '/pages/teachers/teachers' });
  },
  bindLess:function(e){
    console.log(e.target.id);
    wx.navigateTo({ url: '/pages/lesson/lesson' });
  },
  bindTeac: function (e) {
    console.log(e.target.id);
    wx.navigateTo({ url: '/pages/teacher/teacher' });
  },
  bindType:function(e){
    console.log(e.target.id);
    wx.navigateTo({ url: '/pages/lessons/lessons' });
  },
	onLoad: function () {
    let that = this;

    if (mIndD.getIndSwi().length >0){
      that.setData({ ads: mIndD.getIndSwi()});
    }
    mIndD.setIndSwi(function(data){
      that.setData({ ads: data });
    })

    if (mIndD.getIndTag().length > 0) {
      that.setData({ categories: mIndD.getIndTag() });
    }
    mIndD.setIndTag(function (data) {
      that.setData({ categories: data });
    })

    if (mIndD.getIndCou().cc && mIndD.getIndCou().cc.length > 0){
      that.setData({ lessonListData: mIndD.getIndCou().cc });
    }
    if (mIndD.getIndCou().tc && mIndD.getIndCou().tc.length > 0) {
      that.setData({ teacherListData: mIndD.getIndCou().tc });
    }
    mIndD.setIndCou(function (data) {
      if (data.cc && data.cc.length >0){
        that.setData({ lessonListData: data.cc });
      }
      if (data.tc && data.tc.length > 0) {
        that.setData({ teacherListData: data.tc });
      }
    })

	},
	inputFocus: function () {
		this.setData({focusBool: true});
	},
	inputBlur: function () {
		this.setData({focusBool: false});
	},
  confirmButn:function(e){
    if (e.detail.value != ''){
      wx.navigateTo({ url: '/pages/lessons/lessons?type=search&value=' + e.detail.value });
    }
  },
  onShareAppMessage: function () {

  }
})
