Page({
  data: {
    weekWeather: [],
    city: "上海市"
  },
  onLoad(options) {
    this.setData({
      city: options.city
    })
    this.getWeekWeather()
  },
  onPullDownRefresh() {
    this.getWeekWeather(() => {
      wx.stopPullDownRefresh()
    })
  },
  getWeekWeather(callback) {
    wx.request({
      // HeWeather free api
      url: 'https://free-api.heweather.com/s6/weather/forecast',
      data: {
        location: this.data.city,
        key: '11e895a6b3854f0fb49508eea65df6ca'
      },
      success: res => {
        let result = res.data.HeWeather6["0"]
        this.setWeekWeather(result)
      },
      complete: ()=>{
        callback && callback()
      }
    })
  },
  setWeekWeather(result) {
    let weekWeather = []

    // HeWeather free api 只能到三天
    for (let i = 0; i < 3; i++) {
      let dayWeather = result.daily_forecast[i].cond_txt_d + '转' + result.daily_forecast[i].cond_txt_n
      weekWeather.push({
        day: dayWeather,
        date: result.daily_forecast[i].date,
        temp: `${result.daily_forecast[i].tmp_min}° - ${result.daily_forecast["0"].tmp_max}°`,
        iconPath: '/images/' + result.daily_forecast[i].cond_code_d + '-icon.png'
      })
    }
    weekWeather[0].date = '今天'
    weekWeather[1].date = '明天'
    weekWeather[2].date = '后天'
    this.setData({
      weekWeather
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ECF7FB'
  })
  },
  // 转发与分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log("来自页面内转发按钮")
    }
    else {
      // 来自菜单转发按钮
      console.log("来自菜单转发按钮")
    }
    return {
      title: this.data.city + '未来7天天气',
      path: '/pages/list/list?city=' + this.data.city
    }
  }
})