var months = []
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
import {
  request
} from '../../utils/request.js';
var app = getApp();
var a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    //month: '',
   
    months: months,
    showPicker: false,
    monthF: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.selDates();
    // this.setData({
    //     value:[1]
    // });
  },

  selDates(){
    let _this = this;
    a.post('wx/monthrep/selmonth.html', {
     
    }, function (e) {
      if (e.code == 1) {
        _this.setData({
            value: e.v,
            months:e.data,
            month: e.currentMonth,
         });
       } 
     });


  },

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
      url: 'http://www.icprj.com/IC/api/faPublic/list',
      method: 'POST',
      data: {
        type: 1
      }
    }).then(res => {
      wx.hideLoading();
      this.setData({
        list: res.data.rows
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
  getMonthValue(i){

    let data = this.data.months;
    return data[i];

  },

  bindChange: function(e) {
   
    let v = this.getMonthValue(e.detail.value[0]);
    this.setData({
      monthF: v,
      value:e.detail.value
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