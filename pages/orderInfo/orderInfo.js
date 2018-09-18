// pages/orderInfo/orderInfo.js
Page({
  data: {
	  region: ['北京市', '北京市', '东城区']
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {

  },


	regionChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			region: e.detail.value
		})
	},
  onShareAppMessage: function () {

  }
})