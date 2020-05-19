<template>
  <v-container style="margin-top: 50px;">
    <h2 class="title text-xs-center">
      Comprendre l’accord d’intéressement Silène
    </h2>
    <v-stepper v-model="e1" style="margin-top: 20px;">
      <v-stepper-header>
        <v-stepper-step editable :complete="e1 > 1" step="1"
          >Etape 1</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step editable :complete="e1 > 2" step="2"
          >Etape 2</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step editable :complete="e1 > 3" step="3"
          >Etape 3</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step editable step="4">Etape 4</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <interessement-step1></interessement-step1>
          <v-btn color="primary" @click.native="e1 = 2">J'ai compris</v-btn>
          <v-btn color="error">Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <interessement-step2></interessement-step2>
          <v-btn color="primary" @click.native="e1 = 3">J'ai compris</v-btn>
          <v-btn color="error">Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <interessement-step3></interessement-step3>
          <v-btn color="primary" @click.native="e1 = 4">J'ai compris</v-btn>
          <v-btn color="error">Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="4">
          <interessement-step4></interessement-step4>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import InteressementStep1 from '../components/interessement/interessementStep1'
import InteressementStep2 from '../components/interessement/interessementStep2'
import InteressementStep3 from '../components/interessement/interessementStep3'
import InteressementStep4 from '../components/interessement/interessementStep4'
// import On from '../../const/on'
export default {
  name: 'interessement',
  components: {
    InteressementStep1,
    InteressementStep2,
    InteressementStep3,
    InteressementStep4
  },
  methods: {
    ...mapActions({
      // uploadFile: On.UPLOAD_FILE
    })
  },
  computed: {
    ...mapState({
      configInteressement: (state) => state.interessement.configInteressement
    })
  },
  data() {
    return {
      e1: 4,
      test: 'testt'
    }
  }
}
</script>
