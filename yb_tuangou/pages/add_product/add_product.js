import {
  request
} from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productName: '',
    productNumber: '',
    productPrice: '',
    productDesc: '',
    formData: {
      pics: [],
      goods_images:[]
    },
    array: ['砖石', '珠宝', '手表', '首饰']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // 添加
  addproduct() {
    if (!this.data.productName.trim()) {
      wx.showToast({
        title: '请输入商品名称',
        icon: 'none'
      });
      return
    } else if (!this.data.productNumber.trim()) {
      wx.showToast({
        title: '请输入商品货号',
        icon: 'none'
      });
      return
    } else if (!this.data.productPrice.trim()) {
      wx.showToast({
        title: '请输入商品价格',
        icon: 'none'
      });
      return
    } else if (!this.data.productDesc.trim()) {
      wx.showToast({
        title: '请输入商品详情',
        icon: 'none'
      });
      return
    } else if (!this.data.formData.pics.length) {
      wx.showToast({
        title: '请上传商品图片',
        icon: 'none'
      });
      return
    } else if (!this.data.array[this.data.index]) {
      wx.showToast({
        title: '请选择商品分类',
        icon: 'none'
      });
      return
    }
    //发送接口
    request({
      url: 'xxxx',
      method: 'POST',
      data: {
        productName: this.data.productName, //名称
        productNumber: this.data.productNumber, //货号
        productPrice: this.data.productPrice, //价格
        productDesc: this.data.productDesc, //详情
        formData: this.data.formData, //图片
        productClssifty: this.data.array[this.data.index] //分类
      }
    }).then(res => {

    });
  },
  handleChoosePic: function() {
    let _this = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        let pics = _this.data.formData.pics
        // 添加当前添加到已有数组
        pics = pics.concat(res.tempFilePaths)
        // 限制当前图片数量不能超过9张
        pics.length > 9 && (pics.length = 9);
        _this.setData({
          'formData': Object.assign({}, _this.data.formData, {
            pics: pics
          })
        })
      }
    })
  },
  handleDelPic: function(e) {
    let index = e.currentTarget.dataset.index
    let _another_index = ''
    let {
      pics,
      goods_images
    } = this.data.formData
    // 遍历查找是否删除原有图片中的图片
    goods_images.map((v, k) => {
      if (v.url === pics[index]) {
        _another_index = k
      }
    });
    (typeof _another_index === 'number') && goods_images.splice(_another_index, 1);
    pics.splice(index, 1);
    this.setData({
      formData: Object.assign({}, this.data.formData, {
        pics: pics,
        goods_images: goods_images
      })
    })
  },

  bindName(e) {
    const productName = e.detail.value;
    this.setData({
      productName
    })
  },
  bindNumber(e) {
    const productNumber = e.detail.value;
    this.setData({
      productNumber
    })
  },
  bindPrice(e) {
    const productPrice = e.detail.value;
    this.setData({
      productPrice
    })
  },
  bindDesc(e) {
    const productDesc = e.detail.value;
    this.setData({
      productDesc
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
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