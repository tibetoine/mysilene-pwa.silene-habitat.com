import Do from '../../const/do'

export default {

  [Do.SET_CONTACTS]: (state, contacts) => {
    // Vue.set(contacts, "contacts", contacts);
    state.contacts.fullList = contacts
    // state.contacts = contacts;
  },
  [Do.SET_CONTACTS_SEARCH]: (state, search) => {
    state.contacts.search = search
  },

  [Do.SET_CONTACTS_FILTER_SST]: (state, filterSst) => {
    state.contacts.filterSst = filterSst
  }

}
