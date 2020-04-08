<template>
  <v-container style="margin-top:50px;">
    <shift-dialog></shift-dialog>
    <snackbar-message></snackbar-message>
    <v-fab-transition>
      <v-btn
        color="blue darken-2"
        v-model="fab"
        dark
        fab
        fixed
        bottom
        right
        @click.stop="showShiftDialog"
        style="bottom:50px;"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-layout column>
      <v-flex v-if="isRhOrManager" offset-sm3>
        <v-select
          :items="collaborateurs"
          v-model="chosenUser"
          label="Pour quel utilisateur souhaitez-vous consulter/saisir des temps"
          prepend-icon="account_box"
          item-text="name"
          item-value="name"
          :return-object="true"
          @change="changeUser"
          autocomplete
          clearable
          :loading="collaborateursLoading"
        >
          <template slot="selection" slot-scope="data">
            {{ data.item.name }}
          </template>
          <template slot="no-data">
            <v-list-tile-content>
              <v-list-tile-title>Aucun collaborateur trouvé</v-list-tile-title>
            </v-list-tile-content>
          </template>
          <template slot="item" slot-scope="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-action>
                <v-avatar
                  size="40"
                  style="margin-top:-20px;"
                  color="grey lighten-4"
                >
                  <img
                    :src="data.item.avatar"
                    alt="UserAvatar"
                    onerror="this.onerror=null;this.src='/static/img/default.jpg';"
                  /> </v-avatar
              ></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-select>
      </v-flex>
      <v-flex offset-sm3 v-if="chosenUser">
        <v-toolbar>
          <v-avatar>
            <img
              :src="chosenUser.avatar"
              alt="UserAvatar"
              onerror="this.onerror=null;this.src='/static/img/default.jpg';"
            />
          </v-avatar>
          <v-toolbar-title>Historique de {{ chosenUser.name }}</v-toolbar-title>
        </v-toolbar>
      </v-flex>
      <v-spacer style="margin-top:15px;"></v-spacer>
      <v-flex offset-sm3 v-if="chosenUser">
        <v-spacer></v-spacer>
        <shift-record
          v-for="shift in allShifts"
          v-bind:key="shift.date"
          v-bind:shift="shift"
        ></shift-record>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // import { mapState } from 'vuex'
  // import FileLine from '../components/FileLine'
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  import Do from '../../const/do'
  import On from '../../const/on'
  import ShiftRecord from '../components/ShiftRecord'
  import ShiftDialog from '../components/ShiftDialog'
  import SnackbarMessage from '../components/SnackbarMessage'

  export default {
    name: 'shifts',
    components: { ShiftRecord, ShiftDialog, SnackbarMessage },
    computed: {
      ...mapState({
        allShifts: state => {
          // console.log(state.shift.allShifts)
          return state.shift.allShifts
        }
      }),
      ...mapGetters({ collaborateurs: 'selectShiftManagerChildren' }),
      isRhOrManager: {
        get: function() {
          if (
            this.$store.state.login.roles.includes('manager') ||
            this.$store.state.login.roles.includes('rh')
          ) {
            return true
          }

          return false
        }
      },
      chosenUser: {
        get: function() {
          return this.$store.state.shift.currentShiftUser
        },
        set: function(val) {
          this.$store.state.shift.currentShiftUser = val
        }
      }
    },
    mounted: function() {
      this.loadShifts()
      this.getChildren()
    },
    methods: {
      ...mapActions({
        loadShifts: On.LOAD_SHIFTS,
        getChildren: On.GET_CHILDREN
      }),
      ...mapMutations({
        showShiftDialog: Do.SHOW_SHIFT_DIALOG
      }),
      changeUser() {
        /* Je force le chargement des shifts du bon utilisateurs */
        // console.log('Je recharge les shifts')
        this.loadShifts()
      }
    },
    watch: {
      collaborateurs(newValue, oldValue) {
        if (this.chosenUser == null) {
          this.chosenUser = newValue[1]
        }
      }
    },
    data() {
      return {
        shiftVisible: true,
        historyVisible: true,
        fab: false,
        checkbox_rtt: null,
        checkbox_rtt_matin: null,
        checkbox_rtt_pm: null,
        currentShift: {
          date: null,
          datetime: null,
          conges: '',
          comment: null
        }
      }
    }
  }
</script>
