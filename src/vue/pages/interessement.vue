<template>
  <v-container style="margin-top: 50px;">
    <div id="app">
      <v-app>
        <v-toolbar dark color="primary">
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = !dialog">
            <v-icon>link</v-icon>
          </v-btn>
        </v-toolbar>
        <v-content>
          <v-container fluid>
            <v-flex
              xs12
              class="text-xs-center text-sm-center text-md-center text-lg-center"
            >
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
                >Uploader</v-btn
              >
            </v-flex>
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
          </v-container>
        </v-content>
      </v-app>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import On from '../../const/on'
export default {
  name: 'forbidden',
  components: {},
  methods: {
    ...mapActions({
      uploadFile: On.UPLOAD_FILE
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
      // var self = this
      console.log('localUploadFile')
      console.log(this.file)
      this.uploadFile(this.file)
    }
  },
  data() {
    return {
      formData: new FormData(),
      title: 'Image Upload',
      dialog: false,
      fileName: '',
      fileUrl: '',
      file: ''
    }
  }
}
</script>
