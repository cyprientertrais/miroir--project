<template>
  <v-carousel dark v-if="news" v-model="news">
    <v-carousel-item
      v-for="(title,i) in news.items"
      :key="i"
    >
      <v-sheet
        height="100%"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-3">
           {{title}}
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
// import Day from "./Day";
import Resources from "@/service/resources/resources";

const ResourcesService = new Resources();

export default {
  name: "News",

  created() {
    ResourcesService.getNews().then(res=>{
        this.news=res;
        console.log("res = ", this.news)

    });
  },

  data() {
    return {
     news:null
    };
  },
  
  methods: {
   
  },
  watch: {
  }
};
</script>

<style>
span {
  color: white;
}
</style>
