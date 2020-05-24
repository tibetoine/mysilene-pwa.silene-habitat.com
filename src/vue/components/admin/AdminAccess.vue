<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm12 offset-sm3>
        <v-alert :value="isPermissionsDirty" type="info">
          <div class="text-xs-center">
            <p>
              Attention des modifications au niveau des permissions n'ont pas
              été sauvegardées
            </p>
            <v-btn color="success" @click="savePermissions()"
              >Enregistrer</v-btn
            >
            <v-btn color="error" @click="resetPermissions()"
              >Annuler les modifications</v-btn
            >
          </div>
        </v-alert>
        <v-alert :value="isRolesUsersDirty" type="info">
          <div class="text-xs-center">
            <p>
              Attention des modifications au niveaux des roles n'ont pas été
              sauvegardées
            </p>
            <v-btn color="success" @click="saveUsersRoles()">Enregistrer</v-btn>
            <v-btn color="error" @click="resetUsersRoles()"
              >Annuler les modifications</v-btn
            >
          </div>
        </v-alert>
        <v-spacer style="margin-top: 20px;"></v-spacer>
        <admin-roles></admin-roles>
        <v-spacer style="margin-top: 20px;"></v-spacer>
        <admin-roles-users></admin-roles-users>
        <v-spacer style="margin-top: 20px;"></v-spacer>
        <admin-roles-permissions></admin-roles-permissions>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import AdminRoles from './AdminRoles'
import AdminRolesUsers from './AdminRolesUsers'
import AdminRolesPermissions from './AdminRolesPermissions'
import On from '../../../const/on'
import Do from '../../../const/do'

export default {
  name: 'adminAccessComponent',
  components: { AdminRoles, AdminRolesUsers, AdminRolesPermissions },

  computed: {
    ...mapState({
      users: (state) => state.users.usersList
    }),
    ...mapGetters({
      isPermissionsDirty: 'isPermissionsDirty',
      isRolesUsersDirty: 'isRolesUsersDirty'
    })
  },
  mounted: function () {
    this.loadUsers()
  },
  methods: {
    ...mapActions({
      loadUsers: On.LOAD_USERS,
      savePermissions: On.SAVE_PERMISSIONS_ROLE,
      saveUsersRoles: On.SAVE_ACCESS_USERS_ROLE
    }),
    ...mapMutations({
      resetPermissions: Do.RESET_ACCESS_PERMISSIONS,
      resetUsersRoles: Do.RESET_ACCESS_USERS_ROLES
    }),
    initDelete() {
      this.visible = true
    },
    deleteRole() {
      console.log('deleteRole not implemented')
    }
  },
  data() {
    return {
      selectedUser: '',
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
