export default {
  selectedContact: null,
  selectedNew: null,
  contacts: {
    search: '',
    filterSst: false,
    fullList: [],
    filteredList: [],
    visibleList: [],
    pageSize: 15
  },
  news: {
    filterDialogVisible: false,
    types: [
      {
        value: 'actualites',
        label: 'Actualités'
      },
      {
        value: 'flashInfo',
        label: 'Flash infos'
      },
      {
        value: 'mouvementsRH',
        label: 'Mouvements RH'
      },
      {
        value: 'facebook',
        label: 'Facebook'
      },
      {
        value: 'cos-rss',
        label: 'COS'
      },
      {
        value: 'cosActu',
        label: 'COS Actus'
      },
      {
        value: 'cosNews',
        label: 'COS News'
      }
    ],
    selectedTypes: [
      'actualites',
      'flashInfo',
      'facebook',
      'mouvementsRH',
      'cos-rss',
      'cosActu',
      'cosNews'
    ],
    fullList: []
  },
  meteo: {
    lastWeather: null
  }
}
