
import {
  request
} from '../../utils/request.js'
Page({
  data: {
    rankList: [],
    day: '',
    showPicker: false,
    dayF: 1,
    date:''
  },
  onLoad: function(e) {
    wx.showLoading({
      title: '查询中...',
    });
    this.getRanking();
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  // 查询
  bindSearch() {
    var day = this.data.date;
    if (!day) {
      wx.showToast({
        title: '请选择查询时间',
        icon: 'none'
      });
      return
    }
    wx.showLoading({
      title: '查询中...',
    });
    this.getRanking();
  },

  // 获取排行列表
  getRanking() {
    request({
      url: 'http://www.icprj.com/IC/api/faPublic/list',
      method: 'POST',
      data: {
        type: 1
      }
    }).then(res => {
      wx.hideLoading();
      this.setData({
        rankList: res.data.rows
      })
    });
  }
});