import {
  floatOpration,
  formatTime
} from '../../utils/util.js'
import {
  request
} from '../../utils/request.js';
var n = getApp();
var t = n.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    buyName: '',
    productName: '',
    tel: '',
    price: '',
    resultPrice: '',
    discount: '',
    sell: '',
    yeji: '',
    ticheng: '',
    beizu: '',
    buyDate: '',
    birthday: '',
    btn_text:'上报'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      buyDate: formatTime(new Date()),
      item_id:''
    });
    let item_id =  options.item_id;
    if(item_id){
      this.setData({
        btn_text:'修改',
        item_id: item_id
      });
      this.loadDataById(item_id);

    }
  },
  //根据id查询数据
  loadDataById(item_id) {

   
    let _this = this;
    if (item_id) {

      t.post("wx/scale/selbyid.html", {
        id: item_id
      }, function (e) {
        if (e.code == 1) {
          _this.setData({
            buyName:e.data.v_buy_name,
            productName:e.data.v_pro_name,
            tel:e.data.v_buy_phone,
            birthday:e.data.v_buy_bir,
            buyDate:e.data.dtm_repdate,
            price:e.data.i_show_je,
            resultPrice:e.data.i_jy_je,
            discount:e.data.i_rebate,
            sell:e.data.i_sale_pre,
            yeji:e.data.i_current_yj,
            ticheng:e.data.i_royalty,
            beizu: e.data.v_remarker
          });

        }
     });


    }


  },

  
  // 登记
  bindDengji() {
    let {
      buyName,
      productName,
      tel,
      price,
      resultPrice,
      discount,
      sell,
      yeji,
      ticheng,
      beizu,
      buyDate,
      birthday
    } = this.data;
    if (!buyName.trim()) {
      wx.showToast({
        title: '请输入购买人姓名',
        icon: 'none'
      });
      return
    } else if (!productName.trim()) {
      wx.showToast({
        title: '请输入产品名称',
        icon: 'none'
      });
      return
    } 
    // else if (!tel.trim()) {
    //   wx.showToast({
    //     title: '请输入手机号',
    //     icon: 'none'
    //   });
    //   return
    // } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(tel)) {
    //   wx.showToast({
    //     title: '请输入正确的手机号',
    //     icon: 'none'
    //   });
    //   return
    // } 
    // else if (!birthday.trim()) {
    //   wx.showToast({
    //     title: '请选择购买人生日',
    //     icon: 'none'
    //   });
    //   return
    // }
     else if (!price.trim()) {
      wx.showToast({
        title: '请输入标价',
        icon: 'none'
      });
      return
    } else if (!resultPrice.trim()) {
      wx.showToast({
        title: '请输入成交价',
        icon: 'none'
      });
      return
    } else if (!discount) {
      wx.showToast({
        title: '请输入折扣',
        icon: 'none'
      });
      return
    } else if (!sell) {
      wx.showToast({
        title: '请输入销售占比',
        icon: 'none'
      });
      return
    } else if (!yeji) {
      wx.showToast({
        title: '请输入当笔业绩',
        icon: 'none'
      });
      return
    } else if (!ticheng) {
      wx.showToast({
        title: '请输入销售提成',
        icon: 'none'
      });
      return
    } else if (!beizu.trim()) {
      // wx.showToast({
      //   title: '请输入备注',
      //   icon: 'none'
      // });
      // return
    }

    sell = sell / 100;
    if (sell > 1) {
      wx.showToast({
        title: '销售占比不能大于1'
      });
    }

    

    let u = getApp().getCache("userinfo");
    let uid = u.id;
    let v_real_name = u.v_real_name;
    let _this = this;
    let id = '';
    let item_id = this.data.item_id;
    if(item_id){
      id = item_id;
    }
    t.post("wx/scale/add.html", {
      i_uid: uid,
      id:id,
      v_real_name: v_real_name,
      v_buy_name:buyName,
      v_pro_name: productName, //名称
      v_buy_phone: tel, //手机号
      v_buy_bir: birthday, //生日
      dtm_repdate: buyDate, //购买日期
      i_show_je: price, //标价
      i_jy_je: resultPrice, //成交价
      i_rebate: discount, //折扣
      i_sale_pre: sell, //销售赞比
      i_current_yj: yeji, //当笔业绩
      i_royalty: ticheng,//销售提成
      v_remarker: beizu //备注
    }, function (data) {
        console.log(data);
        if(data.code == 1){
            t.success(data.msg);
            if(data.skip && data.skip == 1){
              console.log("==============");
              setTimeout(function(){
                wx.navigateBack({
                  delta: 1
                });

              },500);
              
              return ;
            }
            _this.setData({
              buyName:'',
              productName:'',
              tel:'',
              birthday:'',
             // buyDate:'',
              price:'',
              resultPrice:'',
              discount:'',
              sell:'',
              yeji:'',
              ticheng:'',
              beizu:''
            });
        }else{
          t.error(data.msg);
        }
    });

  },
  // 购买人
  bindBuyName(e) {
    this.setData({
      buyName: e.detail.value
    });
  },
  // 产品名称
  bindProduceName(e) {
    console.log(e.detail.value);
    this.setData({
      productName: e.detail.value
    });
  },
  // 购买人手机号
  bindTel(e) {
    this.setData({
      tel: e.detail.value
    });
  },
  validationPrice(v){
    let a = /^(\d+|\d+\.\d{1,2})$/;
    if (!a.test(v)) {
      wx.showToast({
        title: '请输入正确的金额（保留两位小数）',
        icon: 'none'
      });
      return false;
    }

    return true;

  },
  //计算折扣:
  caculeDisCount(){

    var bj = this.data.price;
   // console.log(this.data);
    if(!bj){
      return;
    }
    var result = this.data.resultPrice;
    if(!result){
      return;
    }
    bj = parseFloat(bj);
    if(bj < 0){
      return;
    }
    let discount = parseFloat(result)/parseFloat(bj);
    //console.log(discount);
    this.setData({
      discount:discount.toFixed(2)
    });





  },
  // 标价
  bindPrice(e) {
    let bj = e.detail.value;
    console.log(this.validationPrice(bj));
    if (!this.validationPrice(bj)){
      this.setData({
        price:null,
        discount:null
      });
      return;
    }
    this.setData({
      price: e.detail.value
    });
    this.caculeDisCount();
  },
  // 成交价
  bindResultPrice(e) {
    let result = e.detail.value;
    if (!this.validationPrice(result)) {
      this.setData({
        resultPrice:null,
        yeji:null,
        ticheng:null,
        discount:null
      });
      return;
    }
    this.setData({
      resultPrice: e.detail.value
    });
    this.caculeDisCount();
    this.caculeYj();
    //this.caculeTiCheng();
  },
  // 折扣
  bindDiscount(e) {
    // this.setData({
    //   discount: e.detail.value
    // });
  },
  // 销售占比
  bindSell(e) {
    let sell = e.detail.value;
    if (!this.validationPrice(sell)) {
      this.setData({
        sell:null,
        yeji:null,
        ticheng:null
      });
      return;
    }
    sell = sell/100;
    if(sell > 1){
        wx.showToast({
          title: '销售占比不能大于1',
        });
      this.setData({
        
        yeji: null,
        ticheng: null
      });
        return;
    }
    this.setData({
      sell: parseFloat(e.detail.value)
    });
    this.caculeYj();
  },
  //计算当比业绩
  caculeYj(){
      let result = this.data.resultPrice;
      if(!result){
        return;
      }
    let sell = this.data.sell;
    if(!sell){
        return;
    }
    result = parseFloat(result);
    sell = parseFloat(sell/100);
     let yj = result * sell;
     this.setData({
       yeji: yj.toFixed(2)
     });
    this.caculeTiCheng(this.data.yeji);

  },
  // 当笔业级
  bindYeJi(e) {
    // this.setData({
    //   yeji: e.detail.value
    // });
  },
  caculeTiCheng(yeji){
    let result = yeji;
    if(!result){
      return;
    }
    let u = getApp().getCache("userinfo");
    let i_rebate = parseFloat(u.i_rebate);

    result = parseFloat(result);
    var tc = result * (i_rebate/100);
    this.setData({
      ticheng: tc.toFixed(2)
    });
  },
  // 当笔销售提成
  bindtTiCheng(e) {

    
    // this.setData({
    //   ticheng: e.detail.value
    // });
  },
  // 备注
  bindMark(e) {
    this.setData({
      beizu: e.detail.value
    });
  },
  // 生日
  bindDateChangeBriday(e) {
    this.setData({
      birthday: e.detail.value
    });
  },
  //购买日期
  bindDateChangeBuy(e) {
    this.setData({
      buyDate: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})