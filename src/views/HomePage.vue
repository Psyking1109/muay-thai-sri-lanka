<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Muay Thai Training</ion-title>
      </ion-toolbar>
    </ion-header>
     <ExploreContainer name="Muay Thai Training" />
    <ion-content :fullscreen="true">
          <ion-card>
            <div class="imgClass">
        <img src="./images/m1.jpg" 
        alt="exg"
        />
            </div>
       
        <ion-card-header>
          <ion-card-subtitle>Muay Thai History</ion-card-subtitle>
          <ion-card-title>About History</ion-card-title>
        </ion-card-header>
        <ion-card-content>
           Muaythai has been a part of Thai history and heritage for hundreds of years,
           as with most traditions from ancient times. Many different versions of the history of Muaythai exist, 
           but all sources agree that Muaythai was the primary and most effective method of self defence used by 
           Thai warriors on the battlefields of conflicts and wars that occurred countless times throughout the 
           history of the nation now known as Thailand. During this time, a warfare manual named “Chupasart” 
           was written. This manual emphasised the martial uses of each body part. The underlying philosophy 
           of this manual implied that fighting was more than the use of weapons, but most importantly, 
           should engage total commitment from mind, body and soul.
        </ion-card-content>
      </ion-card>

            <ion-card>
            <div class="imgClass">
        <img src="./images/m4.jpg" 
        alt="exg"
        />
            </div>
        <ion-card-header>
          <ion-card-subtitle>Muay Thai Discipline</ion-card-subtitle>
          <ion-card-title>Muay</ion-card-title>
        </ion-card-header>
        <ion-card-content>
         The foundations of muaythai is built on five important pillars; Tradition,
          Respect, Honour, Excellence and Fairplay. The different disciplines in 
          muaythai are practiced for various reasons. It can be for fitness, 
          self-defence, competition or as a cultural art form. Muaythai is 
          in essence a way of life.
          Muay
          Muay, also known as muaythai, Thai Boxing of Thai Kick-Boxing is the 
          competition sport which is either competed at the professional level 
          over 5 rounds of 3 minutes each, or by amateur rules over 3 rounds of 
          3 minutes each. It is known as the sport of eight limbs where practitioners
           utilise their fists, elbows, shins and knees. Amateur practitioners wear a 
           head guard, elbow guards, shin guards and gloves whilst the professional use 
           only the gloves. Under IFMA’s auspices its professional wing the World 
           Muaythai Council or WMC regulates and governs all professional rules and 
           competitions internationally
        </ion-card-content>
      </ion-card>

       <ion-card>
            <div class="imgClass">
        <img src="./images/m5.jpg" 
        alt="exg"
        />
            </div>
        <ion-card-header>
          <ion-card-subtitle>Muay Boran</ion-card-subtitle>
          <ion-card-title>Muay Styles</ion-card-title>
        </ion-card-header>
        <ion-card-content>
         Muay Boran is the umbrella term for “Hand-to-Hand Combat” or self-defense 
         in muaythai. In Thailand It is composed of five disciplines – Muay Chaiya, 
         Muay Korat, Muay Lopburi, Muay Tahsouh and Muay Pala Sueksa (or Muay Panakorn). 
         They can be identified by their different stances and techniques. Muay boran 
         bouts were traditionally fought with rope bindings on the hands (Kad Chuek). 
         Today, competitions are held as either demonstrations with very little contact 
         or full contact
        </ion-card-content>
      </ion-card>

 <ion-card>
            <div class="imgClass">
        <img src="./images/m6.jpg" 
        alt="exg"
        />
            </div>
        <ion-card-header>
          <ion-card-subtitle>Krabi Krabong</ion-card-subtitle>
          <ion-card-title>Muay Styles</ion-card-title>
        </ion-card-header>
        <ion-card-content>
         Krabi Krabong is the weapon based discipline of muaythai. 
         The system includes the main weapons; the curved sword (Krabi) 
         and staff (Krabong).
        </ion-card-content>
      </ion-card>

      <ion-card>
            <div class="imgClass">
        <img src="./images/m7.jpg" 
        alt="exg"
        />
            </div>
        <ion-card-header>
          <ion-card-subtitle>Muay Talay</ion-card-subtitle>
          <ion-card-title>Muay Styles</ion-card-title>
        </ion-card-header>
        <ion-card-content>
         This is a fun take on muaythai and is competed on the 
         beach or over a body of water. Competitors compete whilst 
         sitting on a beam using balance and strength, the victor 
         being the opponent which remains on the pole.
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
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";

export default {
  name: "Tab2",
  components: {
    ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle
  },
};
</script>
<style scoped>

.imgClass{
width:"60";
height:"60";
align-items: center;
justify-content: center;
}
</style>