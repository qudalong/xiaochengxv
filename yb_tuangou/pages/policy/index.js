import {
  request
} from '../../utils/request.js';
var e = getApp(),
  a = e.requirejs("core");
Page({
  data: {
    rankList: [],
    day: '',
    img:'',
    showPicker: false,
    running:false,
    dayF: 1,
    date: ''
  },
  onLoad: function(e) {
    let user = getApp().getCache("userinfo");
    user || wx.redirectTo({
      url: "/yb_tuangou/pages/login/index"
    });
    //this.getRanking();
  },
  onPullDownRefresh(){
    this.setData({
      rankList:[],
      running:false
    });
    this.loadData();


  },
  loadData(){
    let date = this.data.date;
    if(!date){
        return;
    }
    this.setData({
      rankList :[],
      running:false
    });
    if(this.data.running){
      return;
    }
    this.setData({
      running:true
    });
    let _this = this;
    wx.showLoading({
      title: '加载中',
    });
    a.post("wx/monthrep/dayorder.html",{
      dtm_repdate :date
    },function(data){
      wx.hideLoading();

        if(data.code == 1 && data.data){
          _this.setData({
             rankList:data.data,
             img:data.img
          });

        }

    });

  },

  bindDateChange: function(e) {
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
    this.loadData();
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