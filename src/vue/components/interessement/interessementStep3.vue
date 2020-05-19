<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title class="white--text"
        >Etape 3 : Calcul de la prime globale
        <div class="subheading">
          Calcul de la prime globale {{ configInteressement._id - 1 }}
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <!-- Contenu -->
    <v-container grid-list-xl>
      <v-layout column>
        <v-flex>
          <v-layout v-bind="binding">
            <v-flex> </v-flex>
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
                  Estimation montant individuel brut :
                </p>
                <p class="primary--text text-xs-center headline">
                  {{ getMontantIndividuel }}*
                </p>
                <em
                  >*base temps plein sur l'année
                  {{ configInteressement._id - 1 }}, sans absense</em
                >
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
  name: 'interessementStep3',
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
