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
    toTop:"",search:'',searchList:[],scrolly:true,scrollHev:'800',widheight:'',winwidth:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    brandList=wx.getStorageSync('brandList')
    let arr=[];
    for(let i=0;i<that.data.letter.length;i++){
      let data=brandList.filter(item => item.bfirstletter.indexOf(that.data.letter[i])!==-1)
      console.log(data)
      arr=arr.concat(data)
      that.setData({list:arr})
    }
    var that = this;
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        that.setData({
          widheight: res.windowHeight,
          winwidth:res.windowWidth,
          scrollHev:res.windowHeight-50
        });
      }
    });
  },
  chooseBrand:function(e){
    var ind = parseInt(e.currentTarget.dataset.index);
    this.getModelList(brandList,ind)
  },
  chooseSearchbrand:function(e){
    var ind = parseInt(e.currentTarget.dataset.index);
    this.getModelList(this.data.searchList,ind)
  },
  getModelList:function(arr,ind){
    var that=this;
    wx.showLoading({
      title: '选择中',
    })
    wx.setStorageSync('chooseBrand', arr[ind])
    wx.cloud.callFunction({
      name:'getCollection',
      data:{
        collection:'car_set',
        where:{car_id:arr[ind].auto_home_id},
        ordername:'car_set_firstletter',order:'asc',
        skip:0
      }
    }).then(res=>{
      let data=res.result.data;
      console.log(data)
      wx.setStorageSync('modelList', data)
      wx.hideLoading({
        success: (res) => {},
      })
      wx.navigateBack({
        default:1
      })
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
    console.log(that.data.letter[ind],e)
    this.setData({
      toView: that.data.letter[ind]
    })
  },
  touchmoveLetter:function(e){
    var ind = parseInt(e.currentTarget.dataset.index);
    var that=this;
    var pageY=e.touches[0].pageY;
    let index=parseInt(((pageY-50)/(520*((that.data.winwidth*2)/750)))*26-1);
    console.log(e,pageY,index)
    wx.showToast({
      title: that.data.letter[index],
      icon:'none',
    })
    this.setData({
      toView:that.data.letter[index]
    })
  },
  touchstart:function(){
    
  },
  touchend:function(){
    this.setData({scrolly:true})
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