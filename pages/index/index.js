//index.js
var api = require('../../libs/api')

//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    citySelected: {},
    weatherData: {},
    topCity: {}
  },
  onPullDownRefresh: function () {
    
    var that = this;
    that.onLoad(); //重新加载onLoad()
    that.updateTopCity();
    
  },

  clearStorage: function(){
        var that = this;
        that.setData({
            loading:true,
            disabled:true
        });
        that.update();
        wx.clearStorage({
            success:function(){
                that.setData({
                    loading:false,
                    disabled:false,
                    toast1Hidden:false
                });
                that.update();
            }
        });
    },
  //事件处理函数
  showDetailPage: function(e) {
    try{
      var cityCode = e.currentTarget.dataset.city_code || '';
    } catch(e){}
  
    qq.navigateTo({
      url: '../detail/detail?city_code=' + cityCode
    })
  },
  showSettingPage: function () {
    qq.navigateTo({
      url: '../setting/setting'
    })
  },

  updateTopCity : function(event){
    var citySelected = qq.getStorageSync('citySelected');
    var weatherData = qq.getStorageSync('weatherData');
    var topCity = {
      left: "",
      center: "",
      right: "",
    };

    var current = event.detail.current;
    try { topCity.left = weatherData[citySelected[current-1]].realtime.city_name; } catch (e) { }
    try { topCity.center = weatherData[citySelected[current]].realtime.city_name; } catch (e) { }
    try { topCity.right = weatherData[citySelected[current + 1]].realtime.city_name; } catch (e) { }

    this.setData({
      topCity: topCity,
    })
  },


  onLoad: function () {
     var defaultCityCode = "__location__";
     var citySelected = qq.getStorageSync('citySelected');
     var weatherData = qq.getStorageSync('weatherData');
     if (citySelected.length == 0 || weatherData.length == 0) {
       var that = this
       api.loadWeatherData(defaultCityCode, function (cityCode, data) {
         var weatherData = {}
         weatherData[cityCode] = data;
         that.setHomeData([cityCode], weatherData);
       });
     } else {
      this.setHomeData(citySelected, weatherData);
    }
    qq.stopPullDownRefresh()
    
  },

  onShow:function() {
     var defaultCityCode = "__location__";
     var citySelected = qq.getStorageSync('citySelected');
     var weatherData = qq.getStorageSync('weatherData');
     if (citySelected.length == 0 || weatherData.length == 0) {
       var that = this
       api.loadWeatherData(defaultCityCode, function (cityCode, data) {
         var weatherData = {}
         weatherData[cityCode] = data;
         that.setHomeData([cityCode], weatherData);
       });
     } else {
       this.setHomeData(citySelected, weatherData);
    }

    var citySelected = qq.getStorageSync('citySelected');
    this.setData({
      citySelected: citySelected,
    })
    var that = this;
    that.onLoad();




  },

  setHomeData: function (citySelected, weatherData) {
    var topCity = {
      left: "",
      center: "",
      right: "",
    }
    try { topCity.center = weatherData[citySelected[0]].realtime.city_name; } catch (e) { }
    try { topCity.right = weatherData[citySelected[1]].realtime.city_name; } catch (e) { }

    this.setData({
      userInfo: app.globalData.userInfo,
      weatherData: weatherData,
      topCity: topCity,
      citySelected: citySelected,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
