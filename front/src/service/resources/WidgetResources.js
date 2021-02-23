import axios from "axios";

export default class WidgetResources {
  axios = require("axios");
  hostname = window.location.hostname;
  API_KEY = "ee95de4f37a7e21b3714e529ea39a2fb";
  API() {
    return process.env.NODE_ENV === "production"
      ? "https://back-miroir.herokuapp.com"
      : "http://localhost:5000";
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

  getNews() {
    const url = `${this.API()}/parse/`;
    return axios
      .post(url, { url: "https://www.france24.com/fr/rss" })
      .then(response => response.data)
      .catch(error => error);
  }
}
