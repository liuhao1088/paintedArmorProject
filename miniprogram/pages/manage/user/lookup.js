// miniprogram/pages/manage/user/lookup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',avatarUrl:'',sex:'',_openid:'',creation_date:'',authority:'',city:'',province:'',power:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let editData = wx.getStorageSync('editData')
    let power;
    if(editData.authority=="admin"){
      power='管理员'
    }else{
      power='普通用户'
    }
    this.setData({
      nickName: editData.nickName,
      avatarUrl: editData.avatarUrl,
      sex: editData.sex,
      _openid: editData._openid,
      creation_date: editData.creation_date,
      authority: editData.authority,
      city: editData.city,
      province: editData.province,
      power:power
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