import axios from "axios";
export default class Resources {
  axios = require("axios");
  hostname = window.location.hostname;
  API_KEY = "ee95de4f37a7e21b3714e529ea39a2fb";


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
