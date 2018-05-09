<template>
    <v-dialog width="800px" v-model="visible" transition="dialog-bottom-transition" :overlay="true" scrollable>
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-toolbar-title>Détail sur une erreur</v-toolbar-title>
            <v-spacer></v-spacer>            
          </v-toolbar>
          <div v-if="error!=null">
            {{error}}
          </div>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'error-dialog',
  data () {
    return {
    }
  },
  computed: {
    error: {
      get: function () {
        return JSON.stringify(this.$store.state.error.data, null, 4)
      }
    },
    visible: {
      get: function () {
        return this.$store.state.error.showDialog
      }
    }
  }
}
</script>
