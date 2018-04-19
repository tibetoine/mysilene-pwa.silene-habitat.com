<template>
  <v-container style="margin-top:50px;">
    <v-layout row>
      <v-flex xs12 md9 offset-md3>
        <template>
          <div class="weather-card">  
            <div class="weather">
              <div class="current">
                <h1 class="location">Saint-Nazaire</h1>

                <div class="row">
                  <div class="col main">
                    <div>{{ date(weather.currently.time * 1000, weather.timezone) }}</div>
                    <div>{{ weather.currently.summary }}</div>
                    <div class="icon-and-temperature">
                      <div class="icon">
                        <WeatherIcon :icon="weather.currently.icon"></WeatherIcon>
                      </div>
                      <div class="temperature">
                        <div>{{ Math.round(weather.currently.temperature) }}</div>
                      </div>
                    </div>
                  </div>

                  <ul class="col details">
                    <li>
                      Pluie: <strong>{{ toPercentage(weather.currently.precipProbability) }}%</strong>
                    </li>
                    <li>
                      Nuages: <strong>{{ toPercentage(weather.currently.cloudCover) }}%</strong>
                    </li>
                    <li>
                      Humidité: <strong>{{ toPercentage(weather.currently.humidity) }}%</strong>
                    </li>
                    <li>
                      Vent: <strong>{{ weather.currently.windSpeed }} km/h</strong>
                    </li>
                    <li>
                      Levé soleil: <strong>{{ timestamp(weather.daily.data[0].sunriseTime * 1000, weather.timezone)}}</strong>
                    </li>
                    <li>
                      Couché soleil: <strong>{{ timestamp(weather.daily.data[0].sunsetTime * 1000, weather.timezone)}}</strong>
                    </li>
                  </ul>
                </div> <!-- end .row -->
              </div>
              <Forecast class="fadeIn"></Forecast>
            </div>
          </div>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import WeatherIcon from '../components/WeatherIcon'
  import Forecast from '../components/Forecast'
  import moment from 'moment'
  import 'moment-timezone'

  moment.locale('fr')

export default {
    name: 'meteo',
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
      date (time, zone) {
        return moment(time).tz(zone).format('dddd  Do MMMM YYYY')
      },
      timestamp (time, zone) {
        return moment(time).tz(zone).format('HH:mm')
      },
      toPercentage (value) {
        return Math.round(value * 100)
      }
    }
  }
</script>

<style lang="scss">
@import '../../scss/_vars.scss';
@import '../../scss/partials/_spinner.scss';

strong {
  font-weight: 500;
}

*, *:before, *:after {
  box-sizing: inherit;
}
svg {
  transition: 0.3s;
  height: 100% !important;
  width: 100% !important;
}

@media(max-width: 550px) {
  justify-content: flex-start;
}
.weather-card {
  background-color: #fbfbfb;
  border-radius: 3px;
  box-shadow: 0px 0px 150px 0px rgba(0,0,0,0.5);
  color: #383842;
  display: flex;
  flex-direction: column;
  margin-top: 10vh;
  max-width: 800px;
  min-height: 510px;
  padding: 32px;
  position: relative;
  width: 100%;
  z-index: 1;

  > * {
    display: flex;
    flex-direction: column;
  }

  @media(max-width: 850px) {
    border-radius: 0;
    margin: 32px;
    max-width: 500px;
    padding: 16px;
  }

  @media(max-width: 550px) {
    box-shadow: none;
    margin: 0;
    max-width: 100%;
    min-height: 100vh;
  }
}
.weather {
  flex: 1;
  margin-top: 16px;
  padding-bottom: 16px;
  position: relative;

  @media(max-width: 850px) {
    padding-bottom: 48px;
  }

  .current,
  .forecast {
    flex: 1;

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    svg {
      height: 100%;
      width: 100%;
    }
  }
}
.loading-or-error {
  align-items: center;
  flex: 1;
  justify-content: center;
  position: relative;

  .spinner {
    margin: -40px auto 0;
  }

  span {
    display: block;
    font-size: 16px;
    height: 16px;
    margin-top: -26px;
    position: absolute;
    text-align: center;
    top: 50%;
    width: 100%;
  }

  &.loading span {
    margin-top: 14px;
  }
}

.current {
  font-size: 20px;

  .row {
    display: flex;

    & + .row {
      padding-top: 16px;
    }

    @media(max-width: 850px) {
      flex-direction: column;
    }

    .col {
      flex: 1;
    }
  }

  .location {
    align-items: baseline;
    display: flex;
    font-size: 32px;
    margin-bottom: 4px;

    div span {
      &::after {
        content: ', '
      }

      &:last-child {
        &::after {
          content: ''
        }
      }
    }

    .weak {
      color: $accentLight;
      font-size: 26px;
      margin-left: 8px;
    }
  }

  .icon-and-temperature {
    display: flex;
    padding-top: 8px;
  }

  .icon {
    height: 64px;
    width: 64px;

    svg {
      fill: $accent;
    }
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
          color: $accentLight;
        }
      }

      &.si {
        .si {
          font-weight: bold;
          pointer-events: none;
        }

        .us {
          color: $accentLight;
        }
      }

      span {
        cursor: pointer;
      }
    }
  }

  .details {
    display: flex;
    flex-wrap: wrap;
    font-size: 15px;
    line-height: 1;
    padding-top: 8px;
    list-style-type:none;
    list-style-position:outside;
    list-style-image:none;

    @media(max-width: 850px) {
      padding-top: 0;
    }

    li {
      margin-top: 0;
      text-align: right;
      width: 50%;

      @media(max-width: 850px) {
        margin-top: 8px;
        text-align: left;
      }
    }
  }
}
</style>
