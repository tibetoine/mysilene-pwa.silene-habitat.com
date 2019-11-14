export default {
  search: {
    visible: false
  },
  downState: {
    status: false,
    downMessage: null,
    showDialog: false
  },
  login: {
    userId: localStorage.getItem('user-id') || null,
    token: localStorage.getItem('user-token') || '',
    loginDialogVisible: false,
    Authenticate: false,
    isAdmin: false,
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
    text: 'Indisponible pour ce contact',
    groupedContacts: []
  },
  users: {
    search: '',
    usersList: [],
    deletedUserSuccess: false,
    deletedUserError: false
  },
  news: {
    search: '',
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
        value: 'twitter',
        label: 'Twitter'
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
    selectedTypes: [],
    fullList: [],
    filteredList: [],
    visibleList: [],
    pageSize: 8,
    endLoading: false,
    dirty: false
  },
  meteo: {
    lastWeather: null
  }
}
