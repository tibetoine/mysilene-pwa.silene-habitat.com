<template>
  <div style="width:100%;height:100%;">
    <WeatherIconClearDay v-if="icon === 'clear-day'"></WeatherIconClearDay>
    <WeatherIconClearNight v-if="icon === 'clear-night'"></WeatherIconClearNight>
    <WeatherIconCloudy v-if="icon === 'cloudy'"></WeatherIconCloudy>
    <WeatherIconPartlyCloudyDay v-if="icon === 'partly-cloudy-day'"></WeatherIconPartlyCloudyDay>
    <WeatherIconPartlyCloudyNight v-if="icon === 'partly-cloudy-night'"></WeatherIconPartlyCloudyNight>
    <WeatherIconRain v-if="icon === 'rain'"></WeatherIconRain>
    <WeatherIconSleet v-if="icon === 'sleet'"></WeatherIconSleet>
    <WeatherIconSnow v-if="icon === 'snow'"></WeatherIconSnow>
    <WeatherIconWind v-if="icon === 'wind'"></WeatherIconWind>
  </div>
</template>

<script>
  import WeatherIconClearDay from '../../assets/img/weather/clear_day.svg'
  import WeatherIconClearNight from '../../assets/img/weather/clear_night.svg'
  import WeatherIconCloudy from '../../assets/img/weather/cloudy.svg'
  import WeatherIconPartlyCloudyDay from '../../assets/img/weather/partly_cloudy_day.svg'
  import WeatherIconPartlyCloudyNight from '../../assets/img/weather/partly_cloudy_night.svg'
  import WeatherIconRain from '../../assets/img/weather/rain.svg'
  import WeatherIconSleet from '../../assets/img/weather/sleet.svg'
  import WeatherIconSnow from '../../assets/img/weather/snow.svg'
  import WeatherIconWind from '../../assets/img/weather/wind.svg'

  export default {
    name: 'weatherIcon',
    props: ['icon'],
    components: {
      WeatherIconClearDay,
      WeatherIconClearNight,
      WeatherIconCloudy,
      WeatherIconPartlyCloudyDay,
      WeatherIconPartlyCloudyNight,
      WeatherIconRain,
      WeatherIconSleet,
      WeatherIconSnow,
      WeatherIconWind
    }
  }
</script>
