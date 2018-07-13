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
  docs: {
    fullList: [],
    ceList: [],
    cfdtList: [],
    cgtList: [],
    unsaList: []

  },
  contacts: {
    search: '',
    filterSst: false,
    fullList: [],
    filteredList: [],
    visibleList: [],
    pageSize: 20,
    endLoading: false,
    showDialog: false,
    showSnackbar: false,
    text: 'Indisponible pour ce contact'
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
      },
      {
        value: 'docs',
        label: 'Documents'
      }
    ],
    selectedTypes: [
      'actualites',
      'flashInfo',
      'facebook',
      'mouvementsRH',
      'cos-rss',
      'cosActu',
      'cosNews',
      'docs'
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
