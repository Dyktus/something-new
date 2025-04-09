<template>
  <div class="login-container">
    <div class="login-modal">
      <h1>Zaloguj się</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">{{ t('login.email') }}</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            :placeholder="t('login.emailPlaceholder')"
          >
        </div>
        <div class="form-group">
          <label for="password">{{ t('login.password') }}</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            required
            :placeholder="t('login.passwordPlaceholder')"
          >
        </div>
        <div class="buttons">
          <button type="submit" class="btn btn-primary">{{ t('login.loginButton') }}</button>
          <button type="button" class="btn btn-secondary" @click="goToRegister">{{ t('login.registerButton') }}</button>
          <a href="#" class="forgot-password" @click.prevent="forgotPassword">{{ t('login.forgotPasswordButton') }}</a>
        </div>
      </form>
    </div>
  </div>
</template>
script setup>
<script setup>
import {reactive, ref} from 'vue';
import api from "@/api.js";
import {useRouter} from "vue-router";
import {useMainStore} from "@/stores/main.js";
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const router = useRouter()
const mainStore = useMainStore();

const form = reactive({
  email: '',
  password: '',
  remember: true,
})


const handleLogin = async () => {
  try {
    const response = await api.post('/profile/login', {
      email: form.email,
      password: form.password,
    });

    await mainStore.setUser(response);
    api.setToken(response.data.token);
    router.push('/')

    console.log('all done');
    console.log(mainStore.userEmail);
  } catch (error) {
    alert(`${error.response.data.message}`)
  }
};

const goToRegister = () => {
  router.push('/register')
};

const forgotPassword = () => {
  router.push('/forgot-password')
};
</script>

