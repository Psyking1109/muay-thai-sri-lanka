<template>
  <ion-header>
    <ion-toolbar>
      <button v-on:click="closeModal()">
        <ion-lable>close</ion-lable>
      </button>
      <ion-title>Book your Slot</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <ion-card>
      <ion-card-content>
        <ion-card-subtitle>{{ title }}</ion-card-subtitle>
        <ion-item>
          <ion-label>Available Slots :- {{ AvailableSlots }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Day of Booking :-{{ BookingDay }}</ion-label>
        </ion-item>
        <br />
        <div v-if="pageType === 'BookingPage'">
          <form @submit.prevent="Isbooked ? deleteSlot(title) : bookAslot()">
            <ion-button
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
            >
              {{ Isbooked ? "Cancel Your Slot" : "Book your Slot" }}
            </ion-button>
          </form>
        </div>
        <div v-else>
          <ion-subtitle>Students Attending </ion-subtitle>
          <ion-list>
            <ion-item v-for="students in studentsAttending" :key="students">
              <ion-label>{{ students }}</ion-label>
            </ion-item>
          </ion-list>
          <ion-button
            id="deleteSlotsbtn"
            expand="block"
            color="secondary"
            class="ion-margin-top"
            type="button"
            v-on:click="deleteSlots(title)"
          >
            {{ "Delete Slots" }}
          </ion-button>
        </div>
      </ion-card-content>
    </ion-card>
  </ion-content>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonLabel,
  IonList,
  IonItem,
  IonCardSubtitle,
  IonButton,
  modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { reactive, toRefs } from "vue";
import { auth, db, dbs } from "../main";

export default defineComponent({
  name: "ModalBookingDetails",

  props: {
    title: { type: String, default: "Super Modal" },
    AvailableSlots: { type: Number },
    BookingDay: { type: String, default: "Super Modal" },
    studentsAttending: { type: [] },
    pageType: { type: String, default: "Super Modal" },
  },

  methods: {
    async deleteSlots(slotName) {
      alert("delete slots" + slotName);
      await dbs.ref("slots/" + slotName).remove();
      modalController.dismiss();
    },
  },

  setup() {
    const state = reactive({
      Isbooked: false,
    });

    const getUser = async () => {
      let UserName = "";
      const ref = await db
        .collection("users")
        .where("email", "==", auth.currentUser?.email)
        .get();
      ref.forEach((doc) => {
        UserName = doc.data().email;
      });
      return UserName;
    };

    const slotDetails = async (slotName) => {
      const ref = await dbs.ref(`slots/${slotName}`);
      const snapshot = await ref.once("value");
      return snapshot.val();
    };

    const checkIfBooked = async (slotName) => {
      let Uname = "";
      Uname = await getUser();

      const StudentList = await slotDetails(slotName);
      console.log(StudentList.StudentsAttending);

      const Students = Object.values(StudentList.StudentsAttending);
      for (const student of Students) {
        if (student === Uname) {
          state.Isbooked = true;
          console.log(student + " is already booked");
        }
      }
      console.log(state.Isbooked);
    };

    async function bookAslot() {
      let Uname = "";

      Uname = await getUser();
      //-----------------------------------------Updating the Student Attendence list and The slots Available------------------------------------//
      let AvailSlots = 0;
      let students = [];
      const getStudDetails = await slotDetails(this.title);

      AvailSlots = getStudDetails.AvailableSlots;
      students = getStudDetails.StudentsAttending;

      students.push(Uname);

      dbs.ref("slots/" + this.title).update({
        AvailableSlots: AvailSlots - 1,
        StudentsAttending: students,
      });
      modalController.dismiss();
    }
    //-------------------------------------------------------------------end------------------------------------------------------------------//

    async function deleteSlot(slotName) {
      let Uname = "";
      Uname = await getUser();

      const StudentList = await slotDetails(slotName);
      const AvailSlots = StudentList.AvailableSlots;
      const Students = Object.values(StudentList.StudentsAttending);

      for (let i = 0; i < Students.length; i++) {
        if (Students[i] === Uname) {
          Students.splice(i, 1);
          i--;
          console.log(Students);
        }
        dbs.ref("slots/" + this.title).update({
          AvailableSlots: AvailSlots + 1,
          StudentsAttending: Students,
        });
        state.Isbooked = false;
      }
      modalController.dismiss();
    }

    const closeModal = () => {
      modalController.dismiss();
    };

    return {
      ...toRefs(state),
      bookAslot,
      closeModal,
      checkIfBooked,
      deleteSlot,
    };
  },

  mounted() {
    console.log(this.title);
    this.checkIfBooked(this.title)
      .then((response) => {
        console.log("title - ", response);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonLabel,
    IonList,
    IonItem,
    IonCardSubtitle,
    IonButton,
  },
});
</script>
