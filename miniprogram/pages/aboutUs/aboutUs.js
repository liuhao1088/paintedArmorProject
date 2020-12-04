// pages/aboutUs/aboutUs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      title: '漆面装甲',
      msg: '漆面装甲，高端汽车漆面保护膜'
    },
    navId: 0,
    patentList: [{
        imgUrl: 'https://img11.360buyimg.com/ddimg/jfs/t1/143930/28/16581/3347/5fc86172Ecd3027c2/a079682c16c4de4e.jpg',
        text: '抗划痕聚氨酯膜'
      },
      {
        imgUrl: 'https://img13.360buyimg.com/ddimg/jfs/t1/152435/38/8219/7786/5fc862deE53a2bbd8/9699091463d172b4.jpg',
        text: '抗划痕漆面保护膜'
      },
      {
        imgUrl: 'https://img12.360buyimg.com/ddimg/jfs/t1/150932/18/8985/8488/5fc862ebE4eda2b7f/1100a5452971de9b.jpg',
        text: '抗断胶汽车保护膜'
      },
      {
        imgUrl: 'https://img13.360buyimg.com/ddimg/jfs/t1/138511/38/16842/5167/5fc862fdE24cb8374/129f344aaeb657b0.jpg',
        text: '聚氨酯膜的表面改性剂'
      }, {
        imgUrl: 'https://img11.360buyimg.com/ddimg/jfs/t1/133296/8/18420/6921/5fc86316E9676043a/753f0f7ed2584f0e.jpg',
        text: '抗断胶抗划痕漆面保护膜'
      }
    ],
    insuranceList: [{
        insuranceUrl: 'https://img11.360buyimg.com/ddimg/jfs/t1/143930/28/16581/3347/5fc86172Ecd3027c2/a079682c16c4de4e.jpg',
        insuranceText: '产品质量保险',
        insuranceContent: '产品已委托专业保险公司参与质保，在相关质保期内，因产品质量问题而造成车辆或第三方财产损失，均由保险公司进行赔偿！'
      },
      {
        insuranceUrl: 'https://img13.360buyimg.com/ddimg/jfs/t1/152435/38/8219/7786/5fc862deE53a2bbd8/9699091463d172b4.jpg',
        insuranceText: '商业保险',
        insuranceContent: '产品内含漆面膜商业险，投保成功后，一年之内，投保车辆发生意外事故后，符合保险理赔标准，保险公司和漆面装甲品牌商负责赔付受损部位所需漆面膜！（可延保）'
      },
      {
        insuranceUrl: 'https://img12.360buyimg.com/ddimg/jfs/t1/150932/18/8985/8488/5fc862ebE4eda2b7f/1100a5452971de9b.jpg',
        insuranceText: '电子质保',
        insuranceContent: '施工后，可上传电子质保，车主、销售方、品牌商三方查询，信息清晰明确，售后无忧！'
      },
    ],
    codeUrl: 'https://ae04.alicdn.com/kf/H320184699f6b4b16a88969d4fa0a9a73G.jpg', //二维码
    height: '100%',
    windowHeight:''
  },
  changNav(event) {
    let navId = event.currentTarget.dataset.id;
    let windowHeight = this.data.windowHeight;
    console.log(windowHeight)
    if (navId === '1') {
      this.setData({
        height: 'auto'
      })
    } else if (navId === '2') {
      if(windowHeight > 700){
        this.setData({
          height: '100%'
        })
      }else{
        this.setData({
          height: 'auto'
        })
      }
    } else if (navId === '3') {
      if(windowHeight > 700){
        this.setData({
          height: '100%'
        })
      }else{
        this.setData({
          height: 'auto'
        })
      }
    }
    this.setData({
      navId,
    })
  },
  //保存图片，扫码
  previewImg: function (e) {
    console.log(e);
    wx.previewImage({
      urls: this.data.codeUrl.split(',') //所有要预览的图片的地址集合 数组形式,使用split把字符串转数组
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      windowHeight
    })
   

    let navId = options.index;
    console.log(navId)
    this.setData({
      navId
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