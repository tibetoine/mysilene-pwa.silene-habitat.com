<template>
  <v-dialog
    v-model="visible"
    transition="dialog-bottom-transition"
    :overlay="true"
  >
    <v-card tile>
      <v-toolbar>
        <v-toolbar-title>Association Rôles - Users - Groups</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="visible = !visible">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- Choix du rôle -->
      <v-form style="padding: 5px;" v-model="valid">
        <v-select
          :items="usersRoles"
          v-model="currentAssociationRole"
          label="Rôle à modifier ou compléter"
          item-text="_id"
          item-value="_id"
          chips
          max-height="auto"
          :return-object="true"
          solo
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              :selected="data.selected"
              :key="data.item._id"
              @input="data.parent.selectItem(data.item)"
              :color="data.item.color"
              text-color="white"
            >
              {{ data.item._id }}
            </v-chip>
          </template>
          <template slot="item" slot-scope="data">
            <v-chip small :color="data.item.color" text-color="white">
              {{ data.item._id }}
            </v-chip>
          </template>
        </v-select>

        <!-- Users associés au rôle -->
        <v-card v-if="currentAssociationRole && currentAssociationRole.users">
          <v-toolbar>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title v-if="!showSearchUser">Users</v-toolbar-title>
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
          <v-list v-if="currentAssociationRole">
            <template v-for="(user, index) in visiblePages">
              <v-list-tile :key="user._id">
                <v-list-tile-action>
                  <v-icon @click="deleteUser(user)">delete</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  {{ user.prenom }} {{ user.nom }}
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
          <div class="text-xs-center">
            <v-pagination
              v-if="filteredUsers.length > 3"
              v-model="page"
              :length="Math.ceil(filteredUsers.length / perPage)"
            ></v-pagination>
          </div>
        </v-card>
        <v-alert v-else :value="true" type="error">
          Aucun rôle choisi
        </v-alert>

        <!-- Groups associés au rôle -->
        <v-spacer style="margin-top: 20px;"></v-spacer>
        <v-card v-if="currentAssociationRole && currentAssociationRole.users">
          <v-toolbar>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title v-if="!showSearchGroup">Groups</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-if="showSearchGroup"
              append-icon="close"
              :append-icon-cb="hideSearchGroup"
              v-model="searchGroup"
              solo
              hide-details
              single-line
            ></v-text-field>
            <v-btn icon v-else>
              <v-icon @click="showSearchGroup = true">search</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon @click="addGroup()">group_add</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list v-if="currentAssociationRole">
            <template v-for="(group, index) in visibleGroupsPages">
              <v-list-tile :key="index">
                <v-list-tile-action>
                  <v-icon @click="deleteGroup(group)">delete</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  {{ group }}
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
          <div class="text-xs-center">
            <v-pagination
              v-if="filteredGroups.length > 3"
              v-model="pageGroup"
              :length="Math.ceil(filteredGroups.length / perPageGroup)"
            ></v-pagination>
          </div>
        </v-card>
      </v-form>
    </v-card>
    <AdminRolesUsersDialogAdd
      :role="currentAssociationRole"
    ></AdminRolesUsersDialogAdd>
    <AdminRolesGroupsDialogAdd
      :role="currentAssociationRole"
    ></AdminRolesGroupsDialogAdd>
  </v-dialog>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import On from '../../../const/on'
