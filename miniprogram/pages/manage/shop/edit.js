// miniprogram/pages/manage/shop/edit.js
var util = require('../../../utils/util.js');
var nowdate = util.nowTime(new Date());
var addressJson;
var editData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_name: '',
    address: '',
    detail:'',
    person    : '',
    phone: '',
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
      phone:editData.phone,
      person: editData.person,
      shop: editData.shop,
    })
    addressJson=editData;
    addressJson.name=editData.address_name;
    addressJson.latitude=editData.lat;
    addressJson.longitude=editData.lon;
  },


  chooseLocation: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        addressJson = res;
        that.setData({
          address: res.address
        })
      },
    })
  },

  inputShopname: function (e) {
    this.setData({
      shop_name: e.detail.value
    })
  },
  inputDetail: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },
  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  inputPerson: function (e) {
    this.setData({
      person: e.detail.value
    })
  },




  //提交
  async submit() {
    var that = this;
    if (that.data.shop_name !== "" && that.data.address !== "") {
      wx.showLoading({
        title: '提交中，请稍等',
      })
      that.update();

    } else {
      wx.showModal({
        showCancel: false,
        title: '请填写完整内容'
      })
    }

  },
  
  update: function () {
    var that = this;
    wx.cloud.callFunction({
      name: "collectionUpdate", //
      data: {
        collection: 'shop',
        where:{_id:editData._id}, 
        updateData: {
          shop_name: that.data.shop_name,
          address: that.data.address,
          detail:that.data.detail,
          lat: addressJson.latitude,
          lon: addressJson.longitude,
          address_name:addressJson.name,
          person: that.data.person,
          phone: that.data.phone,
        },

      }
    }).then(res => {
      console.log('更新数据库成功', res)
      wx.hideLoading({
        success: (res) => {},
      })
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 0,
        })
      }, 2000)
    }).catch(res => {
      wx.hideLoading({
        success: (res) => {},
      })
      wx.showModal({
        showCancel: false,
        title: '添加失败，请重试'
      })
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