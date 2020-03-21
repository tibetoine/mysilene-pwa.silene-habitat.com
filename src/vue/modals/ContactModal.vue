<template>
  <v-container style="margin-top:50px;">
    <div class="loading" v-if="loading">
      Chargement...
    </div>

    <div v-if="error" class="error">
      <v-alert :value="true" type="error">
        {{ error }}
        <v-btn fab dark color="orange" @click="goBack">
          <v-icon>arrow_back</v-icon>
        </v-btn>
      </v-alert>
    </div>

    <div v-if="selectedContact" class="content">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-media src="/static/img/contacts.jpg" height="200px">
              <v-layout column class="media">
                <v-card-title>
                  <v-container fluid grid-list-lg>
                    <v-layout row>
                      <v-flex xs7 sm8 md9>
                        <v-avatar size="64">
                          <img :src="imgsrc(contact)" />
                        </v-avatar>
                      </v-flex>
                      <v-flex xs5 sm4 md3>
                        <v-chip
                          v-if="contact.silenesst == 1"
                          color="green"
                          text-color="white"
                        >
                          <v-avatar>
                            <v-icon>local_hospital</v-icon>
                          </v-avatar>
                          SST
                        </v-chip>
                        <v-chip
                          v-else-if="contact.sileneserrefile == 1"
                          color="orange"
                          text-color="white"
                        >
                          <v-avatar>
                            <v-icon>security</v-icon>
                          </v-avatar>
                          Serre File
                        </v-chip>
                        <v-chip
                          v-else-if="contact.sileneguidefile == 1"
                          color="blue"
                          text-color="white"
                        >
                          <v-avatar>
                            <v-icon>security</v-icon>
                          </v-avatar>
                          Guide File
                        </v-chip>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-title>
                <v-spacer></v-spacer>
                <v-card-title class="white--text" style="padding-bottom:2px;">
                  <div class="headline" style="width:100%;">
                    {{ contact.sn }} {{ contact.givenName }}
                  </div>
                  <div>{{ contact.title }}</div>
                </v-card-title>
              </v-layout>
            </v-card-media>
            <v-list two-line>
              <v-list-tile
                v-if="contact.mobile"
                @click="callBryan(contact.mobile)"
              >
                <v-list-tile-action>
                  <v-icon color="indigo">phone</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ contact.mobile }}</v-list-tile-title>
                  <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action @click.stop="textBryan(contact.mobile)">
                  <v-icon color="indigo">chat</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile
                v-if="contact.telephoneNumber"
                @click="callBryan(contact.telephoneNumber)"
              >
                <v-list-tile-action>
                  <v-icon color="indigo">phone</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{
                    contact.telephoneNumber
                  }}</v-list-tile-title>
                  <v-list-tile-sub-title>Fixe</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider inset></v-divider>
              <v-list-tile @click="sendMail(contact.mail)">
                <v-list-tile-action>
                  <v-icon color="indigo">mail</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ contact.mail }}</v-list-tile-title>
                  <v-list-tile-sub-title>Email</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    <v-btn fab bottom right color="orange" dark fixed @click.stop="goBack">
      <v-icon>arrow_back</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'contactModal',
    data() {
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
        get: function() {
          return this.$store.state.selectedContact
        },
        set: function(value) {
          this.$store.state.selectedContact = value
        }
      }
    },
    watch: {
      // appeler encore la méthode si la route change
      $route: 'fetchData'
    },
    created() {
      this.fetchData()
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      imgsrc: contact =>
        '/static/img/ad-photos/' +
        (contact.thumbnailPhoto ? contact.sAMAccountName : 'default') +
        '.jpg',
      fetchData() {
        // console.log('--> Fetching data')
        this.error = this.contact = null
        this.loading = true
        if (this.$store.state.selectedContact != null) {
          this.contact = this.$store.state.selectedContact
          this.loading = false
        } else {
          this.error = 'Impossible de charger le contact'
          this.loading = false
          console.error('MySilene : Can not load contact from state !')
        }
      },
      sendMail(mail) {
        window.location = 'mailto:' + mail
      },
      callBryan(mobile) {
        window.location = 'tel:' + mobile
      },
      textBryan(mobile) {
        window.location = 'sms:' + mobile
      }
    }
  }
</script>
