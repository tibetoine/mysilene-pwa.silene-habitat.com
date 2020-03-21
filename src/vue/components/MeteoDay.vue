<template>
  <v-layout column spacer style="margin-bottom:10px;">
    <v-flex>
      <div class="text-xs-center">{{ dayOfWeek(day.time * 1000) }}</div>
    </v-flex>
    <v-flex class="weatherIcon">
      <WeatherIcon class="text-xs-center" :icon="day.icon"></WeatherIcon>
    </v-flex>
    <v-flex>
      <div class="text-xs-center">
        <strong>{{ Math.round(day.temperatureMax) }}°</strong>
      </div>
    </v-flex>
    <v-flex>
      <div class="text-xs-center">{{ Math.round(day.temperatureMin) }}°</div>
    </v-flex>
  </v-layout>
</template>

<script>
  import WeatherIcon from './WeatherIcon'

  export default {
    name: 'meteoday',
    props: ['day'],
    components: {
      WeatherIcon
    },
    data: () => ({
      lorem: `Lorem ipsum dolor sit amet.`
    }),
    computed: {
      store() {
        return this.$store.state
      },
      daily() {
        return this.$store.state.meteo.lastWeather.daily.data
      }
    },
    methods: {
      dayOfWeek(time) {
        var days = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
        return days[new Date(time).getDay()]
      }
    }
  }
</script>

<style>
  .weatherIcon {
    height: 32px;
    margin: 0 auto;
    width: 32px;
  }
</style>
