<template>
  <v-dialog
    v-model="visible"
    transition="dialog-bottom-transition"
    :overlay="true"
  >
    <v-card tile>
      <v-toolbar>
        <v-btn icon>
          <v-icon>{{ currentRole.mode === 'edit' ? 'edit' : 'add' }}</v-icon>
        </v-btn>
        <v-toolbar-title>{{
          currentRole.mode === 'edit'
            ? 'Modifier un rôle'
            : 'Créer un nouveau rôle'
        }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="visible = !visible">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <div style="text-align: center; padding-top: 8px;">
        <v-chip
          :color="currentRole.color ? currentRole.color : 'black'"
          text-color="white"
          >{{ currentRole._id ? currentRole._id : 'NON DEFINI' }}
          <v-icon right small>info</v-icon>
        </v-chip>
      </div>
      <v-form style="padding: 5px;" v-model="valid">
        <v-text-field
          v-model="currentRole._id"
          :rules="idRules"
          :counter="20"
          label="Nom rôle (identifiant)"
          solo
          :disabled="currentRole.mode === 'edit'"
          @click="
            (v) => {
              if (currentRole._id === unknowRoleId) currentRole._id = ''
            }
          "
          @input="
            (v) => {
              currentRole._id = v.toUpperCase()
            }
          "
        >
        </v-text-field>

        <!-- Choix de couleur -->
        <v-btn-toggle v-model="currentRole.color">
          <v-btn color="black" flat value="black">
            <v-icon>invert_colors</v-icon>
          </v-btn>
          <v-btn color="orange" flat value="orange">
            <v-icon>invert_colors</v-icon>
          </v-btn>
          <v-btn color="blue" flat value="blue">
            <v-icon>invert_colors</v-icon>
          </v-btn>
          <v-btn color="green" flat value="green">
            <v-icon>invert_colors</v-icon>
          </v-btn>
          <v-btn color="deep-purple" flat value="deep-purple">
            <v-icon>invert_colors</v-icon>
          </v-btn>
          <v-btn color="red" flat value="red">
            <v-icon>invert_colors</v-icon>
          </v-btn>
        </v-btn-toggle>

        <!-- Description -->
        <v-text-field
          v-model="currentRole.description"
          :rules="descriptionRules"
          :counter="400"
          multi-line
          label="Description"
          solo
        >
        </v-text-field>
        <div style="text-align: center;">
          <v-btn
            color="success"
            class="mr-4"
            :disabled="!valid"
            @click="submit"
          >
            Valider
            <v-icon v-if="valid" right dark>done</v-icon>
          </v-btn>
        </div>
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
        _id: this.currentRole._id,
        color: this.currentRole.color,
        description: this.currentRole.description
      }

      try {
        if (this.currentRole.mode === 'edit') {
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
        return this.$store.state.access.showDialog
      },
      set: function (val) {
        this.$store.state.access.showDialog = val
      }
    },
    ...mapState({
      currentRole: (state) => state.access.currentRole
    })
  }
}
</script>
