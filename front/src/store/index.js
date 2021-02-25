import Vue from "vue";
import Vuex from "vuex";
import UserResources from "@/service/resources/UserResources";

Vue.use(Vuex);

const userService = new UserResources();

export default new Vuex.Store({
  state: {
    location: undefined,
    userProfile: undefined,
    orientation: undefined,
    wifiList: undefined,
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
      }
    },
  mutations: {
    setLocation(state, location) {
      state.location = location;
    },
    setUserProfile(state, userProfile) {
      state.userProfile = userProfile;
    },
    setOrientation(state, orientation) {
      state.orientation = orientation;
    },
    setWifiList(state, wifiList){
      state.wifiList = wifiList
    },
    SOCKET_ONOPEN(state, event) {
      console.log('onOpen')
      Vue.prototype.$socket = event.currentTarget;
    },
    SOCKET_ONCLOSE(state) {
      console.log('onClose')
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR(state, event) {
      console.log('onError')
      console.error(state, event);
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      console.log('onMessage',message)
      state.socket.message = message;
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {

      console.log('onReconnect')
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {

      console.log('onReconnectError')
      state.socket.reconnectError = true;
    }
  },
  actions: {
    changeProfile: async function(context, message) {
      let isExist = true
      const jsonIntoString =  JSON.stringify(message)
      console.log("changeProfile detected : " + jsonIntoString)
      const jsonAnswer = JSON.parse(jsonIntoString);
      //TODO CHECK USER EXIST
      await userService.getUserProfile(captitalizeFirstLetter(message.info)).then(res => {
        context.commit("setUserProfile", res.data);
        isExist = true;
      }).catch(err => {
        console.err(err);
        isExist = false;
      });
      
      if (isExist) {
        sendAnswer("profileAnswer", jsonAnswer.info)
      } else {
        sendAnswer("profileUnknown", jsonAnswer.info)
      }
    },
    changeRadio: function(context, message) {
      let isExist = false
      const jsonIntoString =  JSON.stringify(message)
      console.log("changeRadio detected :" + JSON.stringify(message))
      const jsonAnswer = JSON.parse(jsonIntoString);
      //TODO CHECK RADIO EXIST
      if (isExist) {
        sendAnswer("radioAnswer", jsonAnswer.info)
      } else {
        sendAnswer("radioUnknown", jsonAnswer.info)
      }
    },
   // radioPlay: function(context, message) {
      //TODO CHECK IS TRUE OR FALSE


      // SEND THIS IF ERROR
      //sendAnswer("commonError", jsonAnswer.info)

   // },
    // nextRadio: function(context, message) {
      //TODO CHECK IS TRUE OR FALSE


      // SEND THIS IF ERROR
      //sendAnswer("commonError", jsonAnswer.info)
    //},
    changeNews: function(context, message) {
      let isExist = false
      const jsonIntoString =  JSON.stringify(message)
      console.log("changeNews detected :" + JSON.stringify(message))
      const jsonAnswer = JSON.parse(jsonIntoString);
      //TODO CHECK RADIO EXIST
      if (isExist) {
        sendAnswer("newsAnswer", jsonAnswer.info)
      } else {
        sendAnswer("newsUnkown", jsonAnswer.info)
      }
    },
    setLocation(context,location) {
      context.commit('setLocation', location);
    },
    setOrientation(context, orientation){
      context.commit('setOrientation',orientation);
    },
    async setUserProfile(context, pseudo) {
      await userService.getUserProfile(pseudo).then(res => {
        context.commit("setUserProfile", res.data);
      });
    }
  },
  getters: {
    location: state => {
      return state.location;
    },
    userProfile: state => {
      return state.userProfile;
    },
    orientation: state => {
      return state.orientation;
    }
  },
  modules: {}
});

function sendAnswer(answerType,info) {
  Vue.prototype.$socket.send('{"answerType": "' + answerType + '", "info": "' + info + '"}')
}

function captitalizeFirstLetter(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
