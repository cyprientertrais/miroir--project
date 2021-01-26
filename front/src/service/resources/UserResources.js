import axios from "axios";

export default class Resources {
    axios = require("axios");
    hostname = window.location.hostname;
    API_KEY = "ee95de4f37a7e21b3714e529ea39a2fb";

    getAllUserProfile() {
        const url = `http://${this.hostname}:3000/profiles/`;
        return axios.get(url);
    }

    addProfile(data) {
        const url = `http://${this.hostname}:3000/profiles/`;
        return axios
            .post(url, data)
            .then((response) => response.data)
            .catch((error) => error);
    }

    changeProfileName(oldName, newName) {
        const url = `http://${this.hostname}:3000/profiles/${oldName}`;
        console.log("info", url);
        return axios
            .patch(url, {name: newName})
            .then((response) => response.data)
            .catch((error) => error);
    }

    getUserProfile(profileName) {
        const url = `http://${this.hostname}:3000/profiles/${profileName}`;
        return axios.get(url);
    }

    async deleteProfileByName(profileName) {
        const url = `http://${this.hostname}:3000/profiles/${profileName}`;
        let t = await axios.delete(url).catch(() => {
            return {status: 404};
        });
        return t;
    }

}
