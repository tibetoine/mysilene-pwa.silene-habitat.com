<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title class="white--text"
        >Etape 1
        <div class="title">
          Intéressement global
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <!-- Contenu -->
    <v-container grid-list-xl>
      <v-layout column>
        <v-flex class="text-xs-center rounded-card interessementDiv3">
          <p>
            Cette enveloppe est calculée en fonction du
            <b>résultat d’exploitation</b> et peut être majorée en fonction du
            <b>taux d’autofinancement</b>.
          </p>
        </v-flex>
        <v-flex>
          <v-layout v-bind="binding">
            <v-flex
              xs12
              sm6
              class="text-xs-center rounded-card interessementDiv"
            >
              <h3>1. Résultat d'exploitation</h3>
              <v-container>
                <v-layout row>
                  <v-flex
                    class="text-xs-center rounded-card"
                    style="background: #eeeeee; margin-left: 0;"
                  >
                    <v-icon color="orange">remove_circle</v-icon>
                    <p style="color: #333;">
                      Si le résultat est négatif, l’intéressement se calcule sur
                      <span style="color: orange;"
                        >2% de la masse salariale</span
                      >
                    </p>
                  </v-flex>
                  <v-flex
                    class="text-xs-center rounded-card"
                    style="background: #eeeeee;"
                  >
                    <v-icon color="green">add_circle</v-icon>
                    <p style="color: #333;">
                      Si le résultat est positif, l’intéressement se calcule sur
                      <span style="color: green;"
                        >4% de la masse salariale</span
                      >
                    </p>
                  </v-flex></v-layout
                ></v-container
              >
            </v-flex>
            <v-flex
              xs12
              sm6
              class="text-xs-center rounded-card interessementDiv"
            >
              <h3>2. L'autofinancement</h3>
              <p>
                Epargne constituée dans l’année et dédiée aux investissements
                futurs.
                <br />
                Permet de déclencher un 2nd palier d’intéressement de 4% à 6% de
                la masse salariale
              </p>
              <div class="rounded-card" style="background: #eee; color: #333;">
                <ul style="list-style-type: none;">
                  <li>
                    1 à 10% d’autofinancement --> 4% de la masse salariale
                  </li>
                  <li>
                    + de 10% d’autofinancement --> jusqu’à 6% de la masse
                    salariale
                  </li>
                </ul>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="rounded-card" style="background: #eee; color: #333;">
          <div>
            <v-layout row>
              <v-flex xs10 sm11 md11>
                <p>
                  <span class="primary--text title"
                    >Pour l'année {{ configInteressement._id - 1 }}</span
                  >
                  <br />
                  <b>1.</b> le résultat d’exploitation est de
                  <span class="primary--text title"
                    >{{ configInteressement.resultat_exploitation }}%</span
                  >
                  <br />
                  <v-icon>arrow_right</v-icon> l’intéressement se calcule donc
                  sur la base de <span class="primary--text title">4%</span> de
                  la masse salariale <br /><br />
                  <b>2.</b> l'autofinancement est de
                  <span class="primary--text title"
                    >{{ configInteressement.autofinancement }}%</span
                  >
                  <br />
                  <v-icon>arrow_right</v-icon> l’enveloppe d'intéressement est
                  majorée de
                  <span class="primary--text title">{{
                    configInteressement.majoration_autofinancement
                  }}</span>
                  %
                </p>

                <p class="text-xs-center">
                  Silène distribuera un intéressement de
                  <span class="primary--text headline"
                    >{{ getMontantTotal }}
                  </span>
                </p>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'interessementStep1',
  components: {},
  methods: {
    ...mapActions({})
  },
  computed: {
    ...mapState({
      configInteressement: (state) => state.interessement.configInteressement
    }),
    binding() {
      const binding = {}
      if (this.$vuetify.breakpoint.xs) binding.column = true

      return binding
    },
    getMontantTotal() {
      let montant = this.configInteressement.montant_global
      let formatter = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      })
      return formatter.format(montant)
    }
  },
  data() {
    return {}
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
.interessementDiv3 {
  padding: 5px;
  background: #eee;
  color: #333;
  color: #444;
}
</style>
