//index.js
const app = getApp()

Page({
  data: {
    imgUrl: [
      'https://img11.360buyimg.com/ddimg/jfs/t1/135883/24/18012/126516/5fc70386Ee8aea84e/f9c4e7a07fda64f2.jpg',
      'https://img11.360buyimg.com/ddimg/jfs/t1/149021/12/16911/247050/5fc9953cE9d9f50a5/40c7d5885975a276.jpg',
      'https://img13.360buyimg.com/ddimg/jfs/t1/151724/1/8365/184254/5fc99556E7821e493/d71ad309c99bc403.jpg',
      'https://img10.360buyimg.com/ddimg/jfs/t1/153715/40/8417/102371/5fc99521E5b727037/5e2621b633a37bed.jpg',
    ],
    contentList: [{
        lbtUrl: 'https://img13.360buyimg.com/ddimg/jfs/t1/152970/34/8035/165440/5fc7064bEcdc64de8/5618ac3a84f74e7a.png',
        title: '尊享系列',
        name: 'Exclusive series',
        msg: '抗划能力、抗腐蚀能力、高修复能力'
      },
      {
        lbtUrl: 'https://img11.360buyimg.com/ddimg/jfs/t1/134780/28/18151/148043/5fc71f52E7e078d8b/f7d635e7603c64f8.png',
        title: '荣耀系列',
        name: 'Glory series',
        msg: '高稳定性、高抗污性、高抗腐蚀性、高抗黄变性、高划水性'
      },
      {
        lbtUrl: 'https://img10.360buyimg.com/ddimg/jfs/t1/148562/17/16545/118098/5fc71f5eE108fd0b6/0e9beffa78818be9.png',
        title: '金钻系列',
        name: 'Gold Drill series',
        msg: '超强抗腐蚀、抗黄变、抗静电、抗老化'
      }
    ]

  },
  toFormWarranty() {
    wx.navigateTo({
      url: '../../pages/toFormWarranty/toFormWarranty',
    })
  },

  toAboutUs(event) {
    let index = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../pages/aboutUs/aboutUs?index=' + index,
    })
  },

  toSeries(event) {
    let index = event.currentTarget.dataset.id;
    console.log(index);
    if (index === 0) {
      wx.navigateTo({
        url: '../../pages/exclusiveSeries/exclusiveSeries',
      })
    } else if (index === 1) {
      wx.navigateTo({
        url: '../../pages/glorySeries/glorySeries',
      })
    } else {
      wx.navigateTo({
        url: '../../pages/goldDiamondSeries/goldDiamondSeries',
      })

    }
  },

  onLoad: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.showShareMenu({

      withShareTicket: true,

      menus: ['shareAppMessage', 'shareTimeline']

    })
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