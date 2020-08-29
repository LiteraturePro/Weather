<!--detail.wxml-->
<view> 
  <view class="top_city">
    <view class="city_list">
      <view class="city_item" >
        {{topCity.left}}
      </view>
      <view class="city_item city_item_center" >
        {{topCity.center}}
      </view>
      <view class="city_item" >
        {{topCity.right}}
      </view>
    </view>
  </view>
  
  <scroll-view class="container" scroll-y="true" scroll-with-animation="true">
    <view class="today">
      <view class="more date">
        <text>今天是 {{weatherInfo.weather[0].date}}，周{{weatherInfo.weather[0].week}}，农历 {{weatherInfo.weather[0].nongli}} </text>
      </view>
      <view class="day-night">
        <view class="weather">
          <text class="day-desc">白天</text>
          <image class="pic" src="{{weatherInfo.weather[0].day_pic}}"></image>
          <view class="desc">
            <text>最高 {{weatherInfo.weather[0].info.day[2]}}°</text>
            <text>{{weatherInfo.weather[0].info.day[3]}} {{weatherInfo.weather[0].info.day[4]}}</text>
          </view>
        </view>
        <view class="weather split"></view>
        <view class="weather">
          <view class="desc" style="align-items:flex-end;">
            <text>{{weatherInfo.weather[0].info.night[2]}}°最低</text>
            <text>{{weatherInfo.weather[0].info.night[4]}} {{weatherInfo.weather[0].info.night[3]}} </text>
          </view>
          <image class="pic" src="{{weatherInfo.weather[0].night_pic}}"></image>
          <text class="day-desc">夜间</text>
        </view>
      </view>
      <!-- <view class="temperature">
        <text>{{weatherInfo.weather[0].info.night[2]}} ~ {{weatherInfo.weather[0].info.day[2]}}°</text>
      </view> -->
      <view class="more">
        <text>日出：{{weatherInfo.weather[0].info.day[5]}}</text>
        <text>日落：{{weatherInfo.weather[0].info.night[5]}}</text>
      </view>
      <view class="more">
        <text>{{weatherInfo.pm25.pm25.des}}</text>
        <text> </text>
      </view>
    </view>
    <view class="today-bottom"></view>
    <view class="card-list">
      <view class="card life">
        <view class="title">生活指数</view>
        <view class="item" qq:for="{{weatherInfo.life.conf}}" qq:key="lifeIdx">
          <view class="line">
            <image class="pic" src="{{item.pic}}"></image>
            <view class="name">{{item.name}}：</view>
            <view class="desc">{{weatherInfo.life.info[item.key][0]}}</view>
          </view>
        </view>
      </view>
      <!--       
      <view class="card temperature">
        <view class="title">24小时温度</view>
        <view>
        <canvas canvas-id="lineTemperature" disable-scroll="true" class="canvas"></canvas>
        </view>
      </view>
      <view class="card life">
        <view class="title">降水量</view>
        <view>
        </view>
      </view>
      -->

    </view>
  </scroll-view>
</view>

