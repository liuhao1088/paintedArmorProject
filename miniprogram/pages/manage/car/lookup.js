// miniprogram/pages/manage/car/lookup.js
var ind;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    number_plate: '',
    code: '',
    vin: '',
    shop: '',
    year: '',
    brand: '',
    model: '',
    name: '',
    tempFilePaths: [],
    tempFilePaths2: [],creation_date:''
  },
  toReturn: function () {
    wx.navigateBack({
      default: 1
    })
  },
  
  
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let editData = wx.getStorageSync('editData')
    if(editData.creation_date==undefined) editData.creation_date='无'
    if(editData.vin=='') editData.vin='空'
    this.setData({
      name: editData.name,
      mobile: editData.mobile,
      number_plate: editData.number_plate,
      code: editData.code,
      vin: editData.vin,
      shop: editData.shop,
      year: editData.year,
      brand: editData.brand,
      model: editData.model,
      tempFilePaths: editData.check_img,
      tempFilePaths2: editData.build_img,
      creation_date:editData.creation_date
    })
  },
  previewCheck:function(e){
      var ind=e.currentTarget.dataset.index;
      wx.previewImage({
            current: this.data.tempFilePaths[ind], // 当前显示图片的http链接
            urls: this.data.tempFilePaths // 需要预览的图片http链接列表
      })
  },
  previewBuild:function(e){
    var ind=e.currentTarget.dataset.index;
    wx.previewImage({
          current: this.data.tempFilePaths2[ind], // 当前显示图片的http链接
          urls: this.data.tempFilePaths2 // 需要预览的图片http链接列表
    })
  },
  callPhone:function(){
    var that=this;
    wx.makePhoneCall({
      phoneNumber: that.data.mobile,
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