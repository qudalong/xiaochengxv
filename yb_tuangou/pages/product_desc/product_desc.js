// yb_tuangou/pages/product_desc/product_desc.js
var app = getApp();
var a = app.requirejs("core");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571221567475&di=bc9da921fb1bf76978efa1d8659acd58&imgtype=0&src=http%3A%2F%2Fimg3.qjy168.com%2Fprovide%2F2015%2F01%2F26%2F5659968_20150126092733.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571221567474&di=cc261e4313732c19de6a795d05d9133a&imgtype=0&src=http%3A%2F%2Fimg1.juimg.com%2F140928%2F330630-14092PJ32495.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571027970663&di=4bfda92fcd053ac0223f246590cd387c&imgtype=0&src=http%3A%2F%2Fpic45.nipic.com%2F20140715%2F10657291_172631119640_2.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    tapStatus: false,
    src: '',
    ind: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    wx.downloadFile({
      url: this.data.src,
      success: (res) => {　　　　　　　　　　　　
        wx.saveImageToPhotosAlbum({　　　　　　　　　
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '下载成功',
              icon: 'success',
              duration: 2000
            });
            updateinc();
          },
          fail: function(err) {
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

                let images = image.split("|");
                _this.setData({
                  imgs:images,
                  detail:detail
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