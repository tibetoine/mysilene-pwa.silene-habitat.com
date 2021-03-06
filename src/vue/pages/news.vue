<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout row>
        <v-flex xs12 md6>
          <div v-if="isDown">
            <v-alert :value="true" type="warning">
              Le serveur semble avoir des problèmes. Nous vous invitons à
              réessayer dans quelques minutes.
            </v-alert>
          </div>
          <div v-else>
            <div v-if="!auth">
              <v-alert :value="true" type="info" icon="lock">
                Vous devez être connecté pour accéder aux News Silène
              </v-alert>
            </div>
            <div v-else-if="news == null || news.length <= 0">
              <v-alert :value="true" type="info">
                Chargement des actualités en cours ...
              </v-alert>
            </div>

            <v-list
              id="newsListVList"
              two-line
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="endLoading"
              infinite-scroll-distance="10"
              infinite-scroll-throttle-delay="50"
            >
              <!-- Barre de recherche -->
              <v-toolbar id="tempid" v-if="isSearchVisible">
                <v-text-field
                  hide-details
                  label="Rechercher .."
                  prepend-icon="search"
                  single-line
                  v-model="search"
                ></v-text-field>
              </v-toolbar>

              <template v-for="aNews in news">
                <v-card
                  style="margin:20px 10px 20px 10px;"
                  v-bind:key="aNews._id"
                >
                  <v-card-title
                    :style="'background-color:' + getFontColor(aNews) + ';'"
                  >
                    <v-avatar size="36px" slot="activator">
                      <img
                        :src="findAvatar(aNews.author)"
                        :alt="'avatar_' + aNews.author"
                      />
                    </v-avatar>
                    <span
                      :title="aNews.author"
                      style="padding-left:10px;color:white;"
                      >{{
                        aNews.author
                          ? chrinkAuthor(aNews.author)
                          : 'Auteur Inconnu'
                      }}</span
                    >
                  </v-card-title>
                  <clazy-load :src="imgsrc(aNews)">
                    <v-img
                      height="200px"
                      :src="imgsrc(aNews)"
                      :class="getClass(aNews)"
                    >
                      <v-container fill-height fluid style="padding:2px;">
                        <v-layout align-end justify-start>
                          <v-flex xs2 d-flex align-end pa-2>
                            <v-chip
                              label
                              :color="getColor(aNews)"
                              text-color="white"
                            >
                              <v-avatar>
                                <v-icon>{{ getIcon(aNews) }}</v-icon>
                              </v-avatar>
                              {{ getTypeLabel(aNews) }}
                            </v-chip>
                          </v-flex>
                        </v-layout>
                        <v-layout justify-end>
                          <v-flex
                            xs6
                            sm3
                            md2
                            justify-end
                            style="margin-top:10px;margin-right:10px;"
                          >
                            <v-avatar :class="getColor(aNews)">
                              <p
                                style="margin:0;padding:0 0 0 1px;text-align:center;line-height:1.1em;"
                              >
                                <span
                                  class="white--text"
                                  style="padding:0;margin:0;font-size:1.5em;padding-left:2px;"
                                  >{{ getDay(aNews) }}</span
                                >
                                <br />
                                <span
                                  class="white--text"
                                  style="padding:0;margin:0;"
                                  >{{ getMonth(aNews) }}</span
                                >
                              </p>
                            </v-avatar>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                    <div class="preloader" slot="placeholder">
                      <v-progress-linear
                        :color="getColor(aNews)"
                        :indeterminate="true"
                      ></v-progress-linear>
                    </div>
                  </clazy-load>
                  <v-card-title
                    @click.prevent="goToNews(aNews, aNews._id)"
                    style="cursor:pointer;"
                  >
                    <div>
                      <span
                        class="headline"
                        :style="'color:' + getFontColor(aNews) + ';'"
                        >{{ getNewsTitle(aNews) }}</span
                      >
                    </div>
                  </v-card-title>
                  <v-card-title
                    @click.prevent="goToNews(aNews, aNews._id)"
                    :color="getColor(aNews)"
                    style="padding-top:0px;cursor:pointer;"
                  >
                    <div>
                      <span
                        v-if="aNews.type !== 'cos-rss'"
                        :color="getColor(aNews)"
                        >{{ getNewsResume(aNews) }}</span
                      >
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
                      flat
                      color="blue"
                      @click.prevent="goToNews(aNews, aNews._id)"
                      >Lire la suite >
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
              <v-progress-linear
                :indeterminate="true"
                v-if="busy"
              ></v-progress-linear>
            </v-list>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn
      fab
      bottom
      right
      color="orange"
      dark
      fixed
      @click.stop="showNewsFilterDialog"
    >
      <v-icon>filter_list</v-icon>
    </v-btn>

    <filter-news-dialog />
  </v-content>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import { debounce } from 'lodash'
  import { removeAccent } from '../../shared/helper'
  import Do from '../../const/do'
  import On from '../../const/on'
  import FilterNewsDialog from '../dialogs/FilterNewsDialog'

  export default {
    components: { FilterNewsDialog },
    name: 'news',
    data: () => ({
      busy: false
    }),
    computed: {
      ...mapState({
        selectedNews: state => state.selectedNews,
        visibleNews: state => state.news.visibleList,
        auth: state => state.login.Authenticate,
        isDown: state => state.downState.status
      }),
      ...mapGetters({ news: 'filteredNews' }),
      selectedNews: {
        get: function() {
          return this.$store.state.selectedNews
        },
        set: function(value) {
          this.$store.state.selectedNews = value
        }
      },
      endLoading: {
        get: function() {
          // console.log('this.busy : ' + this.busy + ' - this.$store.state.news.endLoading : ' + this.$store.state.news.endLoading)
          return this.busy || this.$store.state.news.endLoading
        },
        set: function(value) {
          this.$store.state.news.endLoading = value
        }
      },
      search: {
        get: function() {
          return this.$store.state.news.search
        },
        set: function(value) {
          this.setSearch(value)
        }
      },
      isSearchVisible: {
        get: function() {
          return this.$store.state.search.visible === false
        }
      }
    },
    methods: {
      ...mapActions({
        filterChanged: On.UPDATE_FILTERED_NEWS
      }),
      ...mapMutations({
        showNewsFilterDialog: Do.SHOW_NEWS_FILTER_DIALOG,
        showMore: Do.SHOW_MORE_NEWS
      }),
      setSearch: debounce(function(value) {
        value = removeAccent(value)
        this.$store.state.news.search = value
        this.filterChanged()
      }, 300),
      setSearchVisible: function(value) {
        this.$store.state.search.visible = value
      },
      goToNews: function(news, newsId) {
        if (
          news.type.startsWith('cos') ||
          news.type === 'docs' ||
          news.type === 'twitter'
        ) {
          window.location = news.link
          return false
        } else {
          // console.log('News : ' + news + ' newsId : ' + newsId)
          this.$store.state.selectedNews = news
          // this.$router.push({ path: 'newsModal', params: { newsId }})
          // this.$router.push({ name: 'newsModal', params: { newsId }})
          this.$router.push({ path: `/news/${newsId}` })
        }
      },

      loadMore: function() {
        // console.log('load more news...')
        this.busy = true
        this.showMore()
        setTimeout(() => {
          this.busy = false
        }, 1000)
      },
      chrinkAuthor: author => {
        if (author.length > 19) {
          return author.substring(0, 19) + '...'
        } else {
          return author
        }
      },
      getDay: news => new Date(news.date).getDate(),
      getMonth: news => {
        var monthNames = [
          'JAN',
          'FEV',
          'MAR',
          'AVR',
          'MAI',
          'JUIN',
          'JUIL',
          'AOU',
          'SEP',
          'OCT',
          'NOV',
          'DEC'
        ]

        return monthNames[new Date(news.date).getMonth()]
      },
      getColor: news => {
        var color = 'teal'
        switch (news.type) {
          case 'twitter':
            color = 'blue lighten-1'
            break
          case 'flashInfo':
            color = 'orange darken-3'
            break
          case 'facebook':
            color = 'red darken-2'
            break
          case 'mouvementsRH':
            color = 'indigo darken-2'
            break
          case 'actualites':
            color = 'blue darken-2'
            break
          case 'cos-rss':
          case 'cosActu':
          case 'cosNews':
            color = 'blue-grey darken-2'
            break
          case 'docs':
            color = 'teal'
            if (news.docType === 'doc-cse') color = 'orange darken-4'
            break
          default:
            break
        }
        return color
      },
      getTypeLabel: news => {
        var label = 'Type Inconnu'
        switch (news.type) {
          case 'twitter':
            label = 'Twitter'
            break
          case 'flashInfo':
            label = 'Flash Info'
            break
          case 'facebook':
            label = 'Facebook'
            break
          case 'mouvementsRH':
            label = 'Mouvement RH'
            break
          case 'actualites':
            label = 'Actualité'
            break
          case 'docs':
            label = 'Documents'
            if (news.docType === 'doc-cse') label = 'Oeuvres sociales'
            break
          default:
            console.error('Type non trouvé : ' + news.type)
            break
        }
        return label
      },
      getClass: news => {
        var aClass = 'black--text'
        if (news.type === 'mouvementsRH') aClass += ' mouvementsRH'
        return aClass
      },
      getFontColor: news => {
        var color = '#009688' // teal
        switch (news.type) {
          case 'twitter':
            color = '#1DA1F2' // Todo
            break
          case 'flashInfo':
            color = '#ef6c00' // orange darken-3
            break
          case 'facebook':
            color = '#d32f2f' // red darken-2
            break
          case 'mouvementsRH':
            color = '#303f9f ' // indigo darken-2
            break
          case 'actualites':
            color = '#1976d2 ' // blue darken-2
            break
          case 'cos-rss':
          case 'cosActu':
          case 'cosNews':
            color = '#455A64 ' // blue-grey darken-2
            break
          case 'docs':
            color = '#009688'
            if (news.docType === 'doc-cse') color = '#E65100' // orange darken-4
            break
          default:
            break
        }
        return color
      },
      getIcon: news => {
        var icon = 'perm_device_information'
        switch (news.type) {
          case 'flashInfo':
            icon = 'flash_on'
            break
          case 'twitter':
            icon = 'public'
            break
          case 'actualites':
            icon = 'perm_device_information'
            break
          case 'mouvementsRH':
            icon = 'account_box'
            break
          case 'facebook':
            icon = 'public'
            break
          case 'cos-rss':
          case 'cosActu':
          case 'cosNews':
            icon = 'account_balance'
            break
          case 'docs':
            icon = 'menu_book'
            if (news.docType === 'doc-cse') icon = 'beach_access'
            break
          default:
            break
        }
        return icon
      },
      imgsrc: news => {
        var imgSource = '/static/img/flashInfo-1.jpeg'
        if (news.image != null && news.image !== '') {
          imgSource = news.image
        } else {
          switch (news.type) {
            case 'flashInfo':
              imgSource = '/static/img/flashInfo-2.jpeg'
              break
            case 'twitter':
              imgSource = '/static/img/twitter_background_3.jpg'
              break
            case 'actualites':
              imgSource = news.image
              break
            case 'mouvementsRH':
              imgSource = news.image
              break
            case 'cos-rss':
            case 'cosActu':
            case 'cosNews':
              imgSource = '/static/img/cos.jpg'
              break
            case 'docs':
              imgSource = '/static/img/documents.jpg'
              if (news.docType === 'doc-cse') imgSource = '/static/img/CSE.jpg'
              break
            default:
              break
          }
        }
        // console.log('imgSource : ' + imgSource)
        return imgSource
      },
      getNewsTitle: function(news) {
        if (news.type === 'docs') {
          var typeDocLabel = ''
          var docLabel = 'Nouveau document '
          if (['doc-unsa', 'doc-cgt', 'doc-cfdt'].indexOf(news.docType) > -1) {
            typeDocLabel = 'syndical'
          }
          if (news.docType === 'doc-cse') {
            docLabel = 'Nouvelle Offre de votre CE'
          }
          return docLabel + typeDocLabel
        }
        return news.title
      },
      getNewsResume: function(news) {
        if (news.type === 'docs') {
          var typeDocLabel = ''
          if (['doc-unsa', 'doc-cgt', 'doc-cfdt'].indexOf(news.docType) > -1) {
            typeDocLabel = 'syndical '
          }

          return (
            'Un nouveau document ' +
            typeDocLabel +
            '[ ' +
            news.name +
            ' ] est disponible. Cliquez sur "Lire la suite" pour le consulter.'
          )
        }
        return news.resume
      },
      findAvatar: function(author) {
        // console.log(author)
        var returnedPhotoProfileURL = '/static/img/default.jpg'
        if (author == null || author === '') {
          return returnedPhotoProfileURL
        }
        var contact = this.$store.getters.searchContact(author)
        if (author === 'CSE') {
          return '/static/img/cse-author.jpg'
        }
        if (contact == null) return returnedPhotoProfileURL
        if (author && ['cfdt', 'cgt', 'unsa'].indexOf(author.trim()) > -1) {
          return '/static/img/ad-photos/' + author + '.jpg'
        }
        if (author && author === 'Twitter') {
          return '/static/img/twitter.png'
        }

        if (contact.thumbnailPhoto) {
          returnedPhotoProfileURL = `/static/img/ad-photos/${contact.sAMAccountName}.jpg`
        }
        return returnedPhotoProfileURL
      },
      closeSearch: function() {
        console.log(document.getElementById('newsListVList').offsetWidth)
        // console.log(document.getElementById('tempid').parentNode.offsetWidth)
        // console.log(document.getElementById('tempid').parentNode.id)
        // document.getElementById('searchBox').style.visibility = 'hidden'
        // document.getElementById('newsListVList').style.marginTop = 0
        /* Afficher l'icone de recherche dans le main template */
        // this.setSearchVisible(true)
      }
    }
  }
</script>
<style>
  .mouvementsRH > div.v-image__image {
    max-height: 200px;
    max-width: 200px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
  #tempid {
    width: 100%;
  }
</style>
