var o = getApp(),
  n = o.requirejs("core");

Page({
  data: {
    icon: o.requirejs("icons"),
    items: [{
        name: 'a',
        value: 'A级',
        checked: 'true'
      },
      {
        name: 'b',
        value: 'B级'
      },
    ],
    yqmStatus: false
  },
  radioChange: function(e) {
    const level = e.detail.value;
    if (level == 'b') {
      this.setData({
        yqmStatus: true
      })
    } else {
      this.setData({
        yqmStatus: false
      })
    }
  }
});