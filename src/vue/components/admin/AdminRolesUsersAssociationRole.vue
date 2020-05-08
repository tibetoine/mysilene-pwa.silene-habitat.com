<template>
  <v-layout
    v-if="(roles && roles.length > 0)"
    row
    style="border-bottom: 1px solid #999;"
  >
    <v-flex class="col1"
      ><div>
        <v-chip small :color="role.color" text-color="white"
          >{{ role._id }}
        </v-chip>
      </div></v-flex
    >
    <v-flex class="col2"
      ><div>
        <ul>
          <li v-for="group in associationRole.groups">{{ group }}</li>
        </ul>
      </div></v-flex
    >
    <v-flex class="col3"
      ><div>
        <ul>
          <li v-for="user in associationRole.users" v-html="getContact(user)" />
        </ul></div
    ></v-flex>
    <v-flex class="col4">
      <div>
        <v-btn small flat icon color="primary">
          <v-icon>edit</v-icon>
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'adminRolesUsersAssociationRolesComponent',
  components: {},
  computed: {
    ...mapState({
      roles: (state) => state.access.rolesList,
      contacts: (state) => state.contacts.fullList
    }),
    role: {
      get: function () {
        let returnRole
        if (!this.roles || this.roles.length <= 0) {
          console.log('this.roles n est pas encore initialisé')
          return null
        } else {
          console.log('OK ! this.roles est init')
        }
        for (let index = 0; index < this.roles.length; index++) {
          const role = this.roles[index]

          console.log(
            'this.associationRole._id [%s] === element._id [%s] ',
            this.associationRole._id,
            role._id
          )
          if (this.associationRole._id === role._id) {
            returnRole = role
            break
          }
        }
        if (!returnRole) {
          console.log(
            'damnZ , returning nothing for : ',
            this.associationRole,
            returnRole
          )
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
        if (!returnRole) {
          console.log('damn2 , returning nothing for : ', this.associationRole)
        }
        return returnRole
      },
      set: function (val) {
        console.log('not user')
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
      // console.log('mmmm', this.contacts)
      // console.log('mmmm2', user)
      let returnContact = `<span style="color:red;">${user}</span>`
      for (let index = 0; index < this.contacts.length; index++) {
        const element = this.contacts[index]
        if (user === element.sAMAccountName) {
          console.log('trouvé')
          returnContact = `<span>${element.givenName} ${element.sn}</span>`
          break
        }
      }

      return returnContact
    }
  },
  data() {
    return {}
  }
}
</script>
<style>
.col1 {
  width: 30%;
}
.col2 {
  width: 32%;
}
.col3 {
  width: 32%;
}
.col4 {
  width: 5%;
}
</style>