import Do from '../../../const/do'
import AdminRolesUsersDialogAdd from './AdminRolesUsersDialogAdd'
import AdminRolesGroupsDialogAdd from './AdminRolesGroupsDialogAdd'
import { removeAccent } from '../../../shared/helper'
export default {
  name: 'adminRoleUsersDialog',
  props: ['role'],
  components: {
    AdminRolesUsersDialogAdd,
    AdminRolesGroupsDialogAdd
  },
  data() {
    return {
      toggle_color: '',
      unknowRoleId: 'NON DEFINI',
      valid: false,
      showSearchUser: false,
      showSearchGroup: false,
      searchUser: '',
      searchGroup: '',
      page: 1,
      perPage: 3,
      pageGroup: 1,
      perPageGroup: 3,
      idRules: [
        (v) => !!v || 'La nom de rôle est requis',
        (v) =>
          (v && v.length <= 20) || 'Le rôle doit faire moins de 20 caractères'
      ],
      descriptionRules: [
        (v) => !!v || 'La description de rôle est requise',
        (v) =>
          (v && v.length <= 400) ||
          'La description doit faire moins de 400 caractères'
      ]
    }
  },
  methods: {
    ...mapActions({
      editRole: On.EDIT_ACCESS_ROLE,
      saveRole: On.ADD_ACCESS_ROLE
    }),
    ...mapMutations({
      hideRoleDialog: Do.HIDE_ROLE_DIALOG,
      showRoleUserAddDialog: Do.SHOW_USERS_ROLE_ADD_DIALOG,
      showRoleGroupAddDialog: Do.SHOW_GROUPS_ROLE_ADD_DIALOG
    }),
    addUser() {
      console.log('yop')
      this.searchUser = ''
      this.showRoleUserAddDialog()
    },
    deleteUser(user) {
      let index = this.currentAssociationRole.users.indexOf(user)
      if (index > -1) {
        this.currentAssociationRole.users.splice(index, 1)
      }
    },
    addGroup() {
      console.log('yop group')
      this.searchGroup = ''
      this.showRoleGroupAddDialog()
    },
    deleteGroup(group) {
      let index = this.currentAssociationRole.groups.indexOf(group)
      if (index > -1) {
        this.currentAssociationRole.groups.splice(index, 1)
      }
    },
    hideSearch() {
      this.showSearchUser = false
    },
    hideSearchGroup() {
      this.showSearchGroup = false
    },
    clear() {
      /* TODO */
    }
  },
  watch: {
    /* currentAssociationRole(n, o) {
      console.log('currentAssociationRole ', o, n)
    } */
  },
  updated: function () {},
  computed: {
    visible: {
      get: function () {
        return this.$store.state.access.rolesUsersShowDialog
      },
      set: function (val) {
        this.$store.state.access.rolesUsersShowDialog = val
      }
    },
    filteredUsers: {
      get: function () {
        let filteredUsers
        if (
          !this.$store.state.access.currentAssociationRole ||
          !this.$store.state.access.currentAssociationRole.users ||
          this.$store.state.access.currentAssociationRole.users.length <= 0
        ) {
          return []
        }
        console.log(this.$store.state.access.currentAssociationRole.users)
        filteredUsers = this.$store.state.access.currentAssociationRole.users.filter(
          (user) => {
            let isFiltered = false
            isFiltered =
              isFiltered ||
              removeAccent(user.prenom)
                .toLowerCase()
                .indexOf(this.searchUser.toLowerCase()) > -1
            if (user.nom != null) {
              isFiltered =
                isFiltered ||
                removeAccent(user.nom)
                  .toLowerCase()
                  .indexOf(this.searchUser.toLowerCase()) > -1
            }
            return isFiltered
          }
        )
        return filteredUsers
      },
      set: function (val) {
        // not to use
      }
    },
    visiblePages() {
      return this.filteredUsers.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      )
    },
    filteredGroups: {
      get: function () {
        let filteredGroups
        if (
          !this.$store.state.access.currentAssociationRole ||
          !this.$store.state.access.currentAssociationRole.groups ||
          this.$store.state.access.currentAssociationRole.groups.length <= 0
        ) {
          return []
        }
        console.log(this.$store.state.access.currentAssociationRole.groups)
        filteredGroups = this.$store.state.access.currentAssociationRole.groups.filter(
          (group) => {
            return (
              removeAccent(group)
                .toLowerCase()
                .indexOf(this.searchGroup.toLowerCase()) > -1
            )
          }
        )
        return filteredGroups
      },
      set: function (val) {
        // not to use
      }
    },
    visibleGroupsPages() {
      return this.filteredGroups.slice(
        (this.pageGroup - 1) * this.perPageGroup,
        this.pageGroup * this.perPageGroup
      )
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
    ...mapState({
      contacts: (state) => state.contacts.fullList,
      usersRoles: (state) => state.access.rolesUsersList
    })
  }
}
</script>
