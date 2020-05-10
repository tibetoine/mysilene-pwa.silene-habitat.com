<template>
  <div>
    <v-card>
      <v-toolbar>
        <v-btn icon>
          <v-icon>verified_user</v-icon>
        </v-btn>
        <v-toolbar-title>Permissions</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="addPermission()">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <!-- <admin-roles-users-dialog /> -->
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
// import On from '../../../const/on'
// import Do from '../../../const/do'

export default {
  name: 'adminRolesPermissionsComponent',
  components: {},
  computed: {
    ...mapState({})
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
