// pages/calc/living2/living2.js
var util = require('../../../utils/util.js')
Page({
  data: {

    paramKeys : ["di", "li", "fcz_date", "qs_date",
    "qs_je", "seller_only", "buyer_only", "small_house", "jy_je", "taxed",
    "fp_date", "fp_je", "lx_je", "zx_je", "zj_je", "sgs"],
    
    fp_date: "2016-09-01",
    step: "完成",
    url: "../result/result",
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    for (var arr in options) {
      console.log(arr + ": " + options[arr]);
    }
    this.setData(options);
  },
  bindFpDateChange: function (e) {
    this.setData({
      fp_date: e.detail.value
    })
  },
  livingNext: function (e) {

    var params = {}
    for (var arr in this.data.paramKeys){
      params[this.data.paramKeys[arr]] = this.data[this.data.paramKeys[arr]];
    }

    for (var arr in e.detail.value) {
      params[arr] = e.detail.value[arr]?e.detail.value[arr]:"0";
    }

    console.log(params);

    var urlparam = util.toUrlParam(params);
    wx.navigateTo({
      url: this.data.url + "?" + urlparam
    })
  },
  onReady: function () {
    // 页面渲染完成
    this.setData({sgs: 1})

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