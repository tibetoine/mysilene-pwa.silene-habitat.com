<template>
  <v-form ref="form" v-model="valid">
    <v-card v-if="choix">
      <v-toolbar color="primary" dark>
        <v-toolbar-title class="white--text"
          >Etape 4
          <div class="title">
            Choix du collaborateur
          </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <!-- Contenu -->
      <v-card-text>
        <span v-if="contact" class="primary--text text-xs-center headline"
          >Bonjour {{ contact.givenName }} {{ contact.sn }}</span
        >,<br />
        Le montant de votre intéressement est de
        <span class="primary--text text-xs-center headline">
          {{ Math.round(interessementUser.quote_part_net * 100) / 100 }} €
        </span>
        (net).
        <br />
        <br />
        <em v-if="!contact.estFonctionnaire">
          Vous pouvez choisir de percevoir l'intéressement ou de le placer sur
          le Plan d'Epargne Entreprise (PEE)
        </em>
      </v-card-text>
      <v-container style="margin-top: 0; padding-top: 0;">
        <h2 class="primary--text title" style="margin-bottom: 10px;"></h2>
        <v-layout row align-center>
          <v-flex xs5 md4
            ><p class="primary--text title" style="vertical-align: middle;">
              Versement sur le bulletin de salaire
            </p></v-flex
          >
          <v-flex xs3 md4
            ><v-text-field
              v-model="choix.bulletin_de_salaire"
              label="Pourcent"
              suffix="%"
              solo
              :rules="ruleBdSPercent"
            >
            </v-text-field
          ></v-flex>
          <v-spacer style="margin-left: 10px;"></v-spacer>
          <v-flex xs3 md4
            ><v-text-field
              :value="
                Math.round(montant_quote_part_net * choix.bulletin_de_salaire) /
                100
              "
              label="Montant"
              suffix="€"
              solo
              readonly
            >
            </v-text-field
          ></v-flex>
          <v-flex xs1 hidden-md-and-up>
            &nbsp;
          </v-flex>
        </v-layout>
        <v-spacer
          v-if="choix.bulletin_de_salaire < 100 && !contact.estFonctionnaire"
          style="border-bottom: 1px solid #777;"
        ></v-spacer>
        <h2
          v-if="choix.bulletin_de_salaire < 100 && !contact.estFonctionnaire"
          class="primary--text title"
          style="margin-top: 20px; margin-bottom: 10px;"
        >
          Placement sur PEE
        </h2>
        <p v-if="!contact.estFonctionnaire">
          <em>Classement du moins risqué au plus risqué</em>
        </p>
        <v-layout
          row
          v-if="choix.bulletin_de_salaire < 100 && !contact.estFonctionnaire"
        >
          <v-flex v-if="choix">
            <template v-for="(fond, index) in fonds">
              <v-layout :key="index" row align-center>
                <v-flex xs5 md4
                  ><p style="vertical-align: middle; margin: 0; padding: 0;">
                    {{ fond.nom_du_fond }}
                  </p>
                  <v-icon class="hidden-sm-and-down">link</v-icon>
                  <a
                    class="hidden-sm-and-down"
                    :href="fond.lien_notice_d_information"
                    target="_blank"
                    >Notice {{ fond.nom_du_fond }}
                  </a></v-flex
                >
                <v-flex xs3 md4>
                  <v-text-field
                    v-model="fond.percent"
                    @keyup.stop="updateFond($event, index)"
                    solo
                    label="Pourcent"
                    suffix="%"
                    :rules="rulePercent"
                  >
                  </v-text-field>
                </v-flex>

                <v-spacer style="margin-left: 10px;"></v-spacer>
                <v-flex xs3 md4>
                  <v-text-field
                    :value="
                      fond.percent
                        ? Math.round(
                            fond.percent *
                              ((montant_quote_part_net *
                                (100 - choix.bulletin_de_salaire)) /
                                100)
                          ) / 100
                        : 0
                    "
                    solo
                    label="Pourcent"
                    suffix="€"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs1 hidden-md-and-up>
                  <v-btn
                    icon
                    :href="fond.lien_notice_d_information"
                    target="_blank"
                  >
                    <v-icon>info</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </template>
            <v-layout row align-center>
              <v-flex xs5 md4 class="secondary--text text-xs-center title"
                ><p style="vertical-align: middle;">
                  TOTAL versement sur PEE
                </p></v-flex
              >
              <v-flex xs3 md4 :class="totalEurosFondsClass">
                <p>{{ totalPercentFonds }} %</p>
              </v-flex>
              <v-spacer style="margin-left: 10px;"></v-spacer>
              <v-flex xs3 md4 class="secondary--text text-xs-center">
                <p class="title">{{ totalEurosFonds }} €</p>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-btn :disabled="!valid" color="primary" @click.native="submit"
      >Je valide mon choix</v-btn
    >
    <v-btn @click="clear" flat>Cancel</v-btn>
    <v-snackbar :timeout="snackbTimeout" color="red" v-model="snackbModel">
      Vous devez avoir une répartition de 100% sur le placement PEE
      <v-btn dark flat @click.native="snackbModel = false">Close</v-btn>
    </v-snackbar>
  </v-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import On from '../../../const/on'
