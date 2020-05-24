<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title class="white--text"
        >Etape 3
        <div class="subheading">
          Calcul de la prime individuelle {{ configInteressement._id - 1 }}
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <!-- Contenu -->
    <v-container v-if="interessementUser && configInteressement" grid-list-xl>
      <v-layout column>
        <v-flex>
          <v-layout v-bind="binding">
            <v-flex> </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="rounded-card" style="background: #eee; color: #333;">
          <h2 class="primary--text">
            Estimation montant individuel brut :
          </h2>
          <p class="secondary--text headline text-xs-center">
            {{ getMontantIndividuel }}*
          </p>
          <em
            >*base temps plein sur l'année {{ configInteressement._id - 1 }},
            sans absence</em
          >
        </v-flex>
        <v-flex class="rounded-card" style="background: #eee; color: #333;">
          <h2 class="primary--text">
            Nombre de jours théorique
          </h2>
          <p
            class="secondary--text headline text-xs-center"
            style="margin-bottom: 0;"
          >
            {{ interessementUser.base_annuelle }} jours
          </p>
        </v-flex>
        <v-flex class="rounded-card" style="background: #eee; color: #333;">
          <h2 class="primary--text">
            Absences
          </h2>
          <table>
            <tr>
              <td>Nb jours maladie</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>{{ interessementUser.nb_jrs_maladie }}</td>
            </tr>
            <tr>
              <td>Nb jours enfant malade</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>{{ interessementUser.nb_jrs_enfants_malade }}</td>
            </tr>
            <tr>
              <td>Nb de jours Service non fait</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>{{ interessementUser.nb_jrs_service_non_fait }}</td>
            </tr>
            <tr>
              <td>Nb de jours de congés sans solde</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>{{ interessementUser.nb_jrs_conges_sans_solde }}</td>
            </tr>
            <tr>
              <td>Nb de jours de CIF</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>{{ interessementUser.nb_jrs_cif }}</td>
            </tr>
            <tr>
              <td>Nb de jours d'Autres absences</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>{{ interessementUser.nb_jrs_autres_absences }}</td>
            </tr>
            <tr>
              <td class="secondary--text headline text-xs-center">
                TOTAL Absences
              </td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td class="secondary--text headline text-xs-center">
                {{ totalJoursAbsence }}
              </td>
            </tr>
          </table>
        </v-flex>
        <v-flex class="rounded-card" style="background: #eee; color: #333;">
          <h2 class="primary--text">Montant intéressement</h2>
          <table>
            <tr>
              <td>Brut</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>
                {{ Math.round(interessementUser.montant_brut * 100) / 100 }} €
              </td>
            </tr>
            <tr>
              <td>CSG</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>
                {{ Math.round(interessementUser.csg_crds * 100) / 100 }} €
              </td>
            </tr>
            <tr>
              <td>
                <span class="secondary--text headline text-xs-center">Net</span>
              </td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>
                <span class="secondary--text headline text-xs-center"
                  >{{
                    Math.round(interessementUser.quote_part_net * 100) / 100
                  }}
                  €</span
                >
              </td>
            </tr>
          </table>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'interessementStep3',
  components: {},
  methods: {
    ...mapActions({})
  },
  computed: {
    ...mapState({
      configInteressement: (state) => state.interessement.configInteressement,
      interessementUser: (state) => state.interessement.interessementUser,
      totalJoursAbsence: (state) => {
        let total = 0
        total += parseFloat(
          state.interessement.interessementUser.nb_jrs_maladie
        )
        total += parseFloat(
          state.interessement.interessementUser.nb_jrs_enfants_malade
        )
        total += parseFloat(
          state.interessement.interessementUser.nb_jrs_service_non_fait
        )
        total += parseFloat(
          state.interessement.interessementUser.nb_jrs_conges_sans_solde
        )
        total += parseFloat(state.interessement.interessementUser.nb_jrs_cif)
        total += parseFloat(
          state.interessement.interessementUser.nb_jrs_autres_absences
        )
        return total
      }
    }),
    binding() {
      const binding = {}
      if (this.$vuetify.breakpoint.xs) binding.column = true

      return binding
    },
    getMontantIndividuel() {
      let montant = this.configInteressement.estimation_montant_indiduel_brut
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
</style>
