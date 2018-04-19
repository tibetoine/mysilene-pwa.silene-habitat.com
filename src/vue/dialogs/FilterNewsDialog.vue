<template>
    <v-dialog width="800px" v-model="visible" transition="dialog-bottom-transition" :overlay="false" scrollable>
        <v-card tile>
            <v-toolbar card dark color="primary">
                <v-toolbar-title>Filtrer les news</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click.native="visible = false" dark>
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-switch v-for="newsType in newsTypes" :key="newsType.value" v-model="selectedNewsTypes"
                          :label="newsType.label"
                          :value="newsType.value"
                />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Do from '../../const/do'

export default {
  name: 'filter-news-dialog',
  methods: {
    ...mapMutations({
      toggleDialog: Do.TOGGLE_NEWS_FILTER_DIALOG
    })
  },
  computed: {
    ...mapState({
      newsTypes: state => state.news.types
    }),
    selectedNewsTypes: {
      get: function () {
        return this.$store.state.news.selectedTypes
      },
      set: function (value) {
        this.$store.state.news.selectedTypes = value
      }
    },
    visible: {
      get: function () {
        return this.$store.state.news.filterDialogVisible
      },
      set: function (val) {
        this.toggleDialog(val)
      }
    }
  }
}
</script>