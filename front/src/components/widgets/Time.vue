<template>
  <div align="center" justify="center" class="time">
    <div class="horloge">{{ this.date }}</div>
    <div class="date">{{moment().format('Do MMMM YYYY')}}</div>
  </div>
</template>

<script>
var moment = require("moment");
export default {
  name: "Time",
  data() {
    return {
      date:null,
    };
  },
  computed: {},
  methods: {
    moment: function() {
      return moment();
    }
  },
  mounted: function() {
    setInterval(() => {
      this.date = moment().format('HH:mm:ss');
    }, 1000);
  }
};
</script>
<style scoped>
.horloge {
  font-size: 5vw;
  color: white;
}
.date {
  color: white;
  font-size: 2vw;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->