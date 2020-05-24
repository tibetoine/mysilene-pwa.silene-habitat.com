<template>
  <div>
    <v-card>
      <v-toolbar>
        <v-btn icon>
          <v-icon>verified_user</v-icon>
        </v-btn>
        <v-toolbar-title>ROLES</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="addRole()">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
      <div style="padding: 10px;">
        <template v-for="role in roles">
          <v-chip :color="role.color" text-color="white"
            >{{ role._id }}
            <v-tooltip left>
              <v-icon right small slot="activator">info</v-icon>
              <span>{{ role.description }}</span>
            </v-tooltip>
            <v-icon right small @click="editRole(role)">edit</v-icon>
            <v-icon right small @click.stop="delRole(role)">delete</v-icon>
          </v-chip>
        </template>
      </div>
    </v-card>
    <admin-roles-dialog />
    <confirm ref="confirm"></confirm>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import On from '../../../const/on'
import Do from '../../../const/do'
import AdminRolesDialog from './AdminRolesDialog'
import Confirm from '../Confirm'

export default {
  name: 'adminRolesComponent',
  components: { AdminRolesDialog, Confirm },
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
  created: async function () {
    await this.loadRoles()
  },
  methods: {
    ...mapActions({
      loadRoles: On.LOAD_ACCESS_ROLES_AND_PERMISSIONS,
      deleteRole: On.DELETE_ACCESS_ROLE
    }),
    ...mapMutations({
      showRoleDialog: Do.SHOW_ROLE_DIALOG
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
    },
    editRole(role) {
      role.mode = 'edit'
      this.currentRole = role
      this.showRoleDialog()
    },
    addRole() {
      this.currentRole = this.$store.state.access.newRole
      this.showRoleDialog()
    }
  },
  data() {
    return {
      visible: false,
      confirmText: '',
      btnDisabled: false,
      confirmRules: [
        (v) => !!v || 'Confirmation est requise',
        (v) => v === this.selectedUser || 'Veuillez confirmer'
      ]
    }
  }
}
</script>
