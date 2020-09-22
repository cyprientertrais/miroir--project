<template>
  <div class="home">
    <!-- <v-layout row class="apps_show">
      <v-flex md3 v-for="(componentName, index) in widgets" :key="index">
        <component :is="componentName"></component>
      </v-flex>
    </v-layout>-->

    <v-row>
      <v-col cols="12" md="6" v-for="(componentName, index) in widgets" :key="index">
        <component :is="componentName"></component>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  created() {},
  watch: {
    widgets: function() {
      console.log("widget:" + this.widgets);
      if (this.widgets) {
        console.log(this.widgets);
        for (let c = 0; c < this.widgets.length; c++) {
          let componentName = this.widgets[c];
          console.log(componentName);
          this.$options.components[componentName] = () =>
            import("../components/widgets/" + componentName + ".vue");
        }
      }
    }
  },

  computed: {
    widgets() {
      return this.$store.getters.widgets;
    }
  }
};
</script>
