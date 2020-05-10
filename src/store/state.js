export default {
  access: {
    rolesList: [],
    rolesUsersList: [],
    showDialog: false,
    rolesUsersShowDialog: true,
    rolesUsersShowDialogAdd: false,
    rolesGroupsShowDialogAdd: false,
    newRole: {
      _id: 'NON DEFINI',
      color: 'black',
      description: ''
    },
    currentRole: {
      _id: 'NON DEFINI',
      color: 'black',
      description: ''
    },
    currentAssociationRole: {
      _id: 'NON DEFINI',
      color: 'black',
      description: ''
    },
    currentAssociationRoleIsDirty: false,
    recordCurrentAssociationRole: null
  },
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
    currentContact: null,
    token: localStorage.getItem('user-token') || '',
    loginDialogVisible: false,
    Authenticate: false,
    isAdmin: false,
    AuthFailure: false,
    AuthFailMsg: null,
    loading: false,
    roles: [] // au départ aucun rôles.
  },
  offline: {
    showDialog: false
  },
  lastApiCall: null,
  error: {
    data: null,
    showDialog: false
  },
  shift: {
    currentShiftUser: null,
    data: null,
    showDialog: false,
    showSnackbar: false,
    snackbarColor: 'success',
    snackbarMessage: 'Message à setter',
    currentShift: null,
    allShifts: [],
    managerChildren: []
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
  groups: [],
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
        value: 'docs',
        label: 'Oeuvres Sociales'
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
  },
  snackbar: {
    visible: false,
    color: '',
    message: ''
  }
}
