var n = getApp(),
  t = n.requirejs("core");

Page({
  data: {
    icon: n.requirejs("icons"),
    version: n.version,
    status: 0,
    userinfo:{},
    dy_nums:0,
    is_copyright: !1
  },
  bindDy:function(){
      let _this = this;
      wx.requestSubscribeMessage({
        tmplIds: ['rm63zNg4zHn-j5hafFSnCv4O1uIPiKw7LLcSbAFo9Bo', 'l6H_TCMzVXTG7O5NMIFSq4qUFrSOgz6PO8DpOXUafHk', 'evIMbd8U-55BnK9ZBeHw5geUfs3ZrGFBRzYmLaUroWo'],
        success(res) {

          t.post("/wx/user/dynum.html", {
            uid: _this.data.uid
          }, function (data) {
              if(data.code ==  1){
                _this.setData({
                  dy_nums: data.dy_num ? data.dy_num : 0 
                });
              }

          });

          wx.showToast({
            title: '订阅成功',
          });
         
        },
        fail:function(res){
            console.log(res);
        }
      });
  },
  bindWx:function(){
    let user = getApp().getCache("userinfo");
    let sessionId = wx.getStorageSync("sessionid");
   
    t.post("/wx/user/bindwx.html",{
      uid : user.id,
      sessionid:sessionId
    },function(data){

      if(data.code ==1){
        wx.showToast({
          title: '绑定成功!',
        });
       
      }else{
        wx.showToast({
          title:data.msg,
          icon: 'none'
        });
      }
    });
  },
  bindViewTap: function(n) {
    var e = t.pdata(n).index;
    if (e == 9) {
      t.jump("/yb_tuangou/pages/change_password/index")
    } else if (e == 14) {
      t.jump("/yb_tuangou/pages/yqm/yqm")
    } else if (e == 1) {
      t.jump("/yb_tuangou/pages/monthCharts/monthCharts")
    } else if (e == 100) {
      t.jump("/yb_tuangou/pages/notice/notice")
    }
    console.log(123), 1 == e ? t.jump("/yb_tuangou/pages/member/index") : 2 == e ? t.jump("/yb_tuangou/pages/jingying/index") : 3 == e ? t.jump("/yb_tuangou/pages/yongjin/index") : 4 == e ? t.jump("/yb_tuangou/pages/tixianguanli/index") : 6 == e ? t.jump("/yb_tuangou/pages/policy/index") : 7 == e && t.jump("/yb_tuangou/pages/change_data/index");
  },
  onLoad: function(n) {
    let user = getApp().getCache("userinfo");
    user|| wx.redirectTo({
      url: "/yb_tuangou/pages/login/index"
    });

    if(user.i_level == 0){
      this.setData({
        isAdmin:1,
        uid:user.id
      });
    }else{
      this.setData({
        isAdmin: 0,
        uid:user.id
      });
    }



    let userinfo = this.data.userinfo;
    if(user){
      
      userinfo.name = user.v_real_name;
      userinfo.after_commission = user.v_scale_level_name;
      userinfo.before_commission = user.v_level_name;
      if(user.i_level == 0){
        
      }

      this.setData({
        userinfo:userinfo
      });

    }
  },
  getinfo: function(n) {
    return;
    var e = this;
    t.get("commander/CommanderCenter", {
      id: getApp().getCache("userinfo").id
    }, function(n) {
      0 == n.code ? e.setData({
        userinfo: n.info
      }) : t.alert(n.msg);
    });
  },
  copyright: function() {
    var n = this.data.is_copyright;
    this.setData({
      is_copyright: !n
    });
  },
  btnViewTap: function() {
    wx.showModal({
      title: "提示",
      content: "退出当前账号",
      success: function(n) {
        n.confirm ? (console.log("用户点击确定"), getApp().removeCache("userinfo"), t.jump("/yb_tuangou/pages/login/index", 3)) : console.log("用户点击取消");
      }
    });
  },
  onReady: function() {},
  tapName: function(n) {
    var e = t.pdata(n);
    this.setData({
      status: e.name
    });
  },
  onShow: function() {

    let _this = this;
    let uid1 = _this.data.uid;
    t.post("/wx/user/seldynums.html", {
      uid: uid1
    }, function (data) {
      if (data.code == 1) {
        _this.setData({
          dy_nums: data.dy_num ? data.dy_num : 0
        });
      }

    });


  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {
    this.getinfo(), wx.stopPullDownRefresh();
  },
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});