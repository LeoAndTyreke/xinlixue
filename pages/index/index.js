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
		focusBool: false,
		hasUserInfo: false
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
		
	},
	inputFocus: function () {
		this.setData({focusBool: true});
	},
	inputBlur: function () {
		this.setData({focusBool: false});
	}
})
