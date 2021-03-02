<template>
  <v-carousel
    dark
    v-if="news"
    v-model="model"
    :show-arrows="false"
    cycle
    transition="scroll-y-transition"
    reverse-transition="scroll-y-transition"
    height="40vh"
    hide-delimiters
    interval="9000"
  >
    <v-carousel-item
      leave-absolute="true"
      hide-on-leave="false"
      v-for="(el, i) in news"
      :key="i"
    >
      <v-sheet fill-height fluid>
        <v-card class="mx-auto">
          <v-img :src="el.enclosure.url"></v-img>

          <v-card-title>
            {{ el.title }}
          </v-card-title>

          <v-card-subtitle>
            {{ el.creator }}
            {{ moment(el.isoDate).fromNow() }}
          </v-card-subtitle>
        </v-card>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import WidgetResources from "@/service/resources/WidgetResources";
var moment = require("moment");
const WidgetService = new WidgetResources();

export default {
  name: "News",

  created() {
    WidgetService.getNews().then(res => {
      this.news = res.items.sort(function(a, b) {
        return new Date(b.isoDate) - new Date(a.isoDate);
      });
    });
  },

  data() {
    return {
      model: 0,
      news: null
    };
  },
  methods: {
    moment(d) {
      return moment(d);
    }
  }
};
</script>
