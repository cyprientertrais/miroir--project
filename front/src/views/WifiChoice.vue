<template>
<v-container>
  <div align="center" justify="center" class="wifi">
    <div class="titre">IMirror</div>
    <div class="Wifi">
    <v-card
    class="mx-auto"
    max-width=75%
    max-height=100%
    tile
  >
    <v-list rounded>
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group
        v-model="item"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
      <v-btn v-on:click="WifiTentative" elevation="2" class="selectWifi" dark
        >selectWifi</v-btn
      >
    </div>
  </div>
  </v-container>
</template>

<script>
export default {
  methods :{
    
  }
}
</script>

<style scoped>
#Wifi {
  background-color: #3c3e41;
  height: 100%;
}
</style>
