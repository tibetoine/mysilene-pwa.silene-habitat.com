import Do from '../../const/do'

export default {
  [Do.SET_WEATHER]: (state, weather) => {
    state.meteo.lastWeather = weather
  }

}
