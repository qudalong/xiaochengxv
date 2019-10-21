// yb_tuangou/pages/checkList/checkList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [1, 1, 1, 1],
    status:'',
    running:false,
    page:1,
    levelImg:'',    
    ind: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let u = app.getCache('userinfo');    
    u || wx.redirectTo({
      url: "/yb_tuangou/pages/login/index"
    });
    //判断是否管理员
    if (u.i_level == 0) {
      this.setData({
        isAdmin: 0,
        uid: u.id
      });
    } else {
      this.setData({
        isAdmin: 1,
        uid: u.id
      });
    }
  },
  toDesc() {
    wx.navigateTo({
      url: '/yb_tuangou/pages/ck/ckDesc'
    })
  },
  tapItem(e) {
    this.setData({
      ind: e.currentTarget.dataset.ind
    });
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