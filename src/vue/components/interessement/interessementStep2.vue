<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title class="white--text"
        >Etape 2
        <div class="subheading">
          Analyse des objectifs
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <!-- Contenu -->
    <v-container grid-list-xl>
      <v-layout column>
        <v-flex>
          <v-layout v-bind="binding" full-width>
            <v-flex
              v-for="(crit, index) in configInteressement.critères"
              :key="index"
              class="rounded-card interessementDiv2 lg5-custom"
              :style="'border-left:15px solid ' + colors[index]"
            >
              <h3>{{ crit.titre }}</h3>
              <table>
                <tr>
                  <td class="leftTd">Objectif</td>
                  <td>{{ crit.objectif }}</td>
                </tr>
                <tr>
                  <td class="leftTd">Réalisé</td>
                  <td>{{ crit.Réalisé }}</td>
                </tr>
                <tr>
                  <td class="leftTd">Critère atteint</td>
                  <td>
                    <v-icon :color="getIconColor(crit.resultat)">{{
                      getIcon(crit.resultat)
                    }}</v-icon>
                  </td>
                </tr>
                <tr>
                  <td class="leftTd">&nbsp;</td>
                  <td :class="getResultClass(crit.resultat)">
                    {{ crit.resultat }}
                  </td>
                </tr>
              </table>
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
                <p class="primary--text text-xs-center headline">
                  La prime globale d'intéressement à répartir est de
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
  name: 'interessementStep2',
  components: {},
  methods: {
    ...mapActions({}),
    getIcon(resultat) {
      let icon = 'done'
      if (resultat === 0) {
        icon = 'clear'
      }
      return icon
    },
    getIconColor(resultat) {
      let color = 'primary'
      if (resultat === 0) {
        color = 'red'
      }
      return color
    },
    getResultClass(resultat) {
      let cssclass = 'primary--text'
      if (resultat === 0) {
        cssclass = 'error--text'
      }
      return cssclass
    }
  },
  computed: {
    ...mapState({
      configInteressement: (state) => state.interessement.configInteressement
    }),
    getRep() {
      return '2'
    },
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
    return {
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
@media (min-width: 960px) {
  .lg5-custom {
    width: 20%;
    max-width: 20%;
    flex-basis: 20%;
  }
}
</style>
