var months = []
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [1, 1, 1, 1],
    month:'',
    months: months,
    showPicker:false,
    monthF:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindSure(){
    this.setData({
      showPicker: false,
      month: this.data.monthF
    });
  },
  hidePicker(){
    this.setData({
      showPicker:false
    });
  },
  showPicker(){
    this.setData({
      showPicker:true
    });
  },
  bindChange: function (e) {
    this.setData({
      monthF: e.detail.value[0]+1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // wx.showLoading({
    //   title: '刷新中...'
    // })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})