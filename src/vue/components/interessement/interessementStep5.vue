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
        <p class="secondary--text title">
          <v-icon>arrow_right</v-icon
          >{{ Math.round(interessementUser.quote_part_net * 100) / 100 }} €
        </p>
        <h2
          v-if="!contact.estFonctionnaire"
          class="primary--text title"
          style="margin-bottom: 10px;"
        >
          Choix de placement
        </h2>
        <v-flex
          v-if="!contact.estFonctionnaire"
          offset-md1
          :style="'padding:0;width:' + specificWidth + ';'"
        >
          <v-layout row style="padding: 0;" align-center>
            <v-flex xs7
              ><p style="vertical-align: middle;">
                Versement bulletin de salaire
              </p></v-flex
            >
            <v-flex xs5>
              <p class="secondary--text title">{{ partBulletinDeSalaire }} €</p>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex
          v-if="!contact.estFonctionnaire"
          offset-md1
          :style="'padding:0;width:' + specificWidth + ';'"
        >
          <v-layout v-if="choix" row style="padding: 0;" align-center>
            <v-flex xs7
              ><p style="vertical-align: middle;">
                PEE
              </p></v-flex
            >

            <v-flex xs5
              ><p class="secondary--text title">{{ partPee }} €</p>
            </v-flex>
          </v-layout>
        </v-flex>
        <h2
          v-if="!contact.estFonctionnaire"
          class="primary--text title"
          style="margin-bottom: 10px;"
        >
          Abondement Net par Silène
        </h2>
        <p v-if="!contact.estFonctionnaire" class="primary--text subtitle-1">
          ({{ configInteressement.abondement }}% du placement net sur le PEE -
          CSG-CRDS)
        </p>
        <p
          v-if="choix && !contact.estFonctionnaire"
          class="secondary--text title"
        >
          <v-icon>arrow_right</v-icon> {{ calculAbondement }}
          €
        </p>
        <h2
          v-if="!contact.estFonctionnaire"
          class="primary--text title"
          style="margin-bottom: 10px;"
        >
          Montant total
        </h2>

        <p v-if="!contact.estFonctionnaire" class="primary--text subtitle-1">
          (intéressement + abondement)
        </p>
        <p
          v-if="choix && !contact.estFonctionnaire"
          class="secondary--text title"
        >
          <v-icon>arrow_right</v-icon
          >{{ Math.round(interessementUser.quote_part_net * 100) / 100 }} +
          {{ calculAbondement }}
          = {{ totalAvecAbondement }} €
        </p>
      </v-layout>
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
      partBulletinDeSalaire: (state) => {
        return (
          Math.round(
            state.interessement.interessementUser.choix.bulletin_de_salaire *
              state.interessement.interessementUser.quote_part_net
          ) / 100
        )
      },
      partPee: (state) => {
        return (
          Math.round(
            (100 -
              state.interessement.interessementUser.choix.bulletin_de_salaire) *
              state.interessement.interessementUser.quote_part_net
          ) / 100
        )
      },
      calculAbondement: (state) => {
        let quotePartNet = state.interessement.interessementUser.quote_part_net
        let repartitionTotalePEE =
          100 - state.interessement.interessementUser.choix.bulletin_de_salaire

        let tauxAbondement = state.interessement.configInteressement.abondement

        let tauxCsgCrdsString =
          state.interessement.configInteressement.taux_csg_crds

        tauxCsgCrdsString = tauxCsgCrdsString.replace(',', '.')
        let tauxCsgCrds = Number(tauxCsgCrdsString)

        let montantAbondementAvantCsg =
          (((quotePartNet * repartitionTotalePEE) / 100) * tauxAbondement) / 100
        let montantAbondementApresCsg =
          montantAbondementAvantCsg -
          (montantAbondementAvantCsg * tauxCsgCrds) / 100
        return Math.round(montantAbondementApresCsg * 100) / 100
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
          this.calculAbondement +
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
        let theClass = 'peeCol2 ' + subClass + ' title'
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
