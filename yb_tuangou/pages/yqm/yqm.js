// yb_tuangou/pages/yqm/yqm.js
var o = getApp(),
  n = o.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yqm1: '暂无邀请码',
    btnname: "生成邀请码"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var u = getApp().getCache("userinfo");

    if (u.v_yq_code) {
      this.setData({
        yqm1: u.v_yq_code ? u.v_yq_code : '',
        btnname: '重新生成邀请码'
      });
    }
  },

  addClassify() {
    var u = getApp().getCache("userinfo");
    var userid = u.id;
    var _this = this;
    //提交
    n.post("wx/user/createyqm.html", {
      id: userid
    }, function(data) {
      console.log(data);
      if (data.code == 0) {
        wx.showToast({
          title: data.info
        })

        return;
      } else {
        n.success(data.info);
        _this.setData({
          yqm1: data.data,
          btnname: '重新生成邀请码'
        })
        u.v_yq_code = data.data;
        getApp().setCache("userinfo", u);

      }
      // console.log(data);

    });
  },
  
  // 复制
  textPaste() {
    wx.setClipboardData({
      data: this.data.yqm1,
      success: (res) => {
        wx.getClipboardData({
          success: (res) => {
            console.log(res.data)
          }
        })
      }
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