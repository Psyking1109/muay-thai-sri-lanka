<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slots="bottom">

        <ion-tab-button tab="HomePage" href="/tabs/HomePage">
          <ion-icon :icon="triangle" />
          <ion-label>Home Page</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="BookingPage" href="/tabs/BookingPage">
          <ion-icon :icon="ellipse" />
          <ion-label>Booking Tab</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="Settings" href="/tabs/Settings">
          <ion-icon :icon="square" />
          <ion-label>Settings</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
} from "@ionic/vue";
import { ellipse, square, triangle } from "ionicons/icons";

export default {
  name: "Tabs",
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      ellipse,
      square,
      triangle,
    };
  },
};
</script>
