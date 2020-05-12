<template>
  <v-dialog
    v-model="visible"
    transition="dialog-bottom-transition"
    :overlay="true"
  >
    <v-card v-if="currentPermission" tile>
      <v-toolbar>
        <v-toolbar-title
          >Modification permissions pour le module
          {{ currentPermission._id }}</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn icon @click="visible = !visible">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- Container -->
      <v-container>
        <v-layout row style="border-bottom: 1px solid #999;">
          <v-flex>
            <v-card>
              <v-toolbar>
                <v-toolbar-title>Rôles actuels</v-toolbar-title>
              </v-toolbar>
              <v-list v-if="currentPermission">
                <template v-for="(role, index) in currentPermission.roles">
                  <v-list-tile :key="role._id">
                    <v-list-tile-content>
                      <v-chip small :color="role.color" text-color="white"
                        >{{ role._id }}
                      </v-chip>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon @click="removeRole(role)">arrow_forward</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card>
          </v-flex>

          <v-flex>
            <v-card>
              <v-toolbar>
                <v-toolbar-title>Rôles dispos</v-toolbar-title>
              </v-toolbar>
              <v-list v-if="otherRoles">
                <template v-for="(role, index) in otherRoles">
                  <v-list-tile :key="role._id">
                    <v-list-tile-action>
                      <v-icon @click="addRole(role)">arrow_backward</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-chip small :color="role.color" text-color="white"
                        >{{ role._id }}
                      </v-chip>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import On from '../../../const/on'
import Do from '../../../const/do'
export default {
  name: 'adminRolePermissionsModuleDialog',
  components: {},

  data() {
    return {}
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
    addRole(role) {
      console.log('yop add Role')
      this.currentPermission.roles.push(role)
    },
    removeRole(role) {
      let index = this.currentPermission.roles.indexOf(role)
      if (index > -1) {
        this.currentPermission.roles.splice(index, 1)
      }
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
        return this.$store.state.access.rolesPermissionsShowDialog
      },
      set: function (val) {
        this.$store.state.access.rolesPermissionsShowDialog = val
      }
    },
    currentPermission: {
      get: function () {
        return this.$store.state.access.currentPermission
      },
      set: function (val) {
        console.log('Ouaip ! ', val)
        this.$store.state.access.currentPermission = val
      }
    },
    otherRoles: {
      get: function () {
        let allRoles = this.$store.state.access.rolesList
        let returnRoles = []
        if (
          !this.currentPermission.roles ||
          this.currentPermission.roles.length <= 0
        ) {
          return allRoles
        }
        allRoles.forEach((role) => {
          let found = false
          this.currentPermission.roles.forEach((permissionRole) => {
            if (permissionRole._id === role._id) {
              found = true
            }
          })
          if (!found) {
            returnRoles.push(role)
          }
        })
        return returnRoles
      },
      set: function (val) {
        console.log('not to use')
      }
    },
    ...mapState({
      contacts: (state) => state.contacts.fullList,
      usersRoles: (state) => state.access.rolesUsersList
    })
  }
}
</script>
