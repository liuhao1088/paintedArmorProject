// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const $ = db.command.aggregate;
const _=db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    //
    return await db.collection('coupon')
    .aggregate().match({end_timestamp:_.gte(event.stamp)}).match(_.or(event.or).and(event.and)).match({coupon_name:{
      $regex:'.*'+ event.search,
      $options: 'i'
    }}).lookup({
      from: 'received_coupon',
      let: {
        id: '$_id',
      },
      pipeline: $.pipeline()
        .match(_.expr($.and([
          $.eq(['$coupon_id', '$$id']),
          $.eq(['$_openid', event.openid]),
        ])))
        .project({_id:0})
        .done(),
      as: 'my'
    }).lookup({
      from: 'business',
      localField: 'business_id',
      foreignField: '_id',
      as: 'business',
    }).sort(event.sort).skip(event.skip).limit(event.limit)
    .end().then(res=>{
      console.log(res)
      return res
    })
     
  } catch (e) {
    console.error(e)
  }
 
}
