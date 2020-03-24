<template>
  <v-container>
    <v-layout column>
      <v-flex xs12 sm6 offset-sm3>
        <div>
          <p>test A</p>
          <p>test A</p>
          <p>test A</p>
          <p>test A</p>
          <p>test A</p>
          <p>test A</p>
          <p>test A</p>
          <p>test A</p>
        </div>
      </v-flex>
      <v-flex xs12 sm6 md4 offset-sm3>
        <div>
          <p>test B</p>
          <p>test B</p>
          <p>test B</p>
          <p>test B</p>
          <p>test B</p>
          <p>test B</p>
        </div>
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
