<template>
  <v-container style="margin-top:50px;">
    <v-layout row>
      <v-flex xs12 md9 offset-md3>
        <v-card>
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
              </v-flex>
            </v-layout>
          </v-container>
          <v-list two-line v-infinite-scroll="loadMore" infinite-scroll-distance="10">
              <template v-for="(contact, index) in visibleContacts">
                <v-divider></v-divider>
                <v-list-tile avatar :key="contact._id" @click="goToContact(contact, contact._id)">
                  <v-badge color="green" left v-if="contact.silenesst == '1'" overlap>
                    <v-icon slot="badge" dark small>local_hospital</v-icon>
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
                  <v-list-tile-action class="hidden-xs-only" v-on:click.stop="sendMail(contact.mail)">
                    <v-icon :color="contact.mail ? 'blue' : 'grey'">email</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-action class="hidden-xs-only" v-on:click.stop="callBryan(contact.telephoneNumber)">
                    <v-icon :color="contact.telephoneNumber ? 'blue' : 'grey'">phone</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-action class="hidden-xs-only" v-on:click.stop="textBryan(contact.mobile)">
                    <v-icon :color="contact.mobile ? 'blue' : 'grey'">chat</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-action class="hidden-xs-only" v-on:click.stop="callBryan(contact.mobile)">
                    <v-icon :color="contact.mobile ? 'blue' : 'grey'">phonelink_ring</v-icon>
                  </v-list-tile-action>

                  <!-- Responsive Design for mobile -->
                  <v-menu class="hidden-sm-and-up" @click.native.stop>
                    <v-btn icon slot="activator">
                      <v-icon>expand_more</v-icon>
                    </v-btn>
                    <v-list>
                      <!-- Mobile -->
                      <v-list-tile v-on:click.stop="callBryan(contact.mobile)">
                        <v-list-tile-action>
                          <v-icon :color="contact.mobile ? 'blue' : 'grey'">phonelink_ring</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>Mobile</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>

                      <!-- Phone -->
                      <v-list-tile v-on:click.stop="callBryan(contact.telephoneNumber)">
                        <v-list-tile-action>
                          <v-icon :color="contact.telephoneNumber ? 'blue' : 'grey'">phone</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>Fixe</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>

                      <!-- SMS -->
                      <v-list-tile v-on:click.stop="textBryan(contact.mobile)">
                        <v-list-tile-action>
                          <v-icon :color="contact.mobile ? 'blue' : 'grey'">chat</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>SMS</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>

                      <!-- Mail -->
                      <v-list-tile>
                        <v-list-tile-action v-on:click.stop="sendMail(contact.mail)">
                          <v-icon :color="contact.mail ? 'blue' : 'grey'">email</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>Mail</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>


                    </v-list>
                  </v-menu>
                </v-list-tile>
              </template>
            </div>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
  import {debounce} from 'lodash'
  import Do from "../../const/do";
  import On from "../../const/on";

export default {
  name: 'contacts',
  data: () => ({
    items: [
      { icon: 'email', title: 'Mail' },
      { icon: 'phone', title: 'Phone' },
      { icon: 'chat', title: 'Chat' },
      { icon: 'phonelink_ring', title: 'Mobile' }
    ],
    busy: false,
    dialog: false,
    countLoaded: 0
  }),
  computed: {
    ...mapState({
      filterSst: state => state.contacts.filterSst,
      selectedContact: state => state.selectedContact,
      visibleContacts: state => state.contacts.visibleList
    }),
    ...mapGetters({ contacts: 'partialContacts' }),
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
    }
  },
  beforeUpdate: function () {
    updateT = Date.now()
  },
  updated: function () {
    console.log("updated in", Date.now() - updateT, "ms")
  },
  methods: {
    ...mapActions({
      filterChanged: On.UPDATE_FILTERED_CONTACTS,
    }),
    ...mapMutations({
      showMore: Do.SHOW_MORE_CONTACTS
    }),
    setSearch: debounce(function (value) {
      this.$store.state.contacts.search = value;
      this.filterChanged();
    }, 300),
    loadMore: function () {
      console.log("load more contacts...");
      this.busy = true
      this.showMore();
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
      // this.$router.push({ path: 'contactModal', params: { contactId }})
      // this.$router.push({ name: 'contactModal', params: { contactId }})
      this.$router.push({ path: `/contacts/${contactId}` })
    },
    sendMail (mail) {
      if (mail) window.location = 'mailto:' + mail
    },
    callBryan (mobile) {
      if (mobile) window.location = 'tel:' + mobile
    },
    textBryan (mobile) {
      if (mobile) window.location = 'sms:' + mobile
    }
  }
}
</script>
