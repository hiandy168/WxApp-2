// pages/calc/living/living.js
var util = require('../../../utils/util.js')
Page({
  data: {

    paramKeys: ["di", "li", "fcz_date", "qs_date",
      "qs_je", "seller_only", "buyer_only", "small_house", "jy_je", "taxed", "sgs"],

    step: "下一步",
    url: "../living2/living2",

    fcz_date: "2016-09-01",
    qs_date: "2016-09-01",
    seller_one: 0,
    sgs: 0,

    di: 0,
    li: 0,
    radioDistrictItems: [
      { name: '市区', value: '0', checked: true },
      { name: '县城或乡镇', value: '1' }
    ],

    radioSellerItems: [
      { name: '是', value: '0', checked: true },
      { name: '不是', value: '1' }
    ],
    radioBuyerItems: [
      { name: '是唯一住房', value: '0', checked: true },
      { name: '是第二套', value: '1' },
      { name: '是第三套', value: '2' }
    ],
    radioSizeItems: [
      { name: '小于或等于90平方米', value: '0', checked: true },
      { name: '大于90平方米', value: '1' }
    ],
    radioTaxedItems: [
      { name: '转让包税费', value: '0', checked: true },
      { name: '转让不包税费', value: '1' }
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
    if (this.data.seller_one == 0 && util.moreThanXYears(util.preDate(this.data.qs_date, e.detail.value), 5)) {
      this.setData({ step: "完成", url: "../result/result" })
    } else {
      this.setData({ step: "下一步", url: "../living2/living2" })
    }
    this.setData({
      fcz_date: e.detail.value
    })
  },
  bindQsDateChange: function (e) {
    // 选择了取得契税完税证的日期
    if (this.data.seller_one == 0 && util.moreThanXYears(util.preDate(this.data.fcz_date, e.detail.value), 5)) {
      this.setData({ step: "完成", url: "../result/result" })
    } else {
      this.setData({ step: "下一步", url: "../living2/living2" })
    }

    this.setData({
      qs_date: e.detail.value
    })
  },
  radioSellerChange: function (e) {
    // 选择了是否卖家唯一住房

    if (e.detail.value == 0 && util.moreThanXYears(util.preDate(this.data.fcz_date, this.data.qs_date), 5)) {
      this.setData({ step: "完成", url: "../result/result" })
    } else {
      this.setData({ step: "下一步", url: "../living2/living2" })
    }

    var radioSellerItems = this.data.radioSellerItems;
    for (var i = 0, len = radioSellerItems.length; i < len; ++i) {
      radioSellerItems[i].checked = radioSellerItems[i].value == e.detail.value;
    }

    this.setData({
      radioSellerItems: radioSellerItems,
      seller_one: e.detail.value
    });
  },
  radioBuyerChange: function (e) {
    console.log('Buyer Radio发生change事件，携带value值为：', e.detail.value);

    var radioBuyerItems = this.data.radioBuyerItems;
    for (var i = 0, len = radioBuyerItems.length; i < len; ++i) {
      radioBuyerItems[i].checked = radioBuyerItems[i].value == e.detail.value;
    }

    this.setData({
      radioBuyerItems: radioBuyerItems
    });
  },
  radioSizeChange: function (e) {
    console.log('Size Radio发生change事件，携带value值为：', e.detail.value);

    var radioSizeItems = this.data.radioSizeItems;
    for (var i = 0, len = radioSizeItems.length; i < len; ++i) {
      radioSizeItems[i].checked = radioSizeItems[i].value == e.detail.value;
    }

    this.setData({
      radioSizeItems: radioSizeItems
    });
  },
  radioTaxedChange: function (e) {
    console.log('Taxed Radio发生change事件，携带value值为：', e.detail.value);

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
    for (var arr in this.data.paramKeys) {
      params[this.data.paramKeys[arr]] = this.data[this.data.paramKeys[arr]];
    }

    for (var arr in e.detail.value) {
      params[arr] = e.detail.value[arr];
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