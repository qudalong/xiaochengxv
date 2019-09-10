var n = getApp().requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //show:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
        options:options
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
  onShow: function (e) {
    console.log()
    console.log(this.data.options);
    this.get_list(e);
  },
  get_list:function(){
    var _this = this;
    var type = this.data.options.type;
    var order_id = this.data.options.order_id;
    var buyer_id = this.data.options.buyer_id;
    if (type == 1){
      n.get("Order/GetOrder", {
        buyer_id: buyer_id,
        order_id: order_id
      }, function (e) {
        console.log(e);
        _this.setData({ info: e.info, show: true });
      });

    }
   
    
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