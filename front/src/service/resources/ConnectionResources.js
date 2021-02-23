import axios from "axios";
export default class ConnectionResources {
  axios = require("axios");
  hostname = window.location.hostname;
  API() {
    return process.env.NODE_ENV === "production"
      ? "https://back-miroir.herokuapp.com"
      : "http://localhost:5000";
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
    const wifiList = `${this.API()}/admin/wifiscan`;
    return axios.get(wifiList);
  }
}
