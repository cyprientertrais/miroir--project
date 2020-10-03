<template>
  <v-card dark class="pa-3">
    <v-row class="text-center">
      <v-col>
        <strong>{{ city }}</strong>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="meteo in meteos" :key="meteo.timestamp" class="ma-3">
        <v-row>
          <img :src="getIconUrl(meteo)" />
        </v-row>
        <v-row>
          <strong>{{ meteo.dt }}</strong>
        </v-row>
        <v-row> min: {{ meteo.temp.min.toFixed(0) }}°C </v-row>
        <v-row> max: {{ meteo.temp.max.toFixed(0) }}°C </v-row>
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
    this.getData();
    this.getCity();
  },
  computed: {
    ...mapGetters(["location"]),
  },
  data() {
    return {
      meteos: [],
      city: "",
    };
  },
  methods: {
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
          localStorage.setItem("city",res.data.city);
        });
      }
    },
    getData() {
      ResourcesService.getMeteo().then((res) => {
        res.data.daily.forEach((element) => {
          element.dt = moment(element.dt * 1000)
            .calendar()
            .split("à")[0];
        });
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
      this.getCity()
    },
  },
};
</script>

<style>
span {
  color: white;
}
</style>
