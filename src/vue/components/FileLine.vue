<template>
  <v-card>
    <template v-for="item in list">
      <v-list-tile :key="item._id" @click="openDocument(item)">
        <img width="22px" :src="iconFileType(item)" />
        <v-list-tile-content style="padding-left:12px;">
          <v-list-tile-title v-html="item.name"></v-list-tile-title>
          <v-list-tile-sub-title
            inset
            v-html="date(item.date)"
          ></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider v-bind:key="item._id"></v-divider>
    </template>
  </v-card>
</template>

<script>
  export default {
    name: 'fileLine',
    props: ['list'],
    components: {},
    computed: {
      daily() {
        return this.$store.state.meteo.lastWeather.daily.data
      }
    },
    methods: {
      openDocument(item) {
        // Todo : display 'Ouverture dans un nouvel onglet'
        // TODO (02/07/2019) : Etudier : https://stackoverflow.com/questions/2898740/iphone-safari-web-app-opens-links-in-new-window
        if (item.link) {
          window.location = item.link
        }
      },
      iconFileType(item) {
        var iconName = 'pdf' // default

        switch (item.fileExtension) {
          case 'docx':
          case 'doc':
          case 'docm':
            iconName = 'word'
            break
          case 'xlsx':
          case 'xls':
          case 'xlsm':
            iconName = 'excel'
            break
          case 'pdf':
          case 'xps':
            iconName = 'pdf'
            break
          case 'msg':
            iconName = 'mail'
            break
          case 'pptx':
          case 'ppt':
          case 'pptm':
          case 'pps':
          case 'ppsx':
          case 'ppsm':
            iconName = 'powerpoint'
            break
          default:
            break
        }
        return '/static/img/docs/' + iconName + '.png'
      },
      date(time) {
        var days = [
          'Dimanche',
          'Lundi',
          'Mardi',
          'Mercredi',
          'Jeudi',
          'Vendredi',
          'Samedi'
        ]
        var months = [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Août',
          'Septembre',
          'Octobre',
          'Novembre',
          'Décembre'
        ]
        var date = new Date(time)
        var day = days[date.getDay()]
        var month = months[date.getMonth()]
        var dayInMonth = date.getUTCDate()
        var returnedDate =
          day + ' ' + dayInMonth + ' ' + month + ' ' + date.getUTCFullYear()
        return returnedDate
      }
    }
  }
</script>
