<template>
  <v-container style="margin-top: 50px;">
    <div id="app">
      <v-app>
        <v-toolbar dark color="primary">
          <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = !dialog">
            <v-icon>link</v-icon>
          </v-btn>
        </v-toolbar>
      </v-app>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
// import On from '../../const/on'
export default {
  name: 'interessementRh',
  components: {},
  methods: {
    ...mapActions({})
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
