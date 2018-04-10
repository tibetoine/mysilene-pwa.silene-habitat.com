<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout row>
                <v-flex xs12 md9>
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
                                        alt=""                                        
                                    >
                                    
                                </v-avatar>
                                <span :title="aNews.author" style="padding-left:10px;">{{aNews.author?chrinkAuthor(aNews.author):'Auteur Inconnu'}}</span>
                                    <!-- Photo Author --> 
                                    <!-- Author --> 
                                    <!-- Photo Author --> 
                                </v-card-title>
                                <v-card-media
                                class="black--text"
                                height="200px"
                                :src="imgsrc(aNews)"
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
                                        <v-layout justify-end>
                                            <v-flex xs3>
                                            <v-avatar :class="getColor(aNews)" style="margin-top:10px;">
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
                                <v-card-title>
                                    <div>
                                        <span class="headline" :style="'color:'+getFontColor(aNews)+';'">{{aNews.title}}</span>
                                    </div>
                                </v-card-title>
                                <v-card-title :color="getColor(aNews)" style="padding-top:0px;">
                                    <div>
                                        <span :color="getColor(aNews)">{{aNews.resume}}</span>
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
    </v-content>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
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
    goToNews: function (news, newsId) {
      console.log('News : ' + news + ' newsId : ' + newsId)
      this.$store.state.selectedNews = news
      // this.$router.push({ path: 'newsModal', params: { newsId }})
      // this.$router.push({ name: 'newsModal', params: { newsId }})
      this.$router.push({ path: `/news/${newsId}` })
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

        default:
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

        default:
          break
      }
      return icon
    },
    imgsrc: news => {
      var imgSource = '@/assets/flashInfo-1.jpeg'
      if (news.image != null && news.image !== '') {
        imgSource = news.image
      } else {
        switch (news.type) {
          case 'flashInfo':
            imgSource = '@/assets/flashInfo-2.jpeg'
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
      return imgSource
    },
    findAvatar: function (author) {
      if (author == null || author === '') return '@/assets/ad-photos/default.jpg'
      var contact = this.$store.getters.searchContact(author)
      if (contact == null) return '@/assets/ad-photos/default.jpg'

      var imgSource =
        '@/assets/ad-photos/' +
        (contact.thumbnailPhoto ? contact.sAMAccountName : 'default') +
        '.jpg'
      return imgSource
    }
  }
}
</script> 