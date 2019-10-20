import {
  floatOpration
} from '../../utils/util.js'
import {
  request
} from '../../utils/request.js'
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
    this.getScrollInitData();
  },

  getScrollInitData() {
    request({
      url: 'https://mp.ucloudant.com/app/index.php?i=56&t=0&v=9.2&from=wxapp&c=entry&a=wxapp&do=Dishes&m=zh_dianc&sign=819fcd817f0aeb118075924d12978351&id=5&dishes_type=2',
    }).then(res => {
      this.setData({
        list: res.data
      })
    }).then(() => {
      let query = wx.createSelectorQuery();
      let heightArr = [];
      let s = 0;
      query.selectAll('.pesticide').boundingClientRect((react) => {
        react.forEach((res) => {
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
    wx.navigateTo({
      url: '/yb_tuangou/pages/product_desc/product_desc',
    })
  },

  onReady: function() {

  },
  onHide: function() {

  },
  onShow: function() {},
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  }
})