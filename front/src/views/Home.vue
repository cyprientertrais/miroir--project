<template>
  <div class="home">
    <v-card
      dark
      class="username"
      style="text-align: center"
      width="250px"
      shaped
    >
      <strong v-if="userProfile">{{ userProfile.pseudo }}</strong>
    </v-card>
    <div class=" ma-2 widgetHolder" v-if="widgets">
      <v-row
        v-for="(xWidgets, index) in widgets"
        :key="index"
        justify="space-between"
      >
        <v-col
          v-for="yWidgets in xWidgets"
          :key="yWidgets"
          cols="12"
          sm="12"
          md="3"
          lg="3"
          xl="3"
        >
          <component :is="yWidgets"></component>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import WidgetResources from "@/service/resources/WidgetResources";

import VocalRecognition from "../service/vocalRecognition/VocalRecognition";
const vocalRecognition = new VocalRecognition();

const widgetService = new WidgetResources();
export default {
  name: "Home",
  components: {},
  created() {
    moment.locale("fr");
    this.setWidgets();

    vocalRecognition.vocalProcess();
  },
  data() {
    return {
      widgets: []
    };
  },
  watch: {
    userProfile: function() {
      this.setWidgets();
    },
    orientation: function() {
      this.setWidgets();
    }
  },
  computed: {
    ...mapGetters(["userProfile"])
  },
  methods: {
    setWidgets() {
      if (this.userProfile) {
        this.userProfile.dashboards
          .filter(element => element.name === "default")[0]
          .widgets.forEach(widget => {
            let quotient = Math.floor(widget.position / 2);
            let reste = widget.position % 2;
            if (this.widgets && !this.widgets[quotient]) {
              this.widgets[quotient] = [];
            }
            this.widgets[quotient][reste] = widget.name;
            this.$options.components[widget.name] = () =>
              import("../components/widgets/" + widget.name + ".vue");
          });
      }
    },
    getOrientation() {
      widgetService.getOrientation().then(res => {
        this.$store.dispatch("setOrientation", res.data.orientation);
      });
    }
  }
};
</script>

<style scoped>
.username {
  margin-left: -10px !important;
  height: 25px;
}

.home {
  background-color: black;
  height: 100%;
}

.portrait {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.widgetHolder {
  height: 100vh -25px;
}

.row {
  width: 100%;
  margin: 0;
}
</style>
