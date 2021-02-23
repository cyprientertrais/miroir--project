import axios from "axios";

export default class Resources {
  axios = require("axios");
  hostname = window.location.hostname;
  API() {
    return process.env.NODE_ENV === "production"
      ? "https://back-miroir.herokuapp.com"
      : "http://localhost:5000";
  }

  async getAllUserProfile() {
    const url = `${this.API()}/profiles/`;
    return axios.get(url);
  }

  async addProfile(data) {
    const url = `${this.API()}/profiles/`;
    return axios
      .post(url, data)
      .then(response => response.data)
      .catch(error => error);
  }

  async changeProfileName(oldName, newName) {
    const url = `${this.API()}/profiles/${oldName}`;
    return axios
      .patch(url, { name: newName })
      .then(response => response.data)
      .catch(error => error);
  }

  async getUserProfile(profileName) {
    const url = `${this.API()}/profiles/${profileName}`;
    return axios.get(url);
  }

  async deleteProfileByName(profileName) {
    const url = `${this.API()}/profiles/${profileName}`;
    let t = await axios.delete(url).catch(() => {
      return { status: 404 };
    });
    return t;
  }
}
