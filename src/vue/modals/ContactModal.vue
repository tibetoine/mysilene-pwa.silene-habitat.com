<template>
    <div class="contact">
        <div class="loading" v-if="loading">
        Chargement...
        </div>

        <div v-if="error" class="error">
        {{ error }}
        </div>

        <div v-if="selectedContact" class="content">
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-media src="/static/img/contact.jpg" height="300px">
                    <v-layout column class="media">
                        <v-card-title>
                        <v-btn dark icon>
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn dark icon class="mr-3">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn dark icon>
                            <v-icon>more_vert</v-icon>
                        </v-btn>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-card-title class="white--text pl-5 pt-5">
                        <div class="display-1 pl-5 pt-5">{{contact.sn}} {{contact.givenName}}</div>
                        </v-card-title>
                    </v-layout>
                    </v-card-media>
                    <v-list two-line>
                    <v-list-tile @click="callBryan(contact.mobile)">
                        <v-list-tile-action>
                        <v-icon color="indigo">phone</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title>{{contact.mobile}}</v-list-tile-title>
                        <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action @click="textBryan(contact.mobile)">
                            <v-icon>chat</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile v-if="contact.telephoneNumber" @click="callBryan(contact.telephoneNumber)">
                        <v-list-tile-action></v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title>{{contact.telephoneNumber}}</v-list-tile-title>
                        <v-list-tile-sub-title>Fixe</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                    <v-list-tile @click="sendMail(contact.mail)">
                        <v-list-tile-action>
                        <v-icon color="indigo">mail</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title>{{contact.mail}}</v-list-tile-title>
                        <v-list-tile-sub-title>Email</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    </v-list>
                </v-card>
                </v-flex>
            </v-layout>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'contactModal',
  data () {
    return {
      loading: false,
      error: null
    }
  },
  computed: {
    ...mapState({
      selectedContact: state => state.selectedContact
    }),
    selectedContact: {
      get: function () {
        return this.$store.state.selectedContact
      },
      set: function (value) {
        this.$store.state.selectedContact = value
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
    imgsrc: contact =>
      '/static/img/ad-photos/' +
      (contact.thumbnailPhoto ? contact.sAMAccountName : 'default') +
      '.jpg',
    fetchData () {
      console.log('--> Fetching data')
      this.error = this.contact = null
      this.loading = true
      if (this.$store.state.selectedContact != null) {
        this.contact = this.$store.state.selectedContact
        this.loading = false
      } else {
        this.error = 'Impossible de charger le contact'
        console.error('MySilene : Can not load contact !')
      }
    },
    sendMail (mail) {
      window.location = 'mailto:' + mail
    },
    callBryan (mobile) {
      window.location = 'tel:' + mobile
    },
    textBryan (mobile) {
      window.location = 'sms:' + mobile
    }
  }
}
</script>