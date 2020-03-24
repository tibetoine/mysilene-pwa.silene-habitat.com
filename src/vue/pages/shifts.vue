<template>
  <v-container style="margin-top:50px;">
    <shift-dialog></shift-dialog>

    <v-snackbar
      :timeout="snackbarTimeout"
      :color="snackbarColor"
      v-model="snackbarModel"
    >
      {{ snackbarMessage }}
      <v-btn dark flat @click.native="snackbarModel = false">Close</v-btn>
    </v-snackbar>

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
      <v-flex offset-sm3>
        <v-toolbar>
          <v-btn icon>
            <v-icon>history</v-icon>
          </v-btn>
          <v-toolbar-title>Historique des temps déclarés</v-toolbar-title>
        </v-toolbar>
      </v-flex>
      <v-spacer style="margin-top:15px;"></v-spacer>
      <v-flex offset-sm3>
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
  import { mapState, mapActions, mapMutations } from 'vuex'
  import Do from '../../const/do'
  import On from '../../const/on'
  import ShiftRecord from '../components/ShiftRecord'
  import ShiftDialog from '../components/ShiftDialog'

  export default {
    name: 'shifts',
    components: { ShiftRecord, ShiftDialog },
    computed: {
      ...mapState({
        allShifts: state => state.shift.allShifts
      }),
      snackbarModel: {
        get: function() {
          return this.$store.state.shift.showSnackbar
        },
        set: function(val) {
          this.$store.state.shift.showSnackbar = val
        }
      },
      snackbarColor: {
        get: function() {
          return this.$store.state.shift.snackbarColor
        },
        set: function(val) {
          this.$store.state.shift.snackbarColor = val
        }
      },
      snackbarMessage: {
        get: function() {
          return this.$store.state.shift.snackbarMessage
        },
        set: function(val) {
          this.$store.state.shift.snackbarMessage = val
        }
      }
    },
    mounted: function() {
      this.loadShifts()
    },
    methods: {
      ...mapActions({
        loadShifts: On.LOAD_SHIFTS
      }),
      ...mapMutations({
        showShiftDialog: Do.SHOW_SHIFT_DIALOG
      })
    },
    data() {
      return {
        snackbarTimeout: 6000,
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
