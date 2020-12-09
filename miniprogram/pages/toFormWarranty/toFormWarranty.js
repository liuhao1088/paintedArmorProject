const db = wx.cloud.database();
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 头部信息
    item: {
      title: '质保录入信息',
      msg: '漆面装甲，高端汽车漆面保护膜'
    },

    //年份
    index: 0,
    array: [],
    dateArray: [],
    //品牌
    brandIndex: 0,
    brandArray: ['劳斯莱斯', '宝马', '保时捷', '宾利'],
    objectBrandArray: [{
        id: 0,
        name: '劳斯莱斯'
      },
      {
        id: 1,
        name: '宝马'
      },
      {
        id: 2,
        name: '保时捷'
      },
      {
        id: 3,
        name: '宾利'
      }
    ],
    //车型
    modelIndex: 0,
    modelArray: ['a16', 'b52', 'c86', 'y85'],
    objectModelArray: [{
        id: 0,
        name: 'a16'
      },
      {
        id: 1,
        name: 'b52'
      },
      {
        id: 2,
        name: 'c86'
      },
      {
        id: 3,
        name: 'y85'
      }
    ],
    imgUrl: [], //验收单
    imgUrl2: [],
    imgUrl3: [],
    imgUrl4: [],
    year: '',
    name: '',
    mobile: '',
    number_plate: '',
    code: '',
    vin: '',
    shop: '',
    brand: '劳斯莱斯',
    model: 'a16',imgBg:['','','','']
  },
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputMobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  inputNumberplate: function (e) {
    this.setData({
      number_plate: e.detail.value
    })
  },
  inputCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  inputVin: function (e) {
    this.setData({
      vin: e.detail.value
    })
  },
  inputShop: function (e) {
    this.setData({
      shop: e.detail.value
    })
  },
  // 年份
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      year: e.detail.value
    })
  },
  // 品牌
  bindBrandChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      brandIndex: e.detail.value,
      brand: e.detail.value
    })
  },
  // 车型
  bindModelChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      modelIndex: e.detail.value,
      model: e.detail.value
    })
  },

  //上传图片
  insertImage() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        let imgBg=that.data.imgBg;
        imgBg[0]='white'
        that.setData({
          imgUrl: res.tempFilePaths,
          imgBg:imgBg
        })
      }
    })
  },
  insertImage2() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        let imgBg=that.data.imgBg;
        imgBg[1]='white'
        that.setData({
          imgUrl2: res.tempFilePaths,imgBg:imgBg
        })
      }
    })
  },
  insertImage3() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        let imgBg=that.data.imgBg;
        imgBg[2]='white'
        that.setData({
          imgUrl3: res.tempFilePaths,imgBg:imgBg
        })
      }
    })
  },
  insertImage4() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        let imgBg=that.data.imgBg;
        imgBg[3]='white'
        that.setData({
          imgUrl4: res.tempFilePaths,imgBg:imgBg
        })
      }
    })
  },
  toDetails(evevt) {
    wx.navigateTo({
      url: '../../pages/details/details',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取系统年份
    let year = util.year(new Date());
    this.setData({
      year: year
    })
  },
  //提交
  async submit() {
    var that = this;
    if (that.data.name !== "" && that.data.mobile !== "" && that.data.number_plate !== "" && that.data.code !== "" && that.data.shop !== "") {
      wx.showLoading({
        title: '提交中，请稍等',
      })
      wx.cloud.database().collection('warranty').where({
        number_plate: that.data.number_plate
      }).get().then(async res => {
        if (res.data.length !== 0) {
          wx.showModal({
            showCancel: false,
            title: '该车辆的质保信息已经录入过',
            content: '请勿重复提交'
          })
          wx.hideLoading({
            success: (res) => {},
          })
        } else {
          let checkArr = []
          let buildArr = []
          if (that.data.imgUrl !== []) await that.uploadimg(0, that.data.imgUrl, 'check', checkArr)
          if (that.data.imgUrl2 !== []) await that.uploadimg(0, that.data.imgUrl2, 'build', buildArr)
          if (that.data.imgUrl3 !== []) await that.uploadimg(0, that.data.imgUrl3, 'build', buildArr)
          if (that.data.imgUrl4 !== []) await that.uploadimg(0, that.data.imgUrl4, 'build', buildArr)
          that.add(checkArr, buildArr);
        }
      })
    } else {
      wx.showModal({
        showCancel: false,
        title: '请填写完整内容'
      })
    }

  },
  //上传图片到云存储
  uploadimg: function (i, parse, content, arr) {
    if(parse.length == 0) return;
    return new Promise((resolve, reject) => {
      var that = this;
      let code = that.getRandomCode();
      let numberCode = "";
      for (let e = 0; e < 6; e++) {
        numberCode += Math.floor(Math.random() * 10)
      }
      let path=parse[i] 
      let indx=path.lastIndexOf('.') 
      let postfix=path.substring(indx)
      wx.cloud.uploadFile({
        cloudPath: content + '/' + content + '-' + code + "-" + numberCode + postfix,
        filePath: parse[i],
        success(res) {
          //上传成功后会返回永久地址
          console.log(res.fileID)
          arr.push(res.fileID)
          resolve(arr);
          //that.uploadimg(i+1,parse,content,arr)
        }
      })

    })
  },
  add: function (fileUrl, fileUrl2) {
    var that = this;
    const creation_date = util.formatTime(new Date())
    console.log(that.data.name)
    wx.cloud.callFunction({
      name: "collectionAdd", //
      data: {
        collection: 'warranty', //集合名称
        addData: {
          creation_date: creation_date,
          name: that.data.name,
          mobile: that.data.mobile,
          number_plate: that.data.number_plate,
          code: that.data.code,
          vin: that.data.vin,
          shop: that.data.shop,
          year: that.data.year,
          brand: that.data.brand,
          model: that.data.model,
          creation_timestamp: Date.parse(creation_date.replace(/-/g, '/')) / 1000,
          check_img: fileUrl,
          build_img: fileUrl2
        },

      }
    }).then(res => {
      console.log('更新数据库成功', res)
      wx.hideLoading({
        success: (res) => {},
      })
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 0,
        })
      }, 2000)
    }).catch(error => {
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