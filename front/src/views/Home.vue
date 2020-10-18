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
        <v-row v-for="xWidgets in widgets" :key="xWidgets">
          <v-col
            v-for="yWidgets in xWidgets"
            :key="yWidgets"
            justify="space-between"
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
      <div>
        <v-col
          v-for="(componentName, index) in widgets"
          :key="index"
          cols="12"
          sm="12"
          md="3"
          lg="3"
          xl="3"
        >
          <component :is="componentName"></component>
        </v-col>
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
      widgets: []
    };
  },
  watch: {
    userProfile: function() {
      // this.setWidgets();
    },
    orientation: function() {
      this.setWidgets();
    },
  },
  computed: {
    ...mapGetters(["userProfile", "orientation"])
  },
  methods: {
    setWidgets() {
      if (this.userProfile) {
      console.log("orientation="+this.orientation)
        if (this.orientation === "landscape") {
        console.log('useer:'+JSON.stringify(this.userProfile.dashboards[0].widgets))
          this.userProfile.dashboards[0].widgets.forEach(widget => {
            let quotient = widget.position / 2;
            let reste = widget.position % 2;
            this.widgets[quotient][reste] = widget.name;
            this.$options.components[widget.name] = () =>
              import("../components/widgets/" + widget.name + ".vue");
          });
        } else {
          // for (
          //   let c = 0;
          //   c < this.userProfile.dashboards[0].widgets.length;
          //   c++
          // ) {
          //   let componentName = this.userProfile.dashboards[0].widgets[c].name;
          //   this.widgets.push(componentName);
          //   this.$options.components[componentName] = () =>
          //     import("../components/widgets/" + componentName + ".vue");
          // }
        }
      }
    },
    getOrientation() {
      ResourcesService.getOrientation().then(res => {
        console.log(res)
        this.$store.dispatch("setOrientation", res.data[0].orientation);
      });
    }
  }
};
</script>

<style scoped>
.username {
  margin-left: -10px !important;
}
</style>
