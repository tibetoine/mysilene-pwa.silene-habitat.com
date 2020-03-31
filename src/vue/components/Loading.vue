<!-- TODO : Regarder sur ordi boulot, ça doit etre déjà fait ce truc -->
<template>
  <v-overlay opacity="0.46" :value="overlay" z-index="200">
    <v-container style="height: 400px;">
      <v-row class="fill-height" align-content="center" justify="center">
        <v-col class="title text-center" cols="12">
          {{ loadingText }}
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
  </v-overlay>
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
