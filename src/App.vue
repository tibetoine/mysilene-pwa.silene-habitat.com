<template>
  <v-app id="inspire">
    <login-dialog />
    <error-dialog />
    <offline-dialog />
    <down-dialog />
    <global-snackbar-message />

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
      <v-toolbar-title style="width: 300px;" class="ml-0 pl-3">
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer"
        ></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">MySilene</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <!--<v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>-->
      4.1.0
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
          <v-avatar size="40" color="grey lighten-4">
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
import { mapActions, mapMutations, mapState } from 'vuex'

import On from './const/on'
// import Vue from 'vue'
import Do from './const/do'
import DownDialog from './vue/dialogs/DownDialog'
import LoginDialog from './vue/dialogs/LoginDialog'
import ErrorDialog from './vue/dialogs/ErrorDialog'
import OfflineDialog from './vue/dialogs/OfflineDialog'
import GlobalSnackbarMessage from './vue/components/GlobalSnackbarMessage'
import api from './rest/api'
import detectNetwork from 'v-offline'

export default {
  components: {
    LoginDialog,
    ErrorDialog,
    OfflineDialog,
    DownDialog,
    detectNetwork,
    GlobalSnackbarMessage
  },
  computed: {
    username() {
      return this.$route.params.username
    },
    error: {
      get: function () {
        return this.$store.state.error.data != null
      }
    },
    isDown: {
      get: function () {
        return this.$store.state.downState.status === true
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
    },
    isAuthenticate: {
      get: function () {
        return this.$store.state.login.Authenticate
      }
    }
  },
  watch: {
    isAuthenticate(newValue, oldValue) {
      // console.log(` isAuthenticate : Updating from ${oldValue} to ${newValue}`)
      if (newValue === false) {
        this.$router.push({ path: '/home' })
      }
      if (newValue === true) {
        this.$router.push({ path: '/news' })
      }
    }
  },
  beforeCreate() {
    /* Connexion auto si token dans le storage */
    const token = localStorage.getItem('user-token')
    const userId = localStorage.getItem('user-id')
    if (token && userId) {
      api.setDefaultAuthorization(token, userId)
      var user = { _id: userId, token: token }
      this.$store.dispatch(On.AUTO_LOGIN, user)
    }
  },
  mounted: function () {
    // Vérifie l'état du serveur d'API
    this.healthcheck()
    this.loadWeather()
    this.$store.watch(
      () => this.$store.getters.isAccessDataLoaded,
      (isAccessDataLoaded) => {
        this.loadMenu()
      }
    )
  },
  methods: {
    loadMenu() {
      this.items = []
      this.$store.state.access.permissionsListInBase.forEach((permission) => {
        let hasRight = false
        permission.roles.forEach((roleAttendu) => {
          // console.log('roleAttendu', roleAttendu._id)
          if (this.$store.state.login.roles.includes(roleAttendu._id)) {
            /* console.log(
              'Utilisateur autorisé pour la menu [%s] avec le role [%s]',
              permission._id,
              roleAttendu._id
            ) */
            hasRight = true
          }
        })
        if (hasRight) {
          let itemMenu = {
            icon: permission.icon,
            text: permission.text,
            path: permission.path
          }
          // console.log('itemMenu', itemMenu)
          this.items.push(itemMenu)
        }
      })
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
      loadWeather: On.LOAD_WEATHER,
      logout: On.LOGOUT
    }),
    ...mapState([]),
    ...mapMutations({
      showNewsFilterDialog: Do.SHOW_NEWS_FILTER_DIALOG,
      showErrorDialog: Do.SHOW_ERROR_DIALOG,
      showDownDialog: Do.SHOW_DOWN_DIALOG,
      showOfflineDialog: Do.SHOW_OFFLINE_DIALOG
    }),
    findAvatar: function (userId) {
      var imgSource = '/static/img/ad-photos/' + userId + '.jpg'
      return imgSource
    }
  },
  data: () => ({
    fab: false,
    drawer: null,
    offlineStatus: null,
    items: [{ icon: 'home', text: 'Home', path: '/home' }]
  }),

  props: {
    source: String
  }
}
</script>
