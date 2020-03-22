<template>
  <v-container style="margin-top:50px;">
    <shift-dialog></shift-dialog>

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
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-layout column>
      <v-flex xs12 sm6 offset-sm3>
        <v-toolbar>
          <v-btn icon>
            <v-icon>history</v-icon>
          </v-btn>
          <v-toolbar-title>Temps déclarés</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon @click="historyVisible = !historyVisible"
              >keyboard_arrow_down</v-icon
            >
          </v-btn>
        </v-toolbar>
      </v-flex>
      <v-spacer style="margin-top:15px;"></v-spacer>
      <v-flex
        xs12
        sm6
        md4
        offset-sm3
        v-bind:style="'display:' + (historyVisible ? 'block' : 'none') + ';'"
      >
        <v-spacer></v-spacer>
        <shift-record
          v-for="shift in someShifts"
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
  import { mapActions, mapMutations } from 'vuex'
  import On from '../../const/on'
  import Do from '../../const/do'
  import ShiftRecord from '../components/ShiftRecord'
  import ShiftDialog from '../components/ShiftDialog'

  export default {
    name: 'shifts',
    components: { ShiftRecord, ShiftDialog },
    computed: {},
    mounted: function() {
      // console.log('je charge les données')
      this.loadUsers()
    },
    methods: {
      ...mapActions({
        loadUsers: On.LOAD_USERS,
        deleteUser: On.DELETE_USER
      }),
      ...mapMutations({
        showShiftDialog: Do.SHOW_SHIFT_DIALOG
      })
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
        },
        someShifts: [
          {
            date: '12/03/2018',
            total_time: '07:50',
            worked_time: '03:00',
            not_worked_time: '04:50',
            nb_creneaux: 2,
            details: [
              {
                time: '03:00',
                type: 'travail_normal',
                comment:
                  'Un texte relativement long qui parle de commentaire, concernant je ne sais pas quoi mais bon c est juste pour avoir un long texte Un texte relativement long qui parle de commentaire, concernant je ne sais pas quoi mais bon c est juste pour avoir un long texteUn texte relativement long qui parle de commentaire, concernant je ne sais pas quoi mais bon c est juste pour avoir un long texteUn texte relativement long qui parle de commentaire, concernant je ne sais pas quoi mais bon c est juste pour avoir un long texteUn texte relativement long qui parle de commentaire, concernant je ne sais pas quoi mais bon c est juste pour avoir un long texte'
              },
              {
                time: '04:00',
                type: 'rtt',
                comment: 'RTT'
              },
              {
                time: '00:50',
                type: 'garde_enfant',
                comment: 'RAS'
              }
            ]
          },
          {
            date: '13/03/2018',
            total_time: '06:50',
            worked_time: '08:50',
            not_worked_time: '08:50',
            nb_creneaux: 2,
            details: [
              {
                time: '03:00',
                type: 'travail_normal',
                comment: 'RAS'
              },
              {
                time: '04:00',
                type: 'rtt',
                comment: 'RTT'
              },
              {
                time: '00:50',
                type: 'garde_enfant',
                comment: 'RAS'
              }
            ]
          },
          {
            date: '14/03/2018',
            total_time: '06:50',
            worked_time: '08:50',
            not_worked_time: '08:50',
            nb_creneaux: 2,
            details: [
              {
                time: '03:00',
                type: 'travail_normal',
                comment: 'RAS'
              },
              {
                time: '04:00',
                type: 'rtt',
                comment: 'RTT'
              },
              {
                time: '00:50',
                type: 'garde_enfant',
                comment: 'RAS'
              }
            ]
          },
          {
            date: '15/03/2018',
            total_time: '04:50',
            worked_time: '08:50',
            not_worked_time: '08:50',
            nb_creneaux: 2,
            details: [
              {
                time: '03:00',
                type: 'travail_normal',
                comment: 'RAS'
              },
              {
                time: '04:00',
                type: 'rtt',
                comment: 'RTT'
              },
              {
                time: '00:50',
                type: 'garde_enfant',
                comment: 'RAS'
              }
            ]
          },
          {
            date: '16/03/2018',
            total_time: '00:00',
            worked_time: '00:00',
            not_worked_time: '08:50',
            nb_creneaux: 2,
            details: [
              {
                time: '03:00',
                type: 'travail_normal',
                comment: 'RAS'
              },
              {
                time: '04:00',
                type: 'rtt',
                comment: 'RTT'
              },
              {
                time: '00:50',
                type: 'garde_enfant',
                comment: 'RAS'
              }
            ]
          }
        ]
      }
    }
  }
</script>
