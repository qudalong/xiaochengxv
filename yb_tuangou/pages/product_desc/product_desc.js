// yb_tuangou/pages/product_desc/product_desc.js
var WxParse = require('../../utils/wxParse/wxParse.js');
var app = getApp();
var a = app.requirejs("core");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    tapStatus: false,
    src: '',
    ind: 0,
    detail:''
  },

  delpro:function(op){
    let user = getApp().getCache("userinfo");
    let uid1 = user.id;
    let id = op.currentTarget.dataset.id;
    if(!id){
      return ;
    }

    a.post("wx/product/delpro.html", {
      cid:id,
      uid:uid1
    }, function (data) {
      if(data.code == 1){
        wx.showToast({
          title: '删除成功'
        });
        wx.switchTab({
          url: '/yb_tuangou/pages/product/product'
        });

      }

    })

     

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
        isAdmin: 1
      });

    } else {
      this.setData({
        isAdmin: 0

      });

    }

    if(options.item_id){
      this.setData({
        item_id:options.item_id
      });
      this.loadDetail();
    }


  },
  // 复制
  textPaste() {
    wx.setClipboardData({
      data: this.data.detail.content,
      success: (res) => {
        wx.getClipboardData({
          success: (res) => {
          }
        })
      }
    })
  },
  // 切換下載
  changeItem(e) {
    let {
      imgs
    } = this.data;
    var ind = e.detail.current;
    for (let i in imgs) {
      if (ind == i) {
        this.setData({
          ind,
          src: imgs[i]
        });
      }
    }
  },
  updateinc(){
    let item_id = this.data.item_id;
    if(!item_id){
      return ;
    }

    a.post("wx/product/adddown.html",{
      id:item_id
    },function(data){

    })
  },
  downloadImg(e) {　　　
    let _this = this;
    wx.showLoading({
      title: '正在下载图片',
    });　　
    wx.downloadFile({
      url: this.data.src,
      success: (res) => {
        console.log(res);　　　　　　　　　　　　
        wx.saveImageToPhotosAlbum({　　　　　　　　　
          filePath: res.tempFilePath,
          success(res) {
            wx.hideLoading();
            wx.showToast({
              title: '下载成功',
              icon: 'success',
              duration: 2000
            });
            _this.updateinc();
          },
          fail: function(err) {
            console.log('err');
            console.log(err);
            wx.hideLoading();
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    wx.showToast({
                      title: '成功授权，请再次下载',
                      icon: 'success',
                      duration: 2000
                    })
                  } else {
                    wx.showToast({
                      title: '请先授权',
                      icon: 'success',
                      duration: 2000
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  //加载产品详情
  loadDetail(){
    let _this = this;
    let item_id = this.data.item_id;
    if(!item_id){
      return;
    }
    a.post("wx/product/selprodetail.html",{
      id:item_id

    },function(data){
        if(data.code ==1 && data.data){
            let detail = data.data;
            if(detail && detail.image){
                let image = detail.image;
                let images = image.split("|");
                _this.setData({
                  imgs:images,
                  detail:detail,
                  content: WxParse.wxParse('content', 'html', detail.content, _this, 0)
                });

            }
        }

    });


  },
  closeBigImg() {
    this.setData({
      tapStatus: false
    });
  },
  previewImage(e) {
    this.setData({
      src: e.target.dataset.src,
      tapStatus: true
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