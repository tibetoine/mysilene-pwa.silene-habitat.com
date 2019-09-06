<template>
  <v-layout style="margin-top:50px">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title>
          <v-avatar
          size="36px"
          slot="activator"
          >
            <img
                :src="findAvatar(news.author)"
                alt=""                                        
            >
            
        </v-avatar>
        <span :title="news.author" style="padding-left:10px">{{news.author?chrinkAuthor(news.author):'Auteur Inconnu'}}</span>
            <!-- Photo Author --> 
            <!-- Author --> 
            <!-- Photo Author --> 
        </v-card-title>
        <v-img
        class="black--text"
        height="200px"
        :src="imgsrc(news)"
        contain=true
        >
        </v-img>
        <v-card-title>
            <div>
                <span class="headline" :style="'color:'+getFontColor(news)+''">{{news.title}}</span>
            </div>
        </v-card-title>
        <v-card-title :color="getColor(news)" style="padding-top:0px">
            <div>
                <span class="subheading" :color="getColor(news)">{{news.resume}}</span>
            </div>
        </v-card-title>
        <v-card-title class="newsContent" primary-title v-html="news.content">
          
          
        </v-card-title>        
      </v-card>
      <v-btn
        fab
        bottom
        right
        color="orange"
        dark
        fixed
        @click.stop="goBack"
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>
      
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'newsModal',
  data () {
    return {
      loading: false,
      error: null,
      news: null
    }
  },
  computed: {
    ...mapState({
      selectedNews: state => state.selectedNews
    }),
    selectedNews: {
      get: function () {
        return this.$store.state.selectedNews
      },
      set: function (value) {
        this.$store.state.selectedNews = value
      }
    }
  },
  watch: {
    // appeler encore la méthode si la route change
    $route: 'fetchData'
  },
  created () {
    this.fetchData()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    fetchData () {
      // console.log('--> Fetching data News')
      this.error = this.news = null
      this.loading = true
      if (this.$store.state.selectedNews != null) {
        this.news = this.$store.state.selectedNews
        this.loading = false
      } else {
        this.error = 'Impossible de charger la news'
        console.error('MySilene : Can not load news !')
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
          label = 'COS'
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
          case 'cos-rss':
          case 'cosActu':
          case 'cosNews':
            imgSource = '/static/img/cos.jpg'
            break
          default:
            break
        }
      }
      return imgSource
    },
    findAvatar: function (author) {
      if (author == null || author === '') return '/static/img/default.jpg'
      var contact = this.$store.getters.searchContact(author)
      if (contact == null) return '/static/img/default.jpg'

      var imgSource =
        '/static/img/ad-photos/' +
        (contact.thumbnailPhoto ? contact.sAMAccountName : 'default') +
        '.jpg'
      return imgSource
    }
  }
}
</script>
<style>
  #content-news ul {
      margin-left:30px;
      padding-right:30px;
      text-align:justify;
  }

  #content-news img {
      max-width:100%;
      height:auto;
  }
</style>