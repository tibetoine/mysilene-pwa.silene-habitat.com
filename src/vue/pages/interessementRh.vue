<template>
  <v-container offset-md4 style="margin-top: 50px;">
    <v-layout>
      <v-flex xs12 offset-lg3 offset-xl2>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon>
              <v-icon>get_app</v-icon>
            </v-btn>
            <v-toolbar-title class="white--text">Extraction</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text class="title"
            >Export des données d'intéressements au format Excel</v-card-text
          >
          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" text @click="extractAll()"
              >Extraire Tout</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex></v-layout
    >
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import On from '../../const/on'
import { forceFileDownload } from '../../shared/helper'
// import On from '../../const/on'
export default {
  name: 'interessementRh',
  components: {},
  methods: {
    ...mapActions({}),
    extractAll() {
      // alert('TODO Extract from component')
      this.downloadFile()
    },
    downloadFile() {
      // console.log("downloadFile ; ", urlDiagDoc)
      let year = new Date().getFullYear()
      this.$store
        .dispatch(On.EXPORT_INTERESSEMENTS, year)
        .then((downloadedFile) => {
          /* Récupère le nom du fichier */
          var filename = 'data.xlsx'

          forceFileDownload(downloadedFile, filename)
        })
        .catch((e) => console.error(e))
    }
  },
  data() {
    return {
      formData: new FormData(),
      dialog: false,
      fileName: '',
      fileUrl: '',
      file: ''
    }
  }
}
</script>
