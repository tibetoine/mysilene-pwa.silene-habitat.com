<template>
  <v-app id="inspire">
    <login-dialog />
    <error-dialog />
    <offline-dialog />
    <down-dialog />

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
        <v-list-tile v-if="isAdmin" href="" to="/admin">
          <v-list-tile-action>
            <v-icon>build</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Administration
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
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
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer"
        ></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">MySilene</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <!--<v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>-->
      <v-btn v-if="error" @click.stop="showErrorDialog" icon>
        <v-icon>warning</v-icon>
      </v-btn>
      <v-btn v-if="isDown" @click.stop="showDownDialog" icon>
        <v-icon>warning</v-icon>
      </v-btn>

      <detect-network v-on:detected-condition="detected"> </detect-network>

      <v-btn v-if="!offlineStatus" @click.stop="showOfflineDialog" icon>
        <v-icon color="red">wifi_off</v-icon>
      </v-btn>

      <v-speed-dial
        v-if="userAuthenticated != null"
        small
        v-model="fab"
        direction="bottom"
        open-on-hover
      >
        <v-btn slot="activator" fab hover v-model="fab" icon small>
          <v-avatar size="40" style="margin-top:-20px;" color="grey lighten-4">
            <img
              :src="findAvatar(userAuthenticated)"
              alt="UserAvatar"
              onerror="this.onerror=null;this.src='/static/img/default.jpg';"
            />
          </v-avatar>
          <v-icon>close</v-icon>
        </v-btn>

        <v-btn fab dark small color="red" @click="logout">
          <v-icon>power_off</v-icon>
        </v-btn>
      </v-speed-dial>

      <v-btn v-else slot="activator" fab hover v-model="fab" icon small>
        <v-avatar size="40" color="grey lighten-4">
          <img src="/static/img/default.jpg" alt="Connexion" />
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
  import DownDialog from './vue/dialogs/DownDialog'
  import LoginDialog from './vue/dialogs/LoginDialog'
  import ErrorDialog from './vue/dialogs/ErrorDialog'
  import OfflineDialog from './vue/dialogs/OfflineDialog'
  import api from './rest/api'
  import detectNetwork from 'v-offline'

  export default {
    components: {
      LoginDialog,
      ErrorDialog,
      OfflineDialog,
      DownDialog,
      detectNetwork
    },
    computed: {
      username() {
        return this.$route.params.username
      },
      error: {
        get: function() {
          return this.$store.state.error.data != null
        }
      },
      isDown: {
        get: function() {
          return this.$store.state.downState.status === true
        }
      },
      userAuthenticated: {
        get: function() {
          var user = null
          if (this.$store.state.login.Authenticate) {
            user = this.$store.state.login.userId
          }
          return user
        }
      },
      isAdmin: {
        get: function() {
          if (this.$store.state.login.isAdmin) {
            return true
          }
          return false
        }
      }
    },
    beforeCreate() {
      window.addEventListener('mysilene-do-load-data', e => this.loadData(e))

      /* Connexion auto si token dans le storage */
      const token = localStorage.getItem('user-token')
      const userId = localStorage.getItem('user-id')
      if (token && userId) {
        api.setDefaultAuthorization(token, userId)
        var user = { _id: userId, token: token }
        this.$store.dispatch(On.AUTO_LOGIN, user)
      }

      // this.autoLogin(user)
    },
    mounted: function() {
      // Vérifie l'état du serveur d'API
      this.healthcheck()

      const token = localStorage.getItem('user-token')
      const userId = localStorage.getItem('user-id')
      if (token && userId) {
        // console.log('Ok je load les data car token et userid sont token : ' + token + ' et userId : ' + userId)
        /* Hack  : On recharge les données après quelques secondes pour forcer le cache Service Worker à avoir l'API */
        /* setTimeout(function () {
        var doLoadEvent = new Event('mysilene-do-load-data')
        window.dispatchEvent(doLoadEvent)
      }, 3000) */
      }
      this.loadWeather()
    },
    methods: {
      loadData(e) {
        // console.log('Loading Data suite à event', e)
        this.loadDocs()
        this.loadNews()
        this.loadContacts()
      },
      detected(e) {
        if (e) {
          this.$store.state.offline.read = false
        } else {
          this.$store.state.offline.read = true
        }
        this.offlineStatus = e
      },
      goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      },
      ...mapActions({
        healthcheck: On.HEALTHCHECK,
        loadContacts: On.LOAD_CONTACTS,
        loadDocs: On.LOAD_DOCS,
        loadNews: On.LOAD_NEWS,
        loadWeather: On.LOAD_WEATHER,
        loadBim: On.LOAD_BIM,
        logout: On.LOGOUT,
        autoLogin: On.AUTO_LOGIN
      }),
      ...mapMutations({
        showNewsFilterDialog: Do.SHOW_NEWS_FILTER_DIALOG,
        showErrorDialog: Do.SHOW_ERROR_DIALOG,
        showDownDialog: Do.SHOW_DOWN_DIALOG,
        showOfflineDialog: Do.SHOW_OFFLINE_DIALOG
      }),
      ...mapGetters(['isAuthenticate'], ['isAdmin']),
      findAvatar: function(userId) {
        var imgSource = '/static/img/ad-photos/' + userId + '.jpg'
        return imgSource
      }
    },
    data: () => ({
      fab: false,
      drawer: null,
      offlineStatus: null,
      items: [
        { icon: 'art_track', text: 'Actualités', path: '/news' },
        { icon: 'contacts', text: 'Contacts', path: '/contacts' },
        { icon: 'cloud', text: 'Météo', path: '/meteo' },
        /* { icon: 'location_city', text: 'BIM', path: '/bim' }, */
        { icon: 'today', text: 'Planning', path: '/shifts' },
        { icon: 'help', text: 'Aide', path: '/help' }
        /* { icon: 'library_books', text: 'Docs', path: '/docs' } */
      ]
    }),

    props: {
      source: String
    }
  }
</script>
