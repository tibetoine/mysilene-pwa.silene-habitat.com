<template>
  <v-container style="margin-top:50px;">
    <v-layout row wrap>
       <v-flex xs12 sm6 offset-sm3>
        <v-expansion-panel popout>
          <v-expansion-panel-content>
            <div slot="header">
              <v-avatar size="24">
                <img
                  src="/static/img/ad-photos/cfdt.jpg"
                  alt="CFDT"
                >
              </v-avatar>
              &nbsp;&nbsp;&nbsp;&nbsp;Documents CFDT
            </div>
            <fileLine key="docCfdt" :list=cfdtList></fileLine>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>

       <v-flex xs12 sm6 offset-sm3>
        <v-expansion-panel popout>
          <v-expansion-panel-content>
            <div slot="header">
              <v-avatar size="24">
                <img
                  src="/static/img/ad-photos/cgt.jpg"
                  alt="CGT"
                >
              </v-avatar>
              &nbsp;&nbsp;&nbsp;&nbsp;Documents CGT
            </div>
            <fileLine key="docCgt" :list=cgtList></fileLine>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>

       <v-flex xs12 sm6 offset-sm3>
        <v-expansion-panel popout>
          <v-expansion-panel-content>
            <div slot="header">
              <v-avatar size="24">
                <img
                  src="/static/img/ad-photos/unsa.jpg"
                  alt="UNSA"
                >
              </v-avatar>
              &nbsp;&nbsp;&nbsp;&nbsp;Documents UNSA
            </div>
            <fileLine key="docUnsa" :list=unsaList></fileLine>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>

      <v-flex xs12 sm6 offset-sm3>
        <v-expansion-panel popout>
          <v-expansion-panel-content>
            <div slot="header">Documents du CE</div>
            <fileLine key="docCe" :list=ceList></fileLine>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>

      
    </v-layout>
  </v-container>
  <!-- <v-container style="margin-top:50px;">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-toolbar>
          <v-btn icon>
            <v-icon>library_books</v-icon>
          </v-btn>
          <v-toolbar-title>Documents du CE</v-toolbar-title>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(item) in docsList">
            <v-list-tile :key="item._id" @click="openDocument(item)">
              <v-list-tile-avatar>
                <img src="/static/img/docs/pdf.png">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.date"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>      
    </v-layout>
  </v-container> -->
</template>

<script>
import { mapState } from 'vuex'
import FileLine from '../components/FileLine'

// TODO : voir : https://vuetifyjs.com/en/components/lists#example-expansion-lists

export default {
  name: 'docs',
  components: {FileLine},
  data () {
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
  computed: {
    ...mapState({
      docsList: state => state.docs.fullList,
      ceList: state => state.docs.ceList,
      cfdtList: state => state.docs.cfdtList,
      cgtList: state => state.docs.cgtList,
      unsaList: state => state.docs.unsaList,
      auth: state => state.login.Authenticate
    })
  },
  methods: {

  }
}
</script>