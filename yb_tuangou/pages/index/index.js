var e = getApp(), o = e.requirejs("core");

Page({
    data: {
        icon: e.requirejs("icons"),
        adUrl: '',
        adShow: true,
        text: "",
        marqueePace: 1,
        marqueeDistance: 0,
        marquee_margin: 30,
        size: 14,
        interval: 20,
        info:{
          today_order:{
            total:11,
            stay_take:1,
            stay_cancel:10,
            already_cancel:0
          },
          log_order:{
            total:30,
            stay_take:30,
            already_cancel:10000,
            stay_cancel:200000
          },
          news:{
            news:'珠宝、珠宝、珠宝'
          }

        }
    },
    onLoad: function(e) {
        // getApp().getCache("userinfo") || wx.redirectTo({
        //     url: "/yb_tuangou/pages/login/index"
        // }), this.getAdInfo();
    },
  shenhe(){
    wx.navigateTo({
      url: '/yb_tuangou/pages/checkList/checkList'
    })
  },
  shangbao(){
    wx.navigateTo({
      url: '/yb_tuangou/pages/sellLevel/sellLevel'
    })
  },
    onShow: function() {
       var url = this.data.icon.fm;
        this.setData({
          adUrl: url
        });
        // getApp().getCache("userinfo") ? this.getinfo() : wx.redirectTo({
        //     url: "/yb_tuangou/pages/login/index"
        // });
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
        if(t==1){
          this.to_order();
        }
        wx.scanCode({
            onlyFromCamera: !0,
            success: function(e) {
                if (e.result.indexOf("_") < 0) o.alert("二维码无效"); else {
                    var n = e.result.split("_");
                    o.jump("/yb_tuangou/pages/order_page/index?order_no=" + n[0] + "&type=" + n[1] + "&i=" + t);
                }
            },
            fail: function(e) {}
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
        this.getinfo(), wx.stopPullDownRefresh();
    }
});