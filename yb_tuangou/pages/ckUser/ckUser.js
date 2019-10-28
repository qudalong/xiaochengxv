// yb_tuangou/pages/checkList/checkList.js
var app = getApp();
var a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    ind: 0,//用户状态分类
    status:'',//状态
    page:1,//分页
    reason:'',//驳回原因
    showDia:false,//驳回弹框是否显示
    userImg:'http://www.aitaocui.cn/article/uploads/allimg/180528/67_180528164058_1_lit.jpg',
    running:false //是否正在加载
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
    a.post("wx/user/checkuser.html", {
      uid: uid,
      status: 2,
      id: item_id,
      v_reason: reason
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

        _this.loadUsers();

      } else {
        a.error(e.msg);
      }


    });

  },
  //赋值驳回原因
  inputReason(e) {
    let reason = e.detail.value;
    this.setData({
      reason: reason
    });
  },
  //取消驳回窗口
  closeBhDialog() {
    this.setData({
      showDia: false,
      reason: ''
    })

  },
  //驳回按钮
  hbdia(e){
    let item_id = e.currentTarget.dataset.id;
    if(item_id){
      this.setData({
          item_id:item_id,
          showDia:true,
          reason:''
      });
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      let u = app.getCache('userinfo');
      console.log(u);
      u || wx.redirectTo({
        url: "/yb_tuangou/pages/login/index"
      });
      //判断是否管理员
      if (u.i_level == 0) {
        this.setData({
          isAdmin: 0,
          uid: u.id
        });
      } else {
        this.setData({
          isAdmin: 1,
          uid: u.id
        });
      }
      if(options.ind){
        //首页跳转
        this.setData({
            ind:options.ind,
            status:0

        });
       }
    //  this.loadUsers();
    //console.log(this
  },
  //加载用户列表
  loadUsers(){
    let user = app.getCache("userinfo");
    let param = {};
    var _this = this;
    let status = this.data.status;
    let page = this.data.page;
    if (!this.data.running) {
      _this.setData({
        running: true
      });
      if (user.i_level != 0) {
        param.uid = user.id;
      }
      param.status = status;
      param.page = page;
      wx.showLoading({
        title: '加载中...'
      });
      a.post('wx/user/sel.html', param, function (data) {
        wx.hideLoading();
        console.log(data);
        _this.setData({
          running: false
        });
        if (data.code == 1) {
          if (data.data.data && data.data.data.length > 0) {
            _this.setData({
              list: _this.data.list.concat(data.data.data),
              page: page + 1,
              userImg:data.img
            });

          }

        } else {
          a.error(data.msg);
        }

      });

    }

  },
  toDesc(){
    wx.navigateTo({
      url: '/yb_tuangou/pages/ck/ckDesc'
    })
  },
  //切换顶部tab
  tapItem(e) {
    let ind = e.currentTarget.dataset.ind;
    let _this = this;
    switch (parseInt(ind)){
      case 0://全部
        _this.setData({
          status:''
        });
        break;
      case 1://待审核
        _this.setData({
          status:0
        });
        break;
      case 2://审核通过
        _this.setData({
            status:1
        });

        break;
      case 3://驳回
        _this.setData({
            status:2
        });
        break;
      default:
        _this.setData({
            status:''
        });

    }
    this.setData({
      ind: e.currentTarget.dataset.ind,
      list:[],
      page:1,
      running:false
    });
    this.loadUsers();
  },
  //审核通过
  checkPass(e){
    let item_id = e.currentTarget.dataset.id;
    let _this = this;
    if(!item_id){
      return;
    }

    let uid = this.data.uid;
    a.post('wx/user/checkuser.html', {
      uid: uid,
      status: 1,
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

        _this.loadUsers();

      } else {
        a.error(e.msg);
      }

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
    this.setData({
      list: [],
      running: false,
      page: 1
    });
    this.loadUsers();
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
    }), this.loadUsers(), wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadUsers();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})