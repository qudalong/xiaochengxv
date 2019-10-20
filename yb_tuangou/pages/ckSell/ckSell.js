// yb_tuangou/pages/checkList/checkList.js
var app = getApp();
var a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page : 1,
    showDia:false,
    status:'',
    reason:'',
    scaleImg:'http://www.aitaocui.cn/article/uploads/allimg/180528/67_180528164058_1_lit.jpg',
    isAdmin:0,
    ind: 0,
    uid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
     let u = app.getCache('userinfo');
     console.log(u);
      u ||  wx.redirectTo({
        url: "/yb_tuangou/pages/login/index"
      });
      //判断是否管理员
    if (u.i_level == 0){
        this.setData({
          isAdmin:0,
          uid :u.id
        });
    }else{
        this.setData({
          isAdmin:1,
          uid: u.id
        });
    }
    //console.log(this.data.isAdmin);
    this.loadData();

  },
  //点击驳回按钮
  bh(e){
  //  console.log(e);
    let id = e.currentTarget.dataset.id;
    this.setData({
      showDia:true,
      item_id:id
   });

  },
  //取消驳回窗口
  closeBhDialog(){
    this.setData({
      showDia:false,
      reason:''
    })

  },

  //赋值驳回原因
  inputReason(e){
    let reason = e.detail.value;
    this.setData({
      reason:reason
    });
  },

  //审核通过提交
  checkPass(e){
    
    let _this = this;
    let item_id = e.currentTarget.dataset.id;
    let uid = this.data.uid;
    if (!item_id) {
      a.error("参数错误");
      return;
    }
    a.post('wx/scale/sh.html',{
      uid: uid,
      status: 2,
      id: item_id
    },function(e){
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

  //驳回提交按钮
  submitBh(e){
    let _this = this;
    let item_id = this.data.item_id;
    let uid = this.data.uid;
    if(!item_id){
      a.error("参数错误");
      return;
    }
    let reason = this.data.reason;
    if(!reason.trim()){
      a.error("请输入驳回原因");
      return ;
    }
    a.post("wx/scale/sh.html",{
      uid:uid,
      status:1,
      id:item_id,
      v_reason:reason
    },function(e){
        if(e.code == 1){
            a.success(e.msg);
            _this.setData({
              reason:'',
              showDia:false,
              page:1,
              running:false,
              list:[]
            });
            
            _this.loadData();

        }else{
            a.error(e.msg);
        }


    });

  },

  toShangBao() {
    wx.navigateTo({
      url: '/yb_tuangou/pages/sellLevel/sellLevel'
    })
  },
  toDesc(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/yb_tuangou/pages/ck/ckDesc?itemid='+id
    })
  },
  tapItem(e) {
    let status = e.currentTarget.dataset.ind;
    //console.log(status);
    let _this = this;
    switch (parseInt(status)){
      case 0://全部
        _this.setData({
          status:''
        });
        break;
      case 1://待审核
        _this.setData({
          status: '0'
        });
        break;
      case 2://已通过
        _this.setData({
          status: 2
        });
        break;
      case 3://已驳回
        _this.setData({
          status:1
        });
        break;
        default:
        _this.setData({
          status:''
        });
        break;
    }
  console.log(this.data);
    this.setData({
      ind: e.currentTarget.dataset.ind,
      list:[],
      page:1,
      running:false
    });

    this.loadData();

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
    // wx.showLoading({
    //   title: '刷新中...'
    // })

    this.setData({
      list: [],
      page: 1,
      loaded: !1
    }), this.loadData(), wx.stopPullDownRefresh();
  },

  loadData(){
    let user = app.getCache("userinfo");
    let param = {};
   
    var _this = this;
    let status = this.data.status;
    let page = this.data.page;
    if (!this.data.running) {
        _this.setData({
            running:true
        });
      if (user.i_level != 0) {
        param.uid = user.id;
      }
      param.status = status;
      param.page = page;
      a.post('wx/scale/sel.html',param,function(data){
          console.log(data);
          _this.setData({
            running:false
          });
          if(data.code == 1){
            if (data.data.data.length>0){
              _this.setData({
                list: _this.data.list.concat(data.data.data),
                page: page + 1
              });

            }
             
          }else{
            a.error(data.msg);
          }

      });

    }


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
    // wx.showLoading({
    //   title: '加载中...'
    // });
     this.loadData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})