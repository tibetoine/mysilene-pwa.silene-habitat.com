<template>
  <v-app id="inspire" >  
    
    <login-dialog/>
    <error-dialog/>
   
   
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="item in items">        
          <v-list-tile href="" :to="item.path" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
   
   
   
   
   
    <v-toolbar
      color="blue darken-3"
      dark
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">MySilene</span>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>   
      <v-btn v-if="error" @click.stop="showErrorDialog" icon>
        <v-icon  >warning</v-icon>
      </v-btn>

      

      <v-speed-dial
        v-if="userAuthenticated!=null"
        small
        v-model="fab"
        direction="bottom"
      >
        <v-btn
          slot="activator"
          fab
          hover
          v-model="fab"
          icon
          small          
        >
          <v-avatar size="40" color="grey lighten-4">
            <img
              :src="findAvatar(userAuthenticated)"
              alt="UserAvatar"
            >
          </v-avatar>
          <v-icon>close</v-icon>
        </v-btn>
        
        <v-btn
          fab
          dark
          small
          color="red"
          @click.stop="logout"
        >
          <v-icon>power_off</v-icon>
        </v-btn>
      </v-speed-dial>

      <v-btn
          v-else
          slot="activator"
          fab
          hover
          v-model="fab"
          icon
          small          
        >
          <v-avatar size="40" color="grey lighten-4">
            <img
              src="/static/img/ad-photos/default.jpg"
              alt="Connexion"
            >
          </v-avatar>          
        </v-btn>

          
    </v-toolbar>

    <router-view></router-view>

  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import On from './const/on'
import Do from './const/do'
import LoginDialog from './vue/dialogs/LoginDialog'
import ErrorDialog from './vue/dialogs/ErrorDialog'
import api from './rest/api'

export default {
  components: { LoginDialog, ErrorDialog },
  computed: {
    username () {
      // Nous verrons ce que représente `params` dans un instant.
      return this.$route.params.username
    },
    error: {
      get: function () {
        return this.$store.state.error.data != null
      }
    },
    userAuthenticated: {
      get: function () {
        var user = null
        if (this.$store.state.login.Authenticate) {
          user = this.$store.state.login.userId
        }
        return user
      }
    }
  },
  beforeCreate () {
    /* Connexion auto si token dans le storage */
    const token = localStorage.getItem('user-token')
    const userId = localStorage.getItem('user-id')
    console.log('TOKEN : ' + token + ' USER ID : ' + userId)
    if (token && userId) {
      api.setDefaultAuthorization(token)
      var user = {_id: userId, token: token}
      this.$store.dispatch(On.AUTO_LOGIN, user)
    }

    // this.autoLogin(user)
  },
  mounted: function () {
    // this.loadContacts()
    // this.loadNews()
    this.loadWeather()
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    ...mapActions({
      loadContacts: On.LOAD_CONTACTS,
      loadNews: On.LOAD_NEWS,
      loadWeather: On.LOAD_WEATHER,
      logout: On.LOGOUT,
      autoLogin: On.AUTO_LOGIN
    }),
    ...mapMutations({
      showNewsFilterDialog: Do.SHOW_NEWS_FILTER_DIALOG,
      showErrorDialog: Do.SHOW_ERROR_DIALOG
    }),
    ...mapGetters(['isAuthenticate']),
    findAvatar: function (userId) {
      var imgSource = '/static/img/ad-photos/' + userId + '.jpg'
      return imgSource
    }
  },
  data: () => ({
    fab: false,
    drawer: null,
    items: [
      { icon: 'art_track', text: 'News', path: '/news' },
      { icon: 'contacts', text: 'Contacts', path: '/contacts' },
      { icon: 'cloud', text: 'Météo', path: '/meteo' },
      { icon: 'help', text: 'Aide', path: '/help' }
    ]
  }),

  props: {
    source: String
  }
}
</script>