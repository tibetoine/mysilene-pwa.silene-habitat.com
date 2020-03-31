<template>
  <v-snackbar
    :timeout="snackbarTimeout"
    :color="snackbarColor"
    v-model="snackbarModel"
  >
    {{ snackbarMessage }}
    <v-btn dark flat @click.native="snackbarModel = false">Close</v-btn>
  </v-snackbar>
</template>
<script>
  export default {
    name: 'snackbarMessage',
    props: [],
    data() {
      return {
        snackbarTimeout: 6000
      }
    },
    computed: {
      snackbarModel: {
        get: function() {
          return this.$store.state.shift.showSnackbar
        },
        set: function(val) {
          this.$store.state.shift.showSnackbar = val
        }
      },
      snackbarColor: {
        get: function() {
          return this.$store.state.shift.snackbarColor
        },
        set: function(val) {
          this.$store.state.shift.snackbarColor = val
        }
      },
      snackbarMessage: {
        get: function() {
          return this.$store.state.shift.snackbarMessage
        },
        set: function(val) {
          this.$store.state.shift.snackbarMessage = val
        }
      }
    },
    methods: {}
  }
</script>
