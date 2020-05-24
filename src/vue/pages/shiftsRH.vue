<template>
  <v-container style="margin-top: 50px;">
    <v-layout column>
      <v-flex offset-sm3>
        <shift-saturday></shift-saturday>
        <v-spacer style="margin-top: 20px;"></v-spacer>
        <shift-extract></shift-extract>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import { mapState } from 'vuex'
import ShiftExtract from '../components/ShiftExtract'
import ShiftSaturday from '../components/ShiftSaturday'
import SnackbarMessage from '../components/SnackbarMessage'
import { mapState, mapActions, mapMutations } from 'vuex'
// import Do from '../../const/do'
// import On from '../../const/on'

export default {
  name: 'shiftsRH',
  components: { ShiftSaturday, ShiftExtract, SnackbarMessage },
  computed: {
    ...mapState({})
  },
  mounted: function () {},
  methods: {
    ...mapActions({}),
    ...mapMutations({}),
    extract() {
      alert('A faire.')
    }
  },
  data() {
    return {}
  }
}
</script>
