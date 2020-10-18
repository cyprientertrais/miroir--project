
import axios from 'axios'; 
export default class Resources {
    axios = require('axios');
    hostname= window.location.hostname;
    API_KEY= 'ee95de4f37a7e21b3714e529ea39a2fb';

    getPrintedWidgets(params) {
        const url = `${process.env.VUE_APP_BACK_URL}`
        return axios.get(url, {params:params});
    }

    getMeteo(params) {
        const url = `https://api.openweathermap.org/data/2.5/onecall?appid=${this.API_KEY}`;
        return axios.get(url, {params:params});
    }

    getTodayMeteo(params){
        const url = `https://api.openweathermap.org/data/2.5/forecast?appid=${this.API_KEY}`;
        return axios.get(url, {params:params});
    }

    getUserProfile(profileName) {
       
        const url = `http://${this.hostname}:3000/profile/${profileName}`;
        return axios.get(url);
    }

    getAllUserProfile() {
        const url = `http://${this.hostname}:3000/profile/`;
        return axios.get(url);
    }

    getOrientation(){
        const url = `http://${this.hostname}:3000/admin/orientation`;
        return axios.get(url);
    }
}