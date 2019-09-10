var o = getApp(), i = o.requirejs("core");

Page({
    data: {
        code: !1,
        consume: !1,
        store: !1,
        cancelindex: 0,
        diyshow: {},
        list: []
    },
    onLoad: function(o) {
      this.setData({
        options: o
      }); 
        this.get_list();
    },
    onShow: function() {},
    onPullDownRefresh: function() {
        this.get_list(), wx.stopPullDownRefresh();
    },
    get_list: function() {
        var t = this;
        var _this = this;
        var type = this.data.options.type;
        var order_id = this.data.options.order_id;
        var buyer_id = this.data.options.buyer_id;
        i.get("Miaosha/GetOrder", {
          buyer_id: buyer_id,
          order_id: order_id
        }, function(o) {
          _this.setData({ info: o.info, show: true });
          
        });
    },
    goods_like: function() {
        var t = this;
        e.kj_list("", 1, 1, t, function(o) {
            t.setData(o);
        });
    },
    phone: function(o) {
        i.phone(o);
    },
    url: function(o) {
        var t = i.pdata(o);
        wx.navigateTo({
            url: "/yb_tuangou/pages/miaosha/goods_info/index?id=" + t.id
        });
    }
});