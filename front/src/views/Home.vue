<template>
  <div class="home">
    <v-row>
      <v-card
        dark
        class="username"
        style="text-align: center"
        width="250px"
        shaped
      >
        <strong v-if="userProfile">{{ userProfile.pseudo }}</strong>
      </v-card>
    </v-row>
    <div class="ma-2" v-if="widgets">
      <div v-if="orientation === 'landscape'">
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
            md="2"
            lg="2"
            xl="3"
          >
            <component :is="yWidgets"></component>
          </v-col>
        </v-row>
      </div>
      <div v-if="orientation === 'portrait'">
        <v-row
          v-for="(xWidgets, index) in widgets"
          :key="index"
          :class="index === 0 ? '' : 'd-flex align-end'"
        >
          <v-col
            v-for="(yWidgets, index2) in xWidgets"
            :key="index2"
            cols="12"
            sm="12"
            md="2"
            lg="2"
            xl="3"
          >
            <component :is="yWidgets"></component>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import Resources from "@/service/resources/resources";

const ResourcesService = new Resources();
export default {
  name: "Home",
  components: {},
  created() {
    moment.locale("fr");
    this.setWidgets();
    this.getOrientation();
  },
  data() {
    return {
      widgets: [],
    };
  },
  watch: {
    userProfile: function() {
      this.setWidgets();
    },
    orientation: function() {
      this.setWidgets();
    },
  },
  computed: {
    ...mapGetters(["userProfile", "orientation"]),
  },
  methods: {
    setWidgets() {
      if (this.userProfile) {
        if (this.orientation === "landscape") {
          this.userProfile.dashboards.filter(element => element.name === "default")[0].widgets.forEach((widget) => {
            let quotient = Math.floor(widget.position / 2);
            let reste = widget.position % 2;
            if (this.widgets && !this.widgets[quotient]) {
              this.widgets[quotient] = [];
            }
            this.widgets[quotient][reste] = widget.name;
            this.$options.components[widget.name] = () =>
              import("../components/widgets/" + widget.name + ".vue");
          });
        } else {
          this.userProfile.dashboards(element => element.name === "default")[0].widgets.forEach((widget) => {
            let quotient = Math.floor(widget.position / 4);
            let reste = widget.position % 4;
            if (this.widgets && !this.widgets[quotient]) {
              this.widgets[quotient] = [];
            }
            this.widgets[quotient][reste] = widget.name;
            this.$options.components[widget.name] = () =>
              import("../components/widgets/" + widget.name + ".vue");
          });
        }
      }
    },
    getOrientation() {
      ResourcesService.getOrientation().then((res) => {
        this.$store.dispatch("setOrientation", res.data[0].orientation);
      });
    },
  },
};
</script>

<style scoped>
.username {
  margin-left: -10px !important;
}

.home{
  background-color: black;
  height: 100%;
}
</style>
