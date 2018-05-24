import Do from '../../const/do'

export default {
  [Do.TOGGLE_NEWS_FILTER_DIALOG]: (state, visible) => {
    state.news.filterDialogVisible = visible
  },
  [Do.SHOW_NEWS_FILTER_DIALOG]: (state) => {
    state.news.filterDialogVisible = true
  },
  [Do.SET_NEWS]: (state, news) => {
    state.news.filteredList = state.news.fullList = news
    addNews(state)
    state.lastApiCall = new Date()
  },
  [Do.SHOW_MORE_NEWS]: state => {
    addNews(state)
  }

}

const addNews = (state) => {
  const start = state.news.visibleList.length
  const max = Math.min(start + state.news.pageSize, state.news.filteredList.length)
  for (let i = start; i < max; i++) {
    state.news.visibleList.push(state.news.filteredList[i])
  }
  // On place un indicateur pour dire que le loading de news n'est plus nécessaire
  if (state.news.fullList.length !== 0 && (state.news.visibleList.length === state.news.fullList.length)) {
    state.news.endLoading = true
  }
}
