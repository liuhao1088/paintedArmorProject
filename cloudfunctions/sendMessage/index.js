// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  
  
  await cloud.openapi.customerServiceMessage.send({
    touser: event.openid,
    msgtype: 'text',
    text: {
      content: '收到消息',
    },
  })

  return 'success'
}