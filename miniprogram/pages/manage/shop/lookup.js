// miniprogram/pages/manage/shop/lookup.js
var editData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_name: '',
    address: '',
    person    : '',
    detail:'',
    phone: '',
    address_name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    editData = wx.getStorageSync('editData')
    this.setData({
      shop_name: editData.shop_name,
      address: editData.address,
      detail:editData.detail,
      person: editData.person,
      phone: editData.phone,
      address_name:editData.address_name
    })
  },
  openLocation:function(){
    wx.openLocation({
      latitude: editData.lat,
      longitude: editData.lon,
    })
  },
  callPhone:function(){
    wx.makePhoneCall({
      phoneNumber: editData.phone,
    })
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