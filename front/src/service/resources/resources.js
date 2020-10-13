
import axios from 'axios'; 
export default class Resources {
    axios = require('axios');
    hostname= window.location.hostname;
    getPrintedWidgets(params) {
        const url = `${process.env.VUE_APP_BACK_URL}`
        return axios.get(url, {params:params});
    }

    getMeteo(params) {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=50.55&lon=3.03&exclude=current,minutely,hourly,alerts&appid=ee95de4f37a7e21b3714e529ea39a2fb&units=metric`;
        return axios.get(url, {params:params});
    }

    getCity(params) {
        const url = `https://geocode.xyz/${params.lat},${params.long}?geoit=json`;
        return axios.get(url);
    }

    getUserProfile(profileName) {
       
        const url = `http://${this.hostname}:3000/profile/${profileName}`;
        return axios.get(url);
    }

    getAllUserProfile() {
        const url = `http://${this.hostname}:3000/profile/`;
        return axios.get(url);
    }
}