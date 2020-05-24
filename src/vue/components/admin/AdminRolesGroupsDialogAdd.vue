<template>
  <v-dialog
    v-model="visible"
    transition="dialog-bottom-transition"
    :overlay="true"
    style="margin: 10px;"
  >
    <v-card tile>
      <v-toolbar>
        <v-toolbar-title
          >Ajouter un groupe au rôle [{{ role._id }}]</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn icon @click="visible = !visible">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <!--  Groups avec Pagination et recherche -->
      <v-text-field
        v-model="searchGroup"
        append-icon="search"
        solo
        label="Chercher un groupe"
      ></v-text-field>
      <v-list v-if="currentAssociationRole">
        <template v-for="(group, index) in visiblePages">
          <v-list-tile :key="index">
            <v-list-tile-action>
              <v-icon @click="addGroup(group)">group_add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              {{ group._id }}
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <div class="text-xs-center">
        <v-pagination
          v-if="filteredGroups.length > 3"
          v-model="page"
          :length="Math.ceil(filteredGroups.length / perPage)"
        ></v-pagination>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { removeAccent } from '../../../shared/helper'
export default {
  name: 'adminRoleGroupsAddDialog',
  props: ['role'],
  data() {
    return {
      valid: false,
      searchGroup: '',
      page: 1,
      perPage: 3
    }
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({}),
    clear() {
      /* TODO */
    },
    addGroup(group) {
      /* Vérifie si n'existe pas déjà  */
      // console.log('this.currentAssociationRole :', this.currentAssociationRole)
      if (!this.currentAssociationRole.groups) {
        this.currentAssociationRole.groups = []
      }
      this.currentAssociationRole.groups.push(group._id)
    }
  },
  watch: {},
  updated: function () {},
  computed: {
    visible: {
      get: function () {
        return this.$store.state.access.rolesGroupsShowDialogAdd
      },
      set: function (val) {
        this.$store.state.access.rolesGroupsShowDialogAdd = val
      }
    },
    currentAssociationRole: {
      get: function () {
        return this.$store.state.access.currentAssociationRole
      },
      set: function (val) {
        this.$store.state.access.currentAssociationRole = val
      }
    },
    filteredGroups: {
      get: function () {
        return this.$store.state.groups.filter((group) => {
          if (
            this.$store.state.access.currentAssociationRole &&
            this.$store.state.access.currentAssociationRole.groups
          ) {
            for (
              let index = 0;
              index <
              this.$store.state.access.currentAssociationRole.groups.length;
              index++
            ) {
              const existingGroup = this.$store.state.access
                .currentAssociationRole.groups[index]
              if (existingGroup === group._id) {
                return false
              }
            }
          }
          return (
            removeAccent(group._id)
              .toLowerCase()
              .indexOf(this.searchGroup.toLowerCase()) > -1
          )
        })
      },
      set: function (val) {
        // not to use
      }
    },
    visiblePages() {
      return this.filteredGroups.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      )
    },
    ...mapState({
      groups: (state) => state.groups,
      usersRoles: (state) => state.access.rolesUsersList
    })
  }
}
</script>
