const WorkerPlugin = require('worker-plugin')
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['process.env'].GOOGLE_API_KEY = `"AIzaSyA8FxHFOfar8CHyvl9ka98PSObXEDKZKok"`
      return args
    })
  }

}