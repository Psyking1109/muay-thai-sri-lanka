<template>
  <ion-page>

    <ion-header>
      <ion-toolbar>
        <ion-title> Muay Thai SriLanka </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>
            <div class="img-container">
              <img
                src="public/assets/muaythaisrilankalogo.jpg"
                alt="muay thai sriLanka logo"
              />
            </div>
          </ion-card-subtitle>

          <ion-card-title> Sign In</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <form @submit.prevent="signInWithEmailAndPassword(email, password)">
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input v-model="email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input v-model="password" type="password"></ion-input>
            </ion-item>
            <ion-button
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
            >
              {{ "Sign In" }}
            </ion-button>
          </form>
        </ion-card-content>

        <ion-card-content v-if="errorMsg" class="error-message">
          {{ errorMsg }}
        </ion-card-content>
      </ion-card>

      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
} from "@ionic/vue";
import { auth, db } from "../main";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";


export default {
  name: "Authentication",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonCardSubtitle
  },
  setup() {
    const router = useRouter();

    const state = reactive({
      email: "",
      password: "",
      errorMsg: "",
    });
    const signInWithEmailAndPassword = async (
      email: string,
      password: string
    ) => {
      try {
        if (!email || !password) {
          state.errorMsg = "Email and Password Required";
          return;
        }
        await auth.signInWithEmailAndPassword(email, password);

        let role;

        db.collection("users")
          .where("email", "==", auth.currentUser?.email)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              role = doc.data().role;
              console.log("role is " + role + " id is" + doc.id);

              if (role == "Admin") {
                router.push("/admintabs/AdminHome");
              } else if (role == "stundent") {
                router.push("/tabs/HomePage");
              }
            });
          });
      } catch (error) {
        state.errorMsg = error.message;
      }
    };

    return {
      ...toRefs(state),
      signInWithEmailAndPassword,
    };
  },
};
</script>

<style scoped>


.center {
  display: flex;
  height: 90vh;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.error-message {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
  text-align: center;
}
</style>
