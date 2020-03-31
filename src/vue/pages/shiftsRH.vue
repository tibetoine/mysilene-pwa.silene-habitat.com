<template>
  <!-- TODO mettre un v-if manager ou RH-->
  <v-container style="margin-top:50px;">
    <!-- Permet d'afficher des messages (error ou succes) -->
    <snackbar-message></snackbar-message>

    <v-layout column>
      <v-flex offset-sm3>
        <v-alert type="warning">
          Cette page évoluera dans le temps pour offrir d'autres
          fonctionnalités.
        </v-alert>
        <shift-extract></shift-extract>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // import { mapState } from 'vuex'
  import ShiftExtract from '../components/ShiftExtract'
  import SnackbarMessage from '../components/SnackbarMessage'
  import { mapState, mapActions, mapMutations } from 'vuex'
  // import Do from '../../const/do'
  // import On from '../../const/on'

  export default {
    name: 'shiftsRH',
    components: { ShiftExtract, SnackbarMessage },
    computed: {
      ...mapState({})
    },
    mounted: function() {},
    methods: {
      ...mapActions({}),
      ...mapMutations({}),
      extract() {
        alert('A faire.')
      }
    },
    data() {
      return {}
    }
  }
</script>