export default {
  name: 'interessementStep4',
  components: {},
  methods: {
    ...mapActions({
      saveInteressementUser: On.SAVE_INTERESSEMENT_USER
    }),
    updateFond(e, index) {
      // console.log('updateFond')
      // console.log(this.totalEurosFondsClass)
      this.$refs.form.validate()
      this.$store.dispatch(On.UPDATE_INTERESSEMENT_USER_FONDS, {
        index: index,
        value: e.target.value
      })
    },
    submit() {
      console.log(this.$refs.form.validate())

      /* Est ce que le pourcentage PEE est à 100 % */
      if (this.choix.bulletin_de_salaire < 100) {
        if (this.totalPercentFonds !== 100) {
          /* On montre le message d'erreur et on sort de la fonction */
          this.snackbModel = true
          return
        }
      }
      let userId = localStorage.getItem('user-id')
      let year = new Date().getFullYear()
      this.saveInteressementUser({ userId: userId, year: year })

      this.etape = 5
      /* Enregistrer en base ! dispatch tout ça */
      console.log('TODO record en base')
    },
    clear() {
      // this.$refs.form.reset()
      this.$store.dispatch(On.RESET_INTERESSEMENT_USER_FONDS)
    }
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
              (perc *
                this.montant_quote_part_net *
                (100 - this.choix.bulletin_de_salaire)) /
              100 /
              100
          }
        )
        return Math.round(total * 100) / 100
      },
      totalAvecAbondement(state) {
        console.log('contact : ', this.contact)
        let totalAbondement =
          this.totalEurosFonds + (this.totalEurosFonds * this.abondement) / 100
        return Math.round(totalAbondement * 100) / 100
      },
      binding() {
        const binding = {}
        console.log(this.$vuetify.breakpoint)
        if (this.$vuetify.breakpoint.xs) binding.column = true

        return true
      }
    }),
    etape: {
      get() {
        return this.$store.state.interessement.etape
      },
      set(val) {
        this.$store.state.interessement.etape = val
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
      test: 12,
      valid: false,
      ruleBdSPercent: [
        (v) => {
          return (
            (parseFloat(v) === parseInt(v) && !isNaN(v)) ||
            'Doit être un nombre sans virgule'
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
            'Doit être un nombre sans virgule'
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
.rounded-card {
  border-radius: 5px;
  margin: 5px;
}

.interessementDiv {
  border: 1px solid #1e88e5;
  padding: 5px;
  background-color: #1e88e5;
  color: white;
}
.interessementDiv2 {
  border: 0;
  padding: 5px;
  background-color: #eee;
  color: #333;
}

.leftTd {
  font-weight: bold;
}

.peeCol1 {
  width: 30%;
}
.peeCol2 {
  width: 34%;
}
.peeCol3 {
  width: 34%;
}
</style>
