import Do from '../../const/do'
/* eslint-disable */
export default {

  [Do.SET_DOCS]: (state, docs) => {
    // Vue.set(docs, "docs", docs);
    state.docs.fullList = docs
    state.docs.ceList = docs.filter(doc => {
      return doc.docType === 'doc-ce'
    })
    state.docs.cfdtList = docs.filter(doc=> {
      return doc.docType === 'doc-cfdt'
    })
    state.docs.cgtList = docs.filter(doc=> {
      return doc.docType === 'doc-cgt'
    })
    state.docs.unsaList = docs.filter(doc=> {
      return doc.docType === 'doc-unsa'
    })
    addDocs(state)
  }
}