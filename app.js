//app.js
App({

	globalData: {
		deviceHeight: 0,
		deviceWidth: 0,
    distinct: "pengfeiliu001"
	},

  onLaunch() {
  	this.getDeviceInfo();
  },

  getDeviceInfo(){

    let deviceWidth = wx.getStorageSync("deviceWidth");
    let deviceHeight = wx.getStorageSync("deviceHeight");

    if (deviceWidth && deviceHeight) {
      // 直接从本地存储取
      this.globalData.deviceHeight = deviceHeight;
      this.globalData.deviceWidth = deviceWidth;
    }else {
      // 调用api获取设备信息，同时，存入本地存储
      try {
        var res = wx.getSystemInfoSync();
        this.globalData.deviceHeight = res.windowHeight;
        this.globalData.deviceWidth = res.windowWidth;
        wx.setStorageSync('deviceHeight', res.windowHeight);
        wx.setStorageSync('deviceWidth', res.windowWidth);
      } catch (e) {}
    }
  
  }
})
