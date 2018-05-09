/**
 * Author : Arobert
 * Permet de définir les mutations globales à l'application. (Framework buisness)
 */
import Do from '../../const/do'
/* eslint-disable */
export default {

  /* Permet d'enregistrer une erreur dans une partie cachée de l'app */
  [Do.LOG_ERROR_ON_CLIENT]: (state, error) => {
    state.error.data = error    
  },
  [Do.SHOW_ERROR_DIALOG]: (state) => {
    console.log("state.error.showDialog = true  ")
    state.error.showDialog = true    
  }
}
