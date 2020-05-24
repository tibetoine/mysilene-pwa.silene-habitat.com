<template>
  <v-container style="margin: 0; margin-top: 50px;">
    <v-layout>
      <v-flex xs12 offset-lg3 offset-xl2>
        <v-stepper
          v-if="configInteressement"
          v-model="etape"
          style="margin-top: 20px;"
        >
          <v-stepper-header>
            <v-stepper-step editable :complete="etape > 1" step="1"
              >Etape 1</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step editable :complete="etape > 2" step="2"
              >Etape 2</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step editable :complete="etape > 3" step="3"
              >Etape 3</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step editable :complete="etape > 4" step="4"
              >Etape 4</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step editable step="5">Synthèse</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <interessement-step1></interessement-step1>
              <v-btn color="primary" @click.native="etape = 2"
                >J'ai compris</v-btn
              >
              <v-btn color="error">Cancel</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
              <interessement-step2></interessement-step2>
              <v-btn color="primary" @click.native="etape = 3"
                >J'ai compris</v-btn
              >
              <v-btn color="error">Cancel</v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
              <interessement-step3></interessement-step3>
              <v-btn color="primary" @click.native="etape = 4"
                >J'ai compris</v-btn
              >
              <v-btn color="error">Cancel</v-btn>
            </v-stepper-content>
            <v-stepper-content step="4">
              <interessement-step4></interessement-step4>
            </v-stepper-content>
            <v-stepper-content step="5">
              <interessement-step5></interessement-step5>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        <v-alert type="info" :value="true" v-else>
          Attention! Aucune configuration chargée pour cette année. Consultez la
          documentation sur MySilene pour charger les données.</v-alert
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import InteressementStep1 from '../components/interessement/interessementStep1'
import InteressementStep2 from '../components/interessement/interessementStep2'
import InteressementStep3 from '../components/interessement/interessementStep3'
import InteressementStep4 from '../components/interessement/interessementStep4'
import InteressementStep5 from '../components/interessement/interessementStep5'
// import On from '../../const/on'
export default {
  name: 'interessement',
  components: {
    InteressementStep1,
    InteressementStep2,
    InteressementStep3,
    InteressementStep4,
    InteressementStep5
  },
  methods: {
    ...mapActions({
      // uploadFile: On.UPLOAD_FILE
    })
  },
  computed: {
    ...mapState({
      configInteressement: (state) => state.interessement.configInteressement
    }),
    etape: {
      get() {
        return this.$store.state.interessement.etape
      },
      set(val) {
        this.$store.state.interessement.etape = val
      }
    },
    breakpoint() {
      console.log(this.$vuetify.breakpoint)
      return true
    }
  },
  data() {
    return {
      test: 'testt'
    }
  }
}
</script>
