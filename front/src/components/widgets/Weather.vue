<template>
    
    <div>Your location data is {{ location }}
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
    var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
navigator.geolocation.getCurrentPosition(success, error, options);

    console.log(this.location);
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
    width: 20%;
    border-radius: 50px;
    height:500px;
    background-color: grey;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->