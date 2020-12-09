// miniprogram/pages/manage/car/edit.js
var util = require('../../../utils/util.js');
var nowdate = util.nowTime(new Date());
let fileUrl = [];
let fileUrl2 = [];
var editData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    number_plate: '',
    code: '',
    vin: '',
    shop: '',
    year: '',
    brand: '',
    model: '',
    name: '',
    tempFilePaths: [],
    tempFilePaths2: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    editData = wx.getStorageSync('editData')
    this.setData({
      name: editData.name,
      mobile: editData.mobile,
      number_plate: editData.number_plate,
      code: editData.code,
      vin: editData.vin,
      shop: editData.shop,
      year: editData.year,
      brand: editData.brand,
      model: editData.model,
      tempFilePaths: editData.check_img,
      tempFilePaths2: editData.build_img,
    })
  },
  datechange: function (e) {
    this.setData({
      year: e.detail.value
    })
  },

  inputname: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  inputMobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  inputNumberPlate: function (e) {
    this.setData({
      number_plate: e.detail.value
    })
  },
  inputCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  inputShop: function (e) {
    this.setData({
      shop: e.detail.value
    })
  },
  inputModel: function (e) {
    this.setData({
      model: e.detail.value
    })
  },
  inputVin: function (e) {
    this.setData({
      vin: e.detail.value
    })
  },
  inputBrand: function (e) {
    this.setData({
      brand: e.detail.value
    })
  },
  addImage: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res.tempFilePaths)
        that.setData({
          tempFilePaths: tempFilePaths
        })
      }
    })

  },
  addImage2: function () {
    var that = this
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res.tempFilePaths)
        that.setData({
          tempFilePaths2: tempFilePaths
        })
      }
    })

  },
  //提交
  async submit() {
    var that = this;
    if (that.data.name !== "" && that.data.mobile !== "") {
      wx.showLoading({
        title: '提交中，请稍等',
      })
      var that = this;
      wx.cloud.deleteFile({
        fileList: editData.build_img,
        success: res => {
          // handle success
          console.log(res.fileList)
        },
        fail: err => {
          // handle error
        },
        complete: res => {
          // ...
        }
      })
      wx.cloud.deleteFile({
        fileList: editData.check_img,
        success: res => {
          // handle success
          console.log(res.fileList)
        },
        fail: err => {
          // handle error
        },
        complete: res => {
          // ...
        }
      })
      if (that.data.tempFilePaths.length == 0) {
        if (that.data.tempFilePaths2.length == 0) {
          that.update();
        } else {
          for (let i = 0; i < that.data.tempFilePaths2.length; i++) {
            await that.uploadimg(i, that.data.tempFilePaths2, 'build', fileUrl2)
            if (i + 1 == that.data.tempFilePaths2.length) {
              console.log(fileUrl2)
              that.update();
            }
          }
        }
      }
      if (that.data.tempFilePaths.length > 0) {
        if (that.data.tempFilePaths2.length == 0) {
          await that.uploadimg(0, that.data.tempFilePaths, 'check', fileUrl)
          console.log(fileUrl)
          that.update();
        }
        if (that.data.tempFilePaths2.length > 0) {
          await that.uploadimg(0, that.data.tempFilePaths, 'check', fileUrl)
          console.log(fileUrl)
          for (let i = 0; i < that.data.tempFilePaths2.length; i++) {
            await that.uploadimg(i, that.data.tempFilePaths2, 'build', fileUrl2)
            if (i + 1 == that.data.tempFilePaths2.length) {
              console.log(fileUrl2)
              that.update();
            }
          }
        }
      }



    } else {
      wx.showModal({
        showCancel: false,
        title: '请填写完整内容'
      })
    }

  },
  //上传图片到云存储
  uploadimg: function (i, parse, content, arr) {
    //if(i == parse.length) return;
    return new Promise((resolve, reject) => {
      var that = this;
      let code = that.getRandomCode();
      let numberCode = "";
      for (let e = 0; e < 6; e++) {
        numberCode += Math.floor(Math.random() * 10)
      }
      wx.cloud.uploadFile({
        cloudPath: content + '/' + content + '-' + code + "-" + numberCode + '.jpg',
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
  update: function () {
    var that = this;

    wx.cloud.callFunction({
      name: "collectionUpdate", //
      data: {
        collection: 'warranty', //集合名称
        where: {
          _id: editData._id
        },
        updateData: {
          name: that.data.name,
          mobile: that.data.mobile,
          number_plate: that.data.number_plate,
          code: that.data.code,
          vin: that.data.vin,
          shop: that.data.shop,
          year: that.data.year,
          brand: that.data.brand,
          model: that.data.model,
          check_img: fileUrl,
          build_img: fileUrl2
        },

      }
    }).then(res => {
      fileUrl = [];
      fileUrl2 = []
      console.log('更新数据库成功', res)
      wx.hideLoading({
        success: (res) => {},
      })
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
      wx.setStorageSync('refresh', true)
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
        title: '保存失败，请重试'
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