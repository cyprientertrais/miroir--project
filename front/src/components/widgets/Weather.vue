<template>
  <v-card v-if="todayMeteo" dark class="pa-3">
    <v-row>
      <v-col>
        <v-row justify="center" align="center">
          <strong>{{ todayMeteo.dt }} à {{ city.name }}</strong>
        </v-row>
        <v-row justify="center" align="center">
          <img :src="getIconUrl(todayMeteo)" />
        </v-row>
        <v-row justify="center" align="center">
          Min {{ todayMeteo.temp.min.toFixed(0) }}°C Max
          {{ todayMeteo.temp.max.toFixed(0) }}°C
        </v-row>
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
        <v-row justify="center" align="center">
          <img :src="getIconUrl(meteo)" />
        </v-row>
        <v-row justify="center" align="center">
          <strong>{{ meteo.dt }}</strong>
        </v-row>
        <v-row justify="center" align="center">
          Min {{ meteo.temp.min.toFixed(0) }}°C
        </v-row>
        <v-row justify="center" align="center">
          Max {{ meteo.temp.max.toFixed(0) }}°C
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
// import Day from "./Day";
import WidgetResources from "@/service/resources/WidgetResources";
import { mapGetters } from "vuex";

var moment = require("moment");
const widgetService = new WidgetResources();

export default {
  name: "Weather",
  created() {
    this.getWeekInfo();
    this.getTodayInfos();
  },
  computed: {
    ...mapGetters(["location"])
  },
  data() {
    return {
      meteos: [],
      city: "",
      todayMeteo: undefined
    };
  },
  methods: {
    moment: function() {
      return moment();
    },
    getTodayInfos() {
      if (this.location) {
        widgetService
          .getTodayMeteo({
            lon: this.location.long,
            lat: this.location.lat,
            units: "metric"
          })
          .then(res => {
            this.city = res.data.city;
          });
      }
    },
    getWeekInfo() {
      if (this.location) {
        widgetService
          .getMeteo({
            lon: this.location.long,
            lat: this.location.lat,
            exclude: "current,minutely,alerts",
            units: "metric"
          })
          .then(res => {
            res.data.daily.splice(4, 4);
            res.data.daily.forEach(element => {
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
      }
    },
    getIconUrl(meteo) {
      return (
        "http://openweathermap.org/img/wn/" + meteo.weather[0].icon + ".png"
      );
    }
  },
  watch: {
    location() {
      this.getWeekInfo();
      this.getTodayInfos();
    }
  }
};
</script>

<style>
span {
  color: white;
}
</style>
