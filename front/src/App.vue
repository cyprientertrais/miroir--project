<template>
  <div class="main">
    <v-app>
      <v-main>
      <Time/>
      <v-layout row class="apps_show">
        <v-flex md3 v-for="(componentName, index) in widgets" :key="index">
            <component :is="componentName"></component>
    </v-flex>
      </v-layout>
    </v-main>
  </v-app>
  </div>
</template>

<script>
import Time from './components/Time';

export default {
  name: 'App',
  

  components: {
    Time,
  },
  created ()  {
            for(let c=0; c<this.widgets.length; c++) {
                let componentName = this.widgets[c];
                this.$options.components[componentName] = () => import('./components/widgets/' + componentName + '.vue');
            }
        },

  data: () => ({
    widgets:["Weather"]
    //
  }),
};
</script>
<style>
#app{
  background-color: #1c1e21;
}
.apps_show{
  margin-left: 0;
}
</style>