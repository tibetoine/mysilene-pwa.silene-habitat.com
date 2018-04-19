import Do from '../../const/do'

export default {

  [Do.SET_CONTACTS]: (state, contacts) => {
    // Vue.set(contacts, "contacts", contacts);
    state.contacts.filteredList = state.contacts.fullList = contacts
    addContacts(state)
  },
  [Do.SET_CONTACTS_SEARCH]: (state, search) => {
    state.contacts.search = search
  },

  [Do.SET_CONTACTS_FILTER_SST]: (state, filterSst) => {
    state.contacts.filterSst = filterSst
  },

  [Do.UPDATE_FILTERED_CONTACTS]: state => {
    const s = Date.now()

    const r = state.contacts.fullList.filter(contact => {
      var isFiltered = false
      if (
        (state.contacts.search === '' || state.contacts.search == null) &&
        !state.contacts.filterSst
      ) {
        /* On ne filtre pas dans ce cas là */
        return true
      }
      if (state.contacts.search !== '' && state.contacts.search != null) {
        isFiltered =
          isFiltered ||
          contact.sn
            .toLowerCase()
            .indexOf(state.contacts.search.toLowerCase()) > -1
        if (contact.givenName != null) {
          isFiltered =
            isFiltered ||
            contact.givenName
              .toLowerCase()
              .indexOf(state.contacts.search.toLowerCase()) > -1
        }
        if (
          state.contacts.search.toLowerCase() === 'sst' &&
          contact.silenesst === '1'
        ) {
          isFiltered = true
        }
      } else {
        if (state.contacts.filterSst && contact.silenesst === '1') {
          isFiltered = true
        }
      }
      return isFiltered
    })
    state.contacts.filteredList = r
    state.contacts.visibleList = []

    console.log('filtered', r.length, 'contacts in', Date.now() - s, 'ms')
  },

  [Do.SHOW_MORE_CONTACTS]: state => {
    addContacts(state)
  }

}

const addContacts = (state) => {
  const s = Date.now()

  const start = state.contacts.visibleList.length
  const max = Math.min(start + state.contacts.pageSize, state.contacts.filteredList.length)
  for (let i = start; i < max; i++) {
    state.contacts.visibleList.push(state.contacts.filteredList[i])
  }

  console.log('contacts', start, 'to', state.contacts.visibleList.length, 'in', Date.now() - s, 'ms')
}
