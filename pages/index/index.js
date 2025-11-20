// 英语语法速通pro - 首页逻辑
Page({
  data: {
    // 页面标题数据
    appName: "英语语法速通",
    appVersion: "PRO",
    slogan: "让语法学习变得简单有趣",
    
    // 快速入口数据
    quickAccess: [
      {
        icon: '📚',
        title: '开始学习',
        desc: '立即开始语法学习'
      },
      {
        icon: '📊',
        title: '学习进度',
        desc: '查看学习统计'
      }
    ],
    
    // 功能模块数据
    features: [
      {
        icon: '📖',
        name: '语法学习',
        type: 'study'
      },
      {
        icon: '📝',
        name: '练习测试',
        type: 'practice'
      },
      {
        icon: '📈',
        name: '学习报告',
        type: 'report'
      },
      {
        icon: '⭐',
        name: '收藏夹',
        type: 'favorite'
      }
    ],
    
    // 今日推荐数据
    recommends: [
      {
        icon: '⏰',
        title: '时态专题',
        desc: '掌握英语时态用法',
        type: 'tenses'
      },
      {
        icon: '✍️',
        title: '写作技巧',
        desc: '提升英语写作能力',
        type: 'writing'
      }
    ],
    
    // 学习统计数据
    stats: {
      studyDays: 15,
      masteredPoints: 28,
      totalPoints: 50
    }
  },

  onLoad() {
    // 页面加载时的逻辑
    console.log('英语语法速通pro - 首页加载完成');
    this.updateLearningData();
  },

  onShow() {
    // 页面显示时的逻辑
    this.updateLearningData();
  },

  // 更新学习数据
  updateLearningData() {
    // 模拟从服务器获取数据
    setTimeout(() => {
      this.setData({
        'stats.studyDays': Math.floor(Math.random() * 30) + 1,
        'stats.masteredPoints': Math.floor(Math.random() * 50) + 1
      });
    }, 500);
  },

  // 快速入口点击事件
  onQuickAccessTap(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.quickAccess[index];
    
    wx.showToast({
      title: `进入${item.title}`,
      icon: 'none'
    });
    
    // 根据类型跳转不同页面
    if (index === 0) {
      // 开始学习
      wx.navigateTo({
        url: '/pages/study/study'
      });
    } else {
      // 学习进度
      wx.navigateTo({
        url: '/pages/progress/progress'
      });
    }
  },

  // 功能模块点击事件
  onFeatureTap(e) {
    const type = e.currentTarget.dataset.type;
    const name = e.currentTarget.dataset.name;
    
    wx.showToast({
      title: `进入${name}`,
      icon: 'none'
    });
    
    // 根据功能类型跳转不同页面
    switch(type) {
      case 'study':
        wx.navigateTo({
          url: '/pages/study/study'
        });
        break;
      case 'practice':
        wx.navigateTo({
          url: '/pages/practice/practice'
        });
        break;
      case 'report':
        wx.navigateTo({
          url: '/pages/report/report'
        });
        break;
      case 'favorite':
        wx.navigateTo({
          url: '/pages/favorite/favorite'
        });
        break;
    }
  },

  // 今日推荐点击事件
  onRecommendTap(e) {
    const type = e.currentTarget.dataset.type;
    const title = e.currentTarget.dataset.title;
    
    wx.showToast({
      title: `查看${title}`,
      icon: 'none'
    });
    
    // 跳转到对应的专题页面
    wx.navigateTo({
      url: `/pages/topic/topic?type=${type}`
    });
  },

  // 查看更多推荐
  onViewMore() {
    wx.showToast({
      title: '查看全部推荐',
      icon: 'none'
    });
    
    wx.navigateTo({
      url: '/pages/recommend/recommend'
    });
  },

  // 混淆词学习入口点击事件
  onConfusionTap(e) {
    const level = e.currentTarget.dataset.level;
    let title = '';
    
    switch(level) {
      case 'junior':
        title = '初中阶段混淆词学习';
        break;
      case 'senior':
        title = '高中阶段混淆词学习';
        break;
      case 'college':
        title = '大学阶段混淆词学习';
        break;
    }
    
    wx.showToast({
      title: `进入${title}`,
      icon: 'none'
    });
    
    // 跳转到混淆词列表页面，并传递学段参数
    wx.navigateTo({
      url: `/pages/confusion-list/confusion-list?level=${level}`
    });
  },

  // 打开语法学习页面
  openGrammar: function() {
    wx.showToast({
      title: '进入语法学习',
      icon: 'none'
    });
  },

  // 打开练习测试页面
  openPractice: function() {
    wx.showToast({
      title: '进入练习测试',
      icon: 'none'
    });
  },

  // 打开收藏夹页面
  openCollection: function() {
    wx.showToast({
      title: '进入收藏夹',
      icon: 'none'
    });
  },

  // 打开设置页面
  openSettings: function() {
    wx.showToast({
      title: '进入设置',
      icon: 'none'
    });
  },

  // 打开时态专题
  openTenseTopic: function() {
    wx.showToast({
      title: '进入时态专题',
      icon: 'none'
    });
  },

  // 打开写作技巧
  openWritingTips: function() {
    wx.showToast({
      title: '进入写作技巧',
      icon: 'none'
    });
  },

  // 查看全部推荐
  viewAllRecommend: function() {
    wx.showToast({
      title: '查看全部推荐',
      icon: 'none'
    });
  },

  // 页面分享配置
  onShareAppMessage() {
    return {
      title: '英语语法速通pro - 专业语法学习平台',
      path: '/pages/index/index',
      imageUrl: '/images/share-banner.jpg'
    };
  }

});