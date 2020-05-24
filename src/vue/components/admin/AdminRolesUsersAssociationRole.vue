<template>
  <v-layout
    v-if="(roles && roles.length > 0)"
    row
    style="border-bottom: 1px solid #999;"
  >
    <v-flex class="associationCol1"
      ><div>
        <v-chip small :color="role.color" text-color="white"
          >{{ role._id }}
        </v-chip>
      </div></v-flex
    >
    <v-flex v-if="role._id !== 'MANAGER'" class="associationCol2"
      ><div>
        <ul>
          <li v-for="group in associationRole.groups">{{ group }}</li>
        </ul>
      </div></v-flex
    >
    <v-flex v-if="role._id !== 'MANAGER'" class="associationCol3"
      ><div>
        <ul>
          <li v-for="user in associationRole.users" v-html="getContact(user)" />
        </ul></div
    ></v-flex>
    <v-flex v-if="role._id !== 'MANAGER'" class="associationCol4">
      <div>
        <v-btn small flat icon color="primary">
          <v-icon @click="editRole()">edit</v-icon>
        </v-btn>
      </div>
    </v-flex>
    <v-flex v-if="role._id === 'MANAGER'" class="associationColManager">
      <div>
        <v-alert :value="true" type="warning" outline color="info"
          >Le ROLE manager est automatiquement attribué aux managers dans
          l'API</v-alert
        >
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Do from '../../../const/do'
export default {
  name: 'adminRolesUsersAssociationRolesComponent',
  components: {},
  computed: {
    ...mapState({
      roles: (state) => state.access.rolesUsersList
    }),
    currentAssociationRole: {
      get: function () {
        return this.$store.state.access.currentAssociationRole
      },
      set: function (val) {
        this.$store.state.access.currentAssociationRole = val
      }
    },
    role: {
      get: function () {
        let returnRole
        if (!this.roles || this.roles.length <= 0) {
          console.log('this.roles n est pas encore initialisé')
          return null
        }
        for (let index = 0; index < this.roles.length; index++) {
          const role = this.roles[index]

          if (this.associationRole._id === role._id) {
            returnRole = role
            break
          }
        }
        return returnRole
      },
      set: function (val) {
        console.log('not used')
      }
    },
    contact: {
      get: function () {
        let returnRole
        this.roles.forEach((element) => {
          if (this.associationRole._id === element._id) {
            returnRole = element
          }
        })
        return returnRole
      },
      set: function (val) {
        console.log('not used')
      }
    }
  },
  props: ['associationRole'],
  mounted: function () {
    // console.log('youpiiiii', this.associationRole)
    // this.loadUserRoles()
  },
  methods: {
    getContact(user) {
      return `<span>${user.prenom} ${user.nom}</span>`
    },
    ...mapMutations({
      showRoleUserDialog: Do.SHOW_USERS_ROLE_DIALOG
    }),
    editRole() {
      this.currentAssociationRole = this.associationRole
      this.showRoleUserDialog()
    }
  },
  data() {
    return {}
  }
}
</script>
<style>
.associationCol1 {
  width: 30%;
}
.associationCol2 {
  width: 32%;
}
.associationCol3 {
  width: 32%;
}
.associationCol4 {
  width: 5%;
}
.associationColManager {
  width: 69%;
}
</style>
