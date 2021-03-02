<template>
  <div class="secondary-background mainDiv">
    <v-container class="containerContent">
      <v-row justify="center" class="primary-color text-center pt-8">
        <v-col class="col-2">
          <div class="arrowBack">
            <v-icon color="white" @click="redirectSettings()" large
              >mdi-arrow-left-thick</v-icon
            >
          </div>
        </v-col>
        <v-col class="col-8 text-lg-h1 text-md-h1 text-h2">
          <div class="font-title">
            {{ titleValue }}
          </div>
        </v-col>
        <v-col class="col-2"> </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          v-for="(widget, index) in userWidgets"
          :key="index"
          class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-sm-6 mt-md-6 mt-lg-6 mt-xl-6"
        >
          <v-card
            height="9em"
            width="9em"
            class="primary-background mx-auto"
            v-if="widget === ''"
          >
            <div class="addWidgetIcon">
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    class="addWidget"
                    color="white"
                    x-large
                    @click="removeWidget(index)"
                    >mdi-plus-thick</v-icon
                  >
                </template>
                <v-list>
                  <v-list-item
                    @click="addWidget(index, widgetAvailable)"
                    v-for="(widgetAvailable, indexSelect) in listWidgets"
                    :key="indexSelect"
                  >
                    <v-list-item-title>{{ widgetAvailable }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card>
          <v-card
            height="9em"
            width="9em"
            class="primary-background mx-auto"
            v-else
          >
            <v-icon
              class="removeWidget"
              color="red"
              large
              @click="removeWidget(index)"
              >mdi-close-thick</v-icon
            >
            <div class="widgetNameCards primary-color">
              <span
                ><div class="font-text">{{ widget }}</div></span
              >
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ResourcesWidget from "@/service/resources/WidgetResources";
import ResourcesUser from "@/service/resources/UserResources";

const ResourcesServiceWidget = new ResourcesWidget();
const ResourcesServiceUser = new ResourcesUser();

export default {
  name: "Connection",
  data() {
    return {
      titleValue: "Dashboard",
      listWidgets: [],
      user: {},
      userWidgets: []
    };
  },
  props: { profileName: String },
  computed: {},
  created() {
    this.getWidgets();
    this.getUserWidgets();
  },
  methods: {
    getWidgets() {
      ResourcesServiceWidget.getAllWidgets().then(res => {
        this.listWidgets = res.data.widgets;
      });
    },
    getUserWidgets() {
      ResourcesServiceUser.getUserProfile(this.$route.params.username).then(
        res => {
          this.user = res.data;
          this.userWidgets = ["", "", "", ""];
          this.user.dashboards[0].widgets.forEach(widget => {
            this.userWidgets[widget.position] = widget.name;
          });
        }
      );
    },
    updateUserWidgets() {
      const userWidgetsUpdated = Array();
      for (let i = 0; i < 4; i++) {
        if (this.userWidgets[i] !== "") {
          userWidgetsUpdated.push({
            name: this.userWidgets[i],
            position: i
          });
        }
      }
      this.user.dashboards[0].widgets = userWidgetsUpdated;
      ResourcesServiceUser.updateProfile(this.user.pseudo, {
        pseudo: this.user.pseudo,
        dashboards: this.user.dashboards
      }).then(() => {
        this.getUserWidgets();
      });
    },
    removeWidget(index) {
      this.userWidgets[index] = "";
      this.updateUserWidgets();
    },
    addWidget(index, name) {
      this.userWidgets[index] = name;
      this.updateUserWidgets();
    },
    redirectSettings() {
      this.$router.push("/Settings");
    }
  }
};
</script>

<style scoped>
.mainDiv {
  height: 100%;
  width: 100%;
}
.containerContent {
  max-width: 50em;
}

.removeWidget {
  position: absolute;
  top: 5px;
  right: 5px;
  text-align: right;
}

.widgetNameCards {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.widgetNameCards span {
  text-align: center;
  font-size: 25px;
}

.addWidgetIcon {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrowBack {
  border: 4px solid white;
  padding: 5px;
  border-radius: 50px;
  margin-left: 1em;
  width: fit-content;
}
</style>
