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
        <v-row
        justify="center"
        align="center"
        >
          <div class="content">
           <span  class="news">{{el.title}}</span>
           <img :src="el.enclosure.url" width="100%"/>
          </div>
          <div class="date">{{moment(el.isoDate).fromNow()}}</div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
// import Day from "./Day";
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
  watch: {
  }
};
</script>

<style>
span {
  color: white;
}
.content{
width: 100%;
margin-left: 15px;
margin-right: 10px;
text-align: center;
}
.news{
  font-size: 20px;
  
}
.date{
  text-align: right;
  justify-content: right;
}
</style>
