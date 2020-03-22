<template>
  <v-container style="margin:0;padding:0;">
    <v-layout fluid row align-center>
      <v-flex :style="'width:' + mainBadgeWidth + '%;'">
        <v-chip
          :color="getColor(shift)"
          text-color="white"
          @click="showDetails()"
        >
          <v-badge :color="getColor(shift)" left>
            <span slot="badge">{{ shift.nb_creneaux }}</span>
            <v-icon>event</v-icon>
          </v-badge>
          &nbsp;{{ shift.date }}
        </v-chip>
      </v-flex>
      <v-flex v-if="!detailVisible" style="width:40%;" class="text-left">
        <v-icon>apartment</v-icon> {{ shift.worked_time }} &nbsp;
        <v-icon>domain_disabled</v-icon> {{ shift.not_worked_time }}
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex style="width:7%;">
        <v-icon>edit</v-icon>
      </v-flex>
      <v-flex style="width:7%;">
        <v-icon>delete</v-icon>
      </v-flex>
      <v-flex style="width:7%;">
        <v-icon @click="showDetails()">keyboard_arrow_down</v-icon>
      </v-flex>
    </v-layout>
    <v-container v-if="detailVisible" style="margin:0;padding:0;">
      <v-layout
        v-for="detail in shift.details"
        v-bind:key="detail.type"
        fluid
        row
        align-center
      >
        <v-flex
          :style="
            'width:1%; border-left:2px solid ' + getBorderColor(shift) + ';'
          "
        >
          &nbsp;
        </v-flex>
        <v-flex style="width:100%;">
          <v-chip
            small
            label
            style="width:90%;"
            :color="getDetailColor(detail)"
            text-color="white"
          >
            <v-icon>{{ getIcon(detail) }}</v-icon>
            &nbsp;&nbsp;{{ detail.time }} - {{ getLabel(detail) }}

            <v-tooltip
              left
              style="position:absolute;display:inline;right:0.5em;"
            >
              <v-icon slot="activator">sms</v-icon>
              <span>{{ detail.comment }}</span>
            </v-tooltip>
          </v-chip>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>
<script>
  import timeTypes from '../../data/shifts.json'

  export default {
    name: 'shiftrecord',
    props: ['shift'],
    data() {
      return {
        myTimeTypes: timeTypes,
        iconSet: {
          rtt: {
            icon: 'beach_access',
            color: 'blue darken-2'
          },
          rtt_matin: {
            icon: 'free_breakfast',
            color: 'blue darken-2'
          },
          rtt_pm: {
            icon: 'free_breakfast',
            color: 'blue darken-2'
          },
          maladie: {
            icon: 'local_hotel',
            color: 'orange darken-1'
          }
        },
        detailVisible: false,
        mainBadgeWidth: 40
      }
    },
    methods: {
      getLabel(detail) {
        console.log(this.myTimeTypes.time_types)
        return this.myTimeTypes.time_types[detail.type].label
      },
      getIcon(shift) {
        if (this.iconSet[shift.conges]) {
          return this.iconSet[shift.conges]['icon']
        } else {
          return 'apartment'
        }
      },
      getDetailIcon(detail) {
        return this.myTimeTypes.time_types[detail.type].icon
      },
      showComment(detail) {
        console.log(detail.comment)
      },
      getTimeInMin(time) {
        if (!time) return 0
        let min = 0
        let times = time.split(':')
        min = parseInt(times[0]) * 60 + parseInt(times[1])
        return min
      },
      getColor(shift) {
        let min = this.getTimeInMin(shift.total_time)
        if (min === 0) {
          return 'grey'
        } else if (min >= 420) {
          return 'green darken-2'
        } else {
          return 'orange darken-3'
        }
      },
      getDetailColor(detail) {
        return this.myTimeTypes.time_types[detail.type].color
      },
      getDetailColorHex(detail) {
        return this.myTimeTypes.time_types[detail.type].color_hex
      },
      getBorderColor(shift) {
        let min = this.getTimeInMin(shift.total_time)
        if (min === 0) {
          return '#9E9E9E'
        } else if (min >= 420) {
          return '#388E3C'
        } else {
          return '#EF6C00'
        }
      },
      showDetails() {
        console.log(this.shift)
        if (this.detailVisible) {
          this.mainBadgeWidth = 40
        } else {
          this.mainBadgeWidth = 80
        }
        this.detailVisible = !this.detailVisible
      }
    }
  }
</script>
