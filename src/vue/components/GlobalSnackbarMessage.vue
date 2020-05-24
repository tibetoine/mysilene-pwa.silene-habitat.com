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
  name: 'globalSnackbarMessage',
  props: [],
  data() {
    return {
      snackbarTimeout: 6000
    }
  },
  computed: {
    snackbarModel: {
      get: function () {
        return this.$store.state.snackbar.visible
      },
      set: function (val) {
        this.$store.state.snackbar.visible = val
      }
    },
    snackbarColor: {
      get: function () {
        return this.$store.state.snackbar.color
      },
      set: function (val) {
        this.$store.state.snackbar.color = val
      }
    },
    snackbarMessage: {
      get: function () {
        return this.$store.state.snackbar.message
      },
      set: function (val) {
        this.$store.state.snackbar.message = val
      }
    }
  },
  methods: {}
}
</script>
