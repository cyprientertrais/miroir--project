<template>
  <v-carousel  dark v-if="news" v-model="model" :show-arrows="false" cycle hide-delimiters>
    <v-carousel-item
      
      v-for="(el,i) in news"
      :key="i"
    >
      <v-sheet
        height="100%"
        fill-height fluid
 
      >
         <v-card class="mx-auto">
      <v-img
        :src="el.enclosure.url"
       
      ></v-img>
  
      <v-card-title>
        {{el.title}}
      </v-card-title>
  
      <v-card-subtitle>
       {{moment(el.isoDate).fromNow()}}
      </v-card-subtitle>
         </v-card>

      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import Resources from "@/service/resources/resources";
var moment = require("moment");
const ResourcesService = new Resources();

export default {
  name: "News",

  created() {
    ResourcesService.getNews().then(res=>{
        this.news=res.items.sort(function(a, b) {
          console.log (a)
        return new Date(b.isoDate) - new Date(a.isoDate);
      });
    });
  },

  data() {
    return {
    model:0,
    news:null
    };
  },
  methods: {
    moment(d){
      return moment(d);
    }
   
  },
};
</script>
