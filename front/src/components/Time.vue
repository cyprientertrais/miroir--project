<template>
  <div class="time">
    <span class="horloge">{{ time }}</span>

  </div>
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
      this.date = moment(this.date.add(1, 'seconds'))
    }, 1000);
  }

}
</script>
<style scoped>
.horloge{
    font-size:10vw;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->