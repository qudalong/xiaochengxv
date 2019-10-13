// yb_tuangou/pages/add_classify/add_classify.js
var o = getApp(),
  n = o.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindClassifyName(e){
    const classifyName = e.detail.value;
    this.setData({
      classifyName
    })
  },
  addClassify(){
    if(!this.data.classifyName.trim()){
        wx.showToast({
          title: '请输入分类名称',
          icon:'none'
        });
        return
    }

    var title = this.data.classifyName;
    //提交
    n.post("wx/product/addprocate.html", {
      title: title
    }, function (data) {

      if (data.code == 0) {
        n.error(
          data.info
        );
        return;
      } else {
        n.success("添加成功!");
        setTimeout(function () {
          n.jump("/yb_tuangou/pages/product/product", 3);
        }, 1e3);
      }
      // console.log(data);

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