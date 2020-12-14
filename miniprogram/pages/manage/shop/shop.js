// miniprogram/pages/manage/shop/shop.js
var ind;
var skip;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],scrollHev:'',startDate:'不限',endDate:'不限',search:''
  },
  toReturn: function () {
    wx.navigateBack({
      default: 1
    })
  },
  deleteAddr: function (e) {
    var _this = this;
    ind = parseInt(e.currentTarget.dataset.index)
    let _id=_this.data.list[ind]._id
    console.log(ind)
    wx.showModal({
      title: '删除 '+_this.data.list[ind].shop_name,
      content: '',
      confirmText: "删除",
      confirmColor: "red",
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中',
          })
          wx.cloud.callFunction({
            name: 'collectionDelete',
            data: {
              collection: 'shop',
              where: {
                _id: _id
              },
            }
          }).then(res => {
            
            _this.data.list.splice(ind, 1);
            wx.hideLoading({
              success: (res) => {},
            })
            wx.showToast({
              title: '删除成功',
              icon:'success',
              duration:2000
            })
            _this.setData({
              list: _this.data.list
            })
            skip=0;
            _this.setData({list:[]})
            _this.loadData()
          })

        }
      }
    })
  },
  toAdd: function () {
    var that = this;
    wx.navigateTo({
      url: './add',
    })
    
  },
  changeDate: function (e) {
    this.setData({ startDate: e.detail.value })
  },
  changeDate2: function (e) {
    this.setData({ endDate: e.detail.value })
  },
  inputSearch(e) {
    var that = this;
    that.setData({search:e.detail.value})
  },
  search:function(){
    skip = 0;
    this.setData({
      list: []
    })
    this.loadData()
  },
  toLookup: function (e) {
    var that = this;
    ind = parseInt(e.currentTarget.dataset.index)
    wx.setStorageSync("editData", that.data.list[ind])
    wx.navigateTo({
      url: './lookup',
    })
  },
  toEdit: function (e) {
    var that = this;
    ind = parseInt(e.currentTarget.dataset.index)
    wx.setStorageSync("editData", that.data.list[ind])
    wx.navigateTo({
      url: './edit',
    })
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
          scrollHev:res.windowHeight-155
        });
      }
    });
    skip=0;
    this.setData({list:[]})
    this.loadData()
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
    let boolean=wx.getStorageSync('refresh');
    if(boolean==true){
      skip=0;
      this.setData({list:[]})
      this.loadData()
      wx.setStorageSync('refresh', false)
    }
  },
  loadData:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    const db = wx.cloud.database();
    const _=db.command;
    let startstamp=Date.parse(that.data.startDate.replace(/-/g, '/')) / 1000
    let endstamp=Date.parse(that.data.endDate.replace(/-/g, '/')) / 1000
    if(that.data.startDate=='不限') startstamp=0
    if(that.data.endDate=='不限') endstamp=100000000000;
    db.collection('shop').where(_.or([{
      shop_name: {
        $regex: '.*' + that.data.search,
        $options: 'i'
      }
    },{
      address: {
        $regex: '.*' + that.data.search,
        $options: 'i'
      }
    },{
      address_name: {
        $regex: '.*' + that.data.search,
        $options: 'i'
      }
    },{
      person: {
        $regex: '.*' + that.data.search,
        $options: 'i'
      }
    },{
      creation_date: {
        $regex: '.*' + that.data.search,
        $options: 'i'
      }
    },{
      detail: {
        $regex: '.*' + that.data.search,
        $options: 'i'
      }
    },{
      phone: {
        $regex: '.*' + that.data.search,
        $options: 'i'
      }
    }])).where({creation_timestamp:_.gte(startstamp).and(_.lte(endstamp+86400))}).skip(skip).limit(20).orderBy("creation_date","desc").get().then(res => {
      let data = res.data;
      console.log(data)
      let alldata=that.data.list.concat(data)
      that.setData({
        list: alldata
      })
      wx.hideLoading()
      wx.hideNavigationBarLoading()
    }).catch(error=>{
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      wx.showModal({
        title: '服务器繁忙，请稍后重试',
      })
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