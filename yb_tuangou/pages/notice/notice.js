// yb_tuangou/pages/notice/notice.js
var o = getApp(),
  s = o.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = o.getCache("userinfo");
    var _this = this;
    user || wx.redirectTo({
      url: "/yb_tuangou/pages/login/index"
    });

    s.get("wx/user/selnotice.html", {
      id: user.id
    }, function (o) {
       if(o.code == 1){
          _this.setData({
            notice: o.data.v_content
          });

       }
    });


  },


  save:function(){
   

    var notice = this.data.notice;
    if(!notice.trim()){
      wx.showToast({
        title: '请输入通知内容',
        icon: 'none'
      });
      return;
    }

    var user = o.getCache("userinfo");
    wx.showLoading({
      title: '正在更新通知...',
    });
    s.get("wx/user/updnotice.html", {
      id: user.id,
      content:notice
    }, function (o) {
      wx.hideLoading();
      if (o.code == 1) {
        s.success(o.msg);
      }else{
        s.error(o.msg);
      }
    });


  },

  bindMark:function(e){
    var notice = e.detail.value;
    this.setData({
      notice: notice
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