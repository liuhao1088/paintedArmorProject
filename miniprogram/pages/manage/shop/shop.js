// miniprogram/pages/manage/shop/shop.js
var ind;
var skip;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],scrollHev:''
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
  addressInd: function (e) {


  },
  search(e) {
    var that = this;
    skip = 0;
    const db = wx.cloud.database(); //初始化数据库
    const _=db.command;
    if (e.detail.value == "") {
      skip = 0;
      this.setData({
        list: []
      })
      this.loadData()
    } else {
      db.collection("shop").where(_.or([{
        shop_name: {
          $regex: '.*' + e.detail.value,
          $options: 'i'
        }
      },{
        address: {
          $regex: '.*' + e.detail.value,
          $options: 'i'
        }
      },{
        address_name: {
          $regex: '.*' + e.detail.value,
          $options: 'i'
        }
      },{
        person: {
          $regex: '.*' + e.detail.value,
          $options: 'i'
        }
      },{
        mobile: {
          $regex: '.*' + e.detail.value,
          $options: 'i'
        }
      }])).skip(skip).limit(20).orderBy("creation_date", "desc").get().then(res => {
        let data = res.data;
        if(data.length==0){
          that.setData({list:[]})
        }
        console.log(data)
        that.setData({
          list: data
        })
          
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
          scrollHev:res.windowHeight-70
        });
      }
    });
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
    skip=0;
    this.setData({list:[]})
    this.loadData()
  },
  loadData:function(){
    var that = this;
    const db = wx.cloud.database();
    db.collection('shop').skip(skip).limit(20).orderBy("creation_date","desc").get().then(res => {
      let data = res.data;
      console.log(data)
      let alldata=that.data.list.concat(data)
      that.setData({
        list: alldata
      })
      wx.hideNavigationBarLoading()
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