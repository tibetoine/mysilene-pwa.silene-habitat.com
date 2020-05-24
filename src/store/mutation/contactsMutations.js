import Do from '../../const/do'
import { removeAccent } from '../../shared/helper'
/* eslint-disable */
export default {
  [Do.SET_CONTACTS]: (state, contacts) => {
    // Vue.set(contacts, "contacts", contacts);
    state.contacts.filteredList = state.contacts.fullList = contacts
    addContacts(state)
    // console.log('Je groupe Michel ! ')
    state.contacts.groupedContacts = groupBy(
      contacts,
      (contact) => contact.department
    )
    // console.log('Taille :' , state.contacts.groupedContacts)
  },
  [Do.SET_GROUPS]: (state, groups) => {
    state.groups = groups
  },
  [Do.SET_CONTACTS_SEARCH]: (state, search) => {
    state.contacts.search = search
  },

  [Do.SET_CONTACTS_FILTER_SST]: (state, filterSst) => {
    state.contacts.filterSst = filterSst
  },

  [Do.UPDATE_FILTERED_CONTACTS]: (state) => {
    // const s = Date.now()

    const r = state.contacts.fullList.filter((contact) => {
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
          removeAccent(contact.sn)
            .toLowerCase()
            .indexOf(state.contacts.search.toLowerCase()) > -1
        if (contact.givenName != null) {
          isFiltered =
            isFiltered ||
            removeAccent(contact.givenName)
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

    // console.log('filtered', r.length, 'contacts in', Date.now() - s, 'ms')
  },

  [Do.SHOW_MORE_CONTACTS]: (state) => {
    addContacts(state)
  },

  [Do.SHOW_CONTACTS_DIALOG]: (state) => {
    state.contacts.showDialog = true
  },
  [Do.SHOW_CONTACTS_SNACKBAR]: (state, text) => {
    state.contacts.showSnackbar = true
    state.contacts.text = text
  }
}

const groupBy = (list, keyGetter) => {
  const map = new Map()
  list.forEach((item) => {
    if (item == null) return
    var key = keyGetter(item)
    if (key === '' || key == null) {
      return
    }

    const collection = map.get(key)
    if (!collection) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })

  var mapAsc = new Map([...map.entries()].sort())

  return mapAsc
}

const addContacts = (state) => {
  const start = state.contacts.visibleList.length
  const max = Math.min(
    start + state.contacts.pageSize,
    state.contacts.filteredList.length
  )
  for (let i = start; i < max; i++) {
    state.contacts.visibleList.push(state.contacts.filteredList[i])
  }

  // On place un indicateur pour dire que le loading de contacts n'est plus nécessaire
  if (
    state.contacts.fullList.length !== 0 &&
    state.contacts.visibleList.length === state.contacts.fullList.length
  ) {
    // console.log('yep , ??' + state.contacts.visibleList.length + '   - ' + state.contacts.fullList.length)
    state.contacts.endLoading = true
  }
}
