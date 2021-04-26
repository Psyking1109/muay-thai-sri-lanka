<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
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