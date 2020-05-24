<template>
  <div>
    <v-card>
      <v-toolbar>
        <v-btn icon>
          <v-icon>verified_user</v-icon>
        </v-btn>
        <v-toolbar-title>Permissions par module</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-card>
    <!-- <admin-roles-users-dialog /> -->
    <v-container v-if="permissions">
      <v-layout column>
        <v-flex v-for="permission in permissions" v-bind:key="permissions._id">
          <admin-roles-permissions-module
            :permission="permission"
          ></admin-roles-permissions-module>
        </v-flex>
      </v-layout>
    </v-container>
    <admin-roles-permissions-module-dialog />
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
// import On from '../../../const/on'
// import Do from '../../../const/do'
import AdminRolesPermissionsModule from './AdminRolesPermissionsModule'
import AdminRolesPermissionsModuleDialog from './AdminRolesPermissionsModuleDialog'

export default {
  name: 'adminRolesPermissionsComponent',
  components: {
    AdminRolesPermissionsModule,
    AdminRolesPermissionsModuleDialog
  },
  computed: {
    ...mapState({
      permissions: (state) => state.access.permissionsList
    })
  },
  mounted: function () {
    /* Les données de référence sont chargés à partir de App.vue */
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({})
  },
  data() {
    return {
      visible: false
    }
  }
}
</script>
