<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
      <ion-card>
        <ion-card-header>Reset Password</ion-card-header>
      <ion-card-content>
        <form 
        @submit.prevent="resetPassword(newpass,confpass)">
            <ion-item>
             <ion-label position="floating">New Password</ion-label>
              <ion-input v-model="newpass"></ion-input>
            </ion-item>
            <ion-item>
             <ion-label position="floating">Confirm Password</ion-label>
              <ion-input v-model="confpass"></ion-input>
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
      
    <ion-content >
             <ion-button
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
              v-on:click="logOut()"
            >
              {{  "LogOut" }}
            </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent , IonButton } from '@ionic/vue';
import {fb} from "../main";
import { useRouter } from "vue-router";


export default  {
  name: 'Setings',
  components: {  IonHeader, IonToolbar, IonTitle, IonContent, IonPage ,IonButton },

 data(){
   return{
      newpass:'',
      confpass:''
   }
 },
 methods:{
      resetPassword(NewPassword: string , ConfirmPassword: string){
        const user = fb.auth().currentUser;
        console.log(user)

        if(NewPassword == ConfirmPassword){
            user?.updatePassword(ConfirmPassword).then(()=>{

              console.log("sucsess")
            })
            .catch((err)=>{
              console.log(err)
            })
      }else{
        console.log("passwords do not match")
      }
 },
 
 },
 
 
 setup() {
    const router = useRouter();

    const logOut = () =>{
            fb.auth().signOut()
            .then(() =>{
                router.push('/tabs/tab1')
            })
            .catch((err) =>{
                console.log(err)
            })
    }
    return{
        logOut
    }
 }

}
</script>