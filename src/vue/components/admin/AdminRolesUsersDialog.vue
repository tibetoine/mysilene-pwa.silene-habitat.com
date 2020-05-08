<template>
  <v-dialog
    v-model="visible"
    transition="dialog-bottom-transition"
    :overlay="true"
  >
    <v-card tile>
      <v-toolbar>
        <v-btn icon>
          <v-icon>{{
            currentAssociationRole.mode === 'edit' ? 'edit' : 'add'
          }}</v-icon>
        </v-btn>
        <v-toolbar-title>Association Rôles - Users - Groups</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="visible = !visible">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- Choix du rôle -->
      <v-form style="padding: 5px;" v-model="valid">
        <v-select
          :items="roles"
          v-model="currentAssociationRole"
          label="Rôle à modifier ou compléter"
          item-text="_id"
          item-value="_id"
          chips
          max-height="auto"
          autocomplete
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              :selected="data.selected"
              :key="data.item._id"
              class="chip--select-multi"
              @input="data.parent.selectItem(data.item)"
              :color="data.item.color"
              text-color="white"
            >
              {{ data.item._id }}
            </v-chip>
          </template>
          <template slot="item" slot-scope="data">
            <v-chip small :color="data.item.color" text-color="white">
              {{ data.item._id }}
            </v-chip>
          </template>
        </v-select>

        <!-- Users associés au rôle -->
        <v-card>
          <v-toolbar>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>Users</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list two-line>
            <template v-for="(item, index) in items">
              <v-subheader v-if="item.header" :key="item.header">{{
                item.header
              }}</v-subheader>
              <v-divider
                v-else-if="item.divider"
                :inset="item.inset"
                :key="index"
              ></v-divider>
              <v-list-tile v-else :key="item.title" avatar @click="">
                <v-list-tile-avatar>
                  <img :src="item.avatar" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  <v-list-tile-sub-title
                    v-html="item.subtitle"
                  ></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>

        <!-- Groups associés au rôle -->
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import On from '../../../const/on'
import Do from '../../../const/do'
export default {
  name: 'adminRoleDialog',
  props: ['role'],
  data() {
    return {
      toggle_color: '',
      unknowRoleId: 'NON DEFINI',
      valid: false,
      idRules: [
        (v) => !!v || 'La nom de rôle est requis',
        (v) =>
          (v && v.length <= 20) || 'Le rôle doit faire moins de 20 caractères'
      ],
      descriptionRules: [
        (v) => !!v || 'La description de rôle est requise',
        (v) =>
          (v && v.length <= 400) ||
          'La description doit faire moins de 400 caractères'
      ]
    }
  },
  methods: {
    ...mapActions({
      editRole: On.EDIT_ACCESS_ROLE,
      saveRole: On.ADD_ACCESS_ROLE
    }),
    ...mapMutations({
      hideRoleDialog: Do.HIDE_ROLE_DIALOG
    }),
    clear() {
      /* TODO */
    },
    submit() {
      let role = {
        _id: this.currentAssociationRole._id,
        color: this.currentAssociationRole.color,
        description: this.currentAssociationRole.description
      }

      try {
        if (this.currentAssociationRole.mode === 'edit') {
          this.editRole(role).then(() => {
            console.log('edit ok')
          })
        } else {
          this.saveRole(role).then(() => {
            console.log('save ok')
          })
        }
      } catch (err) {
        console.error(err)
      }
    }
  },
  watch: {},
  mounted: function () {},
  computed: {
    visible: {
      get: function () {
        return this.$store.state.access.rolesUsersShowDialog
      },
      set: function (val) {
        this.$store.state.access.rolesUsersShowDialog = val
      }
    },
    ...mapState({
      currentAssociationRole: (state) => state.access.currentAssociationRole,
      ...mapState({
        roles: (state) => state.access.rolesList,
        contacts: (state) => state.contacts.fullList
      })
    })
  }
}
</script>
