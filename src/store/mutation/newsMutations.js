import Do from '../../const/do'
import { removeAccent } from '../../shared/helper'

export default {
  [Do.TOGGLE_NEWS_FILTER_DIALOG]: (state, visible) => {
    state.news.filterDialogVisible = visible
  },
  [Do.SHOW_NEWS_FILTER_DIALOG]: state => {
    state.news.filterDialogVisible = true
  },
  [Do.SET_NEWS]: (state, news) => {
    state.news.filteredList = state.news.fullList = news
    addNews(state)
    state.lastApiCall = new Date()
  },
  [Do.SET_NEWS_SEARCH]: (state, search) => {
    state.news.search = search
  },
  [Do.SHOW_MORE_NEWS]: state => {
    addNews(state)
  },
  [Do.UPDATE_FILTERED_NEWS]: state => {
    const listeDeResultats = state.news.fullList.filter(news => {
      var isFiltered = false
      if (state.news.search === '' || state.news.search == null) {
        /* On ne filtre pas dans ce cas là */
        return true
      }
      if (state.news.search !== '' && state.news.search != null) {
        // console.log(news)
        /* Recherche auteur */
        if (news.author != null) {
          isFiltered =
            isFiltered ||
            removeAccent(news.author)
              .toLowerCase()
              .indexOf(state.news.search.toLowerCase()) > -1
        }

        /* Recherche titre */
        if (news.title != null) {
          isFiltered =
            isFiltered ||
            removeAccent(news.title)
              .toLowerCase()
              .indexOf(state.news.search.toLowerCase()) > -1
        }

        /* Recherche type */
        if (news.type != null) {
          isFiltered =
            isFiltered ||
            removeAccent(news.type)
              .toLowerCase()
              .indexOf(state.news.search.toLowerCase()) > -1
        }

        /* Recherche résumé (attention aux perfs) */
        if (news.resume != null) {
          isFiltered =
            isFiltered ||
            removeAccent(news.resume)
              .toLowerCase()
              .indexOf(state.news.search.toLowerCase()) > -1
        }

        /* Recherche contenu (attention aux perfs) */
        if (news.content != null) {
          isFiltered =
            isFiltered ||
            removeAccent(news.content)
              .toLowerCase()
              .indexOf(state.news.search.toLowerCase()) > -1
        }
      }
      // console.log(isFiltered)
      return isFiltered
    })
    state.news.filteredList = listeDeResultats
    state.news.visibleList = []

    // console.log('filtered', r.length, 'news in', Date.now() - s, 'ms')
  }
}

const addNews = state => {
  const start = state.news.visibleList.length
  const max = Math.min(
    start + state.news.pageSize,
    state.news.filteredList.length
  )
  for (let i = start; i < max; i++) {
    state.news.visibleList.push(state.news.filteredList[i])
  }
  // On place un indicateur pour dire que le loading de news n'est plus nécessaire
  if (
    state.news.fullList.length !== 0 &&
    state.news.visibleList.length === state.news.fullList.length
  ) {
    state.news.endLoading = true
  }
}
