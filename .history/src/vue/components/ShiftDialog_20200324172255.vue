<template>
  <v-dialog
    v-model="visible"
    transition="dialog-bottom-transition"
    :overlay="true"
  >
    <v-card tile>
      <v-toolbar>
        <v-btn icon>
          <v-icon>alarm_on</v-icon>
        </v-btn>
        <v-toolbar-title>Déclaration de temps</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click="shiftVisible = !shiftVisible"
            >keyboard_arrow_down</v-icon
          >
        </v-btn>
      </v-toolbar>
      <v-form style="padding:5px;" v-model="valid">
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
            :rules="dateRules"
            solo
            label="Choisir la date"
            hint="JJ/MM/ANNEE (Ex : 12/04/2020)"
            prepend-icon="event"
            @blur="currentShift.date = parseDate(dateFormatted)"
            readonly
            required
          ></v-text-field>
          <v-date-picker
            v-model="currentShift.date"
            @input="$refs.menu.save(currentShift.date)"
            :allowed-dates="allowedDates"
            locale="fr-FR"
            first-day-of-week="1"
          ></v-date-picker>
        </v-menu>
        <v-text-field
          v-if="timeVisible"
          v-model="currentShift.datetime"
          :rules="timeRules"
          label="Nombre d'heures (Ex : 07:00)"
          prepend-icon="schedule"
          solo
        ></v-text-field>
        <v-select
          :items="selectItems"
          v-model="selectedType"
          label="Choisir votre type de créneau"
          item-text="name"
          item-value="name"
          max-height="auto"
          autocomplete
          scrollable
          :rules="typeRules"
          prepend-icon="help_outline"
          :return-object="true"
        >
          <template slot="item" slot-scope="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-action>
                <v-icon>{{ data.item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                <v-list-tile-sub-title
                  v-html="data.item.group"
                ></v-list-tile-sub-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-select>
        <!-- <v-layout row>
          <v-checkbox v-model="checkbox_rtt" label="Congé journée"></v-checkbox>
          <v-checkbox
            v-model="checkbox_rtt_matin"
            label="Congé matin"
          ></v-checkbox>
          <v-checkbox
            v-model="checkbox_rtt_pm"
            label="Congé après-midi"
          ></v-checkbox>
        </v-layout> -->
        <v-text-field
          name="comment"
          v-model="currentShift.comment"
          label="Un commentaire ?"
          prepend-icon="edit"
          textarea
        ></v-text-field>
        <v-btn color="success" class="mr-4" :disabled="!valid" @click="submit">
          Valider
        </v-btn>
        <v-btn color="error" class="mr-4" @click="clear">
          Effacer
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  import On from '../../const/on'
  import Do from '../../const/do'
  import timeTypes from '../../data/shifts.json'
  export default {
    name: 'shiftdialog',
    props: ['shift'],
    data() {
      return {
        timeVisible: true,
        selectedType: null,
        myTimeTypes: timeTypes,
        valid: false,
        shiftVisible: true,
        currentShift: {
          date: null,
          datetime: '',
          conges: '',
          comment: ''
        },
        dateFormatted: null,
        menu: false,
        datetimeFormatted: null,
        menu2: false,
        customFilter(item, queryText, itemText) {
          const hasValue = val => (val != null ? val : '')
          const text = hasValue(item.name)
          const query = hasValue(queryText)
          return (
            text
              .toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
          )
        },
        dateRules: [
          v => {
            return !!v || 'La date est requise'
          }
        ],
        timeRules: [
          v => {
            return !!v || v == null || `Un nombre d'heures est requis`
          },
          v => {
            let regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
            console.log(regex.text(v))
            return regex.text(v) || `Le temps saisi doit réspecter le format HH:MM (Exemple : 07:00)`
          },
          v => {
            let times = v.split(':')
            let minutes = parseInt(times[0]) * 60 + parseInt(times[1])
            return minutes<600 || `Le temps saisi doit réspecter le format HH:MM (Exemple : 07:00)`
          }
        ],
        typeRules: [v => !!v || `Une catégorie est requise`]
      }
    },
    methods: {
      ...mapActions({
        saveShift: On.SAVE_SHIFT
      }),
      ...mapMutations({
        hideShiftDialog: Do.HIDE_SHIFT_DIALOG
      }),
      clear() {
        this.currentShift.datetime = ''
        this.dateFormatted = ''
        this.selectedType = null
      },
      parseDate(date) {
        if (!date) return null

        const [day, month, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      formatDate(date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      initDate(date) {
        // console.log(date)
        // console.log(date.day)
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(
          date
        )
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(
          date
        )
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(
          date
        )
        const r = `${da}/${mo}/${ye}`
        return r
      },
      allowedDates: val => {
        let theDate = new Date(val)
        return theDate.getDay() !== 0
      },
      submit() {
        /* Appel d'API */
        let shift = {
          date: this.parseDate(this.dateFormatted),
          datetime: this.currentShift.datetime,
          comment: this.currentShift.comment,
          type: this.selectedType.id
        }

        let user = {
          userId: localStorage.getItem('user-id')
        }
        this.saveShift({ user, shift }).then(() => {
          // console.log('OUai')
        })
        // TODO gérer le success
      }
    },
    watch: {
      'currentShift.date'(val) {
        // console.log('test')
        this.dateFormatted = this.formatDate(this.currentShift.date)
      },
      selectedType(val) {
        // console.log(val.type)
        if (val && val.type === 'conges') {
          this.timeVisible = false
        } else {
          this.timeVisible = true
        }
      }
    },
    mounted: function() {
      this.selectedType = this.selectItems[2]

      /* Si pas de currentShift, je mets la date du jour par défaut */
      if (!this.currentShift.date) {
        let dateIni = this.initDate(new Date())
        // console.log(dateIni)
        this.dateFormatted = dateIni
      }
    },
    computed: {
      visible: {
        get: function() {
          return this.$store.state.shift.showDialog
        },
        set: function(val) {
          this.$store.state.shift.showDialog = val
        }
      },
      ...mapState({
        computedDateFormatted() {
          return this.formatDate(this.date)
        }
      }),
      selectItems: () => {
        /* Fonction de filtre qui permet de ne retourner que les types uniques dans notre tableau de référence. */
        function onlyUnique(value, index, self) {
          return (
            self.findIndex(element => {
              return element[1].type === value[1].type
            }) === index
          )
        }
        let types = timeTypes.time_types

        /* Récupération des types uniques dans notre tableau de référence (Voir shifts.json) (Une sorte de select disctinct) */
        let groups = Object.entries(types)
          .filter(onlyUnique)
          .map(element => element[1].type)
        // console.log('groups', groups)

        let newArray = Object.keys(types).map(item => {
          // console.log(item, ' - ', types[item])
          let jsonObject = {
            id: types[item].id,
            name: types[item].label,
            group: types[item].type,
            icon: types[item].icon,
            type: types[item].type
          }
          return jsonObject
        })

        let finalArray = []
        groups.forEach(group => {
          // console.log(group)
          let oneGroupArray = newArray.filter(item => {
            return item.group === group
          })
          // console.log(oneGroupArray)
          finalArray.push({ header: group })
          finalArray = finalArray.concat(oneGroupArray)
        })

        return finalArray
      }
    }
  }
</script>
