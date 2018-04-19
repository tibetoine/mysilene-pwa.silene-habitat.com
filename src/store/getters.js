import {filter, isNil} from 'lodash'

export default {
  filteredNews: state =>
    filter(
      state.news.fullList,
      news => state.news.selectedTypes.indexOf(news.type) > -1
    ),
  searchContact: state => author => {
    var nomDeFamille = null
    var prenom = null
    if (author == null || author === '') {
      // console.warn('Pas d'auteur donc je retourne false');
      return null
    }
    /* Extraction du nom  */
    var rx = /[A-Z]{1}[A-Z]+/g
    var nomResults = author.match(rx)
    if (nomResults == null || nomResults.length === 0) {
      // console.warn('Aucun contact trouvé --> Return null');
      return null
    }
    if (nomResults.length === 1) {
      nomDeFamille = nomResults[0]
    } else {
      nomDeFamille = nomResults[0] + ' ' + nomResults[1]
    }

    /* Extraction du prénom  */
    var rx2 = /[A-Za-z]{1}[a-z]+/g
    var prenomResults = author.match(rx2)

    if (prenomResults == null || prenomResults.length === 0) {
      return null
    }
    if (prenomResults.length === 1) {
      prenom = prenomResults[0]
    } else {
      prenom = prenomResults[0] + ' ' + prenomResults[1]
    }
    // console.log('Recherche de contact ');
    return state.contacts.fullList.find(function (contact) {
      // console.log('Recherche de contact avec prenom ' + prenom + ' et nom ' + nomDeFamille);
      if (contact.givenName === prenom && contact.sn === nomDeFamille) {
        // console.log('Contact trouvé pour Prénom : ' + prenom + ' et nom de famille : ' + nomDeFamille);
        return true
      } else {
        // if (contact.givenName == 'MOYON') console.log('Contact non trouvé pour Prénom : ' + prenom + ' et nom de famille : ' + nomDeFamille + ' avec Contact : givenName ' + contact.givenName + ' sn : ' + contact.sn);
        return false
      }
    })
  }
}
