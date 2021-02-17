import axios from "axios";
export default class ConnectionResources {
  axios = require("axios");
  hostname = window.location.hostname;

  async checkAdminPassword(hashedPassword) {
    const url = `http://${this.hostname}:3000/admin/checkAdminPassword`;
    let t = await axios
      .post(url, { hashedPassword: hashedPassword })
      .catch(() => {
        return { status: 403 };
      });
    return t;
  }

  async getWifiList() {
    const wifiList = `http://${this.hostname}:3000/admin/wifiscan`;
    return axios.get(wifiList);
  }
}
