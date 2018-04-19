export default {
  selectedContact: null,
  selectedNew: null,
  contacts: {
    search: '',
    filterSst: false,
    fullList: [],
    filteredList: [],
    visibleList: [],
    pageSize : 15
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
  }
}
