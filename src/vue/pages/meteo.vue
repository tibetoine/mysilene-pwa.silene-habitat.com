<template>
  <v-container style="margin-top:50px;">
    <v-layout row>
      <v-flex xs12 md9 offset-md3>
        <v-card>
          <v-list two-line>
            <template v-for="(contact, index) in contacts">
              <p v-bind:key="'photo' +index">{{contact.sn}}</p>
              <img :src="imgsrc(contact)" v-bind:key="index" />
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'meteo-contacts',
  computed: {
    ...mapGetters({ contacts: 'filteredContacts' })
  },
  methods: {
    imgsrc: contact =>
      '/static/img/ad-photos/' +
      (contact.thumbnailPhoto ? contact.sAMAccountName : 'default') +
      '.jpg'
  }
}
</script>