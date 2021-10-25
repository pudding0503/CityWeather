![City Weather Banner ZH](http://img.nousbuild.top/cityweather/github/cityweather-github-banner-zh.jpg) 

<p align="center">
  <img src="https://img.shields.io/github/v/release/windmill0503/CityWeather?label=version" />
  <a href="https://github.com/windmill0503/CityWeather/blob/master/LICENSE">
  	<img alt="License" src="https://img.shields.io/github/license/windmill0503/CityWeather.svg" />
  </a>
  <a href="https://github.com/windmill0503/CityWeather/issues">
  	<img alt="Issues" src="https://img.shields.io/github/issues/windmill0503/CityWeather?color=F48D73" />
  </a>
</p>

## 城市天气微信小程序

一个简约风格的世界主要城市的天气查询小程序。

#### 如何使用 ?

1. 获取某个分支的代码文件到本地，保留根文件夹 `CityWeather`；
2. 打开微信开发工具，点击 `+` 添加跟文件夹于小程序中；
3. 本代码限制了 AppID 的值，可在项目中修改 `project.config.json` 文件添加 AppID；
4. 本例天气API使用有和风天气提供的免费API，每天免费1000次请求，如遇到获取 `json` 数据错误，请次日再来尝试，亦或是使用自己的天气API；
5. 本例中位置API使用腾讯位置服务SDK，可在 [此处](https://lbs.qq.com/) 注册。

#### 特点

当你运行此小程序时，你能够获得以下特性：

- 略去配置城市步骤，直接获取地址查看你所在城市的天气状况；
- 能够获取当前的风向和风速；
- 能够查看未来24小时的天气及气温变化；
- 能够查看未来7天的天气变化及气温变化。

#### 成品

由于小程序测试Key的限制，有些依赖云端的功能并为放入，以免报错。但是你可以使用微信或QQ扫描相应的小程序码，查看完整的小程序。

![City Weather Screenshot](http://img.nousbuild.top/cityweather/github/cityweather-github-banner.jpg)

#### 许可

[Apache-2.0 License](https://github.com/windmill0503/CityWeather/blob/master/LICENSE)
