Page({
  data: {
    weekWeather: [1, 2, 3, 4, 5, 6, 7]
  },
  onLoad() {
    this.getWeekWeather()
  },
  onPullDownRefresh() {
    this.getWeekWeather(() => {
      wx.stopPullDownRefresh()
    })
  },
  getWeekWeather(callback) {
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/forecast',
      data: {
        location: 'shanghai',
        key: '11e895a6b3854f0fb49508eea65df6ca'
      },
      success: res => {
        //console.log(res)
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
    for (let i = 0; i < 3; i++) {
      let dayWeather = result.daily_forecast[i].cond_txt_d + '转' + result.daily_forecast[i].cond_txt_n
      //let date = new Date()
      //date.setDate(date.getDate() + i)
      weekWeather.push({
        day: dayWeather,
        date: result.daily_forecast[i].date,
        temp: `${result.daily_forecast[i].tmp_min}° - ${result.daily_forecast["0"].tmp_max}°`,
        iconPath: '/images/' + result.daily_forecast[i].cond_code_d + '-icon.png'
      })
    }
    weekWeather[0].date = '今天'
    this.setData({
      weekWeather
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ECF7FB'
  })
  }
})