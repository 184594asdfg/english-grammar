// 英语语法速通pro - 小程序主逻辑
App({
  onLaunch() {
    console.log('英语语法速通pro - 小程序启动');
    
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  globalData: {
    userInfo: null,
    appName: '英语语法速通pro',
    version: '1.0.0'
  }
});