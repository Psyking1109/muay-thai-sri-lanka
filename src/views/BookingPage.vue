<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-title> Book Training</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-card>
    <ion-card-content>
      <div class="center">
        <ion-list>
          <ion-label position="floating">Available Slots </ion-label>
          <ion-item
            v-for="slotName in NewArray"
            :key="slotName"
            v-on:click="openModal(slotName)"
          >
            <ion-label>{{ slotName }}</ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-card-content>
  </ion-card>

  <ion-card>
    <ion-card-header>Reset Password</ion-card-header>
    <ion-card-content>
      <form @submit.prevent="resetPassword()">
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
  </ion-card>
</ion-page>
</template>

<script>
import {
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  modalController,
  IonList,
  IonPage
} from "@ionic/vue";

import { defineComponent } from "vue";
import {dbs, fb } from "../main";
import { reactive, toRefs } from "vue";
import Modal from "/src/views/ModalBookingDetails.vue";


export default defineComponent({
  components: {
    IonItem,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonList,
    IonPage
  },

  data() {
    return {
      SelDate: "",
      NewPassword: "",
      ConfirmPassword: "",
    };
  },
  methods: {
    resetPassword() {
      const user = fb.auth().currentUser;
      console.log(user);
      console.log(this.ConfirmPassword);

      if (this.NewPassword == this.ConfirmPassword) {
        user
          ?.updatePassword(this.ConfirmPasswor)
          .then(() => {
            console.log("sucsess");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("passwords do not match");
      }
    },
  },

  setup() {
    //--------------------------------------------------------------Getting Function Model----------------------------------------------------//

    const openModal = async (slotName) => {
        console.log("database name", slotName);
        const slotDetails = async (slotName) => {
          const ref = await dbs.ref(`slots/${slotName}`);
          const snapshot = await ref.once("value");
          return snapshot.val();
        };
        const FuncVal = await slotDetails(slotName);
        console.log(
          "Slots - " +
            FuncVal.AvailableSlots +
            "Students Names " +
            FuncVal.StudentsAttending +
            " Booking Day" +
            FuncVal.BookingDay
        );
        const modal = await modalController.create({
          component: Modal,
          cssClass: "my-custom-class",
          componentProps: {
            title: slotName,
            studentsAttending: FuncVal.StudentsAttending,
            AvailableSlots: FuncVal.AvailableSlots,
            BookingDay: FuncVal.BookingDay,
            pageType: "BookingPage",
          },
        });
        return await modal.present();
      },
      //----------------------------------------------------------------end---------------------------------------------------------------------//

      state = reactive({
        slots: 0,
        NewArray: [],
      });

    const getVal = async (NewArray) => {
      let SlotNames = [];

      await dbs.ref("slots/").once("value", function(snapshot) {
        if (snapshot.val() !== null) {
          SlotNames = Object.keys(snapshot.val());

          for (const datas of SlotNames) {
            console.log(datas);
            NewArray.push(datas);
          }
        }
      });
    };
    getVal(state.NewArray);

    return {
      ...toRefs(state),
      openModal,
      getVal,
    };
  },
});
</script>


<style>
.my-custom-modal-css {
   height: 20%;
   top: 80%;
   position: absolute; 
   display: block;  
}

.center {
  text-align: center;
}
.error-message {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
  text-align: center;
}
</style>
