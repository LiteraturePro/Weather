<!--index.wxml-->
<view> 
  <view class="top_city" bindtap="showSettingPage">
    <view class="city_list">
      <view class="city_item city_item_left" >
        {{topCity.left}}
      </view>
      <view class="city_item city_item_center" >
        {{topCity.center}}
      </view>
      <view class="city_item city_item_right" >
        {{topCity.right}}
      </view>
    </view>
  </view>
  
  <swiper class="container" bindchange="updateTopCity" style="background:#42c642;">
    <block qq:for="{{citySelected}}" qq:key="cityIdx" qq:for-item="cityCode">
      <swiper-item>
        <scroll-view class="container" scroll-y="true" scroll-with-animation="true">
          <view class="today" bindtap="showDetailPage" data-city_code="{{ cityCode }}">
            <view class="weather">
              <image class="pic" src="{{ weatherData[cityCode].realtime.weather.pic }}"></image>
              <view class="desc">
                <text>{{weatherData[cityCode].realtime.weather.info}}</text>
                <text>{{weatherData[cityCode].realtime.wind.direct}} {{weatherData[cityCode].realtime.wind.power}}</text>
              </view>
            </view>
            <view class="temperature">
                <text>{{weatherData[cityCode].realtime.weather.temperature}}°</text>
              </view>
            <view class="more">
              <text>湿度 : {{weatherData[cityCode].realtime.weather.humidity}}</text>
              <text>PM2.5 : {{weatherData[cityCode].pm25.pm25.curPm}}</text>
              <text>{{weatherData[cityCode].pm25.pm25.quality}}</text>
            </view>
            <view class='testText' >
              <text>查看详情</text>
              </view>
              <view class='testText2' >
              <text>更多功能开发中……</text>
              </view>
          </view>
          <view class="today-bottom"></view>
         
          <view class="feature">
            <view class="day" qq:for="{{weatherData[cityCode].weather}}" qq:key="dayIdx">
              <view class="date">{{item.shortDate}}</view>
              <view class="date">周{{item.week}}</view>
              <image class="pic" src="{{item.day_pic}}"></image>
              <view class="desc">
                <text>{{item.info.day[1]}}</text>
                <text>{{item.info.day[3]}} {{item.info.day[4]}}</text>
              </view>
              <view class="temperature">
                <text>{{item.info.night[2]}}~{{item.info.day[2]}}°</text>
              </view>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </block>
  </swiper>
</view>
