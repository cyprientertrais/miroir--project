<template>
  <v-carousel  dark v-if="flux" v-model="model" :show-arrows="false" hide-delimiters>
    <v-carousel-item
      
      v-for="(el,i) in flux"
      :key="i"
    >
      <v-sheet
        height="100%"
        fill-height fluid
 
      >
         <v-card class="mx-auto">
      <v-img
      width="50%"
        :src="el.img"
       
      ></v-img>
  
      <v-card-title>
        {{el.title}}
      </v-card-title>
  
      <v-card-subtitle>
      toto
      </v-card-subtitle>
         </v-card>

      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>

export default {
  name: "Radio",


  data() {
    return {
    model:0,
    flux:[{title:"NRJ",audio:"https://scdn.nrjaudio.fm/fr/30001/mp3_128.mp3?cdn_path=audio_lbs8",img:"https://www.nrj.fr/uploads/assets/common/logos/logo-nrj2.svg"}]
    };
  },
  methods: {
    
   
  },
};
</script>
