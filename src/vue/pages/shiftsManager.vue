<template>
  <!-- TODO mettre un v-if manager ou RH-->
  <v-container style="margin-top:50px;">
    <v-layout column>
      <v-flex offset-sm3>
        <v-alert :value="true" type="warning">
          Cette page évoluera dans le temps pour offrir des fonctionnalités aux
          manager (tableaux de bord, etc.).
        </v-alert>
        <v-alert :value="true" type="info">
          La saisie pour un tiers se fait directement dans la partie 'Gestion
          des temps'
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // import { mapState } from 'vuex'
  // import FileLine from '../components/FileLine'
  import { mapState, mapActions, mapMutations } from 'vuex'
  // import Do from '../../const/do'
  // import On from '../../const/on'

  export default {
    name: 'shiftsManager',
    components: {},
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
      return {
        snackbarTimeout: 6000
      }
    }
  }
</script>
