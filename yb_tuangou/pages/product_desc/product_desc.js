// yb_tuangou/pages/product_desc/product_desc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571027970665&di=b16fc45c50c2619195b8c848f485b73c&imgtype=0&src=http%3A%2F%2Fphoto.16pic.com%2F00%2F50%2F08%2F16pic_5008652_b.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571027970665&di=c3bfacd0ccc853f525b3525e86099d7e&imgtype=0&src=http%3A%2F%2Fpic2.cxtuku.com%2F00%2F07%2F22%2Fb911baf2ca66.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571027970663&di=4bfda92fcd053ac0223f246590cd387c&imgtype=0&src=http%3A%2F%2Fpic45.nipic.com%2F20140715%2F10657291_172631119640_2.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  previewImage(e) {
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.imgs 
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