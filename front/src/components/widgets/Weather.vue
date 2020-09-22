<template>
    
    <div class="weather">Your location data is {{ location }}
    {{meteo}}
    </div>
</template>

<script>
export default {
  name: 'Weather',
  data(){
    return{
    location:null,
    ville:null,
    meteo: null,
    errorStr:null
    }
  },
  created(){
  if(!("geolocation" in navigator)) {
      this.errorStr = 'Geolocation is not available.';
      return;
    }

    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(pos => {
      this.gettingLocation = false;
      this.location = pos;
    }, err => {
      this.gettingLocation = false;
      this.errorStr = err.message;
    })
    /*fetch("https://freegeoip.app/json/").then(async res=>{
      this.location= await  res.json();
      if(this.location.city!=null){
        this.ville=this.location.city;
      }
      fetch("https://api.openweathermap.org/data/2.5/forecast?q=Lille&APPID=ee95de4f37a7e21b3714e529ea39a2fb&units=metric").then(async res=>{
        let meteo = await res.json();
        this.meteo=meteo.list[0].weather[0].main;
        
      })
    }) */
  },
  computed: {
    
  },
  methods: {

},


}
</script>
<style scoped>
.weather{
  margin: 0;
    border-radius: 50px;
    background-color: grey;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->