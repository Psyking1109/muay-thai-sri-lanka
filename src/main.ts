import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics'
import 'firebase/database'

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const firebaseConfig = {
  apiKey: "AIzaSyBC7jOQEELv5CYK20N4BgDei-An00bClgI",
  authDomain: "muaythaisrilanka-155ca.firebaseapp.com",
  projectId: "muaythaisrilanka-155ca",
  storageBucket: "muaythaisrilanka-155ca.appspot.com",
  messagingSenderId: "770858699836",
  appId: "1:770858699836:web:cef07beaf4d0e1d0ec8739",
  measurementId: "G-94HNX0TZFP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const db = firebase.firestore();
export const dbs = firebase.database();


const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});