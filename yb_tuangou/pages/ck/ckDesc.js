// yb_tuangou/pages/ck/ckDesc.js
var app = getApp();
var a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDia:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log('detail');
    console.log(options);
    let u = app.getCache('userinfo');
    // console.log(u);
    u || wx.redirectTo({
      url: "/yb_tuangou/pages/login/index"
    });

    if(u.i_level == 0){
      this.setData({
        isAdmin:1
      });
    }else{
      this.setData({
         isAdmin:0
      });
    }

    this.setData({
      item_id: options.itemid,
      uid:u.id
    });
    this.loadDataById();
  },
  //根据id查询数据
  loadDataById(){

    let item_id =  this.data.item_id;
    let _this = this;
    if(item_id){

      a.post("wx/scale/selbyid.html",{
        id:item_id
      },function(e){
          if(e.code == 1){
            _this.setData(
              e.data
             );

          }

      });


    }


  },
  //修改
  mdy(){
    let item_id = this.data.item_id;
    if(!item_id){
      return;
    }
    wx.redirectTo({
      url: '/yb_tuangou/pages/sellLevel/sellLevel?item_id='+item_id
    })
},
  //驳回提交按钮
  submitBh(e) {
    let _this = this;
    let item_id = this.data.item_id;
    let uid = this.data.uid;
    if (!item_id) {
      a.error("参数错误");
      return;
    }
    let reason = this.data.reason;
    if (!reason.trim()) {
      a.error("请输入驳回原因");
      return;
    }
    a.post("wx/scale/sh.html", {
      uid: uid,
      status: 1,
      id: item_id,
      v_reason: reason
    }, function (e) {
      if (e.code == 1) {
         a.success(e.msg);
        _this.setData({
          reason: '',
          showDia: false
        });
        _this.loadDataById()

      } else {
        a.error(e.msg);
      }


    });

  },
  //取消驳回窗口
  closeBhDialog() {
    this.setData({
      showDia: false,
      reason: ''
    })

  },
  //赋值驳回原因
  inputReason(e) {
    let reason = e.detail.value;
    this.setData({
      reason: reason
    });
  },
  //审核通过提交
  checkPass(e) {

    let _this = this;
    let item_id = e.currentTarget.dataset.id;
    let uid = this.data.uid;
    if (!item_id) {
      a.error("参数错误");
      return;
    }
    a.post('wx/scale/sh.html', {
      uid: uid,
      status: 2,
      id: item_id
    }, function (e) {
      if (e.code == 1) {
        a.success(e.msg);
        _this.setData({
          reason: '',
          showDia: false,
          page: 1,
          running: false,
          list: []
        });

        _this.loadData();

      } else {
        a.error(e.msg);
      }

    });



  },
  reject(){
    this.setData({
      showDia:true
    })
  },
  hideDia(){
    console.log('123')
    this.setData({
      showDia:false
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