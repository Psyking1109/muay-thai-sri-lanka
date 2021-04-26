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

      <form @submit.prevent="getVals()">
            <ion-item >
              <ion-label id="Slotslbl" position="floating">Available Slots </ion-label>    
            </ion-item>

            <ion-button
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
              v-on:click="bookAslot()"
            >
              {{"Book Your Slot"}}
            </ion-button>
      </form>


  </ion-card-content>
</ion-card>
</template>

<script>
import { IonDatetime, IonItem, IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';
import { auth, db ,dbs} from "../main";
//import { useRouter } from "vue-router";


export default defineComponent({
  components: { IonDatetime, IonItem, IonLabel },

  data(){
    return{
      SelDate:'',
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


//-----------------------------------------Updating the Student Attendence list and The slots Available------------------------------------------------------------------//
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
//-------------------------------------------------------------------end------------------------------------------------------------------//            
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