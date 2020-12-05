const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 头部信息
    item: {
      title: '质保录入信息',
      msg: '漆面装甲，高端汽车漆面保护膜'
    },

    //年份
    index: 0,
    array: [],
    dateArray: [],
    //品牌
    brandIndex: 0,
    brandArray: ['劳斯莱斯', '宝马', '保时捷', '宾利'],
    objectBrandArray: [{
        id: 0,
        name: '劳斯莱斯'
      },
      {
        id: 1,
        name: '宝马'
      },
      {
        id: 2,
        name: '保时捷'
      },
      {
        id: 3,
        name: '宾利'
      }
    ],
    //车型
    modelIndex: 0,
    modelArray: ['a16', 'b52', 'c86', 'y85'],
    objectModelArray: [{
        id: 0,
        name: 'a16'
      },
      {
        id: 1,
        name: 'b52'
      },
      {
        id: 2,
        name: 'c86'
      },
      {
        id: 3,
        name: 'y85'
      }
    ],
    imgUrl: '', //验收单
  },
  // 年份
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      index: e.detail.value
    })
  },
  // 品牌
  bindBrandChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      brandIndex: e.detail.value
    })
  },
  // 车型
  bindModelChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      modelIndex: e.detail.value
    })
  },

  //上传图片
  insertImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
  },
  toDetails(evevt) {
    wx.navigateTo({
      url: '../../pages/details/details',
    })
  },

  //查询时间
  async getDtae() {
    let that = this;
    let countResult = await db.collection('date').count()
    let total = countResult.total
    let batchTimes = Math.ceil(total / 20); //获取需要获取几次 
    let dateList = [];
    let list = [];
    //初次循环获取云端数据库的分次数的promise数组
    for (let i = 0; i < batchTimes; i++) {
      db.collection('date').skip(i * 20).get({
        success: function (res) {
          console.log(res.data)
          for (let j = 0; j < res.data.length; j++) {
            dateList.push(res.data[j].name);
            list.push(res.data[j]);
          }
          console.log(dateList)
          that.setData({
            array: dateList,
            dateArray: list
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDtae();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})