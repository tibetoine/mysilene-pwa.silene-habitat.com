<template>
  <v-layout column>
    <v-flex xs12 sm6 offset-sm3>
      <v-toolbar>
        <v-btn icon>
          <v-icon>alarm_on</v-icon>
        </v-btn>
        <v-toolbar-title>Déclarer le temps travaillé</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click="shiftVisible = !shiftVisible"
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
      v-bind:style="'display:' + (shiftVisible ? 'block' : 'none') + ';'"
    >
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
        <v-date-picker
          v-model="currentShift.date"
          @input="$refs.menu.save(currentShift.date)"
        ></v-date-picker>
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
        <v-time-picker
          v-model="currentShift.datetime"
          @input="$refs.menu2.save(currentShift.datetime)"
        ></v-time-picker>
      </v-menu>
      <v-layout row>
        <v-checkbox v-model="checkbox_rtt" label="Congé journée"></v-checkbox>
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
  </v-layout>
</template>
<script>
  export default {
    name: 'shiftdialog',
    props: ['shift'],
    data() {
      return {}
    },
    methods: {
      todo(shift) {}
    }
  }
</script>
