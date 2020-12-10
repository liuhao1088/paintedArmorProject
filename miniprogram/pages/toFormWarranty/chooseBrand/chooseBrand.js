// miniprogram/pages/toFormWarranty/chooseCar/chooseCar.js
var brandList;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], toView: "", 
    hot: [],
    toTop:"",search:'',searchList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.cloud.callFunction({
      name:'getCollection',
      data:{
        collection:'car_name',
        where:{},
        skip:0
      }
    }).then(res=>{
      console.log(res)
      let data=res.result.data;
      that.setData({list:data})
      wx.cloud.callFunction({
        name:'getCollection',
        data:{
          collection:'car_name',
          where:{},
          skip:100
        }
      }).then(res=>{
        console.log(res)
        data=data.concat(res.result.data)
        brandList=data;
        console.log(data)
        that.setData({list:data})
      })
    })
  },
  chooseBrand:function(e){
    var ind = parseInt(e.currentTarget.dataset.index);
    var that=this;
    wx.showLoading({
      title: '选择中',
    })
    wx.setStorageSync('chooseBrand', brandList[ind])
    wx.cloud.callFunction({
      name:'getCollection',
      data:{
        collection:'car_set',
        where:{car_id:brandList[ind].auto_home_id},
        skip:0
      }
    }).then(res=>{
      let data=res.result.data;
      let arr=[]
      for(let i=0;i<data.length;i++){
        arr.push(data[i].car_set_name)
        if(i+1==data.length){
          console.log(arr)
          wx.setStorageSync('modelList', arr)
          wx.hideLoading({
            success: (res) => {},
          })
          wx.navigateBack({
            default:1
          })
        }
      }
      
    })
  },
  chooseSearchbrand:function(e){
    var ind = parseInt(e.currentTarget.dataset.index);
    var that=this;
    wx.showLoading({
      title: '选择中',
    })
    wx.setStorageSync('chooseBrand',that.data.searchList[ind])
    wx.cloud.callFunction({
      name:'getCollection',
      data:{
        collection:'car_set',
        where:{car_id:that.data.searchList[ind].auto_home_id},
        skip:0
      }
    }).then(res=>{
      let data=res.result.data;
      let arr=[]
      for(let i=0;i<data.length;i++){
        arr.push(data[i].car_set_name)
        if(i+1==data.length){
          console.log(arr)
          wx.setStorageSync('modelList', arr)
          wx.hideLoading({
            success: (res) => {},
          })
          wx.navigateBack({
            default:1
          })
        }
      }
      
    })
  },
  delete:function(){
    this.setData({
      search:"",searchList:[]
    })
  },
  search:function(e){
    this.setData({search:e.detail.value})
    console.log(e.detail.value,brandList)
    let arr = brandList.filter(item => item.car_name.indexOf(e.detail.value)!==-1)
    console.log(arr)
    this.setData({searchList:arr})
    if(this.data.search==""){
      this.setData({searchList:[]})
    }
  },
  touchLetter:function(e){
    var ind = parseInt(e.currentTarget.dataset.index);
    var that=this;
    console.log(that.data.letter[ind])
    this.setData({
      toView: that.data.letter[ind]
    })
  },
  touchmoveLetter:function(e){
    var ind = parseInt(e.currentTarget.dataset.index);
    var that=this;
    console.log(that.data.letter[ind])
    this.setData({
      toView: that.data.letter[ind]
    })
  },
  toTop:function(){
    this.setData({
      toTop:0
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