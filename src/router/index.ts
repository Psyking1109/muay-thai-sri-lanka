import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue';
import AdminTabs from '../views/AdminTabs.vue';
//import Login from '../views/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/HomePage'
      },
      {
        path: 'HomePage',
        component: () => import('@/views/HomePage.vue')       
      },
      {
        path: 'BookingPage',
        component: () => import('@/views/BookingPage.vue')
      },
      {
        path: 'Settings',
        component: () => import('@/views/Settings.vue')
      },
    ]
  },
  {
    path: '/admintabs/',
    component: AdminTabs,
    children: [
      {
        path: '',
        redirect: '/admintabs/HomePage'
      },
      {
        path: 'HomePage',
        component: () => import('@/views/HomePage.vue')       
      },
      {
        path: 'adminPage',
        component: () => import('@/views/adminPage.vue')
      }
    ]
  },

      {
        path: '/Login',
        component: () => import('@/views/Login.vue')       
      },
    

  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
