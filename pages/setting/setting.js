// setting.js
var api = require('../../libs/api')

// 云开发环境
const db = qq.cloud.database({
        env: 'tq-719eeb'
    })

//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    "medicine": "N/A",
    userInfo: {},
    citySelected: {},
    weatherData: {},
    multiConf: [],
    multiSelected: [0, 0, 0],
    chinaCityConf: [],
    chinaCitySelected: [0, 0, 0],
    //
    multiIndex: [0, 0, 0],
    date: '2020-09-01',
    time: '12:01',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    this.setData({
      userInfo: app.globalData.userInfo,
      weatherData: qq.getStorageSync('weatherData'),
      citySelected: qq.getStorageSync('citySelected'),
    })

    this.initChinaCityConf();
    var that =this;
    

    
  },
  
  
  initChinaCityConf: function () {
    var initCityConf = [
      ["province", ""],
      ["city", "01"],
      ["town", "0101"]
    ];
    for (var idx in initCityConf) {
      var level = initCityConf[idx][0]
      var code = initCityConf[idx][1]
      api.loadCityConf(level, code, this.updateChinaCityConfByLevel);
    }
    console.log(initCityConf)
  },

  updateChinaCityConfByLevel: function (level, code, conf) {
    var chinaCityConf = this.data.chinaCityConf
    chinaCityConf[this.getCityLevelIndex(level)] = conf
    this.setData({ chinaCityConf: chinaCityConf });
  },

  cityLevelConf: ["province", "city", "town"],
  getCityLevelIndex: function (level) {
    for (var k in this.cityLevelConf) {
      if (level == this.cityLevelConf[k]) {
        return k;
        break;
      }
    }
    return 0;
  },

  pickerCity: function (e) {
    try {
      var level = this.cityLevelConf[e.detail.column + 1];
      var code = this.data.chinaCityConf[e.detail.column][e.detail.value][1];
      var that = this
      api.loadCityConf(level, code, function (level, code, conf) {
        that.updateChinaCityConfByLevel(level, code, conf);
        if (e.detail.column == 0) {
          level = that.cityLevelConf[e.detail.column + 2]
          code = that.data.chinaCityConf[e.detail.column + 1][0][1]
          api.loadCityConf(level, code, that.updateChinaCityConfByLevel);
        }
      });
    } catch (e) { console.log(e) }
  },

  getDataByPromise: function (coll_name, search_cond) {
    var promise = new Promise((resolve, reject) => {
      var that = this;
      const db = qq .cloud.database({
        env: 'tq-719eeb'
    });

      db.collection(coll_name).where({cityName: search_cond } ).get({
        success: function (res) {
          console.log("in promise info:", res.data)
          resolve(res.data)
        },
        error: function (e) {
          console.log(e)
          reject("查询数据库失败")
        }
      });
    });
    return promise;
  },
  process_data: function(data){
    console.log("in onLoad callback:", this.data)
  },
  getDbData: function (coll_name, search_cond, data_key, cb) {
    const db = qq.cloud.database()
    var that = this;
    var ready_data = {};
    db.collection(coll_name).where(search_cond).get({
      success: function (res) {
        ready_data[data_key] = res.data;
        that.setData(ready_data);
        console.log("查询数据库完成:", that.data, res.data);
        cb(that.data)
      }
    })
  },
 

  getaddCity: function(e){
    console.log(e)
    var Name = this.getCity(e,1);
    var Name2 = this.getCity(e,2);
    console.log(Name)
    console.log(Name2)
    var arr=[];
    var arr2=[];
    for (var i = 0; i < Name.length; i++) {
      if  (Name[i]!= "市"){
          arr[i]=Name[i];
      }
    }
    for (var i = 0; i < Name2.length; i++) {
      if  (Name2[i]!= "区" && Name2[i]!= "县" ){
          arr2[i]=Name2[i];
      }
    }
    console.log(arr2)
    var Rname = arr.join('');
    var Rname2 = arr2.join('');
    console.log("777",Rname2)
    console.log("777",Rname)
    
   if ( Rname != null || Rname2 != null){
     console.log(this.addCity(e,Rname2))
     if( this.addCity(e,Rname2) != 1){
        this.addCity2(e,Rname);
    
  }}

  },

  getCity: function (e,t) {
    this.setData({
      data: e.detail,
    })
    var cityname = this.data.data.value[t]
    return cityname
  },

  addCity: function (e,Name) {
    //var Name = "北京"

    //console.log(this.getCity(e))
    var od =null 
    this.getDataByPromise("codes", Name).then((datas) => { 
    this.setData({
      data: e.detail.value,
      "medicine": datas
    })
    try {
      console.log("in onLoad promise:", this.data)
      var datas = this.data
      console.log(datas.medicine[0].cityCode)
      
      
      //var cityCode = this.data.chinaCityConf[2][e.detail.code[2]][1]
  
      var cityCode = datas.medicine[0].cityCode
      var citySelected = qq.getStorageSync('citySelected') || []

      if (this.data.weatherData['__location__'].realtime.city_code == cityCode) {
        return
      }
      if (citySelected.find(function (item) { return item === cityCode; }) != undefined) {
        return
      }

      var that = this;
      api.loadWeatherData(cityCode, function (cityCode, data) {
        var weatherData = qq.getStorageSync('weatherData') || {};
        weatherData[cityCode] = data;
        qq.setStorageSync('weatherData', weatherData);

        citySelected.push(cityCode);
        qq.setStorageSync('citySelected', citySelected);
        that.setData({
          chinaCitySelected: e.detail.value,
          citySelected: citySelected,
          weatherData: weatherData
        })
      })
      qq.showToast({
        title: '添加成功!',
        icon: 'success',
        mask: false,
        duration: 1500
      })
      od = 1
      
    
    
    }catch (e) { 
      console.log(e) 
      
      // qq.showModal({
      //       title: '标题',
      //       content: '这里是内容',
      //       showCancel: false, //不显示取消按钮
      //       confirmText: '确定'
      //     })
      // qq.showToast({
      // title: '暂时不支持该地区',
      // icon: 'none',
      // mask: false,
      // duration: 2000
      // })
    }
    od = 1
    }) 
    return od
  },
  addCity2: function (e,Name) {
    //var Name = "北京"

    //console.log(this.getCity(e))
    this.getDataByPromise("codes", Name).then((datas) => { 
    this.setData({
      data: e.detail.value,
      "medicine": datas
    })
    try {
      console.log("in onLoad promise:", this.data)
      var datas = this.data
      console.log(datas.medicine[0].cityCode)
      
      
      //var cityCode = this.data.chinaCityConf[2][e.detail.code[2]][1]
  
      var cityCode = datas.medicine[0].cityCode
      var citySelected = qq.getStorageSync('citySelected') || []

      if (this.data.weatherData['__location__'].realtime.city_code == cityCode) {
        return
      }
      if (citySelected.find(function (item) { return item === cityCode; }) != undefined) {
        return
      }

      var that = this;
      api.loadWeatherData(cityCode, function (cityCode, data) {
        var weatherData = qq.getStorageSync('weatherData') || {};
        weatherData[cityCode] = data;
        qq.setStorageSync('weatherData', weatherData);

        citySelected.push(cityCode);
        qq.setStorageSync('citySelected', citySelected);
        that.setData({
          chinaCitySelected: e.detail.value,
          citySelected: citySelected,
          weatherData: weatherData
        })
      })
      qq.showToast({
        title: '添加成功!',
        icon: 'success',
        mask: false,
        duration: 1500
      })

    }catch (e) { 
      console.log(e) 
      
      // qq.showModal({
      //       title: '标题',
      //       content: '这里是内容',
      //       showCancel: false, //不显示取消按钮
      //       confirmText: '确定'
      //     })
       qq.showToast({
       title: '暂时不支持该地区',
       icon: 'none',
       mask: false,
       duration: 1500
       })
    }
    }) 
  },

  removeCity: function (e) {
    try {
      var cityCode = e.currentTarget.dataset.city_code || '';
      if (cityCode == "") {
        return
      }
      var citySelected = qq.getStorageSync('citySelected')
      for (var k in citySelected) {
        if (citySelected[k] == cityCode) {
          citySelected.splice(k, 1)
          break;
        }
      }
      qq.setStorageSync('citySelected', citySelected);
      this.setData({
        citySelected: citySelected,
      })
      qq.showToast({
        title: '删除成功!',
        icon: 'success',
        mask: false,
        duration: 2000
      })
    } catch (e) { 
      qq.showToast({
        title: '删除失败!',
        icon: 'none',
        mask: false,
        duration: 2000
      })
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /// 
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }




})