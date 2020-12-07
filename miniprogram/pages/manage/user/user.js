// miniprogram/pages/manage/user/user.js
var ind;
var skip;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],scrollHev:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          widheight: res.windowHeight,
          scrollHev:res.windowHeight-70
        });
      }
    });
  },
  search(e) {
    var that = this;
    skip = 0;
    const db = wx.cloud.database(); //初始化数据库
    if (e.detail.value == "") {
      skip = 0;
      this.setData({
        list: []
      })
      this.loadData()
    } else {
      db.collection("user").where({
        nickName: {
          $regex: '.*' + e.detail.value,
          $options: 'i'
        }
      }).skip(skip).limit(20).orderBy("creation_date", "desc").get().then(res => {
        let data = res.data;
        if(data.length==0){
          that.setData({list:[]})
        }
        for (let i = 0; i < data.length; i++) {
          if (data[i].authority == "admin") {
            data[i].isChecked = true
          } else {
            data[i].isChecked = false
          }
          if (i + 1 == data.length) {
            console.log(data)
            
            that.setData({
              list: data
            })
            wx.hideNavigationBarLoading()
          }
        }
      });
    }

  },
  toLookup: function (e) {
    var that = this;
    ind = parseInt(e.currentTarget.dataset.index)
    wx.setStorageSync("editData", that.data.list[ind])
    wx.navigateTo({
      url: './lookup',
    })
  },
  changeSwitch: function (e) {
    var that = this;
    let ind = e.currentTarget.dataset.index;
    console.log(e)
    let auth
    if (e.detail.value == true) {
      auth = 'admin'
    } else {
      auth = 'primary'
    }
    wx.cloud.callFunction({
      name: 'collectionUpdate',
      data: {
        collection: 'user',
        where: {
          _openid: that.data.list[ind]._openid
        },
        updateData: {
          authority: auth
        }
      }
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
    skip = 0;
    this.setData({
      list: []
    })
    this.loadData()
  },
  loadData: function () {
    var that = this;
    const db = wx.cloud.database();
    db.collection('user').skip(skip).limit(20).orderBy("creation_date", "desc").get().then(res => {
      let data = res.data;
      for (let i = 0; i < data.length; i++) {
        if (data[i].authority == "admin") {
          data[i].isChecked = true
        } else {
          data[i].isChecked = false
        }
        if (i + 1 == data.length) {
          console.log(data)
          let alldata = that.data.list.concat(data)
          that.setData({
            list: alldata
          })
          wx.hideNavigationBarLoading()
        }
      }

    })
  },
  bindDownLoad: function () {
    console.log('--下拉刷新--')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    skip = skip + 20;
    this.loadData()
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