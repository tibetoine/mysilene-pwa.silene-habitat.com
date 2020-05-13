<template>
  <v-card>
    <v-toolbar dense>
      <v-btn icon>
        <v-icon>get_app</v-icon>
      </v-btn>
      <v-toolbar-title>Extraction</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>filter_list</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text class="pa-4">En développement - Extraction</v-card-text>
    <v-card-actions class="pt-0">
      <v-spacer></v-spacer>
      <v-btn color="primary darken-1" text @click="extractAll()"
        >Extraire Tout</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import On from '../../const/on'
import Do from '../../const/do'
import { forceFileDownload } from '../../shared/helper'
import Confirm from './Confirm'
export default {
  name: 'shiftrecord',
  components: { Confirm },
  props: ['shift'],
  data() {
    return {}
  },
  mounted: function () {},
  computed: {
    visible: {
      get: function () {
        return this.$store.state.shift.showDialog
      },
      set: function (val) {
        this.$store.state.shift.showDialog = val
      }
    }
  },
  methods: {
    ...mapActions({
      deleteShift: On.DELETE_SHIFT
    }),
    ...mapMutations({
      showShiftError: Do.SHOW_SHIFT_ERROR
    }),
    extractAll() {
      // alert('TODO Extract from component')
      this.downloadFile()
    },
    downloadFile() {
      // console.log("downloadFile ; ", urlDiagDoc)
      this.$store
        .dispatch(On.EXTRACT_ALL)
        .then((downloadedFile) => {
          /* Récupère le nom du fichier */
          var filename = 'data.xlsx'

          forceFileDownload(downloadedFile, filename)
        })
        .catch((e) => console.error(e))
    }
  }
}
</script>
