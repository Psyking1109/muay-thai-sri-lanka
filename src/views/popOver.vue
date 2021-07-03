<template>
  <ion-header>
    <ion-toolbar>
      <ion-title class="titleClass"> Student Details </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-card>
      <ion-card-content>
        <ion-title>{{ StudentName }}</ion-title>
        <ion-item>
          <ion-icon name="mail"></ion-icon>
          <ion-label>{{ StudentEmail }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>{{studentPhoneNumber}}</ion-label>
        </ion-item>
      </ion-card-content>
    </ion-card>
  </ion-content>
</template>

<script>
import {
  IonContent,
  IonLabel,
  IonItem,
  IonHeader,
  IonTitle,
  IonCard,
  IonToolbar,
  IonCardContent,
  IonIcon,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Popover",
  components: {
    IonContent,
    IonLabel,
    IonItem,
    IonHeader,
    IonTitle,
    IonCard,
    IonToolbar,
    IonCardContent,
    IonIcon,
  },

  props: {
    StudentName: { type: String, default: "Super Modal" },
    StudentEmail: { type: String, default: "Super Modal" },
    studentPhoneNumber: { type: String, default: "Super Modal" }
  },
});
</script>
<style scoped>
.titleClass{
    padding-left: 10px;
    padding-top: 10px;
    font-family: none;
    font-variant: petite-caps;
    color:goldenrod;
    font-weight: bolder;
    font-size: x-large;
}
</style>
