<template>
<v-container>
  <div align="center" justify="center" class="wifi">
    <v-row justify='center' >
    <div class="text-lg-h1 text-md-h1 text-sm-h2 text-h3
    ">IMirror</div>
    </v-row>
    <div class="wifi">
    <v-list rounded>
      <v-subheader>Liste Wifi</v-subheader>
      <v-list-item-group
        v-model="selectItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in this.item"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-on:click="popUp=true" v-text="item"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    </div>
  </div>

  <v-dialog v-model="popUp">
    <v-col cols="8">
     <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Send
          </v-btn>
        </v-card-actions>
  </v-dialog>

  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Wifi Password</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </v-container>
</template>


<script>
import Resources from '../service/resources/resources'
const ResourcesService = new Resources();


export default {
  data(){
    return{
      listWifi : null,
      selectItem : null,
      item : [],
      popUp: false
    };
    },
  methods :{
    async fetchWifi(){
      this.listWifi = await ResourcesService.getWifiList()
      this.item = this.listWifi.data.wifi
  },
  showPopUp(){

  },
  sendWifi(id){
    console.log(this.item[id])
  }
  },
  created() {
    this.fetchWifi()
  }
}
</script>

<style scoped>
#wifi {
  background-color: #3c3e41;
  height: 100%;
}
</style>
