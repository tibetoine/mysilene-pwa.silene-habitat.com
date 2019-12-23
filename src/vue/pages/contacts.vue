<template>
  <div style="margin-top:60px;">
    <v-tabs
      slot="extension"
      centered
      color="transparent"
      slider-color="blue"
    >
      <v-tab key="tab1">
        Personnes
      </v-tab>
      <v-tab key="tab2">
        Services
      </v-tab>
      <v-tabs-items>
        <v-tab-item key="tab1">
          <v-container>
            <v-layout row>
              <v-flex xs12 md9 offset-md3>
                <div v-if="!auth">
                  <v-alert :value="true" type="info">
                    Vous devez être connecté pour accéder aux Contacts Silène
                  </v-alert>
                </div>
                <v-card v-else>
                  <v-container style="padding:4px;">
                    <v-layout row>
                      <v-flex xs8 sm-and-up8>
                        <v-text-field
                          name="input-1-3"
                          label="Rechercher .."
                          single-line
                          append-icon="search"
                          v-model="search"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs4 sm-and-up4>
                        <v-btn
                          @click="doFilterSst"
                          :color="filterSst?'green':'grey'"
                          class="white--text"
                        >
                          SST
                          <v-icon right dark>local_hospital</v-icon>
                        </v-btn>
                      </v-flex></v-layout>
                  </v-container>
                  <v-list two-line v-infinite-scroll="loadMore" infinite-scroll-disabled="endLoading" infinite-scroll-distance="10" infinite-scroll-throttle-delay="50">
                      <template v-for="(contact) in visibleContacts">
                        <v-list-tile avatar :key="contact._id" @click="goToContact(contact)">
                          <v-badge v-if="contact.silenesst == '1'" color="green" left  overlap>
                            <v-icon slot="badge" dark small>local_hospital</v-icon>
                            <v-list-tile-avatar>
                              <img :src="imgsrc(contact)">
                            </v-list-tile-avatar>
                          </v-badge>
                          <v-badge v-else-if="contact.sileneserrefile == '1'" color="orange" left  overlap>
                            <v-icon slot="badge" dark small>security</v-icon>
                            <v-list-tile-avatar>
                              <img :src="imgsrc(contact)">
                            </v-list-tile-avatar>
                          </v-badge>
                          <v-badge v-else-if="contact.sileneguidefile == '1'" color="blue" left  overlap>
                            <v-icon slot="badge" dark small>security</v-icon>
                            <v-list-tile-avatar>
                              <img :src="imgsrc(contact)">
                            </v-list-tile-avatar>
                          </v-badge>
                          <v-list-tile-avatar v-else>
                            <img :src="imgsrc(contact)">
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="contact.sn+' '+contact.givenName"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="contact.title"></v-list-tile-sub-title>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-btn icon ripple>
                              <v-icon color="blue lighten-2" @click.stop="sharingContact(contact)">share</v-icon>
                            </v-btn>
                          </v-list-tile-action>
                        </v-list-tile>
                      </template>
                      <v-progress-linear :indeterminate="true" v-if="busy"></v-progress-linear>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>
        <v-tab-item key="tab2">
          <v-container>
            <v-layout row>
              <v-flex xs12 md9 offset-md3>
                <div v-if="!auth">
                  <v-alert :value="true" type="info">
                    Vous devez être connecté pour accéder aux Contacts Silène
                  </v-alert>
                </div>
                <v-card v-else>

                  <v-list>
                    <v-list-group
                      v-for="(service, key) in groupedContacts"
                      :key="key"
                      no-action
                    >
                      <v-list-tile slot="activator"  class="list-hotfix">
                        <v-list-tile-content>
                          <v-list-tile-title >{{ service[0] }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <template v-for="(contact) in service[1]">
                        <v-list-tile avatar :key="contact._id" @click="goToContact(contact)">
                          <v-badge v-if="contact.silenesst == '1'" color="green" left  overlap>
                            <v-icon slot="badge" dark small>local_hospital</v-icon>
                            <v-list-tile-avatar>
                              <img :src="imgsrc(contact)">
                            </v-list-tile-avatar>
                          </v-badge>
                          <v-badge v-else-if="contact.sileneserrefile == '1'" color="orange" left  overlap>
                            <v-icon slot="badge" dark small>security</v-icon>
                            <v-list-tile-avatar>
                              <img :src="imgsrc(contact)">
                            </v-list-tile-avatar>
                          </v-badge>
                          <v-badge v-else-if="contact.sileneguidefile == '1'" color="blue" left  overlap>
                            <v-icon slot="badge" dark small>security</v-icon>
                            <v-list-tile-avatar>
                              <img :src="imgsrc(contact)">
                            </v-list-tile-avatar>
                          </v-badge>
                          <v-list-tile-avatar v-else>
                            <img :src="imgsrc(contact)">
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="contact.sn+' '+contact.givenName"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="contact.title"></v-list-tile-sub-title>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-btn icon ripple>
                              <v-icon color="black lighten-1" @click.prevent="sharingContact(contact)">share</v-icon>
                            </v-btn>
                          </v-list-tile-action>
                        </v-list-tile>
                      </template>


                    </v-list-group>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>

  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { debounce } from 'lodash'
import { removeAccent } from '../../shared/helper'
import Do from '../../const/do'
import On from '../../const/on'

export default {
  name: 'contacts',
  data: () => ({
    timeout: 5000,
    items: [
      { icon: 'email', title: 'Mail' },
      { icon: 'phone', title: 'Phone' },
      { icon: 'chat', title: 'Chat' },
      { icon: 'phonelink_ring', title: 'Mobile' }
    ],
    busy: false
  }),
  created () {
    // this.fetchData()
  },
  computed: {
    ...mapState({
      filterSst: state => state.contacts.filterSst,
      selectedContact: state => state.selectedContact,
      visibleContacts: state => state.contacts.visibleList,
      groupedContacts: state => Array.from(state.contacts.groupedContacts),
      auth: state => state.login.Authenticate
    }),
    snackbar: {
      get: function () {
        return this.$store.state.contacts.showSnackbar
      },
      set: function (value) {
        this.$store.state.contacts.showSnackbar = value
      }
    },
    text: {
      get: function () {
        return this.$store.state.contacts.text
      },
      set: function (value) {
        // Nothing here
      }
    },
    search: {
      get: function () {
        return this.$store.state.contacts.search
      },
      set: function (value) {
        this.setSearch(value)
      }
    },
    filterSst: {
      get: function () {
        return this.$store.state.contacts.filterSst
      },
      set: function (value) {
        this.$store.state.contacts.filterSst = value
        this.filterChanged()
      }
    },
    selectedContact: {
      get: function () {
        return this.$store.state.selectedContact
      },
      set: function (value) {
        this.$store.state.selectedContact = value
      }
    },
    endLoading: {
      get: function () {
        // console.log('this.$store.state.contacts.endLoading : ' + this.$store.state.contacts.endLoading)
        return this.busy || this.$store.state.contacts.endLoading
      },
      set: function (value) {
        this.$store.state.contacts.endLoading = value
      }
    }
  },
  methods: {
    ...mapActions({
      filterChanged: On.UPDATE_FILTERED_CONTACTS
    }),
    ...mapMutations({
      showMore: Do.SHOW_MORE_CONTACTS,
      showDialog: Do.SHOW_CONTACTS_DIALOG
    }),
    setSearch: debounce(function (value) {
      value = removeAccent(value)
      this.$store.state.contacts.search = value
      this.filterChanged()
    }, 300),
    fetchData: function () {
      // console.log('ok')
      // console.log(this.groupedContacts)
      Array.from(this.groupedContacts).forEach(element => {
        // console.log(element)
      })
    },
    loadMore: function () {
      // console.log('load more contacts...')
      this.busy = true
      this.showMore()
      setTimeout(() => {
        this.busy = false
      }, 1000)
    },
    imgsrc: contact =>
      '/static/img/' +
      (contact.thumbnailPhoto ? 'ad-photos/' + contact.sAMAccountName : 'default') +
      '.jpg',
    doFilterSst () {
      this.search = ''
      this.filterSst ? (this.filterSst = false) : (this.filterSst = true)
    },
    goToContact: function (contact) {
      // console.log('Contact : ' + contact + ' contactId : ' + contactId)
      this.$store.state.selectedContact = contact
      this.$router.push({ path: `/contacts/${contact._id}` })
      // this.showDialog()
    },
    sharingContact: function (contact) {
      let url = `/api-vcard/contacts/${contact.sAMAccountName}/vcard`
      this.$http({
        method: 'get',
        url: url,
        responseType: 'arraybuffer'
      })
        .then((response, status, xhr) => {
          var filename = ''
          var disposition = response.headers.get('content-disposition')
          if (disposition && disposition.indexOf('inline') !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
            var matches = filenameRegex.exec(disposition)
            if (matches != null && matches[1]) {
              filename = matches[1].replace(/['"]/g, '')
            }
          }
          this.forceFileDownload(response, filename)
        })
        .catch((error) => {
          console.log('Erreur à la récupération du vcard')
          console.error(error)
        })
    },
    forceFileDownload (response, fileName) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
    }
  }
}
</script>
<style>
  .list-hotfix {
      flex: 1 1 auto !important;
      overflow: hidden;
  }

  @media screen and (max-width: 600px) {
    .hot-fix-for-list .list__tile {
        max-width: 47.5vw
    }
  }
</style>