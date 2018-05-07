import {filter} from 'lodash'

export default {
  lastWeather: state => {
    return state.meteo.lastWeather
  },
  filteredNews: state =>
    filter(
      state.news.fullList,
      news => state.news.selectedTypes.indexOf(news.type) > -1
    ),
  searchContact: state => author => {
    var nomDeFamille = null
    var prenom = null
    // console.log(author)
    if (author == null || author === '') {
      // console.warn('Pas d'auteur donc je retourne false');
      return null
    }
    /* Extraction du nom  */
    var rx = /[A-Z]{1}[A-Z]+/g

    var nomResults = author.match(rx)
    if (nomResults == null || nomResults.length === 0) {
      var splitedAuthor = author.split(' ')
      if (splitedAuthor.length === 2) {
        nomDeFamille = splitedAuthor[0]
        prenom = splitedAuthor[1]
        // console.log('FLAG : ' + nomDeFamille + ' sdf : ' + prenom)
      } else {
        return false
      }
    } else {
      if (nomResults.length === 1) {
        nomDeFamille = nomResults[0]
      } else {
        nomDeFamille = nomResults[0] + ' ' + nomResults[1]
      }

      /* Extraction du prénom  */
      var rx2 = /[A-Za-z]{1}[a-zà-ú]+/g
      var prenomResults = author.match(rx2)

      if (prenomResults == null || prenomResults.length === 0) {
        return null
      }
      if (prenomResults.length === 1) {
        prenom = prenomResults[0]
      } else {
        prenom = prenomResults[0] + ' ' + prenomResults[1]
      }
    }

    prenom = prenom.toLowerCase()
    nomDeFamille = nomDeFamille.toLowerCase()

    // console.log('Recherche de contact ');
    return state.contacts.fullList.find(function (contact) {
      // console.log('Recherche de contact avec prenom ' + prenom + ' et nom ' + nomDeFamille)
      if (contact.givenName == null || contact.givenName.length === 0) {
        return false
      }
      if (contact.sn == null || contact.sn.length === 0) {
        return false
      }
      if (contact.givenName.toLowerCase() === prenom && contact.sn.toLowerCase() === nomDeFamille) {
        // console.log('Contact trouvé pour Prénom : ' + prenom + ' et nom de famille : ' + nomDeFamille);
        return true
      } else if (contact.givenName.toLowerCase() === nomDeFamille && contact.sn.toLowerCase() === prenom) {
        // console.log('Contact trouvé pour Prénom : ' + prenom + ' et nom de famille : ' + nomDeFamille);
        return true
      } else {
        // if (contact.givenName == 'MOYON') console.log('Contact non trouvé pour Prénom : ' + prenom + ' et nom de famille : ' + nomDeFamille + ' avec Contact : givenName ' + contact.givenName + ' sn : ' + contact.sn);
        return false
      }
    })
  }
}
