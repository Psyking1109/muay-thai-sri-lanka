<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-card>
      <ion-card-header>Reset Password</ion-card-header>
      <ion-card-content>
        <form @submit.prevent="resetPassword(NewPassword,ConfirmPassword)">
          <ion-item>
            <ion-label position="floating">New Password</ion-label>
            <ion-input v-model="NewPassword"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Confirm Password</ion-label>
            <ion-input v-model="ConfirmPassword"></ion-input>
          </ion-item>
          <ion-button
            expand="block"
            color="primary"
            class="ion-margin-top"
            type="submit"
          >
            {{ "Reset Password" }}
          </ion-button>
        </form>
      </ion-card-content>
      <ion-card-content v-if="errorMsg" class="error-message">
        {{ err }}
      </ion-card-content>
    </ion-card>
    <br />
    <ion-content>
      <ion-button
        router-link="/Login"
        expand="block"
        color="secondary"
        class="ion-margin-top"
        type="button"
        v-on:click="logOut()"
      >
        {{ "LogOut" }}
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/vue";
import { fb } from "../main";
//import { useRouter } from "vue-router";

export default {
  name: "Setings",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
  },

  data() {
    return {
      NewPassword: "",
      ConfirmPassword: "",
    };
  },

  method: {},

  setup() {
    async function resetPassword(NewPassword: string,ConfirmPassword: string) {
      const user = fb.auth().currentUser;
      debugger;
      console.log(user);
      console.log(NewPassword);
      console.log(ConfirmPassword);

      if (NewPassword == ConfirmPassword) {
        await user
          ?.updatePassword(ConfirmPassword)
          .then(() => {
            console.log("sucsess");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("passwords do not match");
      }
    }

   // const router = useRouter();
    const logOut = async () => {
      await fb
        .auth()
        .signOut()
        .catch((err) => {
          console.log(err);
        });
    };
    return {
      resetPassword,
      logOut,
    };
  },
};
</script>
