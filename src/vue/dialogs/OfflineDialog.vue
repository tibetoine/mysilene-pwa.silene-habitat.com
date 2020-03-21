<template>
  <v-dialog
    width="800px"
    v-model="visible"
    transition="dialog-bottom-transition"
    :overlay="true"
    scrollable
  >
    <v-card tile>
      <v-toolbar card dark color="primary">
        <v-icon>wifi_off</v-icon>
        <v-toolbar-title>Application Hors-ligne</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-alert :value="true" type="info">
        Il semblerait que vous soyez Hors Ligne. (Dernière connexion :
        {{ lastApiCall }})
      </v-alert>
      <v-alert :value="true" type="info">
        Message erreur {{ healthcheck }}
      </v-alert>
      <v-spacer></v-spacer>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'offline-dialog',
    data() {
      return {}
    },
    computed: {
      lastApiCall: {
        get: function() {
          return JSON.stringify(this.$store.state.lastApiCall, null, 4)
        }
      },
      healthcheck: {
        get: function() {
          return JSON.stringify(this.$store.state.healthcheck, null, 4)
        }
      },
      visible: {
        get: function() {
          return this.$store.state.offline.showDialog
        },
        set: function(val) {
          this.$store.state.offline.showDialog = val
        }
      }
    }
  }
</script>
