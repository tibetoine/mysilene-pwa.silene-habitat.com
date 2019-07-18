import Do from '../../const/do'
/* eslint-disable */
export default {

  [Do.SET_PREFS]: (state, prefs) => {
    console.log('Préférences enregistrés en state', prefs)
    /* Enregistre les préférences de l'utilisateurs en terme de selection de news */
    state.news.selectedTypes = prefs


  }
}