// 混淆词列表页面逻辑
Page({
  data: {
    // 页面数据
    level: 'junior', // 默认初中阶段
    pageTitle: '初中混淆词专项学习',
    progress: 60, // 学习进度百分比
    confusionList: []
  },

  onLoad: function(options) {
    // 页面加载时调用
    console.log('混淆词列表页面加载', options);
    
    // 根据传入的level参数设置页面数据
    const level = options.level || 'junior';
    this.setPageData(level);
  },

  // 根据学段设置页面数据
  setPageData: function(level) {
    let pageTitle = '';
    let progress = 0;
    let confusionList = [];
    
    switch(level) {
      case 'junior':
        pageTitle = '初中混淆词专项学习';
        progress = 60;
        confusionList = [
          {id: 1, title: 'a/an/the 用法区别', desc: '掌握冠词的正确使用场景和区别', status: '已学习'},
          {id: 2, title: 'some/any 使用场景', desc: '理解肯定句和否定句中some/any的用法', status: '已学习'},
          {id: 3, title: 'much/many 数量表达', desc: '区分可数名词和不可数名词的数量表达', status: '学习中'},
          {id: 4, title: 'good/well 形容词副词', desc: '掌握形容词和副词的正确用法', status: '未开始'},
          {id: 5, title: 'see/look/watch 看的不同', desc: '理解不同"看"的动词用法区别', status: '未开始'},
          {id: 6, title: 'say/tell/speak/talk 说的区别', desc: '掌握不同"说"的动词用法和搭配', status: '未开始'},
          {id: 7, title: 'go/come 方向动词', desc: '理解方向性动词的用法区别', status: '未开始'},
          {id: 8, title: 'have/has 主谓一致', desc: '掌握have/has在不同人称下的用法', status: '未开始'}
        ];
        break;
      case 'senior':
        pageTitle = '高中混淆词专项学习';
        progress = 40;
        confusionList = [
          {id: 1, title: 'affect/effect 影响与效果', desc: '区分动词和名词的用法区别', status: '已学习'},
          {id: 2, title: 'lie/lay 躺与放置', desc: '掌握不规则动词的变化形式', status: '学习中'},
          {id: 3, title: 'rise/raise 上升与举起', desc: '理解不及物动词和及物动词的区别', status: '未开始'},
          {id: 4, title: 'advice/advise 建议与劝告', desc: '区分名词和动词的用法', status: '未开始'},
          {id: 5, title: 'complement/compliment 补充与赞美', desc: '掌握拼写相似但意义不同的词', status: '未开始'},
          {id: 6, title: 'principal/principle 校长与原则', desc: '理解同音异义词的用法', status: '未开始'},
          {id: 7, title: 'stationary/stationery 固定与文具', desc: '区分拼写相似的形容词和名词', status: '未开始'},
          {id: 8, title: 'desert/dessert 沙漠与甜点', desc: '掌握发音相似但意义不同的词', status: '未开始'},
          {id: 9, title: 'capital/capitol 首都与国会大厦', desc: '理解拼写相似但用法不同的词', status: '未开始'},
          {id: 10, title: 'emigrate/immigrate 移出与移入', desc: '掌握方向性动词的用法', status: '未开始'},
          {id: 11, title: 'historic/historical 历史性的与历史的', desc: '区分形容词的细微差别', status: '未开始'},
          {id: 12, title: 'illusion/allusion 幻觉与暗示', desc: '理解拼写相似的抽象名词', status: '未开始'}
        ];
        break;
      case 'college':
        pageTitle = '大学混淆词专项学习';
        progress = 20;
        confusionList = [
          {id: 1, title: 'academic/scholarly 学术的与学者的', desc: '区分形容词的细微语义差别', status: '已学习'},
          {id: 2, title: 'ambiguous/vague 模糊的与含糊的', desc: '理解程度不同的模糊表达', status: '未开始'},
          {id: 3, title: 'coherent/cohesive 连贯的与有凝聚力的', desc: '掌握逻辑性和结构性的区别', status: '未开始'},
          {id: 4, title: 'connotation/denotation 内涵与外延', desc: '理解语义学的核心概念', status: '未开始'},
          {id: 5, title: 'empirical/theoretical 经验的与理论的', desc: '区分研究方法的不同类型', status: '未开始'},
          {id: 6, title: 'explicit/implicit 明确的与隐含的', desc: '掌握表达方式的直接程度', status: '未开始'},
          {id: 7, title: 'infer/imply 推断与暗示', desc: '理解逻辑推理中的主动与被动', status: '未开始'},
          {id: 8, title: 'objective/subjective 客观的与主观的', desc: '区分观点表达的中立性', status: '未开始'},
          {id: 9, title: 'paradigm/paradox 范式与悖论', desc: '掌握学术术语的精确用法', status: '未开始'},
          {id: 10, title: 'quantitative/qualitative 定量的与定性的', desc: '理解研究方法的分类', status: '未开始'}
        ];
        break;
    }
    
    this.setData({
      level: level,
      pageTitle: pageTitle,
      progress: progress,
      confusionList: confusionList
    });
  },

  onReady: function() {
    // 页面初次渲染完成时调用
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: this.data.pageTitle
    });
  },

  onReady: function() {
    // 页面初次渲染完成时调用
  },

  onShow: function() {
    // 页面显示时调用
  },

  onHide: function() {
    // 页面隐藏时调用
  },

  onUnload: function() {
    // 页面卸载时调用
  },

  // 返回上一页
  goBack: function() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 打开混淆词详情页面
  openConfusionDetail: function(e) {
    const confusionId = e.currentTarget.dataset.id;
    const confusionTitle = e.currentTarget.dataset.title || '混淆词详情';
    
    console.log('打开混淆词详情:', confusionId);
    
    // 显示提示信息（后续可替换为实际页面跳转）
    wx.showToast({
      title: `准备学习: ${confusionTitle}`,
      icon: 'none',
      duration: 2000
    });
    
    // 这里可以添加跳转到学习页面的逻辑
    // wx.navigateTo({
    //   url: `/pages/confusion-detail/confusion-detail?id=${confusionId}`
    // });
  }
})