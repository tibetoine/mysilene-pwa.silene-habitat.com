export default {
  selectedContact: null,
  selectedNew: null,
  contacts: {
    search: '',
    filterSst: false,
    fullList: []
  },
  news: {
    filterDialogVisible: false,
    types: [{
      value: 'actualites',
      label: 'Actualités'
    }, {
      value: 'flashInfo',
      label: 'Flash infos'
    }, {
      value: 'mouvementsRH',
      label: 'Mouvements RH'
    }, {
      value: 'facebook',
      label: 'Facebook'
    }],
    selectedTypes: ['actualites', 'flashInfo', 'facebook', 'mouvementsRH'],
    fullList: []
  },
  meteo: {
    lastWeather: null
  }
}
