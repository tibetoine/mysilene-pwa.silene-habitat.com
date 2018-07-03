<template>
   <v-container style="margin-top:50px;">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-toolbar>
          <v-btn icon>
            <v-icon>library_books</v-icon>
          </v-btn>
          <v-toolbar-title>Documents du CE</v-toolbar-title>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(item) in docsList">
            <v-list-tile :key="item._id" @click="openDocument(item)">
              <v-list-tile-avatar>
                <img src="/static/img/docs/pdf.png">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.date"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>      
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

// TODO : voir : https://vuetifyjs.com/en/components/lists#example-expansion-lists

export default {
  name: 'docs',
  data () {
    return {
      items: [
        {
          avatar: '/static/img/call-center.png',
          title: 'Silène et vous',
          subtitle: 'Pour toute aide',
          email: 'contact@silene-habitat.com',
          tel: '0253484444'
        },
        { divider: true, inset: true },
        {
          avatar: '/static/img/computing-1.png',
          title: 'HelpLine',
          subtitle: 'Support informatique',
          email: 'helpline@silene-habitat.com',
          tel: '0240178520'
        },
        { divider: true, inset: true }
      ]
    }
  },
  computed: {
    ...mapState({
      docsList: state => state.docs.fullList,
      auth: state => state.login.Authenticate
    })
  },
  components: {},
  methods: {
    openDocument (item) {
      // Todo : display 'Ouverture dans un nouvel onglet'
      if (item.link) window.open(item.link, '_blank')
    },
    sendMail (mail) {
      if (mail) window.location = 'mailto:' + mail
    },
    callBryan (mobile) {
      if (mobile) window.location = 'tel:' + mobile
    }
  }
}
</script>