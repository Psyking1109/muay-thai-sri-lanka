
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
       <ion-list>
          <ion-item v-for="slotName in NewArray" :key="slotName" >
          <ion-label>{{ slotName }}</ion-label>
      </ion-item>
      </ion-list>
  
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
                     <ion-label position="floating">Select Date SelDateSlot</ion-label>
                     <ion-datetime display-format="D MMM YYYY h:mm a" min="2021" max="2021" v-model="SelDate" v-bind:onChange="getVals()" ></ion-datetime>
                     </ion-item>

            <ion-button
              id = "createSlotsbtn"
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
              v-on:click ="createSlots()"
            >
              {{"Create Slots"}}
            </ion-button>

             <ion-button
             id = "deleteSlotsbtn"
              expand="block"
              color="secondary"
              class="ion-margin-top"
              type="submit"
              v-on:click ="deleteSlots(slots , getSelectedValue)"
            >
              {{"Delete Slots"}}
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
  IonDatetime,
  IonList,
} from "@ionic/vue";
import { auth, db , dbs } from "../main";
import { defineComponent } from 'vue';
import { reactive, toRefs } from "vue";
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
    IonList
  },

    data(){      
        return{
            SelDate:'',
            slots:Number,
            students:[''],
            SlotDate:'',
            SlotDay:'',
            SlotMonth:'',
            SlotYear:'',
            SlotHour:'',
            SlotMinuites:'',
            SlotName:'',
            DataBaseSlotNames:Array
            
        }
    },
    
  methods:{         
    getVals(){
  //  console.log("the Date is ",this.SelDate)
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

      this.SlotDay = days[new Date(this.SelDate).getDay()]

      this.SlotDate = new Date(this.SelDate).getDate().toString()
      this.SlotMonth = months[new Date(this.SelDate).getMonth()]
      this.SlotYear = new Date(this.SelDate).getFullYear().toString()
      this.SlotHour = new Date(this.SelDate).getHours().toString()
      this.SlotMinuites = new Date(this.SelDate).getMinutes().toString()
      this.SlotName = this.SlotDate+this.SlotMonth+this.SlotYear+" At "+this.SlotHour+":"+this.SlotMinuites
      console.log(this.SlotDate);
      

    //console.log( new Date(this.SelDate).getHours())
    //console.log( new Date(this.SelDate).getMinutes())
    //console.log( days[new Date(this.SelDate).getDay()])
    //console.log(months[new Date(this.SelDate).getMonth()])
  },

  createSlots()     
 {     
 
    let studentVal = this.students
             console.log("Creating slots"+this.SlotName)
                dbs.ref('slots/'+this.SlotName).set({
              AvailableSlots:this.slots,
              StudentsAttending:['niland','anna'],
              BookingDay:this.SlotDay
            
            });
               
                  dbs.ref('slots/'+this.SlotName).on('value',function(snapshot){
                    studentVal = snapshot.val().StudentsAttending;
                });
                
               
       
               // this.DatatableNames = tableNames
              //  console.log(this.DatatableNames)//NOT WORKING 
                console.log(studentVal)
    },

    deleteSlots ()
 {
            alert("delete slots"+this.SlotName)
             dbs.ref('slots/'+this.SlotName).remove();
             
         },
        },
  

  setup() {
   // const router = useRouter();


    
   // getVal()

    const state = reactive({
      name: "",
      email: "",
      password: "",
    //  phoneNumber: "",
      errorMsg: "",
      slots: 0,
      NewArray:[]

    });
//--------------------------------------------------------------Get Slot Names From FireBase------------------------------------------------//
 function getVal(this: any,NewArray: any ){

         let SlotNames = [] as any

                  dbs.ref('slots/').once('value',function(snapshot){                                                         
                     if (snapshot.val() !== null) {
                       
                   SlotNames = Object.keys(snapshot.val());
                    
                  for(const datas of SlotNames){
                    console.log(datas)
                    NewArray.push(datas)   
                  }
                           
                   }
                });

    }

getVal(state.NewArray)

//--------------------------------------------------------------end------------------------------------------------------------------------//
            

    const signUpWithEmailAndPassword = async (
      name: string,
      email: string,
      password: string,
      //phoneNumber: string
    ) => {
      try {

        const authRes = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        db.collection("users").doc(authRes.user?.uid).set({
          name,
          email,
         // phoneNumber,
          role : "stundent"
        });
       // router.push("/tabs/tab1");
      } catch (error) {
        state.errorMsg = error.message;
      }
    };



       
    return {
      ...toRefs(state),
      signUpWithEmailAndPassword,
      getVal,
      
    };
  },
});
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