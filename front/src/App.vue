<template>
  <v-app>
    

    <v-main>
      <Time/>
      <v-layout row>
        <v-flex md3 v-for="(componentName, index) in widgets" :key="index">
            <component :is="componentName"></component>
    </v-flex>
      </v-layout>
    </v-main>
  </v-app>
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
    widgets:["Weather","Weather"]
    //
  }),
};
</script>
