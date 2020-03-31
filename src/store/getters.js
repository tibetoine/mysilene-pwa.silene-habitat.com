import { filter } from 'lodash'
import { removeAccent } from '../shared/helper'

export default {
  lastWeather: state => {
    return state.meteo.lastWeather
  },
  isAuthenticate: state => {
    return state.login.Authenticate
  },
  isAdmin: state => {
    return state.login.isAdmin
  },
  isRH: state => {
    return state.login.isRH
  },
  isManager: state => {
    return state.login.isManager
  },
  filteredNews: state =>
    filter(
      state.news.visibleList,
      aNews => state.news.selectedTypes.indexOf(aNews.type) > -1
    ),
  selectShiftManagerChildren: state => {
    let selectArray = []

    /* Ajout de l'utilisateur courant */
    selectArray.push({ header: 'Moi' })
    if (state.login.currentContact) {
      selectArray.push({
        userId: state.login.currentContact.sAMAccountName,
        avatar: getAvatar(state.login.currentContact),
        name:
          state.login.currentContact.givenName +
          ' ' +
          state.login.currentContact.sn
      })
    }

    let managerDirectChildren = state.shift.managerChildren.directChildren
    let managerIndirectChildren = state.shift.managerChildren.indirectChildren
    if (!managerDirectChildren) {
      return []
    }

    /* Ajout des enfants directs */
    selectArray.push({ header: 'Mes collaborateurs' })
    for (let index = 0; index < managerDirectChildren.length; index++) {
      const element = managerDirectChildren[index]
      selectArray.push({
        userId: element.sAMAccountName,
        avatar: getAvatar(element),
        name: element.prenom + ' ' + element.nom
      })
    }
    /* Ajout des enfants indirects */
    if (managerIndirectChildren && managerIndirectChildren.length > 0) {
      for (let index = 0; index < managerIndirectChildren.length; index++) {
        const element = managerIndirectChildren[index]
        selectArray.push({
          header:
            'Collaborateurs de ' +
            element.owner.prenom +
            ' ' +
            element.owner.nom
        })

        for (let index2 = 0; index2 < element.children.length; index2++) {
          const element2 = element.children[index2]
          selectArray.push({
            userId: element2.sAMAccountName,
            avatar: getAvatar(element2),
            name: element2.prenom + ' ' + element2.nom
          })
        }
      }
    }
    return selectArray
  },
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
      var splitedAuthor = author.split(' ')
      if (splitedAuthor.length === 2) {
        nomDeFamille = splitedAuthor[0]
        prenom = splitedAuthor[1]
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
    return state.contacts.fullList.find(function(contact) {
      // console.log('Recherche de contact avec prenom ' + prenom + ' et nom ' + nomDeFamille)
      if (contact.givenName == null || contact.givenName.length === 0) {
        return false
      }
      if (contact.sn == null || contact.sn.length === 0) {
        return false
      }
      if (
        removeAccent(contact.givenName.toLowerCase()) ===
          removeAccent(prenom) &&
        removeAccent(contact.sn.toLowerCase()) === removeAccent(nomDeFamille)
      ) {
        // console.log('Contact trouvé pour Prénom : ' + prenom + ' et nom de famille : ' + nomDeFamille);
        return true
      } else if (
        removeAccent(contact.givenName.toLowerCase()) ===
          removeAccent(nomDeFamille) &&
        removeAccent(contact.sn.toLowerCase()) === removeAccent(prenom)
      ) {
        // console.log('Contact trouvé pour Prénom : ' + prenom + ' et nom de famille : ' + nomDeFamille);
        return true
      } else {
        return false
      }
    })
  }
}

const getAvatar = contact => {
  if (!contact) return '/static/img/default.jpg'
  return (
    '/static/img/' +
    (contact.thumbnailPhoto
      ? 'ad-photos/' + contact.sAMAccountName
      : 'default') +
    '.jpg'
  )
}
