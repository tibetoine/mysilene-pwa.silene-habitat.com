
<template>
  <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-layout row wrap>
          <template v-for="(day, index) in daily" v-if="index<=3">
            <v-flex :key="day.time" d-flex>
              <meteo-day :day="day"></meteo-day>
            </v-flex>
          </template>          
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6>
        <v-layout row wrap>
          <template v-for="(day, index) in daily" v-if="index>3">
            <v-flex :key="day.time" d-flex>
              <meteo-day :day="day"></meteo-day>
            </v-flex>
          </template> 
        </v-layout>
      </v-flex>
  </v-layout>  
</template>

<script>
import MeteoDay from './MeteoDay'

export default {
  name: 'forecast2',
  components: {
    MeteoDay
  },
  computed: {
    daily () {
      return this.$store.state.meteo.lastWeather.daily.data
    }
  },
  methods: {
    dayOfWeek (time) {
      var days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
      return days[ new Date(time).getDay() ]
    }
  }
}
</script>
