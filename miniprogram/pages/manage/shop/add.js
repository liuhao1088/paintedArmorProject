// miniprogram/pages/manage/shop/add.js
var util = require('../../../utils/util.js');
var nowdate = util.nowTime(new Date());
var addressJson;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_name: '',
    address: '',
    detail:'',
    person: '',
    phone: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
      that.add();

    } else {
      wx.showModal({
        showCancel: false,
        title: '请填写完整内容'
      })
    }

  },
  
  add: function () {
    var that = this;
    const creation_date = util.formatTime(new Date())
    console.log(that.data.name)
    wx.cloud.callFunction({
      name: "collectionAdd", //
      data: {
        collection: 'shop', 
        addData: {
          creation_date: creation_date,
          shop_name: that.data.shop_name,
          address: addressJson.address,
          lat: addressJson.latitude,
          lon: addressJson.longitude,
          address_name:addressJson.name,
          detail:that.data.detail,
          person: that.data.person,
          phone: that.data.phone,
          creation_timestamp: Date.parse(creation_date.replace(/-/g, '/')) / 1000,
        },

      }
    }).then(res => {
      console.log('更新数据库成功', res)
      wx.hideLoading({
        success: (res) => {},
      })
      wx.showToast({
        title: '添加成功',
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
  //生成随机6位数
  getRandomCode: function () {
    let code = "";
    const array = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e',
      'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
      'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
      'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    for (let i = 0; i < 6; i++) {
      let id = Math.round(Math.random() * 61);
      code += array[id];
    }
    return code;
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