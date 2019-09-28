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
    yqmStatus: false,
    tel: '',
    pwd: '',
    repwd: '',
    yqm: ''
  },
  register() {
    const {
      tel,
      pwd,
      repwd,
      yqm,
      yqmStatus
    } = this.data;
    if (!tel.trim()) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return
    } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(tel)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return
    } else if (!pwd.trim()) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return
    } else if (pwd.trim().length < 6) {
      wx.showToast({
        title: '密码不能少于6位',
        icon: 'none'
      });
      return
    } else if (!repwd.trim()) {
      wx.showToast({
        title: '请再次输入密码',
        icon: 'none'
      });
      return
    } else if (repwd.trim() != pwd.trim()) {
      wx.showToast({
        title: '两次输入密码不一致',
        icon: 'none'
      });
      return
    }
    if (yqmStatus) {
      if (!yqm.trim()) {
        wx.showToast({
          title: '请输入邀请码',
          icon: 'none'
        });
        return
      }
    }
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
  },
  bindTel(e) {
    this.setData({
      tel: e.detail.value
    });
  },
  bindPwd(e) {
    this.setData({
      pwd: e.detail.value
    });
  },
  bindRepwd(e) {
    this.setData({
      repwd: e.detail.value
    });
  },
  bindYqm(e) {
    this.setData({
      yqm: e.detail.value
    });
  }
});