<template>
  <v-container offset-md4 style="margin-top: 50px;">
    <v-layout>
      <v-flex xs12 offset-lg3 offset-xl2>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon>
              <v-icon>get_app</v-icon>
            </v-btn>
            <v-toolbar-title class="white--text">Extraction</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text class="title"
            >Export des données d'intéressements au format Excel</v-card-text
          >
          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" text @click="extractAll()"
              >Extraire Tout</v-btn
            >
          </v-card-actions>
        </v-card>
        <v-spacer style="margin-top: 10px;"></v-spacer>
        <v-card>
          <v-toolbar color="primary">
            <v-btn icon>
              <v-icon color="white">thumb_up_alt</v-icon>
            </v-btn>
            <v-toolbar-title class="white--text"
              >Suivi collaborateurs</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-text-field
              v-if="showSearchContact"
              append-icon="close"
              :append-icon-cb="hideSearch"
              v-model="searchContact"
              solo
              hide-details
              single-line
            ></v-text-field>
            <v-btn icon v-else>
              <v-icon @click="showSearchContact = true">search</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <div>
              <v-switch
                v-model="filterThumbUp"
                :color="filterThumbUp ? 'primary' : 'grey'"
                label="Fait"
                hide-details
                @change="changeThumbUp"
              ></v-switch>
              <v-switch
                v-model="filterThumbDown"
                :color="filterThumbDown ? 'error' : 'grey'"
                label="Pas fait"
                hide-details
                @change="changeThumbDown"
              ></v-switch>
            </div>

            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container grid-list-xl>
            <v-layout column>
              <v-list v-if="interessementsEtContacts">
                <template v-for="(contact, index) in visiblePages">
                  <v-list-tile :key="contact._id">
                    <v-list-tile-action>
                      <v-icon :color="getThumbColor(contact)">{{
                        getThumb(contact)
                      }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-action>
                      <v-icon @click="sendMail(contact.mail)">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      {{ contact.prenom }} {{ contact.nom }} ({{
                        contact.matricule
                      }})
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
              <div class="text-xs-center">
                <v-pagination
                  v-if="filteredContacts.length > 3"
                  v-model="page"
                  :length="Math.ceil(filteredContacts.length / perPage)"
                ></v-pagination>
              </div>
            </v-layout>
          </v-container>
        </v-card> </v-flex
    ></v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import On from '../../const/on'
import { forceFileDownload, removeAccent } from '../../shared/helper'
// import On from '../../const/on'
export default {
  name: 'interessementRh',
  components: {},
  created() {
    this.$store.dispatch(On.LOAD_INTERESSEMENTS_ET_CONTACTS)
  },
  computed: {
    ...mapState({
      interessementsEtContacts: (state) => {
        return state.interessement.interessementsEtContacts
      }
    }),
    filteredContacts: {
      get: function () {
        if (
          !this.$store.state.interessement.interessementsEtContacts ||
          this.$store.state.interessement.interessementsEtContacts.length <= 0
        ) {
          return []
        }

        if (
          this.searchContact === '' &&
          !this.filterThumbUp &&
          !this.filterThumbDown
        ) {
          return this.$store.state.interessement.interessementsEtContacts
        }

        let filteredContacts = this.$store.state.interessement.interessementsEtContacts.filter(
          (contact) => {
            let isFiltered = false

            isFiltered =
              isFiltered ||
              removeAccent(contact.prenom)
                .toLowerCase()
                .indexOf(this.searchContact.toLowerCase()) > -1
            // console.log('here 1', isFiltered)
            if (contact.nom != null) {
              isFiltered =
                isFiltered ||
                removeAccent(contact.nom)
                  .toLowerCase()
                  .indexOf(this.searchContact.toLowerCase()) > -1
            }
            isFiltered =
              isFiltered || contact.matricule.indexOf(this.searchContact) > -1

            if (isFiltered) {
              if (this.filterThumbUp) {
                return contact.lastModified != null
                // console.log('here', contact.lastModified, isFiltered)
              }

              if (this.filterThumbDown) {
                let thumbDownFilter =
                  contact.hasInteressement &&
                  (contact.lastModified == null ||
                    contact.lastModified === undefined)
                return thumbDownFilter
              }
            }

            return isFiltered
          }
        )
        if (
          filteredContacts.length !==
          this.$store.state.interessement.interessementsEtContacts.length
        ) {
          this.page = 1
        }
        return filteredContacts
      },
      set: function (val) {
        // not to use
      }
    },
    visiblePages() {
      return this.filteredContacts.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      )
    }
  },
  methods: {
    ...mapActions({}),
    extractAll() {
      // alert('TODO Extract from component')
      this.downloadFile()
    },
    changeThumbUp() {
      if (this.filterThumbUp) this.filterThumbDown = !this.filterThumbUp
    },
    changeThumbDown() {
      if (this.filterThumbDown) this.filterThumbUp = !this.filterThumbDown
    },
    sendMail(mail) {
      window.location = 'mailto:' + mail + '?subject=Relance Interessement'
    },
    getThumb(contact) {
      if (!contact.hasInteressement) {
        return 'block'
      } else {
        if (contact.lastModified) {
          return 'thumb_up_up'
        }
      }
      return 'thumb_down_alt'
    },
    getThumbColor(contact) {
      if (!contact.hasInteressement) {
        return 'warning'
      } else {
        if (contact.lastModified) {
          return 'success'
        }
      }
      return 'error'
    },
    downloadFile() {
      let year = new Date().getFullYear()
      this.$store
        .dispatch(On.EXPORT_INTERESSEMENTS, year)
        .then((downloadedFile) => {
          /* Récupère le nom du fichier */
          var filename = 'data.xlsx'

          forceFileDownload(downloadedFile, filename)
        })
        .catch((e) => console.error(e))
    },
    hideSearch() {
      this.searchContact = ''
      this.showSearchContact = false
    }
  },
  data() {
    return {
      formData: new FormData(),
      dialog: false,
      searchContact: '',
      showSearchContact: false,
      filterThumbUp: false,
      filterThumbDown: false,
      fileName: '',
      fileUrl: '',
      file: '',
      page: 1,
      perPage: 10
    }
  }
}
</script>
