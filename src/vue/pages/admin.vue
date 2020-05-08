<template>
  <v-container style="margin-top: 50px;" v-if="isAdmin">
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

  <v-container style="margin-top: 50px;" v-else>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-alert :value="true" type="error">
          Accès interdit - Veuillez contacter le service informatique
        </v-alert>
      </v-flex>
    </v-layout>
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
