<template>
  <v-container style="margin-top:50px;">
    <v-layout column>
      <v-flex xs12 sm6 offset-sm3>
        <v-toolbar>
          <v-btn icon>
            <v-icon>alarm_on</v-icon>
          </v-btn>
          <v-toolbar-title>Déclarer le temps travaillé</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon @click="shiftVisible=!shiftVisible">keyboard_arrow_down</v-icon>
          </v-btn>
        </v-toolbar>        
      </v-flex>
      <v-spacer style="margin-top:15px;"></v-spacer>
      <v-flex xs12 sm6 md4  offset-sm3 v-bind:style="'display:'+(shiftVisible?'block':'none')+';'">
        <v-spacer></v-spacer>        
        <v-menu          
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="dateFormatted"
            solo
            label="Choisir la date"
            hint="JJ/MM/ANNEE (Ex : 12/04/2020)"
            prepend-icon="event"            
            @blur="currentShift.date = parseDate(dateFormatted)"
            readonly
          ></v-text-field>
          <v-date-picker v-model="currentShift.date" @input="$refs.menu.save(currentShift.date)"></v-date-picker>
        </v-menu>
        <v-menu
          v-if="!checkbox_rtt"
          ref="menu2"
          :close-on-content-click="false"
          v-model="menu2"
          :nudge-right="40"
          :return-value.sync="currentShift.datetime"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="currentShift.datetime"
            label="Nombre d'heures travaillées à la date"
            prepend-icon="schedule"
            solo         
            readonly
          ></v-text-field>          
          <v-time-picker v-model="currentShift.datetime"  @input="$refs.menu2.save(currentShift.datetime)"></v-time-picker>
        </v-menu>
        <v-layout row >
          <v-checkbox
            v-model="checkbox_rtt"              
            label="Congé journée"
          ></v-checkbox>
          <v-checkbox
            v-model="checkbox_rtt_matin"              
            label="Congé matin"
          ></v-checkbox>
          <v-checkbox
            v-model="checkbox_rtt_pm"              
            label="Congé après-midi"
          ></v-checkbox>
        </v-layout>
        <v-text-field
          name="comment"
          v-model="currentShift.comment"
          label="Un commentaire ?"          
          prepend-icon="edit"
          textarea
        ></v-text-field>
      </v-flex>
      <!-- -->
      <!-- -->
      <!-- -->
      <!-- -->
      <v-flex xs12 sm6 offset-sm3>
        <v-toolbar>
          <v-btn icon>
            <v-icon>history</v-icon>
          </v-btn>
          <v-toolbar-title>Temps déclarés</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon @click="historyVisible=!historyVisible">keyboard_arrow_down</v-icon>
          </v-btn>
        </v-toolbar>        
      </v-flex>
      <v-spacer style="margin-top:15px;"></v-spacer>
      <v-flex xs12 sm6 md4  offset-sm3 v-bind:style="'display:'+(historyVisible?'block':'none')+';'">
        <v-spacer></v-spacer>
        <shift-record v-for="shift in someShift" v-bind:key="shift.date" v-bind:shift="shift"></shift-record>        
      </v-flex>
    </v-layout>
    
  </v-container>
  
</template>

<script>
// import { mapState } from 'vuex'
// import FileLine from '../components/FileLine'
import { mapActions, mapState } from 'vuex'
import On from '../../const/on'
import ShiftRecord from '../components/ShiftRecord'

export default {
  name: 'shifts',
  components: {ShiftRecord},
  computed: {
    ...mapState({
      users: state => state.users.usersList,
      deleteSuccess: state => state.users.deletedUserSuccess,
      deleteError: state => state.users.deletedUserError,
      computedDateFormatted () {
        console.log('oui')
        return this.formatDate(this.date)
      }
    })
  },
  mounted: function () {
    // console.log('je charge les données')
    this.loadUsers()
  },
  watch: {
    'currentShift.date' (val) {
      // console.log('test')
      this.dateFormatted = this.formatDate(this.currentShift.date)
    }
  },
  methods: {
    ...mapActions({
      loadUsers: On.LOAD_USERS,
      deleteUser: On.DELETE_USER
    }),
    initDelete () {
      this.visible = true
      this.$store.state.users.deletedUserSuccess = false
      this.$store.state.users.deletedUserError = false
    },
    localDeleteUser () {
      // console.log('deleteUser : ', this.selectedUser)
      this.deleteUser(this.selectedUser)
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    initDate (date) {
      // console.log(date)
      // console.log(date.day)
      const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
      const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date)
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
      const r = `${da}/${mo}/${ye}`
      return r
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  },
  data () {
    return {
      shiftVisible: true,
      historyVisible: true,
      checkbox_rtt: null,
      checkbox_rtt_matin: null,
      checkbox_rtt_pm: null,
      currentShift: {
        date: null,
        datetime: null,
        conges: '',
        comment: null
      },
      someShift: [{
        date: '12/03/2018',
        datetime: '08:50',
        conges: '',
        comment: 'un commentaire'
      },
      {
        date: '12/05/2020',
        datetime: 'RTT',
        conges: 'rtt',
        comment: 'un commentaire'
      },
      {
        date: '15/05/2020',
        datetime: 'RTT après midi',
        conges: 'rtt_pm',
        comment: 'un commentaire'
      },
      {
        date: '12/07/2018',
        datetime: 'RTT Matin',
        conges: 'rtt_matin',
        comment: 'un commentaire'
      },
      {
        date: '21/07/2018',
        datetime: 'Congés maladie',
        conges: 'maladie',
        comment: 'un commentaire'
      }],
      aShift: {
        date: '13/01/2018',
        datetime: '08:50',
        conges: 'rtt_pm',
        comment: 'un commentaire'
      },
      dateFormatted: null,
      menu: false,
      datetimeFormatted: null,
      menu2: false,
      selectedUser: '',
      valid: false,
      visible: false,
      confirmText: '',
      btnDisabled: false,
      confirmRules: [
        v => !!v || 'Confirmation est requise',
        v => v === this.selectedUser || 'Veuillez confirmer'
      ]
    }
  }
}
</script>