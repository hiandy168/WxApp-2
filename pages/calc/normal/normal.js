
var util = require('../../../utils/util.js')
Page({
  data: {

    districtIndex: 0,
    livingIndex: 0,

    radioDistrictItems: [
      { name: '市区（浈江、武江、曲江区）', value: '0', checked: true },
      { name: '县城或乡镇', value: '1' }
    ],
    radioLivingItems: [
      { name: '住宅', value: '0', checked: true },
      { name: '非住宅', value: '1' }
    ],

  },

  radioDistrictChange: function (e) {
    console.log('districtIndex发生change事件，携带值为：', e.detail.value);

    this.setData({ districtIndex: e.detail.value });

    var radioDistrictItems = this.data.radioDistrictItems;
    for (var i = 0, len = radioDistrictItems.length; i < len; ++i) {
      radioDistrictItems[i].checked = radioDistrictItems[i].value == e.detail.value;
    }

    this.setData({
      radioDistrictItems: radioDistrictItems
    });
  },
  radioLivingChange: function (e) {
    console.log('livingIndex发生change事件，携带值为：', e.detail.value);

    this.setData({ livingIndex: e.detail.value });

    var radioLivingItems = this.data.radioLivingItems;
    for (var i = 0, len = radioLivingItems.length; i < len; ++i) {
      radioLivingItems[i].checked = radioLivingItems[i].value == e.detail.value;
    }

    this.setData({
      radioLivingItems: radioLivingItems
    });
  },

  calc_next: function () {

    var urlparam = util.toUrlParam({
      di: this.data.districtIndex,
      li: this.data.livingIndex
    });
    if (this.data.livingIndex == 0) {
      wx.navigateTo({
        url: "../living/living?"+urlparam
      })
    } else if (this.data.livingIndex == 1) {
      wx.navigateTo({
        url: "../noliving/noliving?"+urlparam
      })
    }
  }
});