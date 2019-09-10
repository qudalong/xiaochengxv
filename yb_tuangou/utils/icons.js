var i;

function n(i, n, a) {
    return n in i ? Object.defineProperty(i, n, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : i[n] = a, i;
}

var a = "/yb_tuangou/static/images/index_img/", g = "/yb_tuangou/static/images/member_img/", u = "/yb_tuangou/static/images/jingying_img/", t = "/yb_tuangou/static/images/change_password_img/";

module.exports = (n(i = {
    mob_icon: "/yb_tuangou/static/images/mob_icon.png",
    pass_word_icon: "/yb_tuangou/static/images/pass_word_icon.png",
    hexiao: a + "hexiao@2x.png",
    shouhuo: a + "shouhuo@2x.png",
    tuihuo: a + "tuihuo@2x.png",
    dingdan: a + "dingdan@2x.png",
    shequtoutiao: a + "shequtoutiao@2x.png",
    tuceng: "http://ybimage.ybvips.com/public/upload/001/150/bf1e057cf23d6c83978ef9fb4d09eb94.jpg",
    hong: "/yb_tuangou/static/images/order_img/hong.png",
    icon_right: "/yb_tuangou/static/images/change_data_img/icon_right@2x.png",
    jiantou: "/yb_tuangou/static/images/cashout_account_img/jiantou@2x.png",
    bianji: g + "bianji@2x.png",
    shuju: g + "shuju@2x.png"
}, "icon_right", g + "icon_right@2x.png"), n(i, "yongjin", g + "yongjin@2x.png"), 
n(i, "tixian", g + "tixian@2x.png"), n(i, "kefu", g + "kefu(1)@2x.png"), n(i, "yinsi", g + "yinsi@2x.png"), 
n(i, "rili", u + "rili@2x.png"), n(i, "tubiao", u + "tubiao@2x.png"), n(i, "xian", u + "xian.png"), 
n(i, "duihuakuang", u + "duihuakuang.png"), n(i, "show", t + "ic_chapa_show@2x.png"), 
n(i, "hide", t + "ic_chapas_hide@2x.png"), i);