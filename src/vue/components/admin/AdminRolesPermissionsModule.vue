<template>
  <v-layout
    v-if="(permissions && permissions.length > 0)"
    row
    style="border-bottom: 1px solid #999;"
  >
    <v-flex class="permissionsCol1"
      ><div>
        <p>{{ permission._id }}</p>
      </div></v-flex
    >
    <v-flex class="permissionsCol2"
      ><div>
        <v-chip
          v-for="role in permission.roles"
          :key="role._id"
          small
          :color="role.color"
          text-color="white"
          >{{ role._id }}
        </v-chip>
      </div></v-flex
    >

    <v-flex class="permissionsCol3">
      <div>
        <v-btn small flat icon color="primary">
          <v-icon @click="editPermission(permission)">edit</v-icon>
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Do from '../../../const/do'
export default {
  name: 'adminRolesPermissionsModuleComponent',
  components: {},
  computed: {
    ...mapState({
      permissions: (state) => state.access.permissionsList
    }),
    currentPermission: {
      get: function () {
        return this.$store.state.access.currentPermission
      },
      set: function (val) {
        this.$store.state.access.currentPermission = val
      }
    }
  },
  props: ['permission'],
  mounted: function () {},
  methods: {
    ...mapMutations({
      showRolePermissionsDialog: Do.SHOW_PERMISSIONS_ROLE_DIALOG
    }),
    editPermission(permission) {
      console.log('TODO', permission)
      this.currentPermission = permission
      this.showRolePermissionsDialog()
    }
  },
  data() {
    return {}
  }
}
</script>
<style>
.permissionsCol1 {
  width: 40%;
}
.permissionsCol2 {
  width: 54%;
}
.permissionsCol3 {
  width: 5%;
}
</style>
