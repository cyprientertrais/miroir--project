<template>
  <v-card v-if="todayMeteo" dark class="pa-3">
    <v-row class="text-center">
      <v-col>
        <v-row
          ><strong>{{ todayMeteo.dt }} à {{ city }}</strong></v-row
        >
        <v-row><img :src="getIconUrl(todayMeteo)" /></v-row>
        <v-row
          >{{ todayMeteo.temp.min.toFixed(0) }}°C -
          {{ todayMeteo.temp.max.toFixed(0) }}°C</v-row
        >
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col>
        <v-icon> mdi-white-balance-sunny </v-icon>
        <div>{{ todayMeteo.sunrise }}</div>
      </v-col>
      <v-col>
        <v-icon> mdi-moon-waxing-crescent </v-icon>
        <div>{{ todayMeteo.sunset }}</div>
      </v-col>
    </v-row>

    <v-divider></v-divider>
    
    <v-row v-if="meteos">
      <v-col v-for="meteo in meteos" :key="meteo.timestamp" class="ma-3">
        <v-row class="text-center">
          <img :src="getIconUrl(meteo)" />
        </v-row>
        <v-row class="text-center">
          <strong>{{ meteo.dt }}</strong>
        </v-row>
        <v-row class="text-center">
          min: {{ meteo.temp.min.toFixed(0) }}°C
        </v-row>
        <v-row class="text-center">
          max: {{ meteo.temp.max.toFixed(0) }}°C
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
// import Day from "./Day";
import Resources from "@/service/resources/resources";
import { mapGetters } from "vuex";

var moment = require("moment");
const ResourcesService = new Resources();

export default {
  name: "Weather",
  created() {
    this.getWeekInfo();
    this.getCity();
  },
  computed: {
    ...mapGetters(["location"]),
  },
  data() {
    return {
      meteos: [],
      city: "",
      todayMeteo: undefined,
    };
  },
  methods: {
    moment: function () {
      return moment();
    },
    getCity() {
      const params = {
        lat: this.location.coords.latitude,
        long: this.location.coords.longitude,
      };
      if (localStorage.getItem("city")) {
        this.city = localStorage.getItem("city");
      } else {
        ResourcesService.getCity(params).then((res) => {
          this.city = res.data.city;
          localStorage.setItem("city", res.data.city);
        });
      }
    },
    getWeekInfo() {
      ResourcesService.getMeteo().then((res) => {
        res.data.daily.splice(4, 4);
        res.data.daily.forEach((element) => {
          element.sunrise = moment(element.sunrise * 1000).format("LT");
          element.sunset = moment(element.sunset * 1000).format("LT");
          element.dt = moment(element.dt * 1000)
            .calendar()
            .split("à")[0];
        });
        this.todayMeteo = res.data.daily[0];
        res.data.daily.splice(0, 1);
        this.meteos = res.data.daily;
      });
    },
    getIconUrl(meteo) {
      return (
        "http://openweathermap.org/img/wn/" + meteo.weather[0].icon + ".png"
      );
    },
  },
  watch: {
    location() {
      this.getCity();
    },
  },
};
</script>

<style>
span {
  color: white;
}
</style>
