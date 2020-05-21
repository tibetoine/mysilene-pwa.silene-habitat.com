<template>
  <v-card
    v-if="interessementUser && contact && choix"
    style="margin: 0; padding: 0;"
  >
    <v-toolbar color="primary" dark>
      <v-toolbar-title class="white--text">Synthèse </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <!-- Contenu -->
    <v-container grid-list-xl>
      <v-layout column>
        <h2 class="primary--text title" style="margin-bottom: 10px;">
          Montant de votre intéressement
        </h2>
        <p class="secondary--text text-xs-center title">
          {{ Math.round(interessementUser.quote_part_net * 100) / 100 }} €
        </p>
        <h2 class="primary--text title" style="margin-bottom: 10px;">
          Choix de placement
        </h2>
        <v-flex offset-md2 :style="'width:' + specificWidth + ';'">
          <v-layout row>
            <v-flex class="syntheseCol1"
              ><p style="vertical-align: middle;">
                Versement bulletin de salaire
              </p></v-flex
            >
            <v-flex class="syntheseCol2"
              ><v-text-field
                v-model="choix.bulletin_de_salaire"
                label="Pourcent"
                suffix="%"
                solo
                readonly
              >
              </v-text-field
            ></v-flex>
          </v-layout>
        </v-flex>
        <v-flex offset-md2 :style="'width:' + specificWidth + ';'">
          <v-layout v-if="choix" row>
            <v-flex class="syntheseCol1"
              ><p style="vertical-align: middle;">
                PEE
              </p></v-flex
            >
            <v-flex class="syntheseCol2"
              ><v-text-field
                v-model="100 - choix.bulletin_de_salaire"
                label="Pourcent"
                suffix="%"
                solo
                readonly
              >
              </v-text-field
            ></v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <h2
        v-if="!contact.estFonctionnaire"
        class="primary--text title"
        style="margin-bottom: 10px;"
      >
        Abondement net par Silène
      </h2>
      <p class="primary--text title">(50 % du placement net sur le PEE)</p>
      <p v-if="choix" class="secondary--text text-xs-center title">
        {{
          Math.round(
            (interessementUser.quote_part_net *
              (100 - choix.bulletin_de_salaire) *
              abondement) /
              100
          ) / 100
        }}
        €
      </p>
      <h2
        v-if="!contact.estFonctionnaire"
        class="primary--text title"
        style="margin-bottom: 10px;"
      >
        Montant total
      </h2>
      <p>(intéressement + abondement)</p>
      <p v-if="choix" class="secondary--text text-xs-center title">
        {{ Math.round(interessementUser.quote_part_net * 100) / 100 }} +
        {{
          Math.round(
            (interessementUser.quote_part_net *
              (100 - choix.bulletin_de_salaire) *
              abondement) /
              100
          ) / 100
        }}
        = {{ totalAvecAbondement }} €
      </p>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import On from '../../../const/on'
export default {
  name: 'interessementStep5',
  components: {},
  methods: {
    ...mapActions({})
  },
  computed: {
    ...mapState({
      configInteressement: (state) => state.interessement.configInteressement,
      interessementUser: (state) => state.interessement.interessementUser,
      abondement: (state) => state.interessement.configInteressement.abondement,
      contact: (state) => state.login.currentContact,
      fonds: (state) => {
        // console.log('mapState : fonds')
        return state.interessement.interessementUser.choix.pee.fonds
      },
      totalPercentFonds: (state) => {
        if (!state.interessement.interessementUser.choix) return 0
        let total = 0
        state.interessement.interessementUser.choix.pee.fonds.forEach(
          (fond) => {
            total += fond.percent ? parseInt(fond.percent, 10) : 0
          }
        )
        return total
      },
      totalEurosFonds(state) {
        if (!state.interessement.interessementUser.choix) return 0
        let total = 0

        state.interessement.interessementUser.choix.pee.fonds.forEach(
          (fond) => {
            // console.log('blop  ', fond.percent, quotePartPee)
            let perc = fond.percent ? fond.percent : 0
            total +=
              (perc * this.montant_quote_part_net * this.percent) / 100 / 100
          }
        )
        return Math.round(total * 100) / 100
      },
      totalAvecAbondement(state) {
        let total =
          (((this.interessementUser.quote_part_net *
            (100 - this.choix.bulletin_de_salaire)) /
            100) *
            this.abondement) /
            100 +
          parseFloat(this.interessementUser.quote_part_net)

        // console.log(total)
        return Math.round(total * 100) / 100
      }
    }),
    specificWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '100%'
        case 'sm':
          return '100%'
        case 'md':
          return '80%'
        case 'lg':
          return '40%'
        case 'xl':
          return '40%'
      }
    },
    totalEurosFondsClass: {
      get() {
        if (!this.$store.state.interessement.interessementUser.choix) return 0
        let total = 0
        this.$store.state.interessement.interessementUser.choix.pee.fonds.forEach(
          (fond) => {
            total += fond.percent ? parseInt(fond.percent, 10) : 0
          }
        )
        let subClass = total === 100 ? 'secondary--text' : 'red--text'
        let theClass = 'peeCol2 ' + subClass + ' text-xs-center title'
        return theClass
      }
    },
    montant_quote_part_net: {
      get() {
        return Math.round(this.interessementUser.quote_part_net * 100) / 100
      },
      set(val) {}
    },
    choix: {
      get() {
        return this.$store.state.interessement.interessementUser.choix
      },
      set(val) {
        // console.log('set choix ', val)
        this.$store.state.interessement.interessementUser.choix = val
      }
    }
  },
  data() {
    return {
      snackbModel: false,
      snackbTimeout: 6000,
      percent: 10,
      test: 12,
      valid: false,
      ruleBdSPercent: [
        (v) => {
          return (
            (parseFloat(v) === parseInt(v) && !isNaN(v)) ||
            'Doit être un nombre sans virgul'
          )
        },
        (v) => {
          return (v >= 0 && v <= 100) || 'Doit être un nombre entre 0 et 100'
        }
      ],
      rulePercent: [
        (v) => {
          // console.log('totalPercentFonds : ', this.totalPercentFonds)
          return (
            this.totalPercentFonds <= 100 ||
            'Le total de la répartition ne peut pas être égal à 100%'
          )
        },
        (v) => {
          return (
            (parseFloat(v) === parseInt(v) && !isNaN(v)) ||
            'Doit être un nombre sans virgul'
          )
        },
        (v) => {
          return (v >= 0 && v <= 100) || 'Doit être un nombre entre 0 et 100'
        }
      ],
      colors: [
        '#AB47BC',
        '#42A5F5',
        '#66BB6A',
        '#FFA726',
        '#311B92',
        '#FFEE58',
        '#546E7A'
      ]
    }
  }
}
</script>
<style>
.syntheseCol1 {
  width: 60%;
}
.syntheseCol2 {
  width: 40%;
}
</style>
