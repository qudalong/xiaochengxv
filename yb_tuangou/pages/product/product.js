import {
  floatOpration
} from '../../utils/util.js'
import {
  request
} from '../../utils/request.js';
var siteinfo = require("../../../siteinfo.js");
const multi = floatOpration.multi;
const add = floatOpration.add;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    selectFoods: [],
    navActive: 0,
    heightArr: [],
    containerH: 0,
    closeShadow: false,
    showDetails: false
  },
  onLoad: function(options) {
    let user = getApp().getCache("userinfo");
    user || wx.redirectTo({
      url: "/yb_tuangou/pages/login/index"
    });
    this.getScrollInitData();
  },

  getScrollInitData() {
    request({
      url: siteinfo.siteroot +'wx/product/selpro1',
    }).then(res => {
      console.log(res);
      this.setData({
        list: res.data.data
      })
    }).then(() => {
      let query = wx.createSelectorQuery();
      let heightArr = [];
      let s = 0;
      query.selectAll('.pesticide').boundingClientRect((react) => {
        react.forEach((res) => {
          console.log(res);
          s += res.height;
          heightArr.push(s)
        });
        this.setData({
          heightArr
        })
      });
      query.select('.content').boundingClientRect((res) => {
        this.setData({
          containerH: res.height
        })
      }).exec()
    });
  },

  //左边点击联动
  chooseType(e) {
    const id = e.currentTarget.dataset.id
    const index = e.currentTarget.dataset.index;
    this.setData({
      toView: id,
      navActive: index
    })
  },

  //右边滚动联动
  onScroll(e) {
    let scrollTop = e.detail.scrollTop;
    let scrollArr = this.data.heightArr;
    if (scrollTop >= scrollArr[scrollArr.length - 1] - this.data.containerH) {
      return
    } else {
      for (let i = 0; i < scrollArr.length; i++) {
        if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
          this.setData({
            navActive: 0
          })
        } else if (scrollTop >= scrollArr[i - 1] && scrollTop < scrollArr[i]) {
          this.setData({
            navActive: i
          })
        }
      }
    }
  },
  showDetails: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/yb_tuangou/pages/product_desc/product_desc?item_id=' + id,
    })
  },

  onReady: function() {

  },
  onHide: function() {

  },
  onShow: function() {
    this.getScrollInitData();
  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  }
})