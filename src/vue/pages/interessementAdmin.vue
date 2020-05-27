<template>
  <v-container style="margin-top: 50px;">
    <v-layout>
      <v-flex v-if="configInteressement" xs12 offset-lg3 offset-xl2
        ><v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = !dialog">
              <v-icon>link</v-icon>
            </v-btn>
          </v-toolbar>
          <v-container grid-list-xl>
            <v-layout column>
              <v-flex>
                <v-text-field
                  label="Fichier à uploader"
                  @click="pickFile"
                  v-model="fileName"
                  prepend-icon="attach_file"
                ></v-text-field>
                <input
                  type="file"
                  style="display: none;"
                  ref="file"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  @change="onFilePicked"
                />
                <v-btn color="success" @click.stop="localUploadFile()"
                  >Charger</v-btn
                >
                <v-dialog v-model="dialog" max-width="290">
                  <v-card>
                    <v-card-title class="headline">Import Excel</v-card-title>
                    <v-card-text>Importer fichier Excel </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click.native="dialog = false"
                        >Close</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-spacer style="margin-top: 10px;"></v-spacer>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title class="white--text"
              >Bloquer les modifications</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = !dialog">
              <v-icon>shutter_speed</v-icon>
            </v-btn>
          </v-toolbar>
          <v-container grid-list-xl>
            <v-layout column>
              <v-flex>
                <v-switch
                  v-model="closed"
                  label="Modification bloquée"
                  color="error"
                  hide-details
                ></v-switch>
                <v-spacer></v-spacer>
                <v-alert type="info" outline :value="closed">
                  Le module d'intéressement n'est plus accessible pour les
                  collaborateurs Silène, quelques soient leurs droits.
                </v-alert>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex v-else>
        <v-alert type="info" outline :value="true">
          Aucune configuration chargée en base pour cette année. Consultez la
          documentation MySilene pour charger la configuration pour cette année.
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import On from '../../const/on'
export default {
  name: 'interessementAdmin',
  components: {},
  methods: {
    ...mapActions({
      uploadFile: On.UPLOAD_FILE,
      closeInteressements: On.CLOSE_INTERESSEMENTS
    }),
    pickFile() {
      this.$refs.file.click()
    },
    onFilePicked(e) {
      const files = e.target.files || e.dataTransfer.files
      /* if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          self.formData.append('file', files[i], files[i].name)
        }
      } */
      if (files[0] !== undefined) {
        this.fileName = files[0].name
        if (this.fileName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.fileUrl = fr.result
          this.file = files[0]
        })
      } else {
        this.fileName = ''
        this.file = ''
        this.fileUrl = ''
      }
    },
    localUploadFile() {
      this.uploadFile(this.file)
    }
  },
  computed: {
    ...mapState({
      configInteressement: (state) => state.interessement.configInteressement
    }),
    closed: {
      get() {
        if (!this.$store.state.interessement.configInteressement) {
          return false
        }
        return this.$store.state.interessement.configInteressement.closed
      },
      set(val) {
        let year = new Date().getFullYear()
        let data = {
          year: year,
          closed: val
        }
        this.closeInteressements(data)
      }
    }
  },
  data() {
    return {
      formData: new FormData(),
      title: 'Import fichier Excel',
      dialog: false,
      fileName: '',
      fileUrl: '',
      file: ''
    }
  }
}
</script>
