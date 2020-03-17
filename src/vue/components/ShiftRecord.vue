
<template>
  <v-layout fluid row class="container" align-center>
    <v-flex style="border:1px solid">
      <v-chip :color="getColor(shift)" text-color="white">
        <v-avatar>
          <v-icon>{{getIcon(shift)}}</v-icon>
        </v-avatar>
        {{shift.date}}
      </v-chip>
    </v-flex>
    <v-flex class="text-left">
      {{shift.datetime}}
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex >
      <v-icon>edit</v-icon>
      
    </v-flex>
    <v-flex >
      <v-icon>delete</v-icon>      
    </v-flex>      
  </v-layout>  
</template>
<script>
export default {
  name: 'shiftrecord',
  props: ['shift'],
  data () {
    return {
      iconSet: {
        'rtt': {
          'icon': 'beach_access',
          'color': 'blue darken-2'
        },
        'rtt_matin': {
          'icon': 'free_breakfast',
          'color': 'blue darken-2'
        },
        'rtt_pm': {
          'icon': 'free_breakfast',
          'color': 'blue darken-2'
        },
        'maladie': {
          'icon': 'local_hotel',
          'color': 'orange darken-1'
        }
      }
    }
  },
  methods: {
    getIcon (shift) {
      if (this.iconSet[shift.conges]) {
        return this.iconSet[shift.conges]['icon']
      } else {
        return 'apartment'
      }
    },
    getColor (shift) {
      if (this.iconSet[shift.conges]) {
        return this.iconSet[shift.conges]['color']
      } else {
        return 'green darken-2'
      }
    }
  }
}
</script>

</style>
