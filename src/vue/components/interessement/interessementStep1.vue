<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title class="white--text"
        >Etape 1 : Conditions financières
        <div class="subheading">
          Valider les conditions financières pour définir l'enveloppe globale
          possible
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <!-- Contenu -->
    <v-container grid-list-xl>
      <v-layout column>
        <v-flex>
          <v-layout v-bind="binding">
            <v-flex class="text-xs-center rounded-card interessementDiv">
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
            <v-flex class="text-xs-center rounded-card interessementDiv">
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
              <v-flex d-flex xs2 sm1 md1>
                <v-icon color="primary" large>beenhere</v-icon>
              </v-flex>
              <v-flex xs10 sm11 md11>
                <p>
                  Pour 2019 l'Autofinancement est de
                  <span class="primary--text headline">{{
                    configInteressement.autofinancement
                  }}</span>
                  <br />
                  L’intéressement cette année se calcule sur
                  <span class="primary--text headline"
                    >{{
                      configInteressement.pourcentage_masse_salariale
                    }}%</span
                  >
                  de la masse salariale soit
                </p>
                <p class="primary--text text-xs-center headline">
                  {{ getMontantTotal }}
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
</style>
