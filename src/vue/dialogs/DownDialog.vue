<template>
    <v-dialog width="800px" v-model="visible" transition="dialog-bottom-transition" :overlay="true" scrollable>
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-icon>bug_report</v-icon>
            <v-toolbar-title>Serveur HS</v-toolbar-title>
            <v-spacer></v-spacer>            
          </v-toolbar>
          <div style="padding:10px;" v-if="error!=null">
            <p>Le serveur semble avoir des problèmes. Nous vous invitons à réessayer dans quelques minutes.</p>
            <p>Information sur l'erreur</p>
            <p>{{error}}</p>
            
          </div>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'down-dialog',
  data () {
    return {
    }
  },
  computed: {
    error: {
      get: function () {
        return JSON.stringify(this.$store.state.downState.downMessage, null, 4)
      }
    },
    visible: {
      get: function () {
        return this.$store.state.downState.showDialog
      },
      set: function (val) {
        // should not be used
      }
    }
  }
}
</script>
