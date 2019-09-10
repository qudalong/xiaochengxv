var n = getApp().requirejs("core");

Page({
    data: {
        status: 0,
        loaded: !1,
        show: !1,
        orderlist: [],
        page: 1,
        type: 1,
        running: !1,
        tag:true,
        keyword:''
    },
  getKeyword:function(e){

    this.setData({
      keyword: e.detail.value
    });

  },
  keywordLoad:function(e){

   this.setData({
     orderlist:[],
     page :1
   });
    //console.log(this.data.keyword);
    this.order();

  },
    onLoad: function(t) {
        getApp().getCache("userinfo") || wx.redirectTo({
            url: "/yb_tuangou/pages/login/index"
        }), this.setData(t), console.log(this.data.status), this.order();
        this.setData({
          tag:false
        });
    },
    bindTapStatus: function(t) {
        console.log(111111111);
        var e = n.pdata(t).status;
        console.log("cccccccc", e), this.setData({
            status: e
        }), this.setData({
            orderlist: [],
            page: 1,
            loaded: !1
        }), this.order();
    },
    bindTapStyle: function(t) {
        var e = n.pdata(t).style;
        this.setData({
            orderlist: [],
            page: 1,
            loaded: !1,
            type: e
        }), this.order();
    },
    verifyOrder: function(t) {
        var e = this, a = n.pdata(t).order_no;
        n.get("Community/verifyOrder", {
            order_no: a,
            type: e.data.type
        }, function(t) {
            0 == t.code ? (n.success("收获成功"), setTimeout(function() {
                e.setData({
                    orderlist: [],
                    page: 1,
                    loaded: !1
                }), e.order();
            }, 1e3)) : n.alert(t.msg);
        });
    },
    signOrder: function(t) {
        var e = this, a = n.pdata(t).order_no;
        n.get("Community/signOrder", {
            order_no: a,
            type: e.data.type
        }, function(t) {
            0 == t.code ? (n.success("核销成功"), setTimeout(function() {
                e.setData({
                    orderlist: [],
                    page: 1,
                    loaded: !1
                }), e.order();
            }, 1e3)) : n.alert(t.msg);
        });
    },
    bindViewTap: function(t) {
        var e = n.pdata(t).index;
        console.log(11), 1 == e ? n.jump("/pages/index/index") : 2 == e ? n.jump("/pages/order/index") : 3 == e && n.jump("/pages/member/index");
    },
    onReady: function() {},
    order: function(t) {
        if (!this.data.running) {
            var e = this, a = e.data.status, o = e.data.page;
            e.setData({
                running: !0
            }), n.get("Community/shareOrder", {
                com_id: getApp().getCache("userinfo").id,
                status: a,
                type: e.data.type,
                keyword:e.data.keyword,
                page: o
            }, function(t) {
                console.log("aa", t), !1, e.setData({
                    running: !1
                }), 0 == t.code ? 0 != t.info.length ? e.setData({
                    orderlist: e.data.orderlist.concat(t.info),
                    show: !0,
                    page: o + 1
                }) : e.setData({
                    loaded: !0
                }) : n.alert(t.msg);
            });
        }
    },
    onShow: function() {
     // console.log('show');
      if(this.data.tag){
        this.setData({ orderlist:[],page:1});
        this.order();
      }
      this.setData({tag:true});
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            orderlist: [],
            page: 1,
            loaded: !1
        }), this.order(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("加载更多"), this.data.loaded || this.order();
    },
    onShareAppMessage: function() {}
});