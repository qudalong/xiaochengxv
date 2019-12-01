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
    showXieyi: false,
    yqmStatus: false,
    tel: '',
    pwd: '',
    repwd: '',
    yqm: '',
    level: '1',
    v_real_name: ''
  },

  // 注册
  register() {
    const {
      tel,
      pwd,
      repwd,
      yqm,
      v_real_name,
      yqmStatus,
      level
    } = this.data;

    if (!v_real_name.trim()) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return
    }
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

    //提交
    n.post("wx/user/reg.html", {
      password: pwd,
      phone: tel,
      username: tel,
      v_real_name: v_real_name,
      repassword: repwd,
      i_level: level,
      v_yq_code: yqm

    }, function(data) {

      if (data.code == 0) {
        n.error(
          data.info
        );
        return;
      } else {
        n.success("注册成功!");
        setTimeout(function() {
          n.jump("/yb_tuangou/pages/login/index", 3);
        }, 1e3);
      }
      // console.log(data);

    });

  },

  hideXieyi() {
    this.setData({
      showXieyi: false
    })
  },

  //协议
  ckeckboxChange(e) {
    console.log('协议')
    var val = e.detail.value;
    if (val.length) {
      this.setData({
        showXieyi: true
      })
    } else {
      this.setData({
        showXieyi: false
      })
    }
  },

  radioChange: function(e) {
    const level = e.detail.value;
    if (level == 'b') {
      this.setData({
        yqmStatus: true,
        level: 2
      })
    } else {
      this.setData({
        yqmStatus: false,
        level: 1
      })
    }
  },
  bindRealName(e) {
    this.setData({
      v_real_name: e.detail.value

    });
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