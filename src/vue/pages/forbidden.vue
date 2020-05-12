<template>
  <v-container style="margin-top: 50px;">
    <v-alert :value="true" type="error" outline color="error">
      HTTP 403 : Vous n'avez pas les droits pour accéder à cette section,
      veuillez contacter un administrateur.
    </v-alert>
  </v-container>
</template>

<script>
export default {
  name: 'forbidden',
  components: {},

  data() {
    return {}
  }
}
</script>
