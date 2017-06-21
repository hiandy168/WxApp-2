// pages/calc/living/living.js
var util = require('../../../utils/util.js')
Page({
  data: {

    paramKeys : ["di", "li", "fcz_date", "qs_date",
    "qs_je", "jy_je", "taxed",
    "fp_date", "fp_je", "lx_je", "zx_je", "zj_je"],
    
    step: "计税",
    url: "../result/result",

    fcz_date: "2016-09-01",
    qs_date: "2016-09-01",
    fp_date: "2016-09-01",

    di: 0,
    li: 1,
    radioDistrictItems: [
      { name: '市区', value: '0', checked: true },
      { name: '县城或乡镇', value: '1' }
    ],

    radioSizeItems: [
      { name: '小于或等于90平方米', value: '0', checked: true },
      { name: '大于90平方米', value: '1' }
    ],
    radioTaxedItems: [
      { name: '包', value: '0', checked: true },
      { name: '不包', value: '1' }
    ],
  },
  radioDistrictChange: function (e) {
    console.log('di发生change事件，携带值为：', e.detail.value);

    this.setData({ di: e.detail.value });

    var radioDistrictItems = this.data.radioDistrictItems;
    for (var i = 0, len = radioDistrictItems.length; i < len; ++i) {
      radioDistrictItems[i].checked = radioDistrictItems[i].value == e.detail.value;
    }

    this.setData({
      radioDistrictItems: radioDistrictItems
    });
  },
  bindFczDateChange: function (e) {
    this.setData({
      fcz_date: e.detail.value
    })
  },
  bindQsDateChange: function (e) {
    this.setData({
      qs_date: e.detail.value
    })
  },
  bindFpDateChange: function (e) {
    this.setData({
      fp_date: e.detail.value
    })
  },

  radioSizeChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioSizeItems = this.data.radioSizeItems;
    for (var i = 0, len = radioSizeItems.length; i < len; ++i) {
      radioSizeItems[i].checked = radioSizeItems[i].value == e.detail.value;
    }

    this.setData({
      radioSizeItems: radioSizeItems
    });
  },
  radioTaxedChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioTaxedItems = this.data.radioTaxedItems;
    for (var i = 0, len = radioTaxedItems.length; i < len; ++i) {
      radioTaxedItems[i].checked = radioTaxedItems[i].value == e.detail.value;
    }

    this.setData({
      radioTaxedItems: radioTaxedItems
    });
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
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    for (var arr in options) {
      console.log(arr + ": " + options[arr]);
    }
    this.setData(options);
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