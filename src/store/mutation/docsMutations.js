import Do from '../../const/do'
/* eslint-disable */
export default {

  [Do.SET_DOCS]: (state, docs) => {
    // Vue.set(docs, "docs", docs);
    state.docs.fullList = docs
    addDocs(state)
  }
}