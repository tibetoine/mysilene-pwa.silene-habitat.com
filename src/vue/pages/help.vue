<template>
  <v-container style="margin-top:50px;">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-toolbar>
          <v-btn icon>
            <v-icon>live_help</v-icon>
          </v-btn>
          <v-toolbar-title>Les aides possibles</v-toolbar-title>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-divider
              v-if="item.divider"
              :inset="item.inset"
              :key="index"
            ></v-divider>
            <v-list-tile v-else :key="item.title">
              <v-list-tile-avatar>
                <img :src="item.avatar" />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title
                  v-html="item.subtitle"
                ></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action
                style="cursor:pointer;"
                v-on:click.stop="sendMail(item.email)"
              >
                <v-icon color="blue">email</v-icon>
              </v-list-tile-action>
              <v-list-tile-action
                style="cursor:pointer;"
                v-on:click.stop="callBryan(item.tel)"
              >
                <v-icon color="blue">phone</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'help',
    data() {
      return {
        items: [
          {
            avatar: '/static/img/call-center.png',
            title: 'Silène et vous',
            subtitle: 'Pour toute aide',
            email: 'contact@silene-habitat.com',
            tel: '0253484444'
          },
          { divider: true, inset: true },
          {
            avatar: '/static/img/computing-1.png',
            title: 'HelpLine',
            subtitle: 'Support informatique',
            email: 'helpline@silene-habitat.com',
            tel: '0240178520'
          },
          { divider: true, inset: true }
        ]
      }
    },
    components: {},
    methods: {
      sendMail(mail) {
        if (mail) window.location = 'mailto:' + mail
      },
      callBryan(mobile) {
        if (mobile) window.location = 'tel:' + mobile
      }
    }
  }
</script>
