Page({
  data: {
    weburl:''
  },
  onLoad: function (options) {
    let that = this;
    let mWeb = options.link;
    that.setData({ weburl: mWeb })
  }
})