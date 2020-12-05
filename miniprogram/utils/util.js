function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
 
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
 
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function nowTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-');
} 
function year(date) {
  var year = date.getFullYear()
  
  return year;
} 
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}




module.exports = {
  formatTime: formatTime,
  nowTime:nowTime,
  year:year
}