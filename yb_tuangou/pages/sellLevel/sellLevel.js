import {
  floatOpration,
  formatTime
} from '../../utils/util.js'
import {
  request
} from '../../utils/request.js'
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
  // 登记
  bindDengji() {
    let {
      buyName,
      productName,
      tel,
      price,
      resultPrice,
      discount,
      sell,
      yeji,
      ticheng,
      beizu,
      buyDate,
      birthday
    } = this.data;
    if (!buyName.trim()) {
      wx.showToast({
        title: '请输入购买人姓名',
        icon: 'none'
      });
      return
    } else if (!productName.trim()) {
      wx.showToast({
        title: '请输入产品名称',
        icon: 'none'
      });
      return
    } else if (!tel.trim()) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return
    } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(tel)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return
    } else if (!birthday.trim()) {
      wx.showToast({
        title: '请选择购买人生日',
        icon: 'none'
      });
      return
    } else if (!price.trim()) {
      wx.showToast({
        title: '请输入标价',
        icon: 'none'
      });
      return
    } else if (!resultPrice.trim()) {
      wx.showToast({
        title: '请输入成交价',
        icon: 'none'
      });
      return
    } else if (!discount.trim()) {
      wx.showToast({
        title: '请输入折扣',
        icon: 'none'
      });
      return
    } else if (!sell.trim()) {
      wx.showToast({
        title: '请输入销售占比',
        icon: 'none'
      });
      return
    } else if (!yeji.trim()) {
      wx.showToast({
        title: '请输入当笔业绩',
        icon: 'none'
      });
      return
    } else if (!ticheng.trim()) {
      wx.showToast({
        title: '请输入销售提成',
        icon: 'none'
      });
      return
    } else if (!beizu.trim()) {
      wx.showToast({
        title: '请输入备注',
        icon: 'none'
      });
      return
    }
    //发送接口
    request({
      url: 'xxxx',
      method: 'POST',
      buyName,
      productName,
      data: {
        productClssifty: buyName, //姓名
        productClssifty: productName, //名称
        productClssifty: tel, //手机号
        productClssifty: birthday, //生日
        productClssifty: buyDate, //购买日期
        productDesc: price, //标价
        productClssifty: resultPrice, //成交价
        productClssifty: discount, //折扣
        productClssifty: sell, //销售赞比
        productClssifty: yeji, //当笔业绩
        productClssifty: beizu //备注
      }
    }).then(res => {

    });
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