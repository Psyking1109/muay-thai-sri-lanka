<template>

    <ion-header>
      <ion-toolbar>
        <ion-title> Book Training</ion-title>
      </ion-toolbar>
    </ion-header>
<ion-card>
  <ion-card-content>    
          <div class = "center">
  <ion-item>
    <ion-label>Book Training Date</ion-label>
    <ion-datetime display-format="D MMM YYYY H:mm" min="2021" max="2021" v-model="SelDate" ></ion-datetime>
  </ion-item>
      </div>

      <form @submit.prevent="bookAslot()">
            <ion-item >
              <ion-label id="Slotslbl" position="floating">Available Slots </ion-label>    
            </ion-item>

            <ion-button
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
            
            >
              {{"Book Your Slot"}}
            </ion-button>
      </form>


  </ion-card-content>
</ion-card>

<ion-card>
        <ion-card-header>Reset Password</ion-card-header>
      <ion-card-content>
        <form 
        @submit.prevent="resetPassword()">
            <ion-item>
             <ion-label position="floating">New Password</ion-label>
              <ion-input v-model="NewPassword"></ion-input>
            </ion-item>
            <ion-item>
             <ion-label position="floating">Confirm Password</ion-label>
              <ion-input v-model="ConfirmPasswor"></ion-input>
            </ion-item>
               <ion-button
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
            >
              {{  "Reset Password" }}
            </ion-button>
        </form>
      </ion-card-content>
      </ion-card>



</template>

<script>
import { 
IonDatetime, 
IonItem, 
IonLabel , 
IonCard,
IonCardHeader,
IonCardContent,
IonHeader,
IonTitle,
IonToolbar,
IonButton,
IonInput} from '@ionic/vue';

import { defineComponent } from 'vue';
import { auth, db ,dbs , fb} from "../main";
//import { useRouter } from "vue-router";


export default defineComponent({
  components: { IonDatetime, 
  IonItem, 
  IonLabel ,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput
  },

  data(){
    return{
      SelDate:'',
      NewPassword:'',
      ConfirmPasswor:''
    }
  },
  methods:{
       bookAslot(){       
          let Uname = [];
            //  let getSelectedVal;

//-----------------------------------------Getting the name of the user ------------------------------------------------------------------//
                  
                  db.collection("users").where('email','==',auth.currentUser?.email).get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                Uname  = doc.data().name;
                                console.log("role is "+Uname+" id is" +doc.id);
                                
                            });
                          });
//-------------------------------------------------------------------end------------------------------------------------------------------//


//-----------------------------------------Updating the Student Attendence list and The slots Available------------------------------------//
                    let AvailSlots = 0;  
                    let students = []
                 dbs.ref('slots/'+this.SelDate).on('value',function(snapshot){

                    students = snapshot.val().StudentsAttending;
                    AvailSlots = snapshot.val().AvailableSlots;
                    //    console.log(students)
                });
                    students.push(Uname); 
                    console.log(students) 

                    dbs.ref('slots/'+this.SelDate).update({
                    AvailableSlots:AvailSlots-1,
                     StudentsAttending:students
            });
             },
//-------------------------------------------------------------------end------------------------------------------------------------------//            
        
    resetPassword(){
         const user = fb.auth().currentUser;
        console.log(user)
        console.log(this.ConfirmPasswor)
       // debugger;
        if(this.NewPassword == this.ConfirmPasswor){
            user?.updatePassword(this.ConfirmPasswor).then(()=>{

              console.log("sucsess")
            })
            .catch((err)=>{
              console.log(err)
            })
      }else{
        console.log("passwords do not match")
      }
    }
  },



setup(){
    function getVals(){
        console.log(this.SelDate)
    }
   
return {
 getVals
}
}
});


</script>

<style>
.center{

    text-align: center;
}

</style>