// yb_tuangou/pages/checkList/checkList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [1, 1, 1, 1],
    showBH: -1,
    items: [{
        name: 'pass',
        value: '审核通过',
        checked: 'true'
      },
      {
        name: 'reject',
        value: '驳回'
      },
    ],
    ind: 0
  },
  scroll(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  tapItem(e) {
    this.setData({
      ind: e.currentTarget.dataset.ind
    });
    console.log(this.data.ind)
  },

  radioChange: function(e) {
    const index = e.currentTarget.dataset.index;
    const level = e.detail.value;
    if (level == 'reject') {
      this.setData({
        showBH: index
      })
    } else {
      this.setData({
        showBH: -1
      })
    }
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