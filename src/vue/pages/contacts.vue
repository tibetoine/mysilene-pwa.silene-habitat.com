<template>
  <v-container style="margin-top:50px;">
    <contact-dialog/>
    <v-snackbar
      :timeout="timeout"
      top
      right
      multi-line
      color="info"
      v-model="snackbar"
    >
      <v-icon dark >error_outline</v-icon>
      {{ text }}
      <v-btn flat color="white" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
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
                <v-list-tile avatar :key="contact._id" @click="goToContact(contact, contact._id)">
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
                </v-list-tile>
              </template>
              <v-progress-linear :indeterminate="true" v-if="busy"></v-progress-linear>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { debounce } from 'lodash'
import Do from '../../const/do'
import On from '../../const/on'
import ContactDialog from '../dialogs/ContactDialog'

export default {
  components: { ContactDialog },
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
  computed: {
    ...mapState({
      filterSst: state => state.contacts.filterSst,
      selectedContact: state => state.selectedContact,
      visibleContacts: state => state.contacts.visibleList,
      auth: state => state.login.Authenticate
    }),
    ...mapGetters({ contacts: 'partialContacts' }),
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
      this.$store.state.contacts.search = value
      this.filterChanged()
    }, 300),
    loadMore: function () {
      // console.log('load more contacts...')
      this.busy = true
      this.showMore()
      setTimeout(() => {
        this.busy = false
      }, 1000)
    },
    imgsrc: contact =>
      '/static/img/ad-photos/' +
      (contact.thumbnailPhoto ? contact.sAMAccountName : 'default') +
      '.jpg',
    doFilterSst () {
      this.search = ''
      this.filterSst ? (this.filterSst = false) : (this.filterSst = true)
    },
    goToContact: function (contact, contactId) {
      // console.log('Contact : ' + contact + ' contactId : ' + contactId)
      this.$store.state.selectedContact = contact
      this.showDialog()
    }
  }
}
</script>
