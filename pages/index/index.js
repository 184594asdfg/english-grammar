// 英语语法速通pro - 首页逻辑
Page({
  data: {
    // 学习进度数据
    currentGrade: '', // 当前年级
    completedPoints: 0, // 已完成知识点
    totalPoints: 0, // 总知识点
    progressPercentage: 0, // 进度百分比
    nextTopic: '', // 下一个知识点
    studyDays: 15, // 已学习天数
    
    // 学习数据统计
    weeklyStudyTime: 1260, // 本周学习时间（分钟）
    dailyAverageTime: 180, // 日均学习时间（分钟）
    masteryRate: 78, // 知识点掌握率
    totalPracticeQuestions: 580, // 总练习题数
    correctRate: 82, // 正确率
    streakDays: 7, // 连续学习天数
    todayStudyTime: 45, // 今日学习时间（分钟）
    weekProgress: 35, // 本周进度百分比
    
    // 今日学习数据
    dailyProgress: 65, // 今日学习进度百分比
    todayCompleted: 8, // 今日完成知识点数量
    dailyTarget: 12, // 今日目标知识点数量
    
    // 今日推荐数据
    currentDate: '', // 当前日期
    todayGrammar: '现在进行时 vs 一般现在时', // 今日语法点
    
    // 各年级知识点数据（示例）
    gradeData: {
      junior: {
        name: '初中',
        total: 50,
        completed: 12,
        nextTopic: '一般现在时态'
      },
      senior: {
        name: '高中', 
        total: 80,
        completed: 25,
        nextTopic: '虚拟语气'
      },
      university: {
        name: '大学',
        total: 120,
        completed: 8,
        nextTopic: '学术写作语法'
      }
    }
  },

  onLoad() {
    // 页面加载时的逻辑
    console.log('英语语法速通pro - 首页加载完成');
    // 默认选择初中年级
    const savedGrade = wx.getStorageSync('currentGrade') || 'junior';
    wx.setStorageSync('currentGrade', savedGrade);
    
    // 获取学习天数（从本地存储或默认值）
    const studyDays = wx.getStorageSync('studyDays') || 15;
    
    // 获取当前日期
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const weekday = weekdays[now.getDay()];
    const currentDate = `${month}月${day}日 周${weekday}`;
    
    this.setData({ 
      studyDays,
      currentDate
    });
    
    this.loadLearningProgress();
  },

  // 加载学习进度
  loadLearningProgress() {
    // 从本地存储获取当前年级，默认为初中
    const currentGrade = wx.getStorageSync('currentGrade') || 'junior';
    
    if (currentGrade && this.data.gradeData[currentGrade]) {
      const gradeInfo = this.data.gradeData[currentGrade];
      const percentage = Math.round((gradeInfo.completed / gradeInfo.total) * 100);
      
      this.setData({
        currentGrade: gradeInfo.name,
        completedPoints: gradeInfo.completed,
        totalPoints: gradeInfo.total,
        progressPercentage: percentage,
        nextTopic: gradeInfo.nextTopic
      });
    }
  },

  onShow() {
    // 页面显示时的逻辑
  },

  // 跳转到分类页面
  navigateToCategory(e) {
    const category = e.currentTarget.dataset.category;
    
    // 根据不同分类跳转
    switch(category) {
      case 'junior':
        wx.navigateTo({
          url: '/pages/junior/index'
        });
        break;
      case 'senior':
        wx.navigateTo({
          url: '/pages/senior/index'
        });
        break;
      case 'university':
        wx.navigateTo({
          url: '/pages/university/index'
        });
        break;
      case 'hot':
        wx.navigateTo({
          url: '/pages/hot/index'
        });
        break;
    }
  },



  // 切换年级
  switchGrade(e) {
    const grade = e.currentTarget.dataset.grade;
    
    if (this.data.gradeData[grade]) {
      const gradeInfo = this.data.gradeData[grade];
      const percentage = Math.round((gradeInfo.completed / gradeInfo.total) * 100);
      
      // 保存当前年级到本地存储
      wx.setStorageSync('currentGrade', grade);
      
      this.setData({
        currentGrade: gradeInfo.name,
        completedPoints: gradeInfo.completed,
        totalPoints: gradeInfo.total,
        progressPercentage: percentage,
        nextTopic: gradeInfo.nextTopic
      });
      
      // 跳转到对应的年级页面
      switch(grade) {
        case 'junior':
          wx.navigateTo({
            url: '/pages/junior/index'
          });
          break;
        case 'senior':
          wx.showToast({
            title: '高中页面开发中',
            icon: 'none'
          });
          break;
        case 'university':
          wx.showToast({
            title: '大学页面开发中', 
            icon: 'none'
          });
          break;
      }
    }
  },

  // 页面分享配置
  onShareAppMessage() {
    return {
      title: '英语语法速通pro - 口诀速记，语法秒懂！',
      path: '/pages/index/index',
      imageUrl: '/images/share-banner.png'
    };
  },

  // 学习工具函数
  openGrammarCheck() {
    wx.showToast({
      title: '语法检查功能开发中',
      icon: 'none'
    });
  },

  openNoteBook() {
    wx.showToast({
      title: '错题本功能开发中',
      icon: 'none'
    });
  },

  openPractice() {
    wx.showToast({
      title: '专项练习功能开发中',
      icon: 'none'
    });
  },

  openAnalysis() {
    wx.showToast({
      title: '学习分析功能开发中',
      icon: 'none'
    });
  },

  // 今日学习推荐函数
  startTodayLesson() {
    wx.showToast({
      title: '开始学习今日语法点',
      icon: 'none'
    });
  },

  startQuickPractice() {
    wx.showToast({
      title: '开始快速练习',
      icon: 'none'
    });
  },

  reviewYesterday() {
    wx.showToast({
      title: '开始复习昨日内容',
      icon: 'none'
    });
  }
});