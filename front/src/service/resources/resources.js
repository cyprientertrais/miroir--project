import Vue from 'vue';

export default class Resources {


    getPrintedWidgets(params){
        const url = `${process.env.VUE_APP_BACK_URL}`
        let config = {
            params: params
          }
          return Vue.http.get(url,config)
    }
}