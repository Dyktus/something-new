import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'

import './css/main.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import {i18n} from "@/i18n/index.js";

// Init Pinia
const pinia = createPinia()

const toastOptions = {
  position: "top-center",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
}

// Create Vue app
createApp(App)
  .use(router)
  .use(pinia)
  .use(Toast, toastOptions)
  .use(i18n)
  .mount('#app')

// Init main store
const mainStore = useMainStore(pinia)

// Default title tag
const defaultDocumentTitle = 'SaaSy'

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})
