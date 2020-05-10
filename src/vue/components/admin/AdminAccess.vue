<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm12 offset-sm3>
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
import { mapActions, mapState } from 'vuex'
import AdminRoles from './AdminRoles'
import AdminRolesUsers from './AdminRolesUsers'
import AdminRolesPermissions from './AdminRolesPermissions'
import On from '../../../const/on'

export default {
  name: 'adminAccessComponent',
  components: { AdminRoles, AdminRolesUsers, AdminRolesPermissions },
  computed: {
    ...mapState({
      users: (state) => state.users.usersList
    })
  },
  mounted: function () {
    this.loadUsers()
  },
  methods: {
    ...mapActions({
      loadUsers: On.LOAD_USERS
    }),
    initDelete() {
      this.visible = true
    },
    deleteRole() {
      console.log('deleteRole')
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
