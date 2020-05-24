<template>
  <v-dialog
    v-model="visible"
    transition="dialog-bottom-transition"
    :overlay="true"
    style="margin: 10px;"
  >
    <v-card tile>
      <v-toolbar>
        <v-toolbar-title>Ajouter un travailleur du samedi</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="visible = !visible">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <!--  Contacts avec Pagination et recherche -->
      <v-text-field
        v-model="searchContact"
        append-icon="search"
        solo
        label="Chercher un contact"
      ></v-text-field>
      <v-list>
        <template v-for="(contact, index) in visiblePages">
          <v-list-tile :key="contact.sAMAccountName">
            <v-list-tile-action>
              <v-icon @click="addContact(contact)">person_add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              {{ contact.givenName }} {{ contact.sn }}
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
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { removeAccent } from '../../shared/helper'
import On from '../../const/on'
export default {
  name: 'shiftSaturdayDialogAdd',
  props: [],
  data() {
    return {
      valid: false,
      searchContact: '',
      page: 1,
      perPage: 3
    }
  },
  methods: {
    ...mapActions({
      addContactSaturday: On.ADD_CONTACT_SATURDAY
    }),
    ...mapMutations({}),
    addContact(contact) {
      this.addContactSaturday(contact.sAMAccountName)
    }
  },
  computed: {
    visible: {
      get: function () {
        return this.$store.state.shift.shiftSaturdayShowDialogAdd
      },
      set: function (val) {
        this.$store.state.shift.shiftSaturdayShowDialogAdd = val
      }
    },
    filteredContacts: {
      get: function () {
        let filteredContacts
        if (
          !this.$store.state.contacts ||
          !this.$store.state.contacts.fullList ||
          this.$store.state.contacts.fullList.length <= 0
        ) {
          return []
        }
        filteredContacts = this.$store.state.contacts.fullList.filter(
          (contact) => {
            if (contact.saturday === true) return false
            let isFiltered = false
            isFiltered =
              isFiltered ||
              removeAccent(contact.givenName)
                .toLowerCase()
                .indexOf(this.searchContact.toLowerCase()) > -1
            if (contact.sn != null) {
              isFiltered =
                isFiltered ||
                removeAccent(contact.sn)
                  .toLowerCase()
                  .indexOf(this.searchContact.toLowerCase()) > -1
            }
            return isFiltered
          }
        )
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
    },
    ...mapState({
      contacts: (state) => state.contacts.fullList
    })
  }
}
</script>
