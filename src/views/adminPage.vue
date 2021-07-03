<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Muay Thai SriLanka</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Welcome Admin</ion-card-subtitle>
          <ion-card-title> Create New Member</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <form
            ref="signUpForm"
            @submit.prevent="
              signUpWithEmailAndPassword(name, email, password, phoneNumber)
            "
          >
            <ion-item>
              <ion-label position="floating">Name</ion-label>
              <ion-input v-model="name"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input v-model="email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">ContactNumber</ion-label>
              <ion-input v-model="phoneNumber"></ion-input>
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
              {{ "Sign Up" }}
            </ion-button>
          </form>
        </ion-card-content>

        <ion-card-content v-if="errorMsg" class="error-message">
          {{ errorMsg }}
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Student Attendence</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-list>
            <ion-item
              v-for="slotName in NewArray"
              :key="slotName"
              v-on:click="openModal(slotName)"
            >
              <ion-label>{{ slotName }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Create Slots for Members</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <form 
          ref="CreateSlotForm" 
          @submit.prevent="createSlots()">
            <ion-item>
              <ion-label position="floating">Slots Available</ion-label>
              <ion-input v-model="slots"></ion-input>
            </ion-item>
            <br />
            <ion-item>
              <ion-label position="floating"
                >Select Date for Training</ion-label
              >
              <ion-datetime
                display-format="D MMM YYYY h:mm a"
                min="2021"
                max="2021"
                v-model="SelDate"
                v-bind:onChange="getVals()"
              ></ion-datetime>
            </ion-item>

            <ion-button
              id="createSlotsbtn"
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
            >
              {{ "Create Slots" }}
            </ion-button>
          </form>
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
  IonDatetime,
  modalController,
  IonList,
  toastController,
} from "@ionic/vue";
import { auth, db, dbs } from "../main";
import { defineComponent } from "vue";
import { reactive, toRefs } from "vue";

import Modal from "/src/views/ModalBookingDetails.vue";
//import { useRouter } from "vue-router";

export default defineComponent({
  name: "adminPage",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonDatetime,
    IonList,
    //toastController
  },

  data() {
    return {
      SelDate: "",
      slots: Number,
      students: [""],
      SlotDate: "",
      SlotDay: "",
      SlotMonth: "",
      SlotYear: "",
      SlotHour: "",
      SlotMinuites: "",
      SlotName: "",
      slotName: "",
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      errorMsg: "",
    };
  },

  methods: {
    async openToast(message: string) {
      const toast = await toastController.create({
        message: message,
        duration: 2000,
        color: "success",
        position: "bottom",
      });
      return toast.present();
    },

    async signUpWithEmailAndPassword(
      name: string,
      email: string,
      password: string,
      phoneNumber: string
    ) {
      try {
        const authRes = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        debugger;
        db.collection("users")
          .doc(authRes.user?.uid)
          .set({
            name,
            email,
            phoneNumber,
            role: "stundent",
          });
        const SignUpfrm = this.$refs.signUpForm as any;
        SignUpfrm.reset();
        await this.openToast("New Member Created !");
      } catch (error) {
        this.errorMsg = error.message;
      }
    },

    getVals() {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      this.SlotDay = days[new Date(this.SelDate).getDay()];

      this.SlotDate = new Date(this.SelDate).getDate().toString();
      this.SlotMonth = months[new Date(this.SelDate).getMonth()];
      this.SlotYear = new Date(this.SelDate).getFullYear().toString();
      this.SlotHour = new Date(this.SelDate).getHours().toString();
      this.SlotMinuites = new Date(this.SelDate).getMinutes().toString();
      this.SlotName =
        this.SlotDate +
        this.SlotMonth +
        this.SlotYear +
        " At " +
        this.SlotHour +
        ":" +
        this.SlotMinuites;
    },

    async createSlots() {
      debugger
      let studentVal = this.students;

      console.log("Creating slots" + this.SlotName);
      dbs.ref("slots/" + this.SlotName).set({
        AvailableSlots: this.slots,
        StudentsAttending: [],
        BookingDay: this.SlotDay,
      });

      dbs.ref("slots/" + this.SlotName).on("value", function(snapshot) {
        studentVal = snapshot.val().StudentsAttending;
      });
      console.log("Students", studentVal);
      const CreateSlotFrm = this.$refs.CreateSlotForm as any
      CreateSlotFrm.reset()
      await this.openToast("New Slot Created !");
    },

    //--------------------------------------------------------------Getting Function Model----------------------------------------------------//
    async openModal(slotName: string) {
      console.log("database name", slotName);

      const slotDetails: any = async (slotName: any) => {
        const ref = await dbs.ref(`slots/${slotName}`);
        const snapshot = await ref.once("value");
        return snapshot.val();
      };
      const FuncVal = await slotDetails(slotName);
      //------------------------------------------------------Getting Student Name From emailID-----------------------------------------------//
      const GetStudentName: any = Object.values(FuncVal.StudentsAttending);
      const UserName = [] as any;
      const getUsername = async (StudentName: []) => {
        debugger;
        for (const mailId of StudentName) {
          const ref = await db
            .collection("users")
            .where("email", "==", mailId)
            .get();
          ref.forEach((doc) => {
            UserName.push(doc.data().name);
          });
        }
        return UserName;
      };

      const StudentNames = await getUsername(GetStudentName);

      //----------------------------------------------------------------end---------------------------------------------------------------------//
      const modal = await modalController.create({
        component: Modal,
        cssClass: "my-custom-class",
        componentProps: {
          title: slotName,
          studentsAttending: StudentNames,
          AvailableSlots: FuncVal.AvailableSlots,
          BookingDay: FuncVal.BookingDay,
          PageType: "AdminPage",
        },
      });
      return modal.present();
    },
    //----------------------------------------------------------------end---------------------------------------------------------------------//
  },

  setup() {
    const state = reactive({
      slots: 0,
      NewArray: [],
    });
    //--------------------------------------------------------------Get Slot Names From FireBase------------------------------------------------//
    const getVal = async (NewArray: any) => {
      let SlotNames = [] as any;

      dbs.ref("slots/").once("value", function(snapshot) {
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

    //----------------------------------------------------------------------------end-----------------------------------------------------------//

    return {
      ...toRefs(state),
      getVal,
    };
  },
});
</script>

<style scoped>
.my-custom-class .modal-wrapper {
  --height: 70%;
  --width: 100%;
}

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
