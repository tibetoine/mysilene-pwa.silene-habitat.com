<template>
  <v-dialog
    width="800px"
    v-model="visible"
    transition="dialog-bottom-transition"
    :overlay="false"
    scrollable
  >
    <v-card tile v-model="dirty">
      <v-toolbar card dark color="primary">
        <v-toolbar-title>Filtrer les news</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="visible = false" dark>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-switch
          v-for="newsType in newsTypes"
          :key="newsType.value"
          v-model="selectedNewsTypes"
          :label="newsType.label"
          :value="newsType.value"
          @change="dirty = true"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapMutations, mapActions, mapState } from 'vuex'
  import Do from '../../const/do'
  import On from '../../const/on'

  export default {
    name: 'filter-news-dialog',
    methods: {
      ...mapActions({
        savePrefs: On.SAVE_PREFS
      }),
      ...mapMutations({
        toggleDialog: Do.TOGGLE_NEWS_FILTER_DIALOG
      })
    },
    computed: {
      ...mapState({
        newsTypes: state => state.news.types
      }),
      selectedNewsTypes: {
        get: function() {
          return this.$store.state.news.selectedTypes
        },
        set: function(value) {
          this.$store.state.news.selectedTypes = value
        }
      },
      visible: {
        get: function() {
          return this.$store.state.news.filterDialogVisible
        },
        set: function(val) {
          if (
            !val &&
            this.$store.state.news.dirty &&
            this.$store.state.news.dirty != null
          ) {
            this.savePrefs()
          }
          this.toggleDialog(val)
        }
      },
      dirty: {
        get: function() {
          return this.$store.state.news.dirty
        },
        set: function(val) {
          this.$store.state.news.dirty = val
        }
      }
    }
  }
</script>
