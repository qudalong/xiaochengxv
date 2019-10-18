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
      url: 'https://mp.ucloudant.com/app/index.php?i=56&t=0&v=9.2&from=wxapp&c=entry&a=wxapp&do=Dishes&m=zh_dianc&sign=819fcd817f0aeb118075924d12978351&id=5&dishes_type=2',
    }).then(res => {
      wx.hideLoading();
      this.setData({
        rankList: res.data[0].goods
      })
    });
  }
});