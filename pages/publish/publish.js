//logs.js
var util = require('../../utils/util.js')

Page({

  data: {
    address: "请选择地址",
    success: false
  },

  staticData: {
    latitude: "",
    longitude: "",
    type: "",
    message: "",
    contact: ""
  },

  handleSelectAddress() {
    wx.chooseLocation({
      success: this.handleAddressSucc.bind(this)
      // complete: function() {
      // 	console.log("complete");
      // }
    });
  },

  handleAddressSucc(res) {
    this.setData({
      address: res.address
    });

    Object.assign(this.staticData, {
      latitude: res.latitude,
      longitude: res.longitude
    })
  },

  handleTypeChange(e) {
    this.staticData.type = e.detail.value;
  },

  handleMessageChange(e) {
    this.staticData.message = e.detail.value;
  },

  handleContactChange(e) {
    this.staticData.contact = e.detail.value;
  },

  handleSubmit() {

    if (this.data.address == "请选择地址" || !this.data.address) {
      this.showToast('请您选择地址');
      return;
    }

    if (!this.staticData.type) {
      this.showToast('请选择交易类型');
      return;
    }

    if (!this.staticData.message) {
      this.showToast('请填写说明内容');
      return;
    }

    if (!this.staticData.contact) {
      this.showToast('请填写联系人信息');
      return;
    }

    this.sendPostInfo();
  },

  showToast(title) {
    wx.showToast({
      title: title,
      icon: 'loading',
      duration: 2000
    })
  },

  sendPostInfo() {
    wx.request({
      url: 'https://nuanwan.wekeji.cn/student/index.php/trade/add_item',
      data: {
        address: this.data.address,
        latitude: this.staticData.latitude,
        longitude: this.staticData.longitude,
        message: this.staticData.message,
        contact: this.staticData.contact,
        type: this.staticData.type,
        distinct: "pengfeiliu001"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: this.handleSubmitSucc.bind(this)
    })
  },

  handleSubmitSucc() {
    this.setData({
      success: true
    })
  }

})
