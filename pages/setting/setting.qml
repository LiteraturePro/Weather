<!--setting.wxml-->
<view> 
  <scroll-view class="container" scroll-y="true" scroll-with-animation="true">
    <view class="city-selected">
      <view class="item" qq:for="{{citySelected}}" qq:key="dayIdx" qq:for-item="cityCode">
        <view class="name">{{weatherData[cityCode].realtime.city_name}}</view>
        <image class="pic" src="{{ weatherData[cityCode].realtime.weather.pic }}"></image>
        <view class="desc" >
          <text>{{weatherData[cityCode].realtime.weather.info}}</text>
          <text>{{weatherData[cityCode].realtime.wind.direct}} {{weatherData[cityCode].realtime.wind.power}}</text>
        </view>
        <view class="temperature">
          <text>{{weatherData[cityCode].realtime.weather.temperature}}°</text>
        </view>
        <view class="remove"><icon type="cancel" size="15"  bindtap="removeCity"  data-city_code="{{ cityCode }}" /></view>
      </view>

      <picker mode="region" 
            bindchange="getaddCity" bindcolumnchange="pickerCity" 
            value="{{chinaCitySelected}}" range="{{chinaCityConf}}" range-key="0">
    <view class="item add" >
          <text>+ 添加城市</text>
      </view> 

    </picker>
   <view class="testText" >
          <text>\n说明：为保证数据准确,城市最多不要超过5个,添加成功后可到首页左滑查看</text>
      </view> 
    </view>
    
    
    </scroll-view> 
      
    
    
</view>

  


