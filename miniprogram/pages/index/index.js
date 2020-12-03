//index.js
const app = getApp()

Page({
  data: {
    imgUrl: [
      'https://img11.360buyimg.com/ddimg/jfs/t1/135883/24/18012/126516/5fc70386Ee8aea84e/f9c4e7a07fda64f2.jpg',
      'https://img13.360buyimg.com/ddimg/jfs/t1/154535/38/8073/185464/5fc703a2E59c4ba42/cc46fe45e22b60e9.jpg',
      'https://img11.360buyimg.com/ddimg/jfs/t1/154714/13/8088/113225/5fc703afE629a4963/4c992468653dff63.jpg',
      'https://img14.360buyimg.com/ddimg/jfs/t1/148024/4/16571/43292/5fc703c2E4ef6922d/67e65822e8e5fe8f.jpg',
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
        lbtUrl: 
        'https://img10.360buyimg.com/ddimg/jfs/t1/148562/17/16545/118098/5fc71f5eE108fd0b6/0e9beffa78818be9.png',
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

  toAboutUs(event){
    let index = event.currentTarget.dataset.id;
    console.log(index);
    wx.navigateTo({
      url: '../../pages/aboutUs/aboutUs?index='+index,
    })
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