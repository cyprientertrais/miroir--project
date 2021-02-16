import axios from "axios";

export default class Resources {
  axios = require("axios");
  hostname = window.location.hostname;

  async getAllUserProfile() {
    const url = `http://${this.hostname}:3000/profiles/`;
    return axios.get(url);
  }

  async addProfile(data) {
    const url = `http://${this.hostname}:3000/profiles/`;
    return axios
      .post(url, data)
      .then(response => response.data)
      .catch(error => error);
  }

  async changeProfileName(oldName, newName) {
    const url = `http://${this.hostname}:3000/profiles/${oldName}`;
    return axios
      .patch(url, { name: newName })
      .then(response => response.data)
      .catch(error => error);
  }

  async getUserProfile(profileName) {
    const url = `http://${this.hostname}:3000/profiles/${profileName}`;
    return axios.get(url);
  }

  async deleteProfileByName(profileName) {
    const url = `http://${this.hostname}:3000/profiles/${profileName}`;
    let t = await axios.delete(url).catch(() => {
      return { status: 404 };
    });
    return t;
  }
}
