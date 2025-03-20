import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useMainStore = defineStore('main', () => {
  const userEmail = ref('doe.doe.doe@example.com')
  const apiToken = ref('')

  function setUser(payload) {
    if (payload.email) {
      userEmail.value = payload.email
    }
  }

  function isLoggedIn() {
    return !!apiToken.value
  }

  return {
    userEmail,
    setUser,
  }
})
