import {
  floatOpration,
  formatTime
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyName: '',
    productName: '',
    tel: '',
    price: '',
    resultPrice: '',
    discount: '',
    sell: '',
    yeji: '',
    ticheng: '',
    beizu: '',
    buyDate: '',
    birthday: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      buyDate: formatTime(new Date())
    });
  },
  bindDengji() {
    if (!this.data.buyName.trim()) {
      wx.showToast({
        title: '请输入购买人名称',
        icon: 'none'
      });
      return
    } else if (!this.data.productName.trim()) {
      wx.showToast({
        title: '请输入产品名称',
        icon: 'none'
      });
      return
    }
  },
  // 购买人
  bindBuyName(e) {
    this.setData({
      buyName: e.detail.value
    });
  },
  // 产品名称
  bindProduceName(e) {
    this.setData({
      productName: e.detail.value
    });
  },
  // 购买人手机号
  bindTel(e) {
    this.setData({
      tel: e.detail.value
    });
  },
  // 标价
  bindPrice(e) {
    this.setData({
      price: e.detail.value
    });
  },
  // 成交价
  bindResultPrice(e) {
    this.setData({
      resultPrice: e.detail.value
    });
  },
  // 折扣
  bindDiscount(e) {
    this.setData({
      discount: e.detail.value
    });
  },
  // 销售占比
  bindSell(e) {
    this.setData({
      sell: e.detail.value
    });
  },
  // 当笔业级
  bindYeJi(e) {
    this.setData({
      yeji: e.detail.value
    });
  },
  // 当笔销售提成
  bindtTiCheng(e) {
    this.setData({
      ticheng: e.detail.value
    });
  },
  // 备注
  bindMark(e) {
    this.setData({
      beizu: e.detail.value
    });
  },
  // 生日
  bindDateChangeBriday(e) {
    this.setData({
      birthday: e.detail.value
    });
  },
  //购买日期
  bindDateChangeBuy(e) {
    this.setData({
      buyDate: e.detail.value
    });
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