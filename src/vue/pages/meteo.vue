<template>
  <v-content>
    <div
      id="meteo-centered-card"
      style="max-width: 800px; margin: auto;margin-top:0;margin-bottom:0;" 
    >
      <v-card style="margin-left:10px;margin-right:10px;">        
        <v-container  fluid grid-list-sm style="margin-top:50px;">
          <v-layout row wrap>
            <v-flex xs12 id="dayMeteo">
              <v-layout row wrap>
                <v-flex xs12 sm6 style="padding-left:10px;">
                  <h1 class="meteoLocation">Saint-Nazaire</h1>
                  <div class="meteoDate">{{ date(weather.currently.time * 1000) }}</div>
                  <div class="meteoSummary">{{ weather.currently.summary }}</div>
                  <div class="icon-and-temperature">
                    <div class="meteoIcon">
                      <WeatherIcon :icon="weather.currently.icon"></WeatherIcon>
                    </div>
                    <div class="temperature">
                      <div>{{ Math.round(weather.currently.temperature) }}</div>
                    </div>
                  </div>
                </v-flex>
                <v-flex xs12 sm6 >
                  <v-layout row wrap class="meteoCara">
                      <v-flex xs6 >
                        <v-layout row wrap class="meteoCara2">
                          <v-flex xs7>
                            Pluie: 
                          </v-flex>
                          <v-flex xs5>
                            <strong>{{ toPercentage(weather.currently.precipProbability) }}%</strong>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap class="meteoCara2">
                          <v-flex xs7>
                            Nuages: 
                          </v-flex>
                          <v-flex xs5>
                            <strong>{{ toPercentage(weather.currently.cloudCover) }}%</strong>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap class="meteoCara2">
                          <v-flex xs7>
                            Humidité: 
                          </v-flex>
                          <v-flex xs5>
                            <strong>{{ toPercentage(weather.currently.humidity) }}%</strong>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs6 >
                        <v-layout row wrap class="meteoCara2">
                          <v-flex xs7>
                            Vent
                          </v-flex>
                          <v-flex xs5>
                            <strong>{{ weather.currently.windSpeed }} km/h</strong>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap class="meteoCara2">
                          <v-flex xs7>
                            Levé soleil:
                          </v-flex>
                          <v-flex xs5>
                            <strong>{{ timestamp(weather.daily.data[0].sunriseTime * 1000)}}</strong>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap class="meteoCara2">
                          <v-flex xs7>
                            Couché soleil:
                          </v-flex>
                          <v-flex xs5>
                            <strong>{{ timestamp(weather.daily.data[0].sunsetTime * 1000)}}</strong>
                          </v-flex>
                        </v-layout>
                      </v-flex>                  
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 id="forecastMeteo" style="border-top:1px solid #ccc;padding-top:10px;">
              <Forecast></Forecast>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>
  </v-content>
</template>

<script>
  import WeatherIcon from '../components/WeatherIcon'
  import Forecast from '../components/Forecast'

  export default {
    name: 'meteo',
    data: () => ({
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    }),
    components: {
      WeatherIcon,
      Forecast
    },
    computed: {
      weather () {
        return this.$store.state.meteo.lastWeather
      }
    },

    methods: {
      date (time) {
        var days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
        var months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
        var date = new Date(time)
        var day = days[ date.getDay() ]
        var month = months[ date.getMonth() ]
        var dayInMonth = date.getUTCDate()
        var returnedDate = day + ' ' + dayInMonth + ' ' + month + ' ' + date.getUTCFullYear()
        return returnedDate
      },
      timestamp (time) {
        var date = new Date(time)
        var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
        var hour = (date.getHours() < 10 ? '0' : '') + date.getHours()
        return hour + ' h ' + minutes
      },
      toPercentage (value) {
        return Math.round(value * 100)
      }
    }
  }
</script>

<style lang="scss">

.meteoCara{
  padding-top:20px;
  font-size:14px;
}

.meteoCara2{
  padding-bottom:15px;
  
}
.meteoLocation {
    align-items: baseline;
    display: flex;
    font-size: 36px;
    margin-bottom: 4px;
    color:#004c95;
}

.meteoDate{
  font-size:24px;
}

.meteoSummary {
  padding-top:12px;
  font-size:20px;
}

.meteoIcon {
  height: 64px;
  width: 64px;

  svg {
    fill: #383842;
    height: 100%;
    width: 100%;
  }
}


.icon-and-temperature {
  display: flex;
  padding-top: 8px;
}

.temperature {
  display: flex;
  margin-left: 8px;
  margin-top: -8px;

  div {
    font-size: 64px;
    font-weight: 300;
  }

  sup {
    margin-top: 11px;

    .us {
      padding-right: 4px;
    }

    .si {
      border-left: 1px solid #ddd;
      padding-left: 4px;
    }

    &.us {
      .us {
        font-weight: bold;
        pointer-events: none;
      }

      .si {
        color: #96969f;
      }
    }

    &.si {
      .si {
        font-weight: bold;
        pointer-events: none;
      }

      .us {
        color: #96969f;
      }
    }

    span {
      cursor: pointer;
    }
  }
}
</style>