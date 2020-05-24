<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-toolbar>
          <v-btn icon>
            <v-icon>supervisor_account</v-icon>
          </v-btn>
          <v-toolbar-title>Supprimer un utilisateur</v-toolbar-title>
        </v-toolbar>
        <v-autocomplete
          :items="users"
          item-text="_id"
          item-value="_id"
          v-model="selectedUser"
          label="Choisir un utilisateur à supprimer"
        ></v-autocomplete>
        <div style="text-align: center;">
          <v-btn
            :disabled="selectedUser === ''"
            color="error"
            large
            @click="initDelete"
            >Supprimer</v-btn
          >
        </div>
      </v-flex>
    </v-layout>
    <v-dialog
      width="800px"
      v-model="visible"
      transition="dialog-bottom-transition"
      :overlay="true"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-icon>check_circle</v-icon>
          <v-toolbar-title>Confirmation de suppression</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div style="padding: 10px;" v-if="!deleteSuccess && !deleteError">
          <p>
            Etes vous sûr de vouloir supprimer l'utilisateur {{ selectedUser }}.
          </p>
          <p>Pour confirmer veuillez saisir ce nom d'utilisateur ci-dessous</p>
          <v-form v-model="valid">
            <v-text-field
              v-model="confirmText"
              :rules="confirmRules"
              label="Veuillez confirmer ici"
              required
            ></v-text-field>
            <div style="text-align: center;">
              <v-btn
                :disabled="!valid"
                color="error"
                large
                @click="localDeleteUser"
                >Supprimer</v-btn
              >
            </div>
          </v-form>
        </div>
        <div style="padding: 10px;" v-else>
          <v-alert :value="true" type="success" v-if="deleteSuccess">
            Utilisateur supprimé avec succès
          </v-alert>
          <v-alert :value="true" type="error" v-if="deleteError">
            Erreur lors de la suppression de l'utilisateur
          </v-alert>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import On from '../../../const/on'

export default {
  name: 'adminUsersComponent',
  computed: {
    ...mapState({
      users: (state) => state.users.usersList,
      deleteSuccess: (state) => state.users.deletedUserSuccess,
      deleteError: (state) => state.users.deletedUserError
    })
  },
  mounted: function () {
    this.loadUsers()
  },
  methods: {
    ...mapActions({
      loadUsers: On.LOAD_USERS,
      deleteUser: On.DELETE_USER
    }),
    initDelete() {
      this.visible = true
      this.$store.state.users.deletedUserSuccess = false
      this.$store.state.users.deletedUserError = false
    },
    localDeleteUser() {
      this.deleteUser(this.selectedUser)
    }
  },
  data() {
    return {
      selectedUser: '',
      valid: false,
      visible: false,
      confirmText: '',
      btnDisabled: false,
      confirmRules: [
        (v) => !!v || 'Confirmation est requise',
        (v) => v === this.selectedUser || 'Veuillez confirmer'
      ]
    }
  }
}
</script>
