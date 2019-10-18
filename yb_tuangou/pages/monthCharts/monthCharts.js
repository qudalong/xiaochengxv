var months = []
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
import {
  request
} from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    month: '',
    months: months,
    showPicker: false,
    monthF: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  
  // 查询
  bindSearch() {
    var month = this.data.month;
    if (!month) {
      wx.showToast({
        title: '请选择查询时间',
        icon: 'none'
      });
      return
    }
    wx.showLoading({
      title: '查询中...',
    });
    this.getDataForMonth();
  },

  // 获取报表数据
  getDataForMonth() {
    request({
      url: 'https://mp.ucloudant.com/app/index.php?i=56&t=0&v=9.2&from=wxapp&c=entry&a=wxapp&do=Dishes&m=zh_dianc&sign=819fcd817f0aeb118075924d12978351&id=5&dishes_type=2',
    }).then(res => {
      wx.hideLoading();
      this.setData({
        list: res.data[0].goods
      })
    });
  },

  bindSure() {
    this.setData({
      showPicker: false,
      month: this.data.monthF
    });
  },

  hidePicker() {
    this.setData({
      showPicker: false
    });
  },
  showPicker() {
    this.setData({
      showPicker: true
    });
  },
  bindChange: function(e) {
    this.setData({
      monthF: e.detail.value[0] + 1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // wx.showLoading({
    //   title: '刷新中...'
    // })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})