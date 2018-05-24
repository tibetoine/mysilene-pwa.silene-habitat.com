export default {
  login: {
    userId: localStorage.getItem('user-id') || null,
    token: localStorage.getItem('user-token') || '',
    loginDialogVisible: false,
    Authenticate: false,
    AuthFailure: false,
    AuthFailMsg: null,
    loading: false
  },
  offline: {
    showDialog: false
  },
  lastApiCall: null,
  error: {
    data: null,
    showDialog: false
  },
  selectedContact: null,
  selectedNew: null,
  contacts: {
    search: '',
    filterSst: false,
    fullList: [],
    filteredList: [],
    visibleList: [],
    pageSize: 15,
    endLoading: false
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
    fullList: [],
    filteredList: [],
    visibleList: [],
    pageSize: 8,
    endLoading: false
  },
  meteo: {
    lastWeather: null
  }
}
