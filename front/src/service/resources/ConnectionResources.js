import axios from "axios";
export default class ConnectionResources {
  axios = require("axios");
  hostname = window.location.hostname;
  API() {
    return process.env.NODE_ENV === "production"
      ? "https://back-miroir.herokuapp.com"
      : "https://back-miroir.herokuapp.com";
  }
  async checkAdminPassword(hashedPassword) {
    const url = `${this.API()}/admin/checkAdminPassword`;
    let t = await axios
      .post(url, { hashedPassword: hashedPassword })
      .catch(() => {
        return { status: 403 };
      });
    return t;
  }

  async getWifiList() {
    const wifiList = `http://localhost:3000/admin/wifiscan`;
    return axios.get(wifiList);
  }

  async connectToWifi(name, pass) {
    const wifiList = `http://localhost:3000/admin/sendWifi`;
    return axios.post(wifiList, { ssid: name, password: pass });
  }
}
