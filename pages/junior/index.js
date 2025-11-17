// 初中语法页面逻辑
Page({
  data: {
    // 学习进度
    completedPoints: 12,
    totalPoints: 50,
    
    // 章节结构化的学习路径
    chapters: [
      {
        id: 'chapter1',
        title: '词类基础',
        level: 1,
        description: '掌握英语基本词类的用法',
        lessons: [
          { id: 'nouns', name: '名词', unlocked: true, completed: true, progress: 85, icon: '📖', current: true, description: '掌握名词的基本用法和分类' },
          { id: 'verbs', name: '动词', unlocked: true, completed: true, progress: 70, icon: '🏃', current: false, description: '学习动词的各种形式和用法' },
          { id: 'adjectives', name: '形容词', unlocked: true, completed: true, progress: 90, icon: '✨', current: false, description: '掌握形容词的修饰和比较用法' },
          { id: 'adverbs', name: '副词', unlocked: true, completed: false, progress: 65, icon: '⚡', current: false, description: '了解副词的修饰作用和位置' }
        ]
      },
      {
        id: 'chapter2',
        title: '时态语态',
        level: 2,
        description: '理解英语时态和语态的变化',
        lessons: [
          { id: 'present', name: '现在时', unlocked: false, completed: false, progress: 0, icon: '🕐', current: false, description: '掌握一般现在时的用法' },
          { id: 'past', name: '过去时', unlocked: false, completed: false, progress: 0, icon: '🕑', current: false, description: '学习一般过去时的构成和用法' },
          { id: 'future', name: '将来时', unlocked: false, completed: false, progress: 0, icon: '🕒', current: false, description: '掌握将来时的表达方式' },
          { id: 'passive', name: '被动语态', unlocked: false, completed: false, progress: 0, icon: '🔄', current: false, description: '理解被动语态的构成和用法' }
        ]
      },
      {
        id: 'chapter3',
        title: '句型结构',
        level: 3,
        description: '掌握英语句子结构的变化',
        lessons: [
          { id: 'sentences', name: '句子成分', unlocked: false, completed: false, progress: 0, icon: '📋', current: false, description: '分析句子的基本成分' },
          { id: 'questions', name: '疑问句', unlocked: false, completed: false, progress: 0, icon: '❓', current: false, description: '掌握各种疑问句的构成' },
          { id: 'negatives', name: '否定句', unlocked: false, completed: false, progress: 0, icon: '🚫', current: false, description: '学习否定句的表达方式' },
          { id: 'comparisons', name: '比较级', unlocked: false, completed: false, progress: 0, icon: '⚖️', current: false, description: '掌握比较级和最高级的用法' }
        ]
      }
    ],
    
    // 扁平化的学习路径（用于兼容现有逻辑）
    learningPath: [],
    
    // 当前正在学习的知识点
    currentLearning: 'adverbs',
      
      // 课程统计数据
      completedCount: 0,
      overallProgress: 0,
      chapterProgress: [0, 0, 0],
      expandedChapters: [0, 1, 2] // 默认展开所有章节
  },

  onLoad() {
    console.log('初中语法页面加载完成');
    console.log('初始展开状态:', this.data.expandedChapters);
    this.initializeLearningPath();
    this.loadProgressData();
    this.updateCourseStats();
    console.log('加载后的展开状态:', this.data.expandedChapters);
  },

  // 初始化学习路径，生成扁平化数据
  initializeLearningPath() {
    const flatPath = [];
    this.data.chapters.forEach((chapter, chapterIndex) => {
      chapter.lessons.forEach((lesson, lessonIndex) => {
        flatPath.push({
          ...lesson,
          level: chapter.level,
          category: chapter.title
        });
      });
    });
    
    this.setData({
      learningPath: flatPath
    });
  },

  onShow() {
    // 页面显示时的逻辑
  },

  // 加载进度数据
  loadProgressData() {
    // 从本地存储获取进度数据
    const progressData = wx.getStorageSync('juniorProgress') || {};
    
    // 获取保存的展开状态
    const savedExpandedChapters = wx.getStorageSync('expandedChapters');
    console.log('保存的展开状态:', savedExpandedChapters);
    
    // 如果有保存的进度，使用保存的数据
    if (Object.keys(progressData).length > 0) {
      this.setData(progressData);
    }
    
    // 如果有保存的展开状态，使用保存的状态
    if (savedExpandedChapters && Array.isArray(savedExpandedChapters)) {
      console.log('使用保存的展开状态:', savedExpandedChapters);
      this.setData({
        expandedChapters: savedExpandedChapters
      });
    } else {
      console.log('使用默认展开状态:', this.data.expandedChapters);
    }
  },

  // 保存进度数据
  saveProgressData() {
    const progressData = {
      completedPoints: this.data.completedPoints,
      totalPoints: this.data.totalPoints,
      nounProgress: this.data.nounProgress,
      verbProgress: this.data.verbProgress,
      adjProgress: this.data.adjProgress,
      advProgress: this.data.advProgress,
      presentProgress: this.data.presentProgress,
      pastProgress: this.data.pastProgress,
      futureProgress: this.data.futureProgress,
      passiveProgress: this.data.passiveProgress,
      sentenceProgress: this.data.sentenceProgress,
      questionProgress: this.data.questionProgress,
      negativeProgress: this.data.negativeProgress,
      comparisonProgress: this.data.comparisonProgress
    };
    
    wx.setStorageSync('juniorProgress', progressData);
  },

  // 通用的学习导航函数（带锁定检查）
  navigateToLearning(topicId) {
    const learningItem = this.data.learningPath.find(item => item.id === topicId);
    
    if (!learningItem) {
      wx.showToast({
        title: '知识点不存在',
        icon: 'none'
      });
      return;
    }
    
    // 检查是否已解锁
    if (!learningItem.unlocked) {
      wx.showToast({
        title: '请先完成前面的知识点',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    // 更新当前学习状态
    this.setData({
      learningPath: this.data.learningPath.map(item => ({
        ...item,
        current: item.id === topicId
      }))
    });
    
    // 进入学习
    wx.showToast({
      title: `进入${learningItem.name}学习`,
      icon: 'none'
    });
    
    // 跳转到具体学习页面
    wx.navigateTo({
      url: `/pages/junior/${topicId}/index`
    });
  },

  // 名词学习
  navigateToNouns() {
    this.navigateToLearning('nouns');
  },

  // 动词学习
  navigateToVerbs() {
    this.navigateToLearning('verbs');
  },

  // 形容词学习
  navigateToAdjectives() {
    this.navigateToLearning('adjectives');
  },

  // 副词学习
  navigateToAdverbs() {
    this.navigateToLearning('adverbs');
  },

  // 现在时学习
  navigateToPresent() {
    this.navigateToLearning('present');
  },

  // 过去时学习
  navigateToPast() {
    this.navigateToLearning('past');
  },

  // 将来时学习
  navigateToFuture() {
    this.navigateToLearning('future');
  },

  // 被动语态学习
  navigateToPassive() {
    this.navigateToLearning('passive');
  },

  // 句子成分学习
  navigateToSentences() {
    this.navigateToLearning('sentences');
  },

  // 疑问句学习
  navigateToQuestions() {
    this.navigateToLearning('questions');
  },

  // 否定句学习
  navigateToNegatives() {
    this.navigateToLearning('negatives');
  },

  // 比较级学习
  navigateToComparisons() {
    this.navigateToLearning('comparisons');
  },

  // 完成当前学习（测试用）
  completeCurrentLearning: function() {
    const currentItem = this.data.learningPath.find(item => item.current);
    if (currentItem) {
      // 标记当前项为已完成
      const updatedPath = this.data.learningPath.map(item => {
        if (item.id === currentItem.id) {
          return { ...item, completed: true, progress: 100, current: false };
        }
        return item;
      });
      
      // 找到下一个未解锁的知识点
      const currentIndex = this.data.learningPath.findIndex(item => item.id === currentItem.id);
      let nextItem = null;
      
      // 优先找同层的下一个
      for (let i = currentIndex + 1; i < this.data.learningPath.length; i++) {
        if (this.data.learningPath[i].level === currentItem.level) {
          nextItem = this.data.learningPath[i];
          break;
        }
      }
      
      // 如果同层没有，找下一层的第一个
      if (!nextItem) {
        const nextLevel = currentItem.level + 1;
        nextItem = this.data.learningPath.find(item => item.level === nextLevel);
      }
      
      if (nextItem) {
        // 解锁下一个知识点并标记为当前学习
        const finalPath = updatedPath.map(item => {
          if (item.id === nextItem.id) {
            return { ...item, unlocked: true, current: true };
          }
          return item;
        });
        
        this.setData({
          learningPath: finalPath
        });
      } else {
        // 所有知识点都完成了
        this.setData({
          learningPath: updatedPath
        });
        
        wx.showToast({
          title: '恭喜完成所有学习！',
          icon: 'success',
          duration: 3000
        });
        return;
      }
      
      this.saveProgressData();
      
      // 更新统计数据
      this.updateCourseStats();
      
      wx.showToast({
        title: '完成学习！',
        icon: 'success'
      });
    }
  },

  // 更新课程统计数据
  updateCourseStats() {
    const completedItems = this.data.learningPath.filter(item => item.completed).length;
    const overallProgress = Math.round((completedItems / this.data.learningPath.length) * 100);
    
    // 基于新的chapters数据结构计算每个章节的进度
    const chapterProgress = [];
    
    this.data.chapters.forEach((chapter) => {
      const chapterLessons = chapter.lessons;
      const completedChapterItems = chapterLessons.filter(lesson => lesson.completed).length;
      const progress = chapterLessons.length > 0 ? 
        Math.round((completedChapterItems / chapterLessons.length) * 100) : 0;
      chapterProgress.push(progress);
    });

    this.setData({
      completedCount: completedItems,
      overallProgress: overallProgress,
      chapterProgress: chapterProgress
    });
  },

  // 切换章节展开/收缩状态
  toggleChapter(e) {
    console.log('toggleChapter被调用', e);
    
    // 检查事件对象和dataset
    if (!e || !e.currentTarget) {
      console.error('事件对象无效:', e);
      return;
    }
    
    const dataset = e.currentTarget.dataset;
    if (!dataset) {
      console.error('dataset不存在:', e.currentTarget);
      return;
    }
    
    const chapterIndex = dataset.chapterIndex;
    console.log('章节索引:', chapterIndex);
    
    // 检查章节索引是否有效
    if (typeof chapterIndex === 'undefined' || chapterIndex === null) {
      console.error('无效的章节索引:', chapterIndex);
      return;
    }
    
    // 确保chapterIndex是数字类型
    const index = parseInt(chapterIndex);
    if (isNaN(index)) {
      console.error('章节索引不是有效数字:', chapterIndex);
      return;
    }
    
    console.log('当前展开状态:', this.data.expandedChapters);
    
    // 创建新的展开状态数组副本
    let expandedChapters = [...this.data.expandedChapters];
    const existingIndex = expandedChapters.indexOf(index);
    
    if (existingIndex > -1) {
      // 如果已展开，则收缩
      expandedChapters.splice(existingIndex, 1);
      console.log('收缩章节:', index);
    } else {
      // 如果未展开，则展开
      expandedChapters.push(index);
      console.log('展开章节:', index);
    }
    
    // 排序并去重
    expandedChapters = [...new Set(expandedChapters)].sort((a, b) => a - b);
    console.log('新的展开状态:', expandedChapters);
    
    this.setData({
      expandedChapters: expandedChapters
    });
    
    // 保存状态到本地存储
    try {
      wx.setStorageSync('expandedChapters', expandedChapters);
      console.log('保存展开状态成功');
    } catch (error) {
      console.error('保存展开状态失败:', error);
    }
  },

  // 页面分享配置
  onShareAppMessage() {
    return {
      title: '初中英语语法学习 - 英语语法速通pro',
      path: '/pages/junior/index',
      imageUrl: '/images/junior-share.png'
    };
  }
});