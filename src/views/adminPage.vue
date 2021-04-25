
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
            @submit.prevent="signUpWithEmailAndPassword(name, email, password)">
            <ion-item >
              <ion-label position="floating">Name</ion-label>
              <ion-input v-model="name"></ion-input>
            </ion-item>
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
              {{  "Sign Up" }}
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
                    <ion-item>
                     <ion-label position="floating">Select Date</ion-label>
                     <ion-datetime display-format="D MMM YYYY H:mm" min="2021" max="2021" v-model="SelDateForStudentDetalis" value="" ionchange = "getDate($event)"></ion-datetime>
                     </ion-item>

</ion-card-content>
</ion-card>



            <ion-card>
            <ion-card-header>         
          <ion-card-title>Create Slots for Members</ion-card-title>
            </ion-card-header>
             <ion-card-content >
                <ion-item>
              <ion-label position="floating">Slots Available</ion-label>
              <ion-input v-model="slots"></ion-input>
                </ion-item>
                        <br>
                  <ion-item>
                     <ion-label position="floating">Select Date</ion-label>
                     <ion-datetime display-format="D MMM YYYY H:mm" min="2021" max="2021" v-model="SelDate" value="" ionchange = "getDate($event)"></ion-datetime>
                     </ion-item>

            <ion-button
              id = "createSlotsbtn"
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
              v-on:click = "createSlots(slots , getSelectedValue)"
            >
              {{"Create Slots"}}
            </ion-button>

             <ion-button
             id = "deleteSlotsbtn"
              expand="block"
              color="secondary"
              class="ion-margin-top"
              type="submit"
              v-on:click = "deleteSlots(slots , getSelectedValue)"
            >
              {{"Delete Slots"}}
            </ion-button>

             <ion-button
             id = "deleteSlotsbtn"
              expand="block"
              color="secondary"
              class="ion-margin-top"
              type="submit"
              v-on:click = "testBTN(slots)"
            >
              {{"Test add names"}}
            </ion-button>
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
  //IonList,
} from "@ionic/vue";
import { auth, db , dbs } from "../main";
import { reactive, toRefs } from "vue";
//import { useRouter } from "vue-router";


export default {
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
   // IonList,
  },
  setup() {
   // const router = useRouter();
    
    const state = reactive({
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      errorMsg: "",
      slots: 0,
      
      //getSelectedVal: ""
    });

    let SelDate: any 
    let students = [''];
    
    const signUpWithEmailAndPassword = async (
      name: string,
      email: string,
      password: string,
      phoneNumber: string
    ) => {
      try {

        const authRes = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        db.collection("users").doc(authRes.user?.uid).set({
          name,
          email,
          phoneNumber,
          role : "stundent"
        });
       // router.push("/tabs/tab1");
      } catch (error) {
        state.errorMsg = error.message;
      }
    };

       

        
 const createSlots = async (       
        slots: string,       
    ) => {     
             console.log("Creating slots"+slots+SelDate)
                dbs.ref('slots/'+slots).set({
              AvailableSlots:slots,
              StudentsAttending:['niland','anna']
            });
               
                  dbs.ref('slots/'+slots).on('value',function(snapshot){

                    students = snapshot.val().StudentsAttending;
                        console.log(students)
                });
    };

           

     const deleteSlots = async (
        slots: string,
        getSelectedVal: string
    ) => {
            alert("delete slots"+slots+getSelectedVal)
             dbs.ref('slots/'+slots).remove();
         };

         function getDate (e: any)
              {
             alert(e)
         }



// try updating 
          const testBTN = (
                    slots: string,

            ) =>{
                    let AvailSlots = 0;
                    const nextName = "Sachin";
                 dbs.ref('slots/'+slots).on('value',function(snapshot){

                    students = snapshot.val().StudentsAttending;
                    AvailSlots = snapshot.val().AvailableSlots;
                    //    console.log(students)
                });
                    students.push(nextName); 
                    console.log(students) 

                    dbs.ref('slots/'+slots).update({
                    AvailableSlots:AvailSlots-1,
                     StudentsAttending:students
            });

            }

    return {
      ...toRefs(state),
      signUpWithEmailAndPassword,
      createSlots,
      getDate,
      deleteSlots,
      testBTN
     // AuthMode,
    };
  },
};
</script>

<style  scoped>
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