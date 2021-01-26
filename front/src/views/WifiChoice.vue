<template>
  <v-container fluid class="wifi">
    <div align="center" justify="center" class="wifi bg-primary" >
      <v-row justify="center">
        <div class="text-lg-h1 text-md-h1 text-sm-h2 text-h3 titre">
          IMirror
        </div>
      </v-row>
      <div class="wifi">
        <v-list rounded class="liste">
          <v-row justify="center">
            <div class="text-lg-h5 text-md-h5 text-sm-h6 text-subtitle-1 titre">
              Liste Wifi
            </div>
          </v-row>
         <!-- <v-virtual-scroll :items="item" height="80%" item-height="80%">-->
            <v-list-item-group
              v-model="selectItem"
              justify="center"
              color="white"
            >
              <v-list-item v-for="(item, i) in this.item" :key="i" id="titre">
                <v-list-item-content v-on:click="popUp = true">
                  <v-list-item-title
                    v-text="item"
                    class="titre"
                  ></v-list-item-title>
                </v-list-item-content>
                <!--                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon> -->
              </v-list-item>
            </v-list-item-group>
        <!--  </v-virtual-scroll>-->
        </v-list>
      </div>
    </div>

    <v-dialog v-model="popUp" dark width="500px">
      <v-card dark>
        <v-col cols="8">
          <v-text-field
            label="Password*"
            type="password"
            required
          ></v-text-field>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="popUp = false" class="butt">
            Close
          </v-btn>
          <v-btn text @click='sendWifi(item[id],Password)' class="butt">
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Resources from "../service/resources/resources";
const ResourcesService = new Resources();

export default {
  data() {
    return {
      listWifi: null,
      selectItem: null,
      item: ["toto", "titi", "tutu", "aymeric", "pupute", "salope", "connasse", "enculé", "cuculélé"],
      popUp: false,
    };
  },
  methods: {
    async fetchWifi() {
      this.listWifi = await ResourcesService.getWifiList();
      this.item = this.listWifi.data.wifi;
    },
    sendWifi2(id) {
      console.log(this.item[id]);
    },
    sendWifi(name, pass) {
      ResourcesService.connectToWifi(name, pass);
    },
  },

  /*created() {
    this.fetchWifi();
  },*/
};
</script>

<style scoped>
.v-list-item:hover {
  background-color:#155b73!important
}
.wifi {
  height: 100%;
  padding: 0% 7% 5% 7%;
}
.butt {
  margin-top: 8%;
  background-color: #155b73;
  color: #ffffff;
}
.titre {
  color: #ffffff;
}
.liste {
  background-color: #2e2e2e;
  height: 58%; 
  overflow-y:auto; 
  overflow-x:hidden;
  
}
</style>
