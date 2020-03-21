<template>
  <div class="text-xs-center">
    <v-bottom-sheet v-model="visible" inset id="mysilene-contact-dialog-id">
      <v-card tile lazy>
        <v-progress-linear
          :value="100"
          height="3"
          class="my-0"
        ></v-progress-linear>

        <v-bottom-nav
          :value="true"
          :active.sync="e2"
          color="blue-grey"
          absolute
          shift
        >
          <v-btn v-on:click.stop="sendMail(contact.mail)" dark>
            <span>Mail</span>
            <v-icon>email</v-icon>
          </v-btn>
          <v-btn v-on:click.stop="callBryan(contact.telephoneNumber)" dark>
            <span>Fixe</span>
            <v-icon>phone</v-icon>
          </v-btn>
          <v-btn v-on:click.stop="textBryan(contact.mobile)" dark>
            <span>SMS</span>
            <v-icon>chat</v-icon>
          </v-btn>
          <v-btn v-on:click.stop="callMobileBryan(contact.mobile)" dark>
            <span>Mobile</span>
            <v-icon>phonelink_ring</v-icon>
          </v-btn>
          <v-btn v-on:click.stop="goToContact(contact)" dark>
            <span>Détails</span>
            <v-icon>details</v-icon>
          </v-btn>
        </v-bottom-nav>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Do from '../../const/do'

  export default {
    name: 'contact-dialog',
    data() {
      return {
        e2: 3,
        snackbar: false,
        y: 'top',
        x: 'right',
        mode: 'multi-line',
        timeout: 5000,
        text: ''
      }
    },
    methods: {
      ...mapMutations({
        showSnackbar: Do.SHOW_CONTACTS_SNACKBAR
      }),
      goToContact: function(contact) {
        this.$router.push({ path: `/contacts/${contact._id}` })
      },
      sendMail(mail) {
        if (mail) {
          window.location = 'mailto:' + mail
        } else {
          this.showSnackbar("Ce contact n'a pas de mail connu.")
        }
      },
      callBryan(fixe) {
        if (fixe) {
          window.location = 'tel:' + fixe
        } else {
          this.showSnackbar("Ce contact n'a pas de numéro de fixe connu")
        }
      },
      callMobileBryan(mobile) {
        if (mobile) {
          window.location = 'tel:' + mobile
        } else {
          this.showSnackbar("Ce contact n'a pas de numéro de mobile connu")
        }
      },
      textBryan(mobile) {
        if (mobile) {
          window.location = 'sms:' + mobile
        } else {
          this.showSnackbar("Ce contact n'a pas de numéro de mobile connu")
        }
      }
    },
    computed: {
      contact: {
        get: function() {
          return this.$store.state.selectedContact
        }
      },
      visible: {
        get: function() {
          return this.$store.state.contacts.showDialog
        },
        set: function(val) {
          this.$store.state.contacts.showDialog = val
        }
      }
    }
  }
</script>
