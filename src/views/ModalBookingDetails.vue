<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Book your Slot</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-card>
      <ion-card-content>
        <ion-card-subtitle>{{ title }}</ion-card-subtitle>
            <ion-item>
                     <ion-label>Available Slots :- {{AvailableSlots}}</ion-label>
            </ion-item>
            <ion-item>
                     <ion-label>Day of Booking :-{{BookingDay}}</ion-label>
            </ion-item>
            <br>
          <div v-if="pageType === 'BookingPage'">
<form @submit.prevent="bookAslot()">       
            <ion-button
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"           
            >
              {{"Book Your Slot"}}
            </ion-button>
      </form>
          </div>
           <div v-else-if="pageType === 'AdminPage'">
             
  <ion-subtitle>Students Attending </ion-subtitle> 
            <ion-list>
              <ion-item v-for="students in studentsAttending" :key="students">
                          <ion-label>{{students}}</ion-label>
              </ion-item>
          </ion-list>
      </div>
      </ion-card-content>
    </ion-card>     
  </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar,IonCard,IonCardContent ,IonLabel,IonList,IonItem ,IonButton,IonCardSubtitle} from '@ionic/vue';
import { defineComponent } from 'vue';
import { auth, db ,dbs } from "../main";

export default defineComponent({
  name: 'ModalBookingDetails',

  props: {
    title: { type: String, default: 'Super Modal' },
    AvailableSlots: { type: Number, },
    BookingDay: { type: String, default: 'Super Modal' },
    studentsAttending: { type: [] },
    pageType:{ type: String, default: 'Super Modal' },
          
  },

setup(){

    async function bookAslot(){       
          let Uname = "";
            //  let getSelectedVal;

//-----------------------------------------Getting the name of the user ------------------------------------------------------------------//
                  debugger

        const getUser = async() =>{
                  let UserName = ""
                  const ref =  await db.collection("users").where('email','==',auth.currentUser?.email).get()
                  ref.forEach((doc) => {

                    UserName  = doc.data().name;
                                                    
                  });
                  return UserName;
 
        }
Uname = await getUser()
//-------------------------------------------------------------------end------------------------------------------------------------------//

                console.log("role is "+Uname);
//-----------------------------------------Updating the Student Attendence list and The slots Available------------------------------------//
                    let AvailSlots = 0;  
                    let students = []
                    
                const slotDetails = async (slotName) => {
    const ref = await dbs.ref(`slots/${slotName}`);
    const snapshot = await ref.once('value');
    return snapshot.val();
}

      const getStudDetails = await slotDetails(this.title)
                    
                    AvailSlots = getStudDetails.AvailableSlots
                    students = getStudDetails.StudentsAttending
                     console.log("Student List ",students+"Available Slots",AvailSlots)  
                    students.push(Uname); 
                               
                    dbs.ref('slots/'+this.title).update({
                     AvailableSlots:AvailSlots-1,
                     StudentsAttending:students
            });
            
             }


      
             return{
               bookAslot,
             
             }

},

  components: { IonContent, IonHeader, IonTitle, IonToolbar ,IonCard,IonCardContent,IonLabel,IonList,IonItem,IonButton,IonCardSubtitle }
});
</script>