<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout row>
                <v-flex xs12 md6>
                    <v-list two-line>
                        <template v-for="aNews in news">
                            <v-card style="margin:20px 10px 20px 10px;" v-bind:key="aNews._id">
                                <v-card-title>
                                    <v-avatar
                                size="36px"
                                slot="activator"
                                >
                                  <img
                                      :src="findAvatar(aNews.author)"
                                      :alt="'avatar_'+aNews.author"                                        
                                  >
                                    
                                </v-avatar>
                                <span :title="aNews.author" style="padding-left:10px;">{{aNews.author?chrinkAuthor(aNews.author):'Auteur Inconnu'}}</span>
                                    <!-- Photo Author --> 
                                    <!-- Author --> 
                                    <!-- Photo Author --> 
                                </v-card-title>
                                <clazy-load :src="imgsrc(aNews)">
                                  <v-card-media 
                                  class="black--text"
                                  height="200px"
                                  :src="imgsrc(aNews)"
                                  :contain="aNews.type=='mouvementsRH'"
                                  >
                                      <v-container fill-height fluid style="padding:2px;">
                                          <v-layout align-end justify-start >
                                              <v-flex 
                                              xs2 
                                              d-flex 
                                              align-end
                                              pa-2
                                              >
                                                  <v-chip label :color="getColor(aNews)" text-color="white">
                                                      <v-avatar>
                                                          <v-icon>{{getIcon(aNews)}}</v-icon>
                                                      </v-avatar>
                                                      {{getTypeLabel(aNews)}}
                                                  </v-chip>
                                              </v-flex>
                                          </v-layout>
                                          <v-layout justify-end >
                                              <v-flex xs6 sm3 md2 justify-end style="margin-top:10px;margin-right:10px;">
                                                <v-avatar :class="getColor(aNews)" >
                                                      <p style="margin:0;padding:0 0 0 1px;text-align:center;line-height:1.1em;">
                                                          <span class="white--text" style="padding:0;margin:0;font-size:1.5em;padding-left:2px;">{{getDay(aNews)}}</span> 
                                                              <br/>                                        
                                                          <span class="white--text" style="padding:0;margin:0;">{{getMonth(aNews)}}</span>
                                                      </p>
                                                  </v-avatar>
                                              </v-flex>
                                          </v-layout>
                                      </v-container>
                                  </v-card-media>
                                  <div class="preloader" slot="placeholder">
                                    <v-progress-linear :color="getColor(aNews)" :indeterminate="true"></v-progress-linear>
                                  </div>
                                </clazy-load>
                                <v-card-title>
                                    <div>
                                        <span class="headline" :style="'color:'+getFontColor(aNews)+';'">{{aNews.title}}</span>
                                    </div>
                                </v-card-title>
                                <v-card-title :color="getColor(aNews)" style="padding-top:0px;">
                                    <div>
                                        <span v-if="aNews.type !== 'cos-rss'" :color="getColor(aNews)">{{aNews.resume}}</span>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn flat color="blue" @click="goToNews(aNews, aNews._id)">Lire la suite > </v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-list>
                </v-flex>
            </v-layout>
        </v-container>
      <v-btn
        fab
        bottom
        right
        color="pink"
        dark
        fixed
        @click.stop="showNewsFilterDialog"
      >
        <v-icon>settings</v-icon>
      </v-btn>
      

      <filter-news-dialog/>
    </v-content>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import Do from '../../const/do'
import FilterNewsDialog from '../dialogs/FilterNewsDialog'

export default {
  components: { FilterNewsDialog },
  name: 'news',
  computed: {
    ...mapState({
      selectedNews: state => state.selectedNews
    }),
    ...mapGetters({ news: 'filteredNews' }),
    selectedNews: {
      get: function () {
        return this.$store.state.selectedNews
      },
      set: function (value) {
        this.$store.state.selectedNews = value
      }
    }
  },
  methods: {
    ...mapMutations({
      showNewsFilterDialog: Do.SHOW_NEWS_FILTER_DIALOG
    }),
    goToNews: function (news, newsId) {
      if (news.type.startsWith('cos')) {
        window.open(news.link, '_blank')
      } else {
        // console.log('News : ' + news + ' newsId : ' + newsId)
        this.$store.state.selectedNews = news
        // this.$router.push({ path: 'newsModal', params: { newsId }})
        // this.$router.push({ name: 'newsModal', params: { newsId }})
        this.$router.push({ path: `/news/${newsId}` })
      }
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
        default:
          break
      }
      return color
    },
    getTypeLabel: news => {
      var label = 'Type Inconnu'
      switch (news.type) {
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
        case 'cos-rss':
          label = 'COS RSS'
          break
        case 'cosActu':
          label = 'COS Actus'
          break
        case 'cosNews':
          label = 'COS News'
          break
        default:
          console.log('Type non trouvé : ' + news.type)
          break
      }
      return label
    },
    getFontColor: news => {
      var color = '#009688' // teal
      switch (news.type) {
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
          case 'actualites':
            imgSource = news.image
            break
          case 'mouvementsRH':
            imgSource = news.image
            break
          default:
            break
        }
      }
      // console.log('imgSource : ' + imgSource)
      return imgSource
    },
    findAvatar: function (author) {
      if (author == null || author === '') {
        return '/static/img/ad-photos/default.jpg'
      }
      var contact = this.$store.getters.searchContact(author)
      if (contact == null) return '/static/img/ad-photos/default.jpg'

      var imgSource =
        '/static/img/ad-photos/' +
        (contact.thumbnailPhoto ? contact.sAMAccountName : 'default') +
        '.jpg'
      return imgSource
    }
  }
}
</script> 