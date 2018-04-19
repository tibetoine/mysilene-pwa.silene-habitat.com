<template>
  <v-app id="inspire" >  
   
   
   
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
    </v-toolbar>

    <router-view></router-view>

  </v-app>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import On from './const/on'
import Do from './const/do'

export default {
  computed: {
    username () {
      // Nous verrons ce que représente `params` dans un instant.
      return this.$route.params.username
    }
  },
  mounted: function () {
    this.loadContacts()
    this.loadNews()
    this.loadWeather()
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    ...mapActions({
      loadContacts: On.LOAD_CONTACTS,
      loadNews: On.LOAD_NEWS,
      loadWeather: On.LOAD_WEATHER
    }),
    ...mapMutations({
      showNewsFilterDialog: Do.SHOW_NEWS_FILTER_DIALOG
    })
  },
  data: () => ({
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