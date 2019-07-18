<template>
   <v-container style="margin-top:50px;padding:2px;">
    
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
       
        <v-btn                    
        color="blue-grey"
        class="white--text"
        @click="doSomething"
        >
            Créer Affiche
            <v-icon right dark>present_to_all</v-icon>
        </v-btn>
      </v-flex>
                  
    </v-layout>
    <div style=" width:100%;padding-bottom:71%; position: relative;" id="generateHTML"> <!-- Partie à transformer en PDF-->
        <div style="position:absolute; top:0; bottom: 0; left: 0; right: 0;">
            <!-- Titre -->
            <div style="height:20%;margin:0;padding:0;">               
                <h1 style="font-size: 10vw;text-align:center;color:white;font-stretch:100%;">CECI EST MON TITRE</h1>
            </div>
            
            <!-- Content -->
            <div style="height:60%;margin:0;padding:0;">
                <div style="width:30%;float:left;margin:0;padding:10px;">
                    <img src="/static/img/computing-1.png" style="width:100%;" alt="une_image" />   
                </div>
                <div style="width:10%;float:left;margin:0;padding:0;">
                    <p>&nbsp;</p>
                </div>
                <div style="width:60%;float:left;font-size:3vw;">
                    <p>Ceci est le contenu de ce que j'ai à dire voilà</p>
                    <p>Ceci est le contenu de ce que j'ai à dire et </p>
                    <p>Ceci est le contenu de ce que j'ai à dire o</p>
                    <p>Ceci est le contenu de ce que j'ai à dire</p>
                    <p>Ceci est le contenu de ce que j'ai à dire</p>
                </div>
            </div>

            <!-- Footer -->
            <div style="height:20%;text-align: right;margin:0;padding:0;">
                <img src="/static/img/icons/favicon-96.png" style="height:80%;" alt="silene_ico" />
            </div>

        </div>
    </div>
   </v-container>
  
</template>

<script>
import JsPDF from 'jsPDF'
import html2canvas from 'html2canvas'

window.html2canvas = html2canvas

export default {
  name: 'affiche',
  data () {
    return {
      items: {}
    }
  },
  components: {},
  methods: {
    doSomething () {
      html2canvas(document.getElementById('generateHTML')).then(function (canvas) {
        console.log('onrenderer ************** ')
        var img = canvas.toDataURL('image/png')
        var doc = new JsPDF('l', 'mm', [420, 297])
        var width = doc.internal.pageSize.getWidth()
        var height = doc.internal.pageSize.getHeight()
        doc.addImage(img, 'JPEG', 0, 0, width, height)
        doc.save('test.pdf')
      })
    }

  }
}
</script>

<style>
    h1 {
        font-family:Roboto, sans-serif;
font-size:14px;
font-stretch:100%;
font-style:normal;
font-variant-caps:normal;
font-variant-east-asian:normal;
font-variant-ligatures:normal;
font-variant-numeric:normal;
font-weight:500;
letter-spacing: 0ch;
    }
</style>
