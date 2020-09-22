<template>
  <v-row align="center" justify="center" class="time">
    <span class="horloge">{{ time }}</span>

  </v-row>
</template>

<script>
var moment = require('moment');
export default {
  name: 'Time',
  data(){
      return{
  date: moment()
  }
  },
  computed: {
    time: function(){
      return this.date.format('HH:mm:ss');
    }
  },
  methods: {
  moment: function () {
    return moment();
  }
},
mounted: function(){   
    setInterval(() => {
      this.date = moment()
    }, 1000);
  }

}
</script>
<style scoped>
.horloge{
    font-size:10vw;
    color:white;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->