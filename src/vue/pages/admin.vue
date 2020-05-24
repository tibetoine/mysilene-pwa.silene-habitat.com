<template>
  <v-container style="margin-top: 50px;">
    <admin-users v-if="activeMenu === 'users'"></admin-users>
    <admin-access v-if="activeMenu === 'access'"></admin-access>
    <v-bottom-nav
      :value="true"
      :active.sync="activeMenu"
      absolute
      color="transparent"
    >
      <v-btn flat color="primary" value="access">
        <span>Droits</span>
        <v-icon>verified_user</v-icon>
      </v-btn>
      <v-btn flat color="primary" value="users">
        <span>Utilisateurs</span>
        <v-icon>supervisor_account</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-container>
</template>

<script>
// import { mapState } from 'vuex'
// import FileLine from '../components/FileLine'
import AdminUsers from '../components/admin/AdminUsers'
import AdminAccess from '../components/admin/AdminAccess'

export default {
  name: 'admin',
  components: { AdminUsers, AdminAccess },
  computed: {
    isAdmin: {
      get: function () {
        if (this.$store.state.login.isAdmin) {
          return true
        }
        return false
      }
    }
  },
  data() {
    return {
      activeMenu: 'access'
    }
  }
}
</script>
