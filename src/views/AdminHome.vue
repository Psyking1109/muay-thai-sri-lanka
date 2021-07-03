<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Welcome</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-title class="titleClass"> Student List</ion-card-title>
        <ion-card-content>
          <ion-list>
            <ion-item
              v-for="Student in StudentNames"
              :key="Student.email"
              class="listClass"
            >
              <ion-label v-on:Click="GetStudentDetails(Student)">
                {{ Student.name }}
              </ion-label>
            </ion-item>
          </ion-list>
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
  IonCardTitle,
  IonCardContent,
  IonLabel,
  IonItem,
  IonList,
  popoverController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { reactive, toRefs } from "vue";
import { db } from "../main";
import Popover from "/src/views/popOver.vue";

export default defineComponent({
  name: "AdminHome",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonList,
  },

  setup() {
    const state = reactive({
      StudentNames: [],
      StudentEmail: String,
    });

    async function getStudentNames(NewArray: any) {
      const StudentNames = [] as any;
      const StudentEmails = [];
      const Dataval = [] as any;

      await db
        .collection("users")
        .where("role", "==", "stundent")
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            Dataval.push(doc.data());
            StudentNames.push(doc.data().name);
            StudentEmails.push(doc.data().email);
          });
          console.log(StudentNames);
        });
      for (const datas of Dataval) {
        NewArray.push(datas);
      }
    }
    getStudentNames(state.StudentNames);

    const GetStudentDetails = (studentName: any) => {
      const openPopover = async (student: any) => {
        const popover = await popoverController.create({
          component: Popover,
          cssClass: "my-custom-class",
          // event: ev,
          translucent: true,
          componentProps: {
            StudentName: student.name,
            StudentEmail: student.email,
            studentPhoneNumber: student.phoneNumber,
          },
        });
        await popover.present();

        const { role } = await popover.onDidDismiss();
        console.log("onDidDismiss resolved with role", role);
      };

      openPopover(studentName);
    };

    return {
      ...toRefs(state),
      getStudentNames,
      GetStudentDetails,
    };
  },
});
</script>

<style scoped>
.titleClass {
  padding-left: 10px;
  padding-top: 10px;
  font-family: none;
  font-variant: petite-caps;
  color: rgb(67, 88, 156);
  font-weight: bolder;
  font-size: xx-large;
}
.listClass {
  font-family: "Times New Roman";
  color: rgb(1, 1, 1);
  font-style: oblique;
  font-size: 15px;
  font-weight: bold;
}

.body {
  background-color: blue;
}
</style>
