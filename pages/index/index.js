//index.js
//获取应用实例
const app = getApp()
var categories = [
	{
		img: 'http://www.familyktv.com/images/ys.png',
		name: '月嫂'
	},
	{
		img: 'http://www.familyktv.com/images/zntj.png',
		name: '胎教师'
	},
	{
    img: 'http://www.familyktv.com/images/xlcp.png',
		name: '幼教师'
	},
	{
		img: 'http://www.familyktv.com/images/yycd.png',
		name: '营养师'
	},
	{
		img: 'http://www.familyktv.com/images/xlcp.png',
		name: '心理师'
	},
	{
		img: 'http://www.familyktv.com/images/xlcp.png',
		name: '育婴师'
	},
	{
		img: 'http://www.familyktv.com/images/xlcp.png',
		name: '母婴护理'
	},
	{
		img: 'http://www.familyktv.com/images/xlcp.png',
		name: '产后护理'
	}
];
var ads = [
  { img: 'http://www.familyktv.com/images/xinpic1.jpg'},
  { img: 'http://www.familyktv.com/images/xinpic2.jpg' },
  { img: 'http://www.familyktv.com/images/xinpic3.jpg' },
  { img: 'http://www.familyktv.com/images/xinpic4.jpg' },
]
var lessonListData=[
    {
        cover: 'http://www.familyktv.com/images/xinpic1.jpg',
        title: '心理课程心理课程心理课程信了你的邪',
        teacher: '李老师',
        duration: '10课时',
        price: '99.00',
        record: 8,
        recordTime: '12:45'
    },
    {
        cover: 'http://www.familyktv.com/images/xinpic2.jpg',
        title: '信了你的邪心理课程心理课程心理课程',
        teacher: 'liu老师',
        duration: '12课时',
        price: '99.00',
        record: 0
    }
]
var teacherListData = [
    {
        avatar: 'http://www.familyktv.com/images/xinpic1.jpg',
        teacher: '李老师',
        intro: '信了你的邪心理课程心理课程心理课程信了你的邪心理课程心理课程心理课程信了你的邪心理课程心理课程心理课程'
    },
    {
        avatar: 'http://www.familyktv.com/images/xinpic2.jpg',
        teacher: '刘老师',
        intro: '信了你的邪心理课程心理课程心理课程信了你的邪心理课程心理课程心理课程信了你的邪心理课程心理课程心理课程'
    },
]

Page({
	data: {
		categories,
        ads,
        lessonListData,
        teacherListData,
		userInfo: {},
		focusBool: false,
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},
	//事件处理函数
	bindViewTap: function () {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	onReady: function () {
		this.lessonList = this.selectComponent('#lessonList');
		this.teacherList = this.selectComponent('#teacherList');
	},
	onLoad: function () {
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
	},
	inputFocus: function () {
		console.log('onfocus')
		this.setData({
			focusBool: true
		})
	},
	inputBlur: function () {
		console.log('onblur')
		this.setData({
			focusBool: false
		})
	},
	getUserInfo: function (e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	}
})
