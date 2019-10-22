var e = getApp(),
  o = e.requirejs("core");

Page({

  data: {
    showDia: false,
    icon: e.requirejs("icons"),
    adUrl: '',
    adShow: true,
    text: "",
    marqueePace: 1,
    marqueeDistance: 0,
    marquee_margin: 30,
    size: 14,
    isAdmin:0,
    interval: 20,
    info: {
      today_order: {
        total: 0,
        stay_take: 0,
        stay_cancel: 0,
        already_cancel: 0
      },
      log_order: {
        total: 0,
        stay_take: 0,
        already_cancel: 0,
        stay_cancel: 0
      },
      news: {
        news: '暂无公告'
      }
    },
    list: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  onLoad: function(e) {
    let user = getApp().getCache("userinfo");
    user || wx.redirectTo({
      url: "/yb_tuangou/pages/login/index"
    });
    if(user.i_level == 0){
        this.setData({
            isAdmin:1
        });

    }else{
        this.setData({
            isAdmin:0
        });
    }
    this.loadAllData();
    this.updUser(user.id);
    this.loadNotice();
    this.selScaleLevel();
  },
  showRule() {
    this.setData({
      showDia: true
    });
  },
  hideRule() {
    this.setData({
      showDia: false
    });
  },

  onShow: function() {

    var url = this.data.icon.fm;
    this.setData({
      adUrl: url
    });

  },
  //加载所有数据
  loadAllData(){
    let isAdmin = this.data.isAdmin;
    if(isAdmin == 1){
      this.selDsh();
      this.selAdminAll();
    }
  },
  loadHeaderPro(){
    let _this = this;
    o.post("wx/product/tj.html",{},function(e){

        if(e.code == 1 && e.data){
            _this.setDat({
                pro:e.data
            });
        }

    });

  },
  //管理员-总揽
  selAdminAll(){
    let _this = this;
    o.post("wx/user/adminall.html",{},function(e){

        if(e.code == 1){
          let goods_num = e.goods_num ? e.goods_num:0;
          let users_num = e.users_num ? e.users_num:0;
          let days_num = e.days_num ? e.days_num :0.00;
          let all_num = e.all_num ? e.all_num :0.00;
          let info = _this.data.info;
          info.log_order.total = users_num;
          info.log_order.stay_take = goods_num;
          info.log_order.stay_cancel = all_num;
          info.log_order.already_cancel = days_num;
          _this.setData({
            info:info
          });
        }
    });
  },
  //管理员-带审核
  selDsh(){
    var _this = this;
    o.post("wx/user/shcnt.html",{},function(e){
        if(e.code == 1){
          let users_num = e.users ? e.users:0;
          let day_num = e.days ? e.days:0;
          let level_num = e.levels ? e.levels:0;
          let all = users_num+day_num+level_num;
          let info = _this.data.info;
          info.today_order.total = all;
          info.today_order.stay_take = users_num;
          info.today_order.stay_cancel = day_num;
          info.today_order.already_cancel = level_num;
          _this.setData({
              info:info
          });
        }
    });

  },


  //加载通知
  loadNotice: function() {
    var _this = this;
    o.get("wx/user/selnotice.html", {
      id: 1
    }, function(o) {
      if (o.code == 1) {

        _this.setData({
          news: o.data.v_content
        });

      }
    });
  },
  //查询销售等级
  selScaleLevel(){
    let _this = this;
    o.post("wx/monthrep/sellevel.html",{},function(e){

           if(e.code == 1 &&  e.data){
              _this.setData({
                list:e.data
              });
           }
      });

  },
  //更新用户信息
  updUser(uid) {

    o.post("wx/user/updwx_user.html", {
      id: uid
    }, function(o) {
      if (o.code == 1) {
        e.setCache("userinfo", o.data);

      }
    });


  },
  onShow: function() {
    var url = this.data.icon.fm;
    this.setData({
      adUrl: url
    });
    getApp().getCache("userinfo") ? '' : wx.redirectTo({
      url: "/yb_tuangou/pages/login/index"
    });
  },
  getAdInfo: function() {
    var n = this;
    o.get("Arliki/get_apply", {}, function(e) {
      0 == e.code && e.info.ad_pic && n.setData({
        adUrl: e.info.ad_pic,
        adShow: !0
      });
    });
  },
  scancode: function(e) {
    var t = o.pdata(e).i;
    if (t == 1) {
      this.to_order();
    }
    wx.scanCode({
      onlyFromCamera: !0,
      success: function(e) {
        if (e.result.indexOf("_") < 0) o.alert("二维码无效");
        else {
          var n = e.result.split("_");
          o.jump("/yb_tuangou/pages/order_page/index?order_no=" + n[0] + "&type=" + n[1] + "&i=" + t);
        }
      },
      fail: function(e) {}
    });
  },
  toproduct(){
    console.log("-------------------")
    //o.jump( '/yb_tuangou/pages/product/product');
    wx.switchTab({
      url: '/yb_tuangou/pages/product/product'
    });
  },
  sendNotice(){
    wx.navigateTo({
      url: "/yb_tuangou/pages/notice/notice"
    });
  },
  to_order: function() {
    o.jump("/yb_tuangou/pages/order/index", 3);
  },
  to_order_s: function() {
    o.jump("/yb_tuangou/pages/order/index?status=1", 3);
  },
  to_order_t: function() {
    o.jump("/yb_tuangou/pages/order/index?status=3", 3);
  },
  getinfo: function() {
    var n = this;
    o.get("commander/CommanderList", {
      id: getApp().getCache("userinfo").id
    }, function(e) {
      0 == e.code ? n.setData({
        info: e.info,
        text: e.info.news.news
      }) : o.alert(e.msg);
    });
  },
  onShareAppMessage: function() {},
  onPullDownRefresh: function() {
    //this.getinfo(),
    wx.stopPullDownRefresh();
  },


  to_order: function() {
    o.jump("/yb_tuangou/pages/order/index", 3);
  },
  to_order_s: function() {
    o.jump("/yb_tuangou/pages/order/index?status=1", 3);
  },
  to_order_t: function() {
    o.jump("/yb_tuangou/pages/order/index?status=3", 3);
  },
  getinfo: function() {
    var n = this;
    o.get("commander/CommanderList", {
      id: getApp().getCache("userinfo").id
    }, function(e) {
      0 == e.code ? n.setData({
        info: e.info,
        text: e.info.news.news
      }) : o.alert(e.msg);
    });
  },
  onShareAppMessage: function() {},

  shenhe() {
    wx.navigateTo({
      url: '/yb_tuangou/pages/shenheList/shenheList'
    })
  },
  xiaoshou() {
    this.setData({
      showDia: true
    });
  },
  shangbao() {
    wx.navigateTo({
      url: '/yb_tuangou/pages/sellLevel/sellLevel'
    })
  },
  bindCkUser() {
    wx.navigateTo({
      url: '/yb_tuangou/pages/ckUser/ckUser?ind=1'
    })
  },
  bindCkSell() {
    wx.switchTab({
      url: '/yb_tuangou/pages/ckSell/ckSell?ind=1'
    })
  },
  bindCkLevel() {
    wx.navigateTo({
      url: '/yb_tuangou/pages/ckLevel/ckLevel'
    })
  }
});