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
    teacherListData
  },
  bindTeac: function (e) {
    console.log(e.target.id);
    wx.navigateTo({ url: '/pages/teacher/teacher' });
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  }
})