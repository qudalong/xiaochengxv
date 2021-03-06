import {
  request
} from '../../utils/request.js';
var app = getApp();
var a = app.requirejs("core");
var site = require("../../../siteinfo.js");

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
      goods_images:[],
      ups:[]
    },
    array: ['砖石', '珠宝', '手表', '首饰']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let user = getApp().getCache("userinfo");
    user || wx.redirectTo({
      url: "/yb_tuangou/pages/login/index"
    });

    if (user.i_level == 0) {
      this.setData({
        isAdmin: 1,
        uid:user.id
      });
    } else {
      this.setData({
        isAdmin: 0,
        uid:user.id
      });
    }
    this.selcate();

  },
  validationPrice(v) {
    let a = /^(\d+|\d+\.\d{1,2})$/;
    if (!a.test(v)) {
      wx.showToast({
        title: '请输入正确的金额（保留两位小数）',
        icon: 'none'
      });
      return false;
    }
    return true;
  },

  upload(pics, success, fail, i, length, upimgs){
    let _this = this;
    wx.uploadFile({
      url: site.siteroot + "admin/api.plugs/wxupload.html",
      filePath: pics[i],
      name: 'file',
      async: false,
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        'safe': 0
      },
      success: function (res) {
        console.log("res");
        console.log(res);
        var data = res.data;
        if (data) {
          let result = JSON.parse(data);
          console.log("result");
          console.log(result);
          if (result.uploaded) {
            upimgs.push(result.url);
            
          }
          //console.log(result);
        }
        //do something
      },
      fail:function(res){

      },
      complete:function(){
        i++;
        if(i == length){
            _this.setData({
              upimgs: upimgs
            });
            console.log("upimgs");
            console.log(upimgs);
            _this.submitPro();
        }else{
          _this.upload(pics, success, fail, i, length, upimgs);
        }

      }
    });

  },
  //上传图片
  uploadImg(){
    let _this = this;
    let pics = this.data.formData.pics;
    let size = pics.length;
    let upimgs =[];
    _this.upload(pics,0,0,0,pics.length,upimgs);
    console.log(upimgs);
   
   
  },

  //查询分类
  selcate(){
    let _this = this;
    a.post("wx/product/sel.html",{

    },function(e){
      if(e.code == 1){

          let data = e.data;
          if(data){
             let array = [];
             let ids = [];
            data.map((v)=>{
              array.push(v.title);
              ids.push(v.id);
              

            });
            _this.setData({
              array: array,
              ids:ids,
              index:[0]
            });
          }
      }

    });


  },

  getProCateId(){
    let ids = this.data.ids;
    let index = this.data.index;
    return ids[index];
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

    wx.showLoading({
      title: '上传数据中...',
      mask: true
    });
    let price = this.data.productPrice;
    if (!this.validationPrice(price)){
      return;
    }
    this.uploadImg();
  
  },
  submitPro(){

    let proname = this.data.productName;
    let productNumber = this.data.productNumber;
    let productPrice = this.data.productPrice;
    let catid = this.getProCateId();
    let uid = this.data.uid;
    let content = this.data.productDesc;
    let imgs = this.data.upimgs.join("|");
    let _this = this;


    a.post("wx/product/addpro.html", {
      cate_id: catid,
      title: proname,
      content: content,
      image: imgs,
      uid: uid,
      v_hh: productNumber,
      i_je: productPrice
    }, function (e) {
      wx.hideLoading();
      if (e.code == 1) {
        a.success("添加成功!");
        _this.setData({
          productName: '',
          productNumber: '',
          productPrice: '',
          productDesc: '',
          formData: {
            pics: [],
            goods_images: [],
            ups: []
          }
         
        });
      }
    });


  },
  handleChoosePic: function() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res)=> {
        let pics = this.data.formData.pics
        // 添加当前添加到已有数组
        pics = pics.concat(res.tempFilePaths)
        // 限制当前图片数量不能超过9张
        pics.length > 9 && (pics.length = 9);
        this.setData({
          'formData': Object.assign({}, this.data.formData, {
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