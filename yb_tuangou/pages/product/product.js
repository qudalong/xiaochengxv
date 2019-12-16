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

    if(user.i_level == 0){
      this.setData({
        isAdmin:1
      });

    }else{
      this.setData({
        isAdmin:0

      });

    }
    
    this.getScrollInitData();
  },
  //删除分类
  delCate:function(options){
      let _this = this;
      let user = getApp().getCache("userinfo");
      let id = options.currentTarget.dataset.id;
      let uid1 = user.id;
      if(!id){
         wx.showToast({
           title: '请选择分类',
         });
         return ;
      }
      wx.showModal({
        title: '删除分类',
        content: '确定要删除此分类及分类下产品吗？',
        success:function(res){
          if(res.confirm){
            request({
              url: siteinfo.siteroot + 'wx/product/delcate.html',
              data:{
                cid:id,
                uid:uid1
              }              
            }).then(res => {
              console.log(res);
              if(res.data.code == 1){
                 wx.showToast({
                   title: '删除成功!'
                 });
                 _this.getScrollInitData();
              }

            });
          }
        }
      });

  },
  getScrollInitData() {
    wx.showLoading({
      title: '加载中...'
    });
    request({
      url: siteinfo.siteroot +'wx/product/selpro1.html',
    }).then(res => {
      console.log(res);
      this.setData({
        list: res.data.data
      })
    }).then(() => {
      wx.hideLoading();
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