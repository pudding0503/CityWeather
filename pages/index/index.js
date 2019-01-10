// 天气状态代码对应顶部颜色
const weatherColorMap = {
  '100': '#C4EFFF', //晴
  '101': '#DAEFF8', //多云
  '102': '#DAEFF86', //少云
  '103': '#C4EFFF', //晴间多云
  '104': '#C4CED2', //阴
  '200': '#FDD5A2', //有风
  '201': '#FDD5A2', //平静
  '202': '#FDD5A2', //微风
  '203': '#FDD5A2', //和风
  '204': '#FDD5A2', //清风
  '205': '#FDD5A2', //强风/劲风
  '206': '#FDD5A2', //疾风
  '207': '#FDD5A2', //大风
  '208': '#FDC0BF', //烈风
  '209': '#FDC0BF', //风暴
  '210': '#FDC0BF', //狂暴风
  '211': '#FDC0BF', //飓风
  '212': '#FDC0BF', //龙卷风
  '213': '#FDC0BF', //热带风暴
  '300': '#B6D6E2', //阵雨
  '301': '#B6D6E2', //强阵雨
  '302': '#C3CCD0', //雷阵雨
  '303': '#C3CCD0', //强雷阵雨
  '304': '#C3CCD0', //雷阵雨伴有冰雹
  '305': '#B6D6E2', //小雨
  '306': '#B6D6E2', //中雨
  '307': '#B6D6E2', //大雨
  '308': '#C3CCD0', //阵雨
  '309': '#B6D6E2', //毛毛雨/细雨
  '310': '#C3CCD0', //暴雨
  '311': '#C3CCD0', //大暴雨
  '312': '#C3CCD0', //特大暴雨
  '313': '#C3CCD0', //冻雨
  '314': '#B6D6E2', //小到大雨
  '315': '#AFD3E5', //中到大雨
  '316': '#CFBFC9', //大到暴雨
  '317': '#CFBFC9', //暴雨到大暴雨
  '318': '#CFBFC9', //大暴雨到特大暴雨
  '400': '#99E3FF', //小雪
  '401': '#99E3FF', //中雪
  '402': '#99E3FF', //大雪
  '403': '#99E3FF', //暴雪
  '404': '#99E3FF', //雨夹雪
  '405': '#99E3FF', //雨雪天气
  '406': '#99E3FF', //阵雨夹雪
  '407': '#99E3FF', //阵雪
  '408': '#99E3FF', //小到中雪
  '409': '#99E3FF', //中到大雪
  '410': '#99E3FF', //大到暴雪
  '499': '#99E3FF', //雪
  '500': '#C5CCCF', //薄雾
  '501': '#BBBDBE', //雾
  '502': '#657277', //霾
  '503': '#2D0E14', //扬沙
  '504': '#E78A0C', //浮沉
  '507': '#E33205', //沙尘暴
  '508': '#935909', //强沙尘暴
  '509': '#BBBDBE', //浓雾
  '510': '#BBBDBE', //强浓雾
  '511': '#657277', //中度霾
  '512': '#657277', //重度霾
  '513': '#657277', //严重霾
  '514': '#BBBDBE', //大雾
  '515': '#BBBDBE', //特强浓雾
  '900': '#F46267', //热
  '901': '#77B3D4', //冷
  '902': '#8664FF' //未知
}

// 引入腾讯位置SDK
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')

const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2

Page({
  data: {
    nowTemp: '0°',
    nowWeather: '晴',
    nowWeatherBackground: "",
    hourlyWeather: [],
    todayTemp: "",
    todayDate: "",
    city: "上海市",
    locationAuthType: UNPROMPTED
  },
  onLoad() {
    // 腾讯位置SDK请求，申请地址: https://lbs.qq.com/
    this.qqmapsdk = new QQMapWX({
      key: 'MVOBZ-MPDWI-PEVGJ-5RDZT-SSPKZ-JLFSU'
    })
    wx.getSetting({
      success: res=>{
        let auth = res.authSetting['scope.userLocation']
        this.setData({
          locationAuthType: auth ? AUTHORIZED
            : (auth === false) ? UNAUTHORIZED : UNPROMPTED
        })

        if (auth)
          this.getCityAndWeather()
        else
          this.getNow() //使用默认城市上海
      },
      fail: ()=> {
        this.getNow() //使用默认城市上海
      }
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.getNow(() => {
      wx.stopPullDownRefresh()
    })
  },

  // HeWeather Api 当前天气
  getNow(callback) {
    wx.request({
      // HeWeather Api
      url: 'https://free-api.heweather.com/s6/weather/now',
      data: {
        location: this.data.city,
        key: '11e895a6b3854f0fb49508eea65df6ca'
      },
      success: res => {
        let result = res.data.HeWeather6["0"]
        this.setNow(result)
        this.setHourlyWeather(result)
        this.setToday(result)
      },
      complete: ()=>{
        callback && callback()
      }
    })
  },

  // 现在天气预报
  setNow(result){
    let temp = result.now.tmp
    let weather = result.now.cond_txt
    let weatherCode = result.now.cond_code
    this.setData({
      nowTemp: temp + '°',
      nowWeather: weather,
      nowWeatherBackground: '/images/' + weatherCode + '-bg.png'
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap[weatherCode],
    })
  },

  // 小时天气预报
  setHourlyWeather(result){
    let nowHour = new Date().getHours()
    let hourlyWeather = []
    for (let i = 0; i < 8; i += 1) {
      hourlyWeather.push({
        time: (i * 3 + nowHour) % 24 + '时',
        iconPath: '/images/' + result.now.cond_code + '-icon.png',
        temp: result.now.tmp + '°'
      })
    }
    hourlyWeather[0].time = '现在'
    this.setData({
      hourlyWeather: hourlyWeather
    })
  },

  // 最新数据 & 风速
  setToday(result) {
    let date = new Date()
    this.setData({
      todayWind: `${result.now.wind_dir} 风速 ${result.now.wind_spd} km/h`,
      todayDate: `最新: ${result.update.loc}`
    })
  },
  onTapDayWeather() {
    wx.navigateTo({
      // 传递参数到 list
      url: '/pages/list/list?city=' + this.data.city,
    })
  },
  onTapLocation() {
    this.getCityAndWeather()
  },
  getCityAndWeather(){
    wx.getLocation({
      success: res => {
        this.setData({
          locationAuthType: AUTHORIZED,
        })
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res => {
            let city = res.result.address_component.city
            this.setData({
              city: city,
              locationTipsText: ""
            })
            this.getNow()
          },
          fail: res => {
            console.log("城市位置请求失败")
          }
        })
      },
      // 用户拒绝获取位置信息权限
      fail: ()=> {
        this.setData({
          locationAuthType: UNAUTHORIZED,
        })
      }
    })
  },
  // 转发与分享
  onShareAppMessage: function (res) {
    // 来自菜单转发按钮
    console.log("来自菜单转发按钮")
    return {
      title: this.data.city + '当前天气',
      path: '/pages/index/index?city=' + this.data.city
    }
  }
})