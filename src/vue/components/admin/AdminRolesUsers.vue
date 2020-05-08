<template>
  <div>
    <v-card>
      <v-toolbar>
        <v-btn icon>
          <v-icon>verified_user</v-icon>
        </v-btn>
        <v-toolbar-title>Association des rôles</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="addRole()">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <v-layout column>
          <v-flex
            v-for="associationRole in associationRoles"
            v-bind:key="associationRole._id"
          >
            <admin-roles-users-association-role
              :associationRole="associationRole"
            ></admin-roles-users-association-role>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <admin-roles-users-dialog />
    <confirm ref="confirm"></confirm>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import On from '../../../const/on'
import Do from '../../../const/do'
import AdminRolesUsersDialog from './AdminRolesUsersDialog'
import AdminRolesUsersAssociationRole from './AdminRolesUsersAssociationRole'
import Confirm from '../Confirm'

export default {
  name: 'adminRolesUsersComponent',
  components: {
    AdminRolesUsersDialog,
    AdminRolesUsersAssociationRole,
    Confirm
  },
  computed: {
    ...mapState({
      roles: (state) => state.access.rolesUsersList
    }),
    currentRole: {
      get: function () {
        return this.$store.state.access.currentRole
      },
      set: function (val) {
        this.$store.state.access.currentRole = val
      }
    }
  },
  mounted: function () {
    this.loadUserRoles()
  },
  methods: {
    ...mapActions({
      loadUserRoles: On.LOAD_ACCESS_USERS_ROLES,
      deleteRole: On.DELETE_ACCESS_ROLE
    }),
    ...mapMutations({
      showRoleUserDialog: Do.SHOW_USERS_ROLE_DIALOG
    }),
    initDelete() {
      this.visible = true
    },
    delRole(role) {
      this.$refs.confirm
        .open(
          'Supprimer un rôle',
          'Etes-vous sûr de vouloir supprimer ce rôle ? /!\\ Attention, en supprimant ce rôles, les droits associés seront supprimés /!\\ ',
          { color: 'red' }
        )
        .then((confirm) => {
          if (confirm) {
            this.deleteRole(role)
          }
        })
      console.log('deleteRole')
    },
    editRole(role) {
      role.mode = 'edit'
      this.currentRole = role
      this.showRoleUserDialog()
      console.log('edit', role)
      console.log('editRole')
    },
    addRole() {
      this.currentRole = this.$store.state.access.newRole
      this.showRoleUserDialog()
    }
  },
  data() {
    return {
      visible: false,
      confirmText: '',
      btnDisabled: false,
      associationRoles: [
        { _id: 'ALL', groups: ['_Silène'], users: [] },
        { _id: 'MANAGER', groups: [], users: ['coupeau', 'clouet'] },
        { _id: 'ADMIN', groups: ['_Informatique'], users: [] },
        {
          _id: 'RH',
          groups: ['_Ressources humaines'],
          users: ['michelot', 'anonyme']
        }
      ],
      confirmRules: [
        (v) => !!v || 'Confirmation est requise',
        (v) => v === this.selectedUser || 'Veuillez confirmer'
      ]
    }
  }
}
</script>
