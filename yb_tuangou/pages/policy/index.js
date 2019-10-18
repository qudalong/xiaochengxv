import {
  request
} from '../../utils/request.js'
Page({
  data: {
    rankList: []
  },
  onLoad: function(e) {
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