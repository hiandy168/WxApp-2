// pages/calc/result/result.js
var util = require('../../../utils/util.js')
Page({
  data: {

    params: {},

    seller_taxes: [],
    buyer_taxes: [],

    seller_total: 0,
    buyer_total: 0

  },
  calcZZS_ZZ: function (je) {
    // 计算住宅增值税
    var result = { sz: "增值税" }
    if (util.moreThanXYears(util.preDate(this.data.params.fcz_date, this.data.params.qs_date), 2)) {
      result['se'] = 0
      result['yj'] = "取得房屋已满2年的，免征增值税"
    } else {
      result['se'] = (je * 0.05).toFixed(2)
      result['yj'] = je + " * 0.05 = " + result['se']
    }
    this.data.seller_taxes.push(result)
    this.setData({ seller_taxes: this.data.seller_taxes })
    if (result['se'] > 0) {
      this.calcFZ(result['se'])
    }
  },
  calcZZS_FZZ: function (je) {
    // 计算非住宅增值税
    var result = { sz: "增值税" }
    var fp_je = parseFloat(this.data.params.fp_je)

    result['se'] = (je * 0.05).toFixed(2)
    result['yj'] = je + " * 0.05 = " + result['se']

    this.data.seller_taxes.push(result)
    this.setData({ seller_taxes: this.data.seller_taxes })
    if (result['se'] > 0) {
      this.calcFZ(result['se'])
    }
  },
  calcFZ: function (je) {
    // 计算附征税种
    // 计算城建税
    var result = { sz: "城建税" }
    if (this.data.params.di == 0) {
      result['se'] = (je * 0.07).toFixed(2)
      result['yj'] = je + " * 0.07（市区）= " + result['se']
    } else {
      result['se'] = (je * 0.05).toFixed(2)
      result['yj'] = je + " * 0.05（县城、乡镇）= " + result['se']
    }
    this.data.seller_taxes.push(result)
    this.setData({ seller_taxes: this.data.seller_taxes })
    // 计算教育附加费
    result = { sz: "教育附加费" }
    result['se'] = (je * 0.03).toFixed(2)
    result['yj'] = je + " * 0.03 = " + result['se']
    this.data.seller_taxes.push(result)
    this.setData({ seller_taxes: this.data.seller_taxes })
    // 计算地方教育附加
    result = { sz: "地方教育附加" }
    result['se'] = (je * 0.02).toFixed(2)
    result['yj'] = je + " * 0.02 = " + result['se']
    this.data.seller_taxes.push(result)
    this.setData({ seller_taxes: this.data.seller_taxes })
  },
  calcGRSDS_ZZ: function (je) {
    // 计算住宅个人所得税
    var result = { sz: "个人所得税" }
    var lx_je = this.data.params.lx_je
    var zx_je = this.data.params.zx_je
    var zj_je = this.data.params.zj_je
    var qs_je = this.data.params.qs_je
    var fp_je = this.data.params.fp_je
    if (this.data.params.seller_only == 0 && util.moreThanXYears(util.preDate(this.data.params.fcz_date, this.data.params.qs_date), 5)) {
      result['se'] = 0
      result['yj'] = "卖方唯一住房，且持有房屋满5年的，则免征个人所得税"
    } else if (util.moreThanXYears(util.preDate(this.data.params.fcz_date, this.data.params.qs_date), 2)) {

      result['se'] = ((je - lx_je - zx_je - zj_je - qs_je - fp_je) * 0.2).toFixed(2)
      result['yj'] = "(" + [je, lx_je, zx_je, zj_je, qs_je, fp_je].join("-") + ") * 20% = " + result['se']
    }
    else {

      var jsyj = je - lx_je - zx_je - zj_je - qs_je - fp_je
      var yj = [je, lx_je, zx_je, zj_je, qs_je, fp_je]
      for (var i in this.data.seller_taxes) {
        if (this.data.seller_taxes[i]['sz'] == '增值税') {
          continue
        }
        jsyj -= this.data.seller_taxes[i]['se']
        yj.push(this.data.seller_taxes[i]['se'])
      }
      if (jsyj > 0) {
        result['se'] = (jsyj * 0.2).toFixed(2)
        result['yj'] = "(" + yj.join("-") + ") * 20% = " + result['se']
      }
      else {
        result['se'] = 0
        result['yj'] = "(" + yj.join("-") + ") * 20% < 0 "
      }


    }
    this.data.seller_taxes.push(result)
    this.setData({ seller_taxes: this.data.seller_taxes })
  },
  calcQS_ZZ: function (je) {
    // 计算住宅契税

    var result = { sz: "契税" }

    var buyer_only = this.data.params.buyer_only
    var small_house = this.data.params.small_house

    if (buyer_only == 0 && small_house == 0) {
      result['se'] = (je * 0.01).toFixed(2)
      result['yj'] = je + " * 0.01 = " + result['se']
    } else if (buyer_only == 0 && small_house == 1) {
      result['se'] = (je * 0.015).toFixed(2)
      result['yj'] = je + " * 0.015 = " + result['se']
    } else if (buyer_only == 1 && small_house == 0) {
      result['se'] = (je * 0.01).toFixed(2)
      result['yj'] = je + " * 0.01 = " + result['se']
    } else if (buyer_only == 1 && small_house == 1) {
      result['se'] = (je * 0.02).toFixed(2)
      result['yj'] = je + " * 0.02 = " + result['se']
    } else {
      result['se'] = (je * 0.03).toFixed(2)
      result['yj'] = je + " * 0.03 = " + result['se']
    }

    this.data.buyer_taxes.push(result)
    this.setData({ buyer_taxes: this.data.buyer_taxes })

  },
  calcQS_FZZ: function (je) {
    // 计算非住宅契税

    var result = { sz: "契税" }


    result['se'] = (je * 0.03).toFixed(2)
    result['yj'] = je + " * 0.03 = " + result['se']


    this.data.buyer_taxes.push(result)
    this.setData({ buyer_taxes: this.data.buyer_taxes })

  },

  calcYHS: function (je) {
    // 计算印花税
    var result = { sz: "印花税" }

    result['se'] = (je * 0.0005).toFixed(2)
    result['yj'] = je + " * 0.0005 = " + result['se']

    this.data.seller_taxes.push(result)
    this.setData({ seller_taxes: this.data.seller_taxes })
    this.data.buyer_taxes.push(result)
    this.setData({ buyer_taxes: this.data.buyer_taxes })
  },

  calcTDZZS: function (je) {
    // 计算土地增值税
    var result = { sz: "土地增值税" }
    var nian_xian = util.nianXian(util.preDate(this.data.params.fcz_date, this.data.params.qs_date))
    var qs_je = this.data.params.qs_je
    var fp_je = this.data.params.fp_je

    var yj = [fp_je * (1 + 0.05 * nian_xian), qs_je]

    var zze = fp_je * (1 + 0.05 * nian_xian) - qs_je
    for (var i in this.data.seller_taxes) {
      if (this.data.seller_taxes[i]['sz'] == '增值税') {
        continue
      }
      zze -= this.data.seller_taxes[i]['se']
      yj.push(this.data.seller_taxes[i]['se'])
    }
    zze = zze.toFixed(2)
    result['yj'] = yj.join("-") + " = " + zze + "; "
    var zzl = (je - zze) / zze
    var tdsl = 0.6
    if (zzl <= 0.5) {
      tdsl = 0.3
    } else if (zzl > 0.5 && zzl <= 1) {
      tdsl = 0.4
    } else if (zzl > 1 && zzl <= 2) {
      tdsl = 0.5
    }

    if (je - zze > 0) {
      result['se'] = ((je - zze) * tdsl).toFixed(2)
      result['yj'] += "(" + je + "-" + zze + ") * " + tdsl + " = " + result['se']
    }
    else {
      result['se'] = 0
      result['yj'] = "(" + je + "-" + zze + ") * " + tdsl + " < 0 "
    }

    this.data.seller_taxes.push(result)
    this.setData({ seller_taxes: this.data.seller_taxes })

  },
  calcGRSDS_FZZ: function (je) {
    // 计算非住宅个人所得税
    var result = { sz: "个人所得税" }
    var lx_je = this.data.params.lx_je
    var zx_je = this.data.params.zx_je
    var zj_je = this.data.params.zj_je
    var qs_je = this.data.params.qs_je
    var fp_je = this.data.params.fp_je

    var jsyj = je - lx_je - zx_je - zj_je - qs_je - fp_je
    var yj = [je, lx_je, zx_je, zj_je, qs_je, fp_je]
    for (var i in this.data.seller_taxes) {
      if (this.data.seller_taxes[i]['sz'] == '增值税') {
        continue
      }
      jsyj -= this.data.seller_taxes[i]['se']
      yj.push(this.data.seller_taxes[i]['se'])
    }
    if (jsyj > 0) {
      result['se'] = (jsyj * 0.2).toFixed(2)
      result['yj'] = "(" + yj.join("-") + ") * 20% = " + result['se']
    }
    else {
      result['se'] = 0
      result['yj'] = "(" + yj.join("-") + ") * 20% < 0 "
    }


    this.data.seller_taxes.push(result)
    this.setData({ seller_taxes: this.data.seller_taxes })
  },

  totalCalc: function () {
    // 合计
    var total = 0

    for (var sz in this.data.seller_taxes) {
      total += parseFloat(this.data.seller_taxes[sz]['se'])
    }
    this.setData({ seller_total: total.toFixed(2) })

    total = 0
    for (var sz in this.data.buyer_taxes) {
      total += parseFloat(this.data.buyer_taxes[sz]['se'])
    }

    this.setData({ buyer_total: total.toFixed(2) })



  },

  calcZZ: function (je) {
    // 计算住宅税费
    // 卖方
    this.calcZZS_ZZ(je)
    this.calcGRSDS_ZZ(je)

    // 买方
    this.calcQS_ZZ(je)

    // 合计
    this.totalCalc()
  },


  calcFZZ: function (je) {
    //计算非住宅税费
    // 卖方
    this.calcZZS_FZZ(je)
    this.calcYHS(je)
    this.calcTDZZS(je)
    this.calcGRSDS_FZZ(je)

    // 买方
    this.calcQS_FZZ(je)

    // 合计
    this.totalCalc()
  },


  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    for (var arr in options) {
      console.log(arr + ": " + options[arr]);
    }
    this.setData({ params: options })

    var je = parseFloat(this.data.params.jy_je)
    if (this.data.params.taxed == 1) {
      je = (je / 1.05).toFixed(2)
    }

    if (this.data.params.li == 0) {
      this.calcZZ(je)
    }
    else {
      this.calcFZZ(je)
    }



    console.log(this.data.seller_taxes)
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})