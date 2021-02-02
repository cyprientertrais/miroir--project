<template>
  <v-sheet color="secondary" class="settings">
    <v-btn small fab @click="openDialog">
      <v-icon dark>mdi-cog</v-icon>
    </v-btn>
    <Profiles />
    <v-dialog v-model="settingsPopup" width="500px">
      <Reglage @closeDialog="closeDialog" />
    </v-dialog>
  </v-sheet>
</template>

<script>
import Reglage from "./ReglagePopUp";
import Profiles from "@/components/profiles/Profiles";
export default {
  name: "settings",
  components: {
    Profiles,
    Reglage,
  },
  data() {
    return {
      settingsPopup: false,
    };
  },
  methods: {
    openDialog() {
      this.settingsPopup = true;
    },
    closeDialog() {
      this.settingsPopup = false;
    },
  },
};
</script>

<style scoped>
.settings {
  height: 100%;
}

.v-btn {
  position: absolute;
  top: 1%;
  right: 1%;
}
</style>
