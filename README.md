# 天气QQ小程序

使用小程序云函数和百度云的 ai 接口做的一个颜值测试小程序。

##### 体验

<img src="https://pcdn.wxiou.cn//20200909102907.png" alt="图片替换文本" width="400" height="400" align="bottom" />


##### 截图
<img src="https://pcdn.wxiou.cn//20200909104541.jpg" alt="图片替换文本" width="180" height="360" align="bottom" /><img src="https://pcdn.wxiou.cn//20200909104608.jpg" alt="图片替换文本" width="180" height="360" align="bottom" /><img src="https://pcdn.wxiou.cn//20200909104626.jpg" alt="图片替换文本" width="180" height="360" align="bottom" />


## 实现过程
内置天气信息接口，根据所选的城市ID调用相应接口得到天气信息，利用小程序云开发，将城市ID存储在数据库中



## 更新日志

#### v0.1
* 2020-07-07 完成基本的功能开发
* 2020-07-08 只能根据IP地址判断用户城市ID

#### v0.2
* 2020-08-26 修改第一版中城市选择器的信息不显示
* 2020-08-26 增加用户自定义城市，城市信息使用云数据库存储


## 开发计划

* 版本还不是很稳定，存在一些BUG
* 接入广告代码



## 安装过程
#### 1、下载源码

#### 2、新建小程序，选择云开发
新建一个目录，新建一个云开发项目，然后它会初始化目录结构，初始化目录后，把下载的源码和新建的项目进行替换，因为直接导入的话可能没有用
![](https://pcdn.wxiou.cn//20200909103336.png)

#### 3、修改配置
点击云开发，新建一个环境，名称随意
![](https://pcdn.wxiou.cn//20200909103506.png)

新建以后可以得到云环境id
![](https://pcdn.wxiou.cn//20200909103543.png)

填入`setting.js`文件的配置里面,有很多处，请都替换，我就懒得截图了
![](https://pcdn.wxiou.cn//20200909103650.png)


点击云数据库，新建一个名为`codes`的集合

![](https://pcdn.wxiou.cn//20200909103810.png)


导入数据库，以`json`的方式导入，`json`文件在`sql`文件夹里面
![](https://pcdn.wxiou.cn//20200909104004.png)



调试小程序，以上步骤没问题，便可正常运行

如有问题，请提issues

## 关于广告

目前的版本没有写广告，有能力的兄弟可以自己写一下!已纳入未来开发计划



## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

### 喜欢项目的请给个Star, 谢谢了！
