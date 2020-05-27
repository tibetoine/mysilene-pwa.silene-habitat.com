import Do from '../../const/do'

export default {
  [Do.SET_INTERESSEMENT_CONFIG]: (state, interessementConfig) => {
    state.interessement.configInteressement = interessementConfig
  },
  [Do.SET_INTERESSEMENT_USER]: (state, interessementUser) => {
    state.interessement.interessementUser = interessementUser
  },
  [Do.SET_INTERESSEMENT_ET_CONTACTS]: (state, interessementsEtContacts) => {
    state.interessement.interessementsEtContacts = interessementsEtContacts
  },
  [Do.SET_INTERESSEMENT_ETAPE]: (state, etapeNumber) => {
    state.interessement.etape = etapeNumber
  },
  [Do.CLOSE_INTERESSEMENTS]: (state, closed) => {
    state.interessement.configInteressement.closed = closed
  },
  [Do.UPDATE_INTERESSEMENT_USER_FONDS]: (state, data) => {
    let index = data.index
    let fondValue = data.value
    let cloneFonds = JSON.parse(
      JSON.stringify(state.interessement.interessementUser.choix.pee.fonds)
    )

    cloneFonds[index].percent = fondValue

    state.interessement.interessementUser.choix.pee.fonds = cloneFonds

    /* state.interessement.interessementUser.choix.pee.fonds = [
      {
        index_du_fond: 1,
        nom_du_fond: 'SOREA MONETAIRE',
        numero_du_fond: 'A1',
        percent: '99'
      },
      {
        index_du_fond: 2,
        nom_du_fond: 'SOREA Actions Euro',
        numero_du_fond: 'B1',
        percent: '98'
      },
      {
        index_du_fond: 3,
        nom_du_fond: 'SOREA Obligations',
        numero_du_fond: 'C1',
        percent: '97'
      },
      {
        index_du_fond: 4,
        nom_du_fond: 'SOREA Dynamique Solidaire',
        numero_du_fond: 'D1',
        percent: '96'
      },
      {
        index_du_fond: 5,
        nom_du_fond: 'SOREA Croissance',
        numero_du_fond: 'E1',
        percent: '95'
      }
    ] */
  },
  [Do.RESET_INTERESSEMENT_USER_FONDS]: (state) => {
    let cloneFonds = JSON.parse(
      JSON.stringify(state.interessement.interessementUser.choix.pee.fonds)
    )

    cloneFonds.forEach((cloneFond) => {
      cloneFond.percent = 0
    })

    state.interessement.interessementUser.choix.pee.fonds = cloneFonds
  }
}
