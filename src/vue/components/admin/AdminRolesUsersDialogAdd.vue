<template>
  <v-dialog
    v-model="visible"
    transition="dialog-bottom-transition"
    :overlay="true"
    style="margin: 10px;"
  >
    <v-card tile>
      <v-toolbar>
        <v-toolbar-title
          >Ajouter un utilisateur au rôle [{{ role._id }}]</v-toolbar-title
        >
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
      <v-list v-if="currentAssociationRole">
        <template v-for="(contact, index) in visiblePages">
          <v-list-tile :key="contact.sAMAccountName">
            <v-list-tile-action>
              <v-icon @click="addContact(contact)">person_add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              {{ contact.givenName }} {{ contact.sn }} ({{
                contact.sAMAccountName
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
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Do from '../../../const/do'
import { removeAccent } from '../../../shared/helper'
export default {
  name: 'adminRoleUsersAddDialog',
  props: ['role'],
  data() {
    return {
      valid: false,
      searchContact: '',
      page: 1,
      perPage: 3
    }
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({
      hideRoleAddDialog: Do.HIDE_ROLE_ADD_DIALOG
    }),
    clear() {
      /* TODO */
    },
    addContact(contact) {
      /* Vérifie si n'existe pas déjà  */
      for (
        let index = 0;
        index < this.currentAssociationRole.users.length;
        index++
      ) {
        const user = this.currentAssociationRole.users[index]
        if (user._id === contact.sAMAccountName) {
          /* On sort de la méthode et du coup on ne fait rien */
          return
        }
      }
      this.currentAssociationRole.users.push({
        _id: contact.sAMAccountName,
        prenom: contact.givenName,
        nom: contact.sn
      })
    }
  },
  watch: {},
  updated: function () {},
  computed: {
    visible: {
      get: function () {
        return this.$store.state.access.rolesUsersShowDialogAdd
      },
      set: function (val) {
        this.$store.state.access.rolesUsersShowDialogAdd = val
      }
    },
    currentAssociationRole: {
      get: function () {
        return this.$store.state.access.currentAssociationRole
      },
      set: function (val) {
        console.log('Ouaip ! ', val)
        this.$store.state.access.currentAssociationRole = val
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
            if (
              this.$store.state.access.currentAssociationRole &&
              this.$store.state.access.currentAssociationRole.users
            ) {
              for (
                let index = 0;
                index <
                this.$store.state.access.currentAssociationRole.users.length;
                index++
              ) {
                const user = this.$store.state.access.currentAssociationRole
                  .users[index]
                if (user._id === contact.sAMAccountName) {
                  return false
                }
              }
            }
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
      contacts: (state) => state.contacts.fullList,
      usersRoles: (state) => state.access.rolesUsersList
    })
  }
}
</script>
