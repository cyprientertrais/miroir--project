import axios from "axios";

export default class WidgetResources {
  axios = require("axios");
  hostname = window.location.hostname;
  API_KEY = "ee95de4f37a7e21b3714e529ea39a2fb";
  API() {
    return process.env.NODE_ENV === "production"
      ? "https://back-miroir.herokuapp.com"
      : "https://back-miroir.herokuapp.com";
  }
  getPrintedWidgets(params) {
    const url = `${this.API()}`;
    return axios.get(url, { params: params });
  }

  getMeteo(params) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?appid=${this.API_KEY}`;
    return axios.get(url, { params: params });
  }

  getTodayMeteo(params) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?appid=${this.API_KEY}`;
    return axios.get(url, { params: params });
  }

  getBlague(){
    
    const url = `${this.API()}/joke`;
    return axios.get(url);
  }

  getOrientation() {
    const url = `${this.API()}/admin/orientation`;
    return axios.get(url);
  }

  getLocation() {
    const url = `${this.API()}/admin/location`;
    return axios.get(url);
  }

  postLocation(location) {
    const url = `${this.API()}/admin/location`;
    return axios.post(url, { location: location });
  }

  getFlowRadio() {
    const url = `${this.API()}/admin/flowRadio`;
    return axios.get(url);
  }

  getAllWidgets() {
    const url = `${this.API()}/admin/widgets`;
    return axios.get(url);
  }

  getNews() {
    const url = `${this.API()}/parse/`;
    return axios
      .post(url, { url: "https://www.france24.com/fr/rss" })
      .then(response => response.data)
      .catch(error => error);
  }
}
