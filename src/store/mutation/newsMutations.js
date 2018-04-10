import Do from '../../const/do'

export default {
  [Do.TOGGLE_NEWS_FILTER_DIALOG]: (state, visible) => {
    state.news.filterDialogVisible = visible
  },
  [Do.SHOW_NEWS_FILTER_DIALOG]: (state) => {
    state.news.filterDialogVisible = true
  },
  [Do.SET_NEWS]: (state, news) => {
    state.news.fullList = news
  }

}
