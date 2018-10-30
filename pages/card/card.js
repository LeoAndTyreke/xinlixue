
Page({
  data: {
    mList:[]
  },
  monbind:function(e){
    let mtag = e.target;
  },
  onLoad: function (options) {
    let that = this;
    that.setData({ mList: [{ data: '' }, { data: '' }, { data: '' }, { data: '' }] });
  },
  onShow: function () {
  
  }
})