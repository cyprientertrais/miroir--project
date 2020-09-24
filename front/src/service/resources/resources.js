import Vue from 'vue';

export default class Resources {


    getPrintedWidgets(params) {
        const url = `${process.env.VUE_APP_BACK_URL}`
        let config = {
            params: params
        }
        return Vue.http.get(url, config)
    }

    getMeteo(params) {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=50.55&lon=3.03&exclude=current,minutely,hourly,alerts&appid=ee95de4f37a7e21b3714e529ea39a2fb&units=metric`;
        let config = {
            params: params
        }
        return Vue.http.get(url, config)
    }

    getCity(params) {
        const url = `https://geocode.xyz/${params.lat},${params.long}?geoit=json`;
        return Vue.http.get(url);
    }
}