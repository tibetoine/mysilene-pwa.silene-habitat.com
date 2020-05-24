<template>
  <v-card>
    <v-toolbar dense>
      <v-btn icon>
        <v-icon>calendar_today</v-icon>
      </v-btn>
      <v-toolbar-title>Travailleurs du samedi</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-if="showSearchUser"
        append-icon="close"
        :append-icon-cb="hideSearch"
        v-model="searchUser"
        solo
        hide-details
        single-line
      ></v-text-field>
      <v-btn icon v-else>
        <v-icon @click="showSearchUser = true">search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon @click="addUser()">person_add</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- Ici la liste des contacts travaillant le samedi -->
    <v-list v-if="visiblePages.length > 0">
      <template v-for="(user, index) in visiblePages">
        <v-list-tile :key="user._id">
          <v-list-tile-action>
            <v-icon @click="deleteUser(user)">delete</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{ user.givenName }} {{ user.sn }}
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
    <v-alert type="info" :value="true" v-else>
      Aucun travailleur du samedi
    </v-alert>
    <shift-saturday-dialog-add></shift-saturday-dialog-add>
  </v-card>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import On from '../../const/on'
import ShiftSaturdayDialogAdd from './ShiftSaturdayDialogAdd'
import Confirm from './Confirm'
import { removeAccent } from '../../shared/helper'
export default {
  name: 'saturdayComp',
  components: { Confirm, ShiftSaturdayDialogAdd },
  props: [],
  data() {
    return {
      showSearchUser: false,
      searchUser: '',
      page: 1,
      perPage: 3
    }
  },
  mounted: function () {},
  computed: {
    ...mapGetters({
      travailleursDuSamedi: 'travailleursDuSamedi'
    }),
    filteredContacts: {
      get: function () {
        // console.log(this.travailleursDuSamedi)
        let filteredContacts = this.travailleursDuSamedi.filter((contact) => {
          let isFiltered = false
          isFiltered =
            isFiltered ||
            removeAccent(contact.givenName)
              .toLowerCase()
              .indexOf(this.searchUser.toLowerCase()) > -1
          if (contact.nom != null) {
            isFiltered =
              isFiltered ||
              removeAccent(contact.sn)
                .toLowerCase()
                .indexOf(this.searchUser.toLowerCase()) > -1
          }
          return isFiltered
        })
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
    ...mapActions({
      deleteSaturday: On.DELETE_CONTACT_SATURDAY
    }),
    ...mapMutations({}),
    hideSearch() {
      this.showSearchUser = false
    },
    addUser() {
      this.searchUser = ''
      this.$store.state.shift.shiftSaturdayShowDialogAdd = true
    },
    deleteUser(user) {
      this.deleteSaturday(user.sAMAccountName)
    }
  }
}
</script>
