// components/cart-contart/index.js
Component({
  /**
   * 组件的属性列表
   */
  // < v - cart - control typeOneIndex = '{{typeOneIndex}}'  goodId = '{{good.id}}' xsNum = '{{good.xs_num}}' > </v-cart-control>
  properties: {
    typeOneIndex: {
      type: Number,
      value: 0,
      desc: '一级索引'
    },
    goodIndex: {
      type: Number,
      value: 0,
      desc: '二级索引'
    },
    goodId: {
      type: Number,
      value: 0,
      desc: '商品id'
    },
    xsNum: {
      type: Number,
      value: 0,
      desc: '库存'
    },
    goodOne: {
      type: Number,
      value: 0,
      desc: '单个商品数量'
    },
    goodCount: {
      type: Number,
      value: 0,
      desc: '单个商品数量'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
   
  }
})