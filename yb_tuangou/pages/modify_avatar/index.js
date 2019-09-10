var i = getApp().requirejs("core");

Page({
    data: {
        showModal: !1,
        form_data: {
            img: " "
        }
    },
    uploadimg: function() {
        i.upload(this, "img", "com_avatar", 1);
    },
    onLoad: function(o) {
        getApp().getCache("userinfo") || wx.redirectTo({
            url: "/yb_tuangou/pages/login/index"
        }), this.modify();
    },
    modify: function(o) {
        console.log(o);
        var n = this;
        i.get("commander/CommunityImg", {
            id: getApp().getCache("userinfo").id
        }, function(o) {
            0 == o.code ? o.info.community_img && "undefined" != o.info.community_img && n.setData({
                "form_data.img": o.info.community_img
            }) : i.alert(o.msg);
        });
    },
    modify_avatar: function() {
        var o = this.data.form_data.img;
        "/img/bianji@2x.png" != o ? i.get("commander/UpdateImg", {
            id: getApp().getCache("userinfo").id,
            community_img: o
        }, function(o) {
            console.log(o), 0 == o.code ? (i.success("修改成功！"), setTimeout(function() {
                setTimeout(function() {
                    i.jump("/yb_tuangou/pages/change_data/index", 3);
                }, 1e3);
            }, 1e3)) : i.alert(o.msg);
        }) : i.alert("图片一致！请再次选择");
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});