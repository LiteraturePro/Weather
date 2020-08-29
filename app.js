//app.js
var api = require('./libs/api')
App({
  onLaunch: function() {
    //加载天气数据
    this.loadWeatherData();
    
    // 获取用户信息
    this.getUserInfo();
    //...
  },
  onLoad: function () {
    this.loadWeatherData();
  },
  loadWeatherData: function() {
    var citySelected = qq.getStorageSync('citySelected') || [];
    if (citySelected.length == 0) {
      citySelected.unshift("__location__");
      qq.setStorageSync('citySelected', citySelected);
    }

    var that = this
    for (var idx in citySelected) {
      var cityCode = citySelected[idx];
      api.loadWeatherData(cityCode, function (cityCode, data) {
        var weatherData = qq.getStorageSync('weatherData') || {};
        weatherData[cityCode] = data;
        qq.setStorageSync('weatherData', weatherData);
      });
    }
  },

  getUserInfo: function() {
    var that = this
    qq.getUserInfo({
      withCredentials: false,
      success: function (res) {
        that.globalData.userInfo = res.userInfo
      }
    })

  },

  globalData: {
    userInfo: null
  }
})
