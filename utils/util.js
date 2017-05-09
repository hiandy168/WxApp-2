function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function toUrlParam(obj) {
  // 将json格式的obj格式化为URL参数
  return Object.keys(obj).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
  }).join('&');
}

function preDate(str_date1, str_date2) {
  // 判断两个日期哪个先，返回先的
  if(Date.parse(str_date1) < Date.parse(str_date2)) {
    return str_date1
  }
  else {
    return str_date2
  }
}

function moreThanXYears(str_date, x) {
// 判断str_date与当前日期是否超过5年
  var date = new Date(Date.parse(str_date))
  var now = new Date()

  var date_year = date.getFullYear()
  var date_month = date.getMonth() + 1
  var date_day = date.getDate()

  var now_year = now.getFullYear()
  var now_month = now.getMonth() + 1
  var now_day = now.getDate()

  if (date_year < now_year - x) {
    return true
  }
  if (date_year > now_year - x) {
    return false
  }
  if (date_month < now_month) {
    return true
  }
  if (date_month > now_month) {
    return false
  }
  if (date_day <= now_month) {
    return true
  }
  return false

}

function nianXian(str_date) {
// 判断str_date与当前日期是否超过5年
  var date = new Date(Date.parse(str_date))
  var now = new Date()

  var date_year = date.getFullYear()
  var date_month = date.getMonth() + 1
  var date_day = date.getDate()

  var now_year = now.getFullYear()
  var now_month = now.getMonth() + 1
  var now_day = now.getDate()

  var x = now_year - date_year - 1

  var m = 12 - date_month - 1 + now_month

  if(now_day >= date_day) {
    m += 1
  }

  if(m >= 6) {
    x += 1
  }

  return x

}

module.exports = {
  formatTime: formatTime,
  toUrlParam: toUrlParam,
  moreThanXYears: moreThanXYears,
  preDate: preDate,
  nianXian: nianXian
}
